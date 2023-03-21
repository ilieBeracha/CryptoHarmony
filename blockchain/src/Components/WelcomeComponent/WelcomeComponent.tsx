import { useEffect, useState, useRef } from 'react';
import { CoinModel } from '../../models/CoinModel';
import { chartsService } from '../../service/chartsService';
import ChartPreview from '../ChartPreview/ChartPreview';
import './WelcomeComponent.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const WelcomeComponent = () => {
    const [coinData, setCoinData] = useState<CoinModel>();
    const [coin, setCoin] = useState<string>('BTCUSDT');
    const [type, setType] = useState<string>('price');
    const [byDate, setByDate] = useState<string>('15m');
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
                {coinData ?
                    <ChartPreview data={coinData} type={type} byDate={byDate} setByDate={setByDate} />
                    : <></>}
            </div>
        </div>
    );
};

export default WelcomeComponent;
