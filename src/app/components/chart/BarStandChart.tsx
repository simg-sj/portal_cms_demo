import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartOptions, ChartData, TooltipItem,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    data: ChartData<'bar'>;
    options?: ChartOptions<'bar'>;
    height?: number;
}

const BarChart = ({data, options, height=350}: BarChartProps) => {
    if (!data) {
        console.error("data prop is required.");
        return(
            <div className={'flex items-center justify-center my-[150px]'}>
                <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
            </div>
        )
    }

    const defaultOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 10  // y축 눈금 최대 개수 제한
                },
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'left',
                align: 'end'
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: 'black',
                bodyColor: 'black',
                borderWidth: 1,
                borderColor: '#e7e7e7',
                bodyAlign: 'center' as const,
                titleAlign: 'center' as const,
                position: 'average' as const,
                yAlign: 'bottom' as const,

            },
        },
        layout: {
            padding: {
                top: 20,
                right: 10,
                bottom: 10,
                left: 10
            }
        }
    };

    const mergedOptions = {...defaultOptions, ...options};

    return (
        <div className={'w-full'} style={{ height: `${height}px`}}>
            <Bar options={mergedOptions} data={data} />
        </div>
    );
};

export default BarChart;