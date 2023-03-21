import { useEffect, useRef, useState } from 'react';
import './Chart.css';
import { createChart } from 'lightweight-charts';
import { CoinModel } from '../../models/CoinModel';

function Chart({ data, type, byDate, setByDate }: { data: CoinModel, type: string, byDate: string, setByDate: any }): JSX.Element {
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
        console.log(byDate);

        if (!chartContainerRef.current) return;
        const chart = createChart(chartContainerRef.current, { width: chartSize.width, height: chartSize.height });
        let series: any;
        const fetchHistoricalData = async () => {
            try {
                if (graphType === 'price') {
                //     if (graphTypePrice === "") {
                //         series = chart.addAreaSeries({ title: 'Price', lineColor: 'orange', topColor: 'orange', baseLineColor: 'orange', bottomColor: 'white' });
                //         const priceData: any = data.prices.map((price: [number, number]) => ({
                //             time: price[0] / 1000,
                //             value: Number(price[1])
                //         }));
                //         series.setData(priceData);
                //     }
                    // if (graphTypePrice === 'candle') {
                        series = chart.addLineSeries({ title: 'Market Cap', color: 'blue' });
                        const candleData: any = data.prices.map((price: any) => ({
                            time: price[0] / 1000,
                            open: Number(price[1]),
                            high: Number(price[2]),
                            low: Number(price[3]),
                            close: Number(price[4]),
                        }));
                        console.log(candleData);
                        
                        series = chart.addCandlestickSeries({
                            upColor: "#00ff00",
                            downColor: "#ff0000",
                            borderVisible: false,
                        });
                        series.setData(candleData);
                    // }

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


    }, [graphType, byDate, graphTypePrice]);


    return (
        <div className="ChartComponent">
            <div className='Chart' ref={chartContainerRef}></div>
        </div >
    );
}

export default Chart;
