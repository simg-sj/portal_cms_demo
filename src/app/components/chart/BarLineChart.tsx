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

interface ChartDataProps {
    barData: number[];
    lineData1: number[];
    lineData2: number[];
    labels: string[];
    barLabel?: string;
    line1Label?: string;
    line2Label?: string;
    configColor: {
        barColor1: string;
        lineColor1: string;
        lineColor2: string;
    }
}

interface BarLineChartProps {
    chartData: ChartDataProps;
    options?: ChartOptions<'bar'>;
    height?: number;
}

const BarLineChart = ({
                          chartData,
                          options,
                          height = 400,
                      }: BarLineChartProps) => {
    if (!chartData?.barData || !chartData?.lineData1 || !chartData?.lineData2 || !chartData?.labels) {
        console.error("모든 데이터 속성 없음 !");
        return (
            <div className={'flex items-center justify-center my-[150px]'}>
                <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
            </div>
        );
    }

    const { barData, lineData1, lineData2, labels, barLabel = '손해율', line1Label = '보험금', line2Label = '보험료', configColor } = chartData;


    // 기본 옵션 설정
    const defaultOptions: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 8,
                },
                grid: {
                    display: false,
                },
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
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'left',
                align: 'end',
            },
            tooltip: {
                mode: 'index',  // X축 기준으로 모든 데이터셋 표시
                intersect: false,  // 개별 요소에 마우스를 올리지 않아도 툴팁 표시
                backgroundColor: 'white',
                titleColor: 'black',
                bodyColor: 'black',
                borderWidth: 1,
                borderColor: '#e7e7e7',
                bodyAlign: 'center',
                titleAlign: 'center',
                position: 'average',
                yAlign: 'bottom',
                caretPadding: 50,  // 툴팁 데이터 포인트 간격 조정
            },
        },
        layout: {
            padding: {
                top: 50,
                right: 20,
                bottom: 20,
                left: 20,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                type: 'bar' as const,
                label: barLabel,
                data: barData,
                backgroundColor: configColor.barColor1, //막대색상
                borderColor: configColor.barColor1, //막대 테두리 (색상과 동일)
                borderWidth: 1,
                order: 3,
                yAxisID: 'y',
                barPercentage: 0.4,  // 개별 막대의 너비 줄이기
                categoryPercentage: 0.6,  // 한 카테고리 내 막대 비율 조정
            },
            {
                type: 'line' as const,
                label: line1Label,
                data: lineData1,
                borderColor: configColor.lineColor1, //선 색상1
                backgroundColor: configColor.lineColor1, //선 배경1
                borderWidth: 2,
                pointBackgroundColor: configColor.lineColor1, //선포인트 색상1
                pointBorderColor: configColor.lineColor1, //선포인트 테두리1
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                order: 1,
                yAxisID: 'y1',
            },
            {
                type: 'line' as const,
                label: line2Label,
                data: lineData2,
                borderColor: configColor.lineColor2, //선 색상2
                backgroundColor: configColor.lineColor2, //선 배경2
                borderWidth: 2,
                pointBackgroundColor: configColor.lineColor2, //선포인트 색상2
                pointBorderColor: configColor.lineColor2, //선포인트 테두리2
                pointRadius: 4,
                pointStyle: 'rect',
                pointHoverRadius: 6,
                fill: false,
                order: 2,
                yAxisID: 'y1',
            },
        ],
    };

    const mergedOptions = { ...defaultOptions, ...options };

    return (
        <div className={'w-full'} style={{ height: `${height}px`}}>
            <Chart type='bar' options={mergedOptions} data={data} />
        </div>
    );
};

export default BarLineChart;