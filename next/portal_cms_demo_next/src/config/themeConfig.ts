import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.png'
import {StaticImageData} from "next/image";


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
            dashboard: "/kmpark",
            list: "/kmpark/list",
            mypage: "/kmpark/mypage",
        },
    },
};


export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const availableThemes = Object.keys(themeConfigs);
