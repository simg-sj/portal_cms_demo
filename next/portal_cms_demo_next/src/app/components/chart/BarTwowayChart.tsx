import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, Chart, ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



interface BarTwowayChartProps {
    data: any;
    options?: ChartOptions<'bar'>;
}
const BarTwowayChart = ({ data, options }: BarTwowayChartProps) => {

    return <Bar options={options} data={data} />;
};

export default BarTwowayChart;