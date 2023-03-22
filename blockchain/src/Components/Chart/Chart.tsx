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
        const chart = createChart(chartContainerRef.current, {
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

        let series: any;
        const fetchHistoricalData = async () => {
            try {

                if (graphType === 'price') {
                    if (graphTypePrice === "") {
                        series = chart.addAreaSeries({ title: 'Price', lineColor: 'orange', topColor: 'orange', baseLineColor: 'orange', bottomColor: 'white' });
                        const priceData: any = data.prices.map((price: [number, number]) => ({
                            time: price[0] / 1000,
                            value: Number(price[1])
                        }));
                        series.setData(priceData);
                    }
                    if (graphTypePrice === 'candle') {
                        series = chart.addLineSeries({ title: 'Market Cap', color: 'blue' });
                        const candleData: any = data.prices.map((price: any) => ({
                            time: price[0] / 1000,
                            open: Number(price[1]),
                            high: Number(price[2]),
                            low: Number(price[3]),
                            close: Number(price[4]),
                        }));


                        series = chart.addCandlestickSeries({
                            upColor: "#00ff00",
                            downColor: "#ff0000",
                            borderVisible: false,
                            // title: 'Current price'
                        });
                        series.setData(candleData);
                    }

                } else if (graphType === 'market') {
                    series = chart.addLineSeries({ title: 'Market Cap', color: 'blue' });
                    const marketCapData: any = data.market_caps.map((marketCap: [number, number]) => ({
                        time: marketCap[0] / 1000,
                        value: Number(marketCap[1])
                    }));
                    series.setData(marketCapData);

                } else if (graphType === 'volume') {
                    series = chart.addLineSeries({ title: 'Total Volume', color: 'green' });
                    const totalVolumeData: any = data.total_volumes.map((volume: [number, number]) => ({
                        time: volume[0] / 1000,
                        value: Number(volume[1])
                    }));
                    series.setData(totalVolumeData);

                } else {
                    return;
                }

            } catch (error) {
                console.error('Error fetching historical data:', error);
            }

        };

        fetchHistoricalData();

        return () => {
            chart.removeSeries(series);
            if (chartContainerRef.current === null) return;

            chartContainerRef.current.innerHTML = '';
        };


    }, [graphType, byDate, graphTypePrice, data]);


    return (
        <div className="ChartComponent">
            <div className='ChartComponentFilters'>
                <Box sx={{ width: 200 }}>
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
                </Box>


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
