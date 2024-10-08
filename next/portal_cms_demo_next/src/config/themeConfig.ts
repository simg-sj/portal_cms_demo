import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.svg'



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
    plugins: {
        tooltip: {
            enabled: false,
        },
    },
    cutout: '75%',
};

export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const availableThemes = Object.keys(themeConfigs);