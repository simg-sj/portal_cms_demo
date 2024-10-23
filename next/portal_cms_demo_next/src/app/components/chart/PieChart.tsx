import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, ChartOptions, ChartData, Plugin } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement);

interface PieChartProps {
    data: ChartData<'pie'>;
    options?: ChartOptions<'pie'>;
}

function PieChart({ data, options }: PieChartProps) {
    return (
        <div className={'flex justify-between w-full'}>
            <div className={'flex flex-col justify-center mt-16'}>
                <div className={'mb-5'}>
                    {data.labels && data.labels.map((label, index) => (
                        <div key={index} style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{backgroundColor: Array.isArray(data.datasets[0].backgroundColor)
                                    ? data.datasets[0].backgroundColor[index]
                                    : undefined}}
                                 className={'w-5 h-5 mr-2'}/>
                            <span className={'text-gray-600'}>{String(label)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Pie
                data={data}
                options={options}
                plugins={[ChartDataLabels as Plugin<"pie">]}
                width={180}
                height={220}
            />
        </div>
    );
}

export default PieChart;