import "./Home.css";
import { useEffect, useState } from 'react'
import { chartsService } from "../../service/chartsService";
import { CoinModel } from "../../models/CoinModel";
import Chart from "../../Components/Chart/Chart";
import { useForm } from "react-hook-form";
import { tradesService } from "../../service/tradesService";

function Home(): JSX.Element {
    const [coinData, setCoinData] = useState<CoinModel | any>();
    const [type, setType] = useState<string>('price');
    const [byDate, setByDate] = useState<string>('15m');
    const [pairs, setPairs] = useState([]);
    const [coin, setCoin] = useState<string>('BTCUSDT');
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [chatResponse, setChatResponse] = useState('')
    const [loader, setLoader] = useState<boolean>(false);
    const { register, handleSubmit, resetField } = useForm()
   
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
                console.log(324);
                
                const { t, o, h, l, c, v } = message.k;
                const time = t;
                const open = String(o);
                const high = String(h);
                const low = String(l);
                const close = String(c);
                const volume = String(v);

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
                    return { ...prevState, prices: newPrices };
                });
            }
        };


        return () => {
            if (newWs) newWs.close();
        };
    }, [coin, byDate]);

    useEffect(() => {
        chartsService.getCoinData(coin, byDate).then((res) => {
            setCoinData(res)
            console.log(res);
        });
        
    }, [coin, byDate]);

    useEffect(() => {
        chartsService.getCoinsTrades().then((res) => setPairs(res));
    }, [])


    async function sendDataToChatGPT(data: any) {
        if (data.query === "") return;
        resetField('query')
        setChatResponse('');
        setLoader(true);
        const newData = {
            coin: coin,
            query: data.query,
            history: coinData.prices.slice(-90),
            dataByCandleTime: byDate
        };        
        tradesService.sendTradesHistoryAndQuery(newData)
            .then((res) => {
                setChatResponse(res);
                setLoader(false);
            });
    }




    return (
        <div className="Home">
            <div className="ChartsDiv">
                {coin && coinData ?
                    <Chart data={coinData} type={type} byDate={byDate} setByDate={setByDate}/>
                    : <></>
                }
            </div>
            <div className="ChartsFiltersAndCoins">
                <div className="ChartsFiltersAndCoinsPairs">
                    <h3>Pairs</h3>
                    <select onChange={(e: any) => setCoin(e.target.value)}>
                        {pairs?.map((pair: any) => <option value={pair}>{pair}</option>)}
                    </select>
                    <h3>Chat: </h3>
                    <div className="ChartsFiltersAndCoinsChatGPT">
                        <div className="ChartsFiltersAndCoinsChatGPTResponse">
                            {

                                loader ?
                                    <p>loading...</p>
                                    :
                                    chatResponse ?
                                        <span>
                                            {chatResponse}
                                        </span>
                                        : <div className="noChat">
                                            Ask chatGPT...
                                        </div>
                            }
                        </div>
                        <form onSubmit={handleSubmit(sendDataToChatGPT)}>
                            <input type="text" {...register('query')} />
                            <button>Send</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;



 // const [rsiPeriod, setRsiPeriod] = useState(14);

    // useEffect(() => {
    //     const fetchRsiData = async () => {
    //         try {
    //             const response = await fetch(`https://api.taapi.io/rsi?secret=${}&exchange=binance&symbol=${coin}&interval=1h`);
    //             const responseData = await response.json();
    //             console.log(responseData);

    //             setRsiPeriod(responseData.value)
                

    //         } catch (error) {
    //             console.error('Error fetching RSI data:', error);
    //         }
    //     };

    //     fetchRsiData();
    // }, [byDate, rsiPeriod]);