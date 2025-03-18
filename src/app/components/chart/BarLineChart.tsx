import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarLineChartProps {
    barData: number[];
    lineData1: number[];
    lineData2: number[];
    labels: string[];
    height?: number;
    barLabel?: string;
    line1Label?: string;
    line2Label?: string;
    options?: ChartOptions<'bar'>;
}

const BarLineChart = ({
                          barData,
                          lineData1,
                          lineData2,
                          labels,
                          height = 400,
                          barLabel = '손해율',
                          line1Label = '보험금',
                          line2Label = '보험료',
                          options
                      }: BarLineChartProps) => {
    if (!barData || !lineData1 || !lineData2 || !labels) {
        console.error("All data props are required.");
        return(
            <div className={'flex items-center justify-center my-[150px]'}>
                <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
            </div>
        )
    }

    const data: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                type: 'bar' as const,
                label: barLabel,
                data: barData,
                backgroundColor: '#ffd459',
                borderColor: '#ffd459',
                borderWidth: 1,
                order: 3, // 막대그래프를 가장 뒤에 표시
                yAxisID: 'y',
            },
            {
                type: 'line' as const,
                label: line1Label,
                data: lineData1,
                borderColor: '#3b1e1e',
                backgroundColor: '#3b1e1e',
                borderWidth: 2,
                pointBackgroundColor: '#3b1e1e',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                order: 1, // 첫 번째 선 그래프
                yAxisID: 'y1',
            },
            {
                type: 'line' as const,
                label: line2Label,
                data: lineData2,
                borderColor: '#a9a1a1',
                backgroundColor: '#a9a1a1',
                borderWidth: 2,
                pointBackgroundColor: '#a9a1a1',
                pointBorderColor: '#a9a1a1',
                pointRadius: 4,
                pointStyle: 'rect',
                pointHoverRadius: 6,
                fill: false,
                order: 2, // 두 번째 선 그래프
                yAxisID: 'y1',
            },
        ],
    };

    // 기본 옵션 설정
    const defaultOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'start' as const,
                labels: {
                    boxWidth: 15,
                    usePointStyle: true,
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                reverse: true, // x축을 반대로 표시 (이미지처럼 최신 날짜가 왼쪽에 오도록)
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                beginAtZero: true,
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    maxTicksLimit: 6,
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                beginAtZero: true,
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    maxTicksLimit: 6,
                }
            },
        },
    };

    // 사용자 지정 옵션과 기본 옵션 병합
    const mergedOptions = { ...defaultOptions, ...options };

    return (
        <div style={{ height: `${height}px`, width: '100%' }}>
            <Chart type='bar' options={mergedOptions} data={data} />
        </div>
    );
};

export default BarLineChart;