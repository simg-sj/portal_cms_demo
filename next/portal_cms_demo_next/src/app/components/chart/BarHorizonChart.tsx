import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface ChartData {
    labels: string[];
    values: number[];
}

interface BarHorizonChartProps {
    data: ChartData;
    bgClass : string;
}

const BarHorizonChart = ({ data, bgClass }: BarHorizonChartProps) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: bgClass,
            },
        ],
    };

    const barHorizonOption = {
        indexAxis: 'y' as const,
        responsive: true,
        datasets: [{
            barThickness: 30,
            categoryPercentage: 0.5,
        }],
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 15,
                    },
                },
            },
        },
        layout: {
            padding: {
                right: 60,
            },
        },
    };

    const plugins = [{
        id: 'valueLabels',
        afterDraw: (chart: ChartJS) => {
            const ctx = chart.ctx;
            chart.data.datasets[0].data.forEach((value: number, index: number) => {
                const meta = chart.getDatasetMeta(0);
                const y = meta.data[index].y;
                ctx.fillStyle = 'black';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'middle';
                ctx.fillText(value.toLocaleString(), meta.data[index].x + 10, y);
            });
        },
    }];

    return <Bar data={chartData} options={barHorizonOption} plugins={plugins} />;
};

export default BarHorizonChart;