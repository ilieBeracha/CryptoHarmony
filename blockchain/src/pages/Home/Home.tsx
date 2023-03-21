import "./Home.css";
import { useEffect, useState } from 'react'
import { chartsService } from "../../service/chartsService";
import { CoinModel } from "../../models/CoinModel";
import Chart from "../../Components/Chart/Chart";

function Home(): JSX.Element {
    const [coinData, setCoinData] = useState<CoinModel | any>();
    const [coin, setCoin] = useState<string>('BTCUSDT');
    const [type, setType] = useState<string>('price');
    const [byDate, setByDate] = useState<string>('15m');

    useEffect(() => {
        chartsService.getCoinData(coin, byDate).then((res) => setCoinData(res));
    }, [byDate, coin]);


    return (
        <div className="Home">
            <div className="ChartsDiv">
                {
                    coinData ?
                        <Chart data={coinData} type={type} byDate={byDate} setByDate={setByDate} />
                        : <></>
                }

            </div>

            <div className="ChartsFiltersAndCoins">


            </div>
        </div>
    );
}

export default Home;
