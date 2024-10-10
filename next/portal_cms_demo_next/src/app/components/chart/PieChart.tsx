import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement, ChartOptions} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement);

interface PieChartProps {
    data: any;
    options?: ChartOptions<'pie'>;
}

function PieChart({ data }: PieChartProps) {
    const options: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                formatter: (value: number, context: any) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(0) + '%';
                    return percentage;
                },
                color: '#fff',
                anchor: 'center',
                align: 'center',
                font: {
                    size: 15,
                    weight: 'normal',
                },
            },
        },
        responsive: false,
    };
    return (
        <div className={'flex justify-between w-full'}>
            <div className={'flex flex-col justify-center mt-16'}>
                <div className={'mb-5'}>
                    {data.labels.map((label: string, index: number) => (
                        <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{backgroundColor: data.datasets[0].backgroundColor[index]}}
                                 className={'w-5 h-5 mr-2'}/>
                            <span className={'text-gray-600'}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Pie
                data={data}
                options={options}
                plugins={[ChartDataLabels]}
                width={180}
                height={220}
            />
        </div>
    );
}

export default PieChart;