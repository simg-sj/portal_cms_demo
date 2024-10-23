import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, ChartOptions, Chart} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface ChartData {
    labels: string[];
    values: number[];
    color: string;
}

interface BarHorizonChartProps {
    data: ChartData;
<<<<<<< HEAD
    options?: ChartOptions<'bar'>;
}


const BarHorizonChart = ({data, options}: BarHorizonChartProps) => {
=======
    bgClass : string;
}

const BarHorizonChart = ({ data, bgClass }: BarHorizonChartProps) => {
>>>>>>> main
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
<<<<<<< HEAD
                backgroundColor: data.color,
                barThickness: 30,
                categoryPercentage: 0.5,
=======
                backgroundColor: bgClass,
>>>>>>> main
            },
        ],
    };

    const plugins = [{
        id: 'valueLabels',
<<<<<<< HEAD
        afterDraw: (chart: Chart<'bar'>) => {
=======
        afterDraw: (chart: ChartJS) => {
>>>>>>> main
            const ctx = chart.ctx;
            const dataset = chart.data.datasets[0];
            if (!dataset) return;

            dataset.data.forEach((value: number | [number, number] | null, index: number) => {
                if (typeof value === 'number') {
                    const meta = chart.getDatasetMeta(0);
                    const y = meta.data[index].y;
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(value.toLocaleString(), meta.data[index].x + 10, y);
                }
            });
        },
    }];


    return <Bar data={chartData} options={options} plugins={plugins}/>;
};

export default BarHorizonChart;