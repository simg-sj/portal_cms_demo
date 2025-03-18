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

const BarChart = ({data, options, height = 400}: BarChartProps) => {
    if (!data) {
        console.error("data prop is required.");
        return(
            <div className={'flex items-center justify-center my-[150px]'}>
                <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
            </div>
        )
    }

    // Default options for a standard upward bar chart
    const defaultOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,  // 가로 세로 비율 설정
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 8  // y축 눈금 최대 개수 제한
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
                position: 'top' as const,
            },
        },
        layout: {
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            }
        }
    };

    // Merge provided options with defaults
    const mergedOptions = {...defaultOptions, ...options};

    return (
        <div style={{ height: `${height}px`, width: '100%' }}>
            <Bar options={mergedOptions} data={data} />
        </div>
    );
};

export default BarChart;