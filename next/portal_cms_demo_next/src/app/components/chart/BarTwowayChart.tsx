import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartOptions, ChartData,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface BarTwowayChartProps {
    data: ChartData<'bar'>;
    options?: ChartOptions<'bar'>;
}

const BarTwowayChart = ({data, options}: BarTwowayChartProps) => {
    if (!data) {
        console.error("data prop is required.");
        return <div>데이터를 불러올 수 없습니다.</div>;
    }
    return <Bar options={options} data={data}/>;
};

export default BarTwowayChart;