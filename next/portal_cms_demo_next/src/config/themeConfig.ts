import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.svg'
import {changeCounselData} from "@/config/data";
import {StaticImageData} from "next/image";
import {TooltipItem } from 'chart.js';
<<<<<<< HEAD
import {Context} from "chartjs-plugin-datalabels";
=======
>>>>>>> main


interface Theme {
    logoSrc: StaticImageData;
    menuItems: {
        dashboard?: string;
        list?: string;
        mypage?: string;
    };
}

interface ThemeConfig {
    [key: string]: Theme;
}

const themeConfigs: ThemeConfig = {
    hiparking: {
        logoSrc: HiparkingLogo,
        menuItems: {
            dashboard: "/hiparking",
            list: "/hiparking/list",
            mypage: "/hiparking/mypage",
        },
    },
    simg: {
        logoSrc: SimgLogo,
        menuItems: {
            list: "/simg/list",
            mypage: "/simg/mypage",
        },
    },
    kmpark: {
        logoSrc: KmparkLogo,
        menuItems: {
            dashboard: "/hiparking",
            list: "/kmpark/list",
            mypage: "/kmpark/mypage",
        },
    },
};

<<<<<<< HEAD

export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const availableThemes = Object.keys(themeConfigs);

//그래프옵션
export const optionHiparkingTwowayBar = {
=======
export const optionTwowayBar = {
>>>>>>> main
    responsive: true,
    scales: {
        x: {
            stacked: true
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 5,
            },
            grid: {
                display: false,
            },
        },
    },
    plugins: {
        legend: {
            display: true,
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
            callbacks: {
                label: (context: TooltipItem<'bar'>) => {
                    const dataIndex = context.dataIndex;
                    const datasetIndex = context.datasetIndex;
                    if (datasetIndex === 0) {
                        return [
                            `추가 사업장: ${changeCounselData[dataIndex].pAdd}`,
                            `추가 보험금: ${changeCounselData[dataIndex].AddAmt.toLocaleString()} 원`,
                        ];
                    } else {
                        return [
                            `종료 사업장: ${changeCounselData[dataIndex].pEnd}`,
                            `감소 보험금: ${changeCounselData[dataIndex].EndAmt.toLocaleString()} 원`,
                        ];
                    }
                },
            },
        },
    },
};

<<<<<<< HEAD
export const optionHiparkingBarHorizon = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
=======

export const optionDoughnut = {
    responsive: true,
    plugins: {
>>>>>>> main
        tooltip: {
            enabled: false,
        },
    },
<<<<<<< HEAD
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 15,
                },
            },
        },
    },
    layout: {
        padding: {
            right: 60,
        },
    },
=======
    cutout: '75%',
};


export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
>>>>>>> main
};


export const optionHiparkingDoughnut = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: false,
        },
    },
    cutout: '75%',
};

export const optionHiparkingPie = {
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
            borderWidth: 1,
            borderColor: '#e7e7e7',
            bodyAlign: 'center',
            titleAlign: 'center',
            position: 'nearest',
            yAlign: 'bottom',
        },
        datalabels: {
            formatter: function (value: number, context: Context) {
                const dataset = context.chart.data.datasets[0];
                const total = dataset.data.reduce((acc: number, val: unknown) => acc + (typeof val === 'number' ? val : 0), 0);
                if (total === 0) return '0%';
                const percentage = ((value / total) * 100).toFixed(0) + "%";
                return percentage;
            },
            color: '#fff',
            anchor: 'center',
            align: 'center',
            font: {
                size: 15,
                weight: 'normal',
            },
        },
    },
    responsive: false,
};