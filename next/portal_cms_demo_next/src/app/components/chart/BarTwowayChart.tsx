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


interface BarTwowayChartProps {
    data: ChartData<'bar'>;
    options?: ChartOptions<'bar'>;
}

const BarTwowayChart = ({data, options}: BarTwowayChartProps) => {
    if (!data) {
        console.error("data prop is required.");
        return(
            <div className={'flex items-centers justify-center my-[150px]'}>
                <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                <div className={'text-gray-700 text-lg'}>데이터를 불러올 수 없습니다.</div>
            </div>
        )
    }

    return <Bar options={options} data={data}/>;
};

export default BarTwowayChart;