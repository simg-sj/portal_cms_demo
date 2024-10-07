import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// options 타입을 정의합니다.
interface DoughnutChartProps {
    data: any;
    options?: ChartOptions<'doughnut'>;
}

const DoughnutChart = ({ data, options }: DoughnutChartProps) => {
    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;