import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.png'
import StarPickerLogo from '@/assets/images/logo/별따러가자-logo-white.png';
import DashboardIcon from "@/assets/images/icon/dashboard-icon.png";
import AccidentIcon from "@/assets/images/icon/accident-icon.png";
import MotocycleIcon from "@/assets/images/icon/motocycle.png";
import ListIcon from "@/assets/images/icon/list-icon.png";
import UserIcon from "@/assets/images/icon/user-icon.png";
import CarIcon from "@/assets/images/icon/parking-icon.png";
import ScheduleIcon from "@/assets/images/icon/schedule-icon.png";
import {Theme, ThemeConfig} from "@/@types/common";


//메뉴추가시 업체명, 링크 추가
const themeConfigs: ThemeConfig = {
    hiparking: {
        logoSrc: HiparkingLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/hiparking", authLevel : 1},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/hiparking/accidentList", authLevel : 1},
            {title: "parkingList", icon: CarIcon, label: "사업장관리", link: "/hiparking/parkingList", authLevel : 1},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/hiparking/mypage", authLevel : 1}
        ]
    },
    simg: {
        logoSrc: SimgLogo,
        menuItems: [
            {title: "main", icon: AccidentIcon, label: "사고접수", link: "/simg", authLevel : 1},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/simg/accidentList", authLevel : 1},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/simg/mypage", authLevel : 1}
        ]
    },
    turu: {
        logoSrc: HiparkingLogo,
        menuItems: [
            {title: "main", icon: AccidentIcon, label: "사고접수", link: "/turu", authLevel : 1},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/turu/accidentList", authLevel : 4},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/turu/mypage", authLevel : 1}
        ]
    },
    kmpark: {
        logoSrc: KmparkLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/kmpark" , authLevel : 1},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/kmpark/accidentList", authLevel : 1},
            {title: "parkingList", icon: CarIcon, label: "사업장관리", link: "/kmpark/parkingList" , authLevel : 1},
            {title: "insuManager", icon: ScheduleIcon, label: "보험관리", link: "/kmpark/insuManager" , authLevel : 1},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/kmpark/mypage", authLevel : 1}
        ]
    },
    starpickers: {
        logoSrc: StarPickerLogo,
        menuItems: [
            {title: "main", icon: MotocycleIcon, label: "보험접수", link: "/starpickers", authLevel : 1},
            {title: "underwriteList", icon: ListIcon, label: "접수현황", link: "/starpickers/underwriteList", authLevel : 4},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/starpickers/mypage", authLevel : 1}
        ]
    },
    kakao: {
        logoSrc: HiparkingLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/hiparking", authLevel : 1},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/hiparking/accidentList", authLevel : 1},
            {title: "parkingList", icon: CarIcon, label: "사업장관리", link: "/hiparking/parkingList", authLevel : 1},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/hiparking/mypage", authLevel : 1}
        ]
    },
};


export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const getMenuItems = (config: Theme) => {
    return config.menuItems;
};

