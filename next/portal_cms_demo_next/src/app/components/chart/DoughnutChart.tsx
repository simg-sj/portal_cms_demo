import { Doughnut } from 'react-chartjs-2';
<<<<<<< HEAD
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData} from 'chart.js';
=======
import { Chart as ChartJS, ArcElement, Tooltip, Legend,ChartData, ChartOptions } from 'chart.js';
>>>>>>> main

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
    data: ChartData<'doughnut'>;
    options?: ChartOptions<'doughnut'>;
}

const DoughnutChart = ({ data, options }: DoughnutChartProps) => {
    return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;