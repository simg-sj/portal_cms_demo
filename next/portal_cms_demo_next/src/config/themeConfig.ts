import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.png'
import {StaticImageData} from "next/image";


interface Theme {
    logoSrc: StaticImageData;
    menuItems: {
        //메뉴 추가시 해당 타입 추가
        dashboard?: string;
        accidentAccept?: string;
        accidentList?: string;
        parkingList?: string;
        insuManager?: string;
        mypage?: string;
    };
}

interface ThemeConfig {
    [key: string]: Theme;
}

//메뉴추가시 업체명, 링크 추가
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
    turu: {
        logoSrc: HiparkingLogo,
        menuItems: {
            accidentAccept: "/turu",
            accidentList: "/turu/accidentList",
            mypage: "/turu/mypage",
        },
    },
    kmpark: {
        logoSrc: KmparkLogo,
        menuItems: {
            dashboard: "/kmpark",
            accidentList: "/kmpark/accidentList",
            parkingList: "/kmpark/parkingList",
            mypage: "/kmpark/mypage",
            insuManager: "/kmpark/insuManager"
        },
    },
};


export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const availableThemes = Object.keys(themeConfigs);
