import { useEffect, useState, useRef } from 'react';
import { CoinModel } from '../../models/CoinModel';
import { chartsService } from '../../service/chartsService';
import Chart from '../Chart/Chart';
import './WelcomeComponent.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
                <div className='WelcomeComponentTextPreview'>
                    <h1>Invest In The Future Of Currency</h1>
                    <p>Our platform offers state-of-the-art crypto graph analytics. Explore real-time data, chart patterns, and trends
                        to make informed decisions about your crypto investments.
                    </p>
                </div>
                <nav className='WelcomeComponentNav'>
                    <a href='#WelcomeComponentExample'>
                        Read more
                        <ArrowDownwardIcon fontSize='medium' />
                    </a>
                </nav>
            </div>
            <div id='WelcomeComponentExample' className="WelcomeComponentExample">
                {coinData ? <Chart data={coinData} type={type} byDate={byDate} setByDate={setByDate} /> : <></>}
            </div>
        </div>
    );
};

export default WelcomeComponent;
