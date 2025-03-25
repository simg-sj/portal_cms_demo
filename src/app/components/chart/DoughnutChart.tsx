import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData} from 'chart.js';
import React from "react";
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    data: ChartData<'doughnut'>;
    options?: ChartOptions<'doughnut'>;
}

const DoughnutChart = ({ data, options }: DoughnutChartProps) => {
    if (!data) {
        console.error("data prop is required.");
        return(
            <div className={'flex items-centers justify-center my-[150px]'}>
                <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
            </div>
        )
    }

    const defaultOptions: ChartOptions<'doughnut'> = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
        },
        cutout: '75%',
    }

    const mergedOptions = {...defaultOptions, ...options};

    return <Doughnut data={data} options={mergedOptions} />;
};

export default DoughnutChart;