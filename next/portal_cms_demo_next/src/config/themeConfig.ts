import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.png'
import {StaticImageData} from "next/image";


interface Theme {
    logoSrc: StaticImageData;
    menuItems: {
        dashboard?: string;
        accidentList?: string;
        parkingList?: string;
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
            accidentList: "/hiparking/accidentList",
            parkingList: "/hiparking/parkingList",
            mypage: "/hiparking/mypage",
        },
    },
    simg: {
        logoSrc: SimgLogo,
        menuItems: {
            accidentList: "/simg/accidentList",
            parkingList: "/simg/parkingList",
            mypage: "/simg/mypage",
        },
    },
    kmpark: {
        logoSrc: KmparkLogo,
        menuItems: {
            dashboard: "/kmpark",
            accidentList: "/kmpark/accidentList",
            parkingList: "/kmpark/parkingList",
            mypage: "/kmpark/mypage",
        },
    },
};


export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const availableThemes = Object.keys(themeConfigs);
