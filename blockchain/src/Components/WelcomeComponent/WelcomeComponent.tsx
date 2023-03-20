import { useEffect, useState } from 'react';
import { CoinModel } from '../../models/CoinModel';
import { chartsService } from '../../service/chartsService';
import Chart from '../Chart/Chart';
import './WelcomeComponent.css';

const WelcomeComponent = () => {
    const [coinData, setCoinData] = useState<CoinModel>();
    const [coin, setCoin] = useState<string>('BTCUSDT');
    const [type, setType] = useState<string>('price');
    const [byDate, setByDate] = useState<string>('15m');

    useEffect(() => {
        chartsService.getCoinData(coin, byDate).then((res) => setCoinData(res));
    }, [byDate, coin]);

    return (
        <div className="WelcomeComponent">
            <div className="WelcomeComponentText">
                <p>
                    Our platform offers state-of-the-art crypto graph analytics. Explore real-time data, chart patterns, and trends
                    to make informed decisions about your crypto investments.
                </p>
                <button>Start learning</button>
            </div>
            <div className="WelcomeComponentExample">
                {coinData ? <Chart data={coinData} type={type} byDate={byDate} setByDate={setByDate} /> : <></>}
            </div>
            <hr />
        </div>
    );
};

export default WelcomeComponent;
