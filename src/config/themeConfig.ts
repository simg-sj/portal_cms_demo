import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'
import KmparkLogo from '@/assets/images/logo/kmpark-logo.png'
import StarPickerLogo from '@/assets/images/logo/별따러가자-logo-white.png';
import KakaoLogo from '@/assets/images/logo/kakao-logo.png';
import DashboardIcon from "@/assets/images/icon/dashboard-icon.png";
import AccidentIcon from "@/assets/images/icon/accident-icon.png";
import MotocycleIcon from "@/assets/images/icon/motocycle.png";
import ListIcon from "@/assets/images/icon/list-icon.png";
import UserIcon from "@/assets/images/icon/user-icon.png";
import CarIcon from "@/assets/images/icon/parking-icon.png";
import ScheduleIcon from "@/assets/images/icon/schedule-icon.png";
import ApplicationIcon from '@/assets/images/icon/application-icon.png';
import WorkPlaceIcon from '@/assets/images/icon/workplace-icon.png';
import Simg1DayLogo from '@/assets/images/logo/simg1day-logo.png';
import {Theme, ThemeConfig} from "@/@types/common";


//메뉴추가시 업체명, 링크 추가
const themeConfigs: ThemeConfig = {
    hiparking: {
        logoSrc: HiparkingLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/hiparking", visibleRoles : [1,4]},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/hiparking/accidentList", visibleRoles : [1,4]},
            {title: "parkingList", icon: CarIcon, label: "사업장관리", link: "/hiparking/parkingList", visibleRoles : [1,4]},
            {title: "insuManager", icon: ScheduleIcon, label: "보험관리", link: "/hiparking/insuManager", visibleRoles : [1,4]},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/hiparking/mypage", visibleRoles : [1,4]}
        ]
    },
    onetimeConsignMent: {
        logoSrc: Simg1DayLogo,
        menuItems: [
            {title: "insuList", icon: ListIcon, label: "신청현황", link: "/onetimeConsignMent", visibleRoles : [4]},
            {title: "insuRequest", icon: ApplicationIcon, label: "보험신청", link: "/insuRequest", visibleRoles : [1]},
            {title: "insuList", icon: ListIcon, label: "신청현황", link: "/onetimeConsignMent/insuList", visibleRoles : [1]},
            {title: "depositHistoryList", icon: ScheduleIcon, label: "예치금관리", link: "/onetimeConsignMent/depositHistoryList", visibleRoles : [1,4]},
            {title: "CompanyListPage", icon: WorkPlaceIcon, label: "업체관리", link: "/onetimeConsignMent/CompanyListPage", visibleRoles : [4]},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/onetimeConsignMent/mypage", visibleRoles : [1,4]}
        ]
    },
    turu: {
        logoSrc: HiparkingLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/turu" , visibleRoles : [4]},
            {title: "main", icon: AccidentIcon, label: "사고접수", link: "/insuRequest", visibleRoles : [1,4]},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/turu/accidentList", visibleRoles : [4]},
            {title: "test", icon: ListIcon, label: "test", link: "/turu/test", visibleRoles : [4]},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/turu/mypage", visibleRoles : [1,4]}
        ]
    },
    kmpark: {
        logoSrc: KmparkLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/kmpark" , visibleRoles : [1,4]},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/kmpark/accidentList", visibleRoles : [1,4]},
            {title: "errorList", icon: AccidentIcon, label: "장애리스트", link: "/kmpark/errorList" , visibleRoles : [1,4]},
            {title: "parkingList", icon: CarIcon, label: "사업장관리", link: "/kmpark/parkingList" , visibleRoles : [1,4]},
            {title: "insuManager", icon: ScheduleIcon, label: "보험관리", link: "/kmpark/insuManager" , visibleRoles : [1,4]},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/kmpark/mypage", visibleRoles : [1,4]}
        ]
    },
    starpickers: {
        logoSrc: StarPickerLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/dashboard" , visibleRoles : [1,4]},
            {title: "main", icon: MotocycleIcon, label: "보험접수", link: "/starpickers", visibleRoles : [1,4]},
            {title: "underwriteList", icon: ListIcon, label: "접수현황", link: "/starpickers/underwriteList", visibleRoles : [1,4]},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/starpickers/mypage", visibleRoles : [1,4]}
        ]
    },
    kakao: {
        logoSrc: KakaoLogo,
        menuItems: [
            {title: "dashboard", icon: DashboardIcon, label: "대시보드", link: "/kakao", visibleRoles : [1,4]},
            {title: "accidentList", icon: ListIcon, label: "사고리스트", link: "/kakao/accidentList", visibleRoles : [1,4]},
            {title: "insurancePay", icon: ScheduleIcon, label: "보험료관리", link: "/kakao/payManager", visibleRoles : [1,4]},
            {title: "mypage", icon: UserIcon, label: `님`, link: "/kakao/mypage", visibleRoles : [1,4]}
        ]
    },
};


export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const getMenuItems = (config: Theme) => {
    return config.menuItems;
};

