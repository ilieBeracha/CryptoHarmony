import { useEffect, useRef, useState } from 'react';
import './Chart.css';
import { createChart } from 'lightweight-charts';
import { CoinModel } from '../../models/CoinModel';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function Chart({ data, type, byDate, setByDate }: { data: any, type: string, byDate: string, setByDate: any }): JSX.Element {
    const chartContainerRef: any = useRef<HTMLDivElement>(null);
    const [graphType, setGraphType] = useState(type);
    const [chartSize, setChartSize] = useState({ width: window.innerWidth * 0.8, height: window.innerHeight * 0.92 });
    const [graphTypePrice, setGraphTypePrice] = useState('candle');
    const chartInstance = useRef<any>(null);
    const series = useRef<any>(null);


    const updateChartSize = () => {
        setChartSize({
            width: window.innerWidth * 0.3,
            height: window.innerHeight * 0.5,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', updateChartSize);

        return () => {
            window.removeEventListener('resize', updateChartSize);
        };
    }, []);


    useEffect(() => {
        if (!chartContainerRef.current) return;
        chartInstance.current = createChart(chartContainerRef.current, {
            width: chartSize.width,
            height: chartSize.height,
            layout: {
                background: {
                    color: '#F9F7F7',
                },
            },
            grid: {
                vertLines: {
                    visible: false
                },
                horzLines: {
                    visible: true
                }
            },

        });


        const fetchHistoricalData = async () => {
            try {
                series.current = chartInstance.current.addLineSeries({ title: 'Market Cap', color: 'blue' });
                const candleData: any = data.prices.map((price: any) => ({
                    time: price[0] / 1000,
                    open: Number(price[1]),
                    high: Number(price[2]),
                    low: Number(price[3]),
                    close: Number(price[4]),
                }));


                series.current = chartInstance.current.addCandlestickSeries({
                    upColor: "#00ff00",
                    downColor: "#ff0000",
                    borderVisible: false,
                    lastValueVisible: true
                });
                series.current.setData(candleData);

            } catch (error) {
                console.error('Error fetching historical data:', error);
            }

        };

        fetchHistoricalData();

        return () => {
            chartInstance.current.removeSeries(series.current);
            if (chartContainerRef.current === null) return;

            chartContainerRef.current.innerHTML = '';
        };


    }, [graphType, byDate, graphTypePrice]);

    useEffect(() => {
        if (!chartInstance.current || !series.current) return;

        const candleData = data.prices.map((data: any) => ({
            time: data[0] / 1000,
            open: Number(data[1]),
            high: Number(data[2]),
            low: Number(data[3]),
            close: Number(data[4]),
            volume: Number(data[5])
        }));
        series.current.setData(candleData);
    }, [data])


    return (
        <div className="ChartComponent">
            <div className='ChartComponentFilters'>
                {/* <Box sx={{ width: 200 }}>
                    <BottomNavigation
                        showLabels
                        className='filtersMui'
                        value={graphTypePrice}
                        onChange={(event, newValue) => {
                            setGraphTypePrice(newValue);
                        }}
                    >
                        <BottomNavigationAction value={'candle'} label="candle" icon={<CandlestickChartIcon />} />
                        <BottomNavigationAction value={''} label="Line" icon={<ShowChartIcon />} />
                    </BottomNavigation>
                </Box> */}


                <select defaultValue={byDate} onChange={(e) => setByDate(e.target.value)}>
                    <option value="1m">1m</option>
                    <option value="3m">3m</option>
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
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
            <div className='Chart' ref={chartContainerRef}></div>
        </div >
    );
}

export default Chart;
