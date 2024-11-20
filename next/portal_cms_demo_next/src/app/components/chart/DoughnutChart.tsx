import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData} from 'chart.js';
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    data: ChartData<'doughnut'>;
    options?: ChartOptions<'doughnut'>;
}

const DoughnutChart = ({ data, options }: DoughnutChartProps) => {
    if (!data) {
        console.error("data prop is required.");
        return <div>데이터를 불러올 수 없습니다.</div>;
    }
    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;