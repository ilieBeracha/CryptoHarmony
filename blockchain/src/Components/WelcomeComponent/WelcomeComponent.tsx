import { useEffect, useState } from 'react';
import { CoinModel } from '../../models/CoinModel';
import { chartsService } from '../../service/chartsService';
import Chart from '../Chart/Chart';
import './WelcomeComponent.css';

const WelcomeComponent = () => {
    const [coinData, setCoinData] = useState<CoinModel>();

    useEffect(() => {
        chartsService.getCoinData('bitcoin', 'us', 7, 'hourly').then((res) => setCoinData(res))
    }, [])

    return (
        <div className="WelcomeComponent">
            <div className='WelcomeComponentText'>
                <p>
                    Our platform offers state-of-the-art crypto graph analytics. Explore
                    real-time data, chart patterns, and trends to make informed decisions about your crypto
                    investments.
                </p>
            </div>
            <div className='WelcomeComponentExample'>
                {
                    coinData ?

                        <Chart data={coinData} type={'price'} />
                        :
                        <></>
                }
            </div>
        </div>
    );
};

export default WelcomeComponent;
