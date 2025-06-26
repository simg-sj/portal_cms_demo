import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ChartOptions,
    Chart,
} from 'chart.js';
import Image from "next/image";
import Error from '@/assets/images/icon/error-icon.png';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface ChartData {
    labels: string[];
    values: number[];
    color: string;
}

interface BarHorizonChartProps {
    data: ChartData;
    options?: ChartOptions<'bar'>;
}

const BarHorizonChart = ({ data, options }: BarHorizonChartProps) => {
    const [categoryPercentage, setCategoryPercentage] = useState(0.6);
    const [fontSize, setFontSize] = useState(15);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCategoryPercentage(0.3);
                setFontSize(11);
            } else if (width < 1024) {
                setCategoryPercentage(0.45);
                setFontSize(13);
            } else {
                setCategoryPercentage(0.6);
                setFontSize(15);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!data || !data.values || data.values.length === 0 || data.values.every(value => value === 0)) {
        return (
          <div className="flex items-center justify-center my-[150px]">
              <Image src={Error.src} alt="에러" width={30} height={30} className="mr-5" />
              <div className="text-gray-700 text-lg">데이터가 없습니다.</div>
          </div>
        );
    }

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: data.color,
                categoryPercentage: categoryPercentage,
                barPercentage: 0.6,
            },
        ],
    };

    const plugins = [{
        id: 'valueLabels',
        afterDraw: (chart: Chart<'bar'>) => {
            const ctx = chart.ctx;
            const dataset = chart.data.datasets[0];
            if (!dataset) return;

            dataset.data.forEach((value: number | [number, number] | null, index: number) => {
                if (typeof value === 'number') {
                    const meta = chart.getDatasetMeta(0);
                    const y = meta.data[index].y;
                    ctx.fillStyle = 'black';
                    ctx.font = `${fontSize}px sans-serif`;
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(value.toLocaleString(), meta.data[index].x + 10, y);
                }
            });
        },
    }];

    const defaultOptions: ChartOptions<'bar'> = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: { display: false },
                ticks: { display: false },
            },
            y: {
                grid: { display: false },
                ticks: {
                    font: {
                        size: fontSize,
                    },
                },
            },
        },
        layout: {
            padding: {
                right: 100,
            },
        },
    };

    const mergedOptions = { ...defaultOptions, ...options };

    return <Bar data={chartData} options={mergedOptions} plugins={plugins} />;
};

export default BarHorizonChart;
