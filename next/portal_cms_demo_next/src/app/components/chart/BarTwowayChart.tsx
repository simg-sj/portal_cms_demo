import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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

interface DataPoint {
    cDay: string;
    pAdd: number;
    AddAmt: number;
    pEnd: number;
    EndAmt: number;
}

interface BidirectionalChartProps {
    data: DataPoint[];
}

const BarTwowayChart: React.FC<BidirectionalChartProps> = ({ data }) => {
    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: 'black',
                bodyColor: 'black',
                borderWidth: '1',
                borderColor: '#e7e7e7',
                bodyAlign: 'center' as const,
                titleAlign: 'center' as const,
                position: 'average' as const,
                yAlign: 'bottom' as const,
                callbacks: {
                    label: (context: any) => {
                        const dataIndex = context.dataIndex;
                        const datasetIndex = context.datasetIndex;
                        if (datasetIndex === 0) {
                            return [
                                `추가 사업장: ${data[dataIndex].pAdd}`,
                                `추가 보험금: ${data[dataIndex].AddAmt.toLocaleString()} 원`,
                            ];
                        } else {
                            return [
                                `종료 사업장: ${data[dataIndex].pEnd}`,
                                `감소 보험금: ${data[dataIndex].EndAmt.toLocaleString()} 원`,
                            ];
                        }
                    },
                },
            },
        },
    };

    const chartData = {
        labels: data.map((d) => d.cDay),
        datasets: [
            {
                label: '추가',
                data: data.map((d) => d.pAdd),
                backgroundColor: '#fdae68',
            },
            {
                label: '종료',
                data: data.map((d) => -d.pEnd),
                backgroundColor: '#fcd174',
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};

export default BarTwowayChart;