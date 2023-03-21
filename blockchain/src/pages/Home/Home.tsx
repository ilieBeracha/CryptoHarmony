import "./Home.css";
import { useEffect, useState } from 'react'
import { chartsService } from "../../service/chartsService";
import { CoinModel } from "../../models/CoinModel";
import Chart from "../../Components/Chart/Chart";

function Home(): JSX.Element {
    const [coinData, setCoinData] = useState<CoinModel | any>();
    const [type, setType] = useState<string>('price');
    const [byDate, setByDate] = useState<string>('15m');
    const [pairs, setPairs] = useState([]);
    const [coin, setCoin] = useState<string>('BTCUSDT');
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const newWs = new WebSocket('wss://stream.binance.com:9443/ws');
        setWs(newWs);

        newWs.onopen = () => {
            newWs.send(JSON.stringify({
                "method": "SUBSCRIBE",
                "params": [
                    `${coin.toLowerCase()}@kline_${byDate}`
                ],
                "id": 1
            }));
        };

        newWs.onmessage = (event) => {
            const message = JSON.parse(event.data);
            
            if (message.k) {
              const { t, o, h, l, c, v } = message.k;
              const time = new Date(t).getTime();
              const open = String(o);
              const high = String(h);
              const low = String(l);
              const close = String(c);
              const volume = String(v);
              
              setCoinData((prevState: any) => {
                const lastPrice = prevState.prices[prevState.prices.length - 1];
                const newPrices = [...prevState.prices];
                if (lastPrice && lastPrice[0] === time) {
                  lastPrice[4] = close;
                  lastPrice[5] = volume;
                } else {
                  const newPrice = [time, open, high, low, close, volume];
                  newPrices.push(newPrice);
                }                
                return { ...prevState, prices: newPrices };
              });
            }
          };
          

        return () => {
            if (newWs) newWs.close();
        };
    }, [coin, byDate]);

    useEffect(() => {
        chartsService.getCoinData(coin, byDate).then((res) => setCoinData(res));
    }, [coin, byDate]);

    useEffect(() => {
        chartsService.getCoinsTrades().then((res) => setPairs(res));
    }, [])

    return (
        <div className="Home">
            <div className="ChartsDiv">
                {coin && coinData ?
                    <Chart data={coinData} type={type} byDate={byDate} setByDate={setByDate} />
                    : <></>
                }
            </div>
            <div className="ChartsFiltersAndCoins">
                <div className="ChartsFiltersAndCoinsPairs">
                    <h3>Pairs</h3>
                    <select onChange={(e: any) => setCoin(e.target.value)}>
                        {pairs?.map((pair: any) => <option value={pair}>{pair}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Home;
