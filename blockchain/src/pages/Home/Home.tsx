import "./Home.css";
import { useEffect, useState } from "react";
import { chartsService } from "../../service/chartsService";
import { CoinModel } from "../../models/CoinModel";
import Chart from "../../Components/Chart/Chart";
import { useForm } from "react-hook-form";
import { tradesService } from "../../service/tradesService";
import { indicatorsService } from "../../service/indicatorsService";

function Home(): JSX.Element {
  const [coinData, setCoinData] = useState<CoinModel | any>();
  const [type, setType] = useState<string>("price");
  const [byDate, setByDate] = useState<string>("15m");
  const [pairs, setPairs] = useState([]);
  const [coin, setCoin] = useState<string>("BTCUSDT");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [chatResponse, setChatResponse] = useState("");
  const [loader, setLoader] = useState<boolean>(false);
  const [rsiData, setRsiData] = useState<number[]>([]);
  const { register, handleSubmit, resetField } = useForm();

  useEffect(() => {
    const newWs = new WebSocket("wss://stream.binance.com:9443/ws");
    setWs(newWs);

    newWs.onopen = () => {
      newWs.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${coin.toLowerCase()}@kline_${byDate}`],
          id: 1,
        })
      );
    };

    newWs.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.k) {
        const { t, o, h, l, c, v } = message.k;
        const time = t;
        const open = parseFloat(o);
        const high = parseFloat(h);
        const low = parseFloat(l);
        const close = parseFloat(c);
        const volume = parseFloat(v);

        setCoinData((prevState: any) => {
          const lastPrice = prevState.prices[prevState.prices.length - 1];
          const newPrices = [...prevState.prices];
          if (lastPrice && lastPrice[0] === time) {
            lastPrice[1] = open;
            lastPrice[2] = high;
            lastPrice[3] = low;
            lastPrice[4] = close;
            lastPrice[5] = volume;
          } else {
            const newPrice = [time, open, high, low, close, volume];
            newPrices.push(newPrice);
          }
          console.log(newPrices);

          return { ...prevState, prices: newPrices };
        });
      }
    };

    return () => {
      if (newWs) newWs.close();
    };
  }, [coin, byDate]);

  useEffect(() => {
    indicatorsService.getRsiByPair(coin,byDate,100).then(((res) => setRsiData(res)))
    chartsService.getCoinData(coin, byDate).then((res) => {
      setCoinData(res);
      console.log(res);
    });
  }, [coin, byDate]);

  useEffect(() => {
    chartsService.getCoinsTrades().then((res) => setPairs(res));
  }, []);

  async function sendDataToChatGPT(data: any) {
    if (data.query === "") return;
    resetField("query");
    setChatResponse("");
    setLoader(true);
    const newData = {
      coin: coin,
      query: data.query,
      history: coinData.prices.slice(-90),
      dataByCandleTime: byDate,
    };
    tradesService.sendTradesHistoryAndQuery(newData).then((res) => {
      setChatResponse(res);
      setLoader(false);
    });
  }

  return (
    <div className="Home">
      <div className="ChartsDiv">
        {coin && coinData ? (
          <Chart
            data={coinData}
            type={type}
            byDate={byDate}
            setByDate={setByDate}
            rsiData={rsiData}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="ChartsFiltersAndCoins">
        <div className="ChartsFiltersAndCoinsPairs">
          <h3>Pairs</h3>
          <select onChange={(e: any) => setCoin(e.target.value)}>
            {pairs?.map((pair: any) => (
              <option value={pair}>{pair}</option>
            ))}
          </select>
          <h3>Chat: </h3>
          <div className="ChartsFiltersAndCoinsChatGPT">
            <div className="ChartsFiltersAndCoinsChatGPTResponse">
              {loader ? (
                <p>loading...</p>
              ) : chatResponse ? (
                <span>{chatResponse}</span>
              ) : (
                <div className="noChat">Ask chatGPT...</div>
              )}
            </div>
            <form onSubmit={handleSubmit(sendDataToChatGPT)}>
              <input type="text" {...register("query")} />
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
