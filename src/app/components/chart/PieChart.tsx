import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, ChartOptions, ChartData, Plugin } from "chart.js";
import ChartDataLabels, {Context} from 'chartjs-plugin-datalabels';
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";

ChartJS.register(ArcElement);

interface PieChartProps {
    data: ChartData<'pie'>;
    options?: ChartOptions<'pie'>;
}

function PieChart({ data, options }: PieChartProps) {
    if (!data) {
        console.error("data prop is required.");
        return(
            <div className={'flex items-centers justify-center my-[150px]'}>
                <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
            </div>
        )
    }

    const defaultOptions: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: 'black',
                bodyColor: 'black',
                borderWidth: 1,
                borderColor: '#e7e7e7',
                bodyAlign: 'center',
                titleAlign: 'center',
                position: 'nearest',
                yAlign: 'bottom',
            },
            datalabels: {
                formatter: function (value: number, context: Context) {
                    const dataset = context.chart.data.datasets[0];
                    const total = dataset.data.reduce((acc: number, val: unknown) => acc + (typeof val === 'number' ? val : 0), 0);
                    if (total === 0) return '0%';
                    const percentage = ((value / total) * 100).toFixed(0) + "%";
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
    }

    const mergedOptions = {...defaultOptions, ...options};

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
                options={mergedOptions}
                plugins={[ChartDataLabels as Plugin<"pie">]}
                width={180}
                height={220}
            />
        </div>
    );
}

export default PieChart;
