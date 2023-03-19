import { useEffect, useState } from 'react';
import { CoinModel } from '../../models/CoinModel';
import { chartsService } from '../../service/chartsService';
import Chart from '../Chart/Chart';
import './WelcomeComponent.css';
// import io from 'socket.io-client';

// const socket = io('https://stream.binance.com:9443/ws/btcusdt@ticker');

const WelcomeComponent = () => {
    const [coinData, setCoinData] = useState<CoinModel>();
    const [coin, setCoin] = useState<string>('bitcoin');
    const [currency, setCurrency] = useState<string>('us');
    const [type, setType] = useState<string>('price');

    useEffect(() => {
        chartsService.getCoinData(coin, currency, 'minute').then((res) => setCoinData(res));
        // socket.on('connect', () => {
        //   console.log('Connected to WebSocket');
        // });
        // socket.on('disconnect', () => {
        //   console.log('Disconnected from WebSocket');
        // });
        // socket.on('ticker', (data) => {
        //   console.log('Received ticker data:', data);
        // });
    }, [])

    return (
        <div className="WelcomeComponent">
            <div className='WelcomeComponentText'>
                <p>
                    Our platform offers state-of-the-art crypto graph analytics. Explore
                    real-time data, chart patterns, and trends to make informed decisions about your crypto
                    investments.
                </p>
                <button>Start learning</button>
            </div>
            <div className='WelcomeComponentExample'>
                {
                    coinData ?

                        <Chart data={coinData} type={type} />
                        :
                        <></>
                }
            </div>
        </div>
    );
};

export default WelcomeComponent;
