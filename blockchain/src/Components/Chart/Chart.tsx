import React, { useEffect, useRef, useState } from 'react';
import './Chart.css';
import { createChart } from 'lightweight-charts';
import { CoinModel } from '../../models/CoinModel';
import { chartsService } from '../../service/chartsService';

function Chart({ data, type }: { data: CoinModel, type: string }): JSX.Element {
    const chartContainerRef: any = useRef<HTMLDivElement>(null);
    const [graphType, setGraphType] = useState(type);

    useEffect(() => {
        if (!chartContainerRef.current) return;
        const chart = createChart(chartContainerRef.current, { width: 800, height: 400 });
        let series: any;
        const fetchHistoricalData = async () => {
            try {
                if (graphType === 'price') {
                    series = chart.addAreaSeries({ title: 'Price', lineColor: 'orange', topColor: 'orange', baseLineColor: 'orange', bottomColor: 'white' });
                    const priceData: any = data.prices.map((price: [number, number]) => ({
                        time: price[0] / 1000,
                        value: price[1],
                    }));
                    series.setData(priceData);

                } else if (graphType === 'market') {
                    series = chart.addLineSeries({ title: 'Market Cap', color: 'blue' });
                    const marketCapData: any = data.market_caps.map((marketCap: [number, number]) => ({
                        time: marketCap[0] / 1000,
                        value: marketCap[1],
                    }));
                    series.setData(marketCapData);

                } else if (graphType === 'volume') {
                    series = chart.addLineSeries({ title: 'Total Volume', color: 'green' });
                    const totalVolumeData: any = data.total_volumes.map((volume: [number, number]) => ({
                        time: volume[0] / 1000,
                        value: volume[1],
                    }));
                    series.setData(totalVolumeData);
                } else {
                    return
                }

            } catch (error) {
                console.error('Error fetching historical data:', error);
            }
        };

        fetchHistoricalData();

        return () => {
            chart.removeSeries(series);
            chartContainerRef.current.innerHTML = '';
        };

    }, [graphType]);


    return (
        <div className="Chart">
            <div className='ChartFilters'>
                <select onChange={(e) => setGraphType(e.target.value)}>
                    <option value="price">Price</option>
                    <option value="market">Market cap</option>
                    <option value="volume">Volume</option>
                </select>
            </div>
            <div ref={chartContainerRef}></div>
        </div>
    );
}

export default Chart;
