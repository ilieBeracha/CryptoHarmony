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

    useEffect(() => {
        chartsService.getCoinData(coin, byDate).then((res) => setCoinData(res));
    }, [coin, byDate]);

    useEffect(() => {
        chartsService.getCoinsTrades().then((res) => setPairs(res));
    }, [])

    return (
        <div className="Home">
            <div className="ChartsDiv">
                {
                    coin && coinData ?
                        <Chart data={coinData} type={type} byDate={byDate} setByDate={setByDate} />
                        : <></>
                }
            </div>
            <div className="ChartsFiltersAndCoins">
                <div className="ChartsFiltersAndCoinsPairs">
                    <h3>Pairs</h3>
                    <select onChange={(e: any) => setCoin(e.target.value)}>
                        {
                            pairs?.map((pair: any) => <option value={pair}>{pair}</option>)
                        }
                    </select>
                    <h3>Time</h3>
                    <select defaultValue={byDate} onChange={(e) => setByDate(e.target.value)}>
                        <option value="1m">1m</option>
                        <option value="3m">3m</option>
                        <option value="5m">5m</option>
                        <option value="30m">30m</option>
                        <option value="1h">1h</option>
                        <option value="2h">2h</option>
                        <option value="4h">4h</option>
                        <option value="6h">6h</option>
                        <option value="8h">8h</option>
                        <option value="12h">12h</option>
                        <option value="1d">1d</option>
                        <option value="3d">3d</option>
                        <option value="1w">1w</option>
                        <option value="1m">1m</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Home;
