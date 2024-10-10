import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.svg'
import {changeCounselData} from "@/config/data";



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


export const optionDoughnut = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: false,
        },
    },
    cutout: '75%',
};

export const optionTwowayBar = {
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
            position: 'left',
            align: 'start',
        },
        tooltip: {
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
            borderWidth: '1',
            borderColor: '#e7e7e7',
            bodyAlign: 'center' as const,
            titleAlign: 'center' as const,
            position: 'average' as const,
            yAlign: 'bottom' as const,
            callbacks: {
                label: (context: any) => {
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

export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const availableThemes = Object.keys(themeConfigs);