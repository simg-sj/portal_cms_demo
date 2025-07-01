import {Theme, ThemeConfig} from "@/@types/common";


//메뉴추가시 업체명, 링크 추가
export const themeConfigs: ThemeConfig = {
    hiparking: {
        logoSrc: "/images/logo/hiparking-logo.png",
        menuItems: [
            { title: "dashboard", icon: "/images/icon/dashboard-icon.png", label: "대시보드", link: "/hiparking", visibleRoles: [1, 4] },
            { title: "accidentList", icon: "/images/icon/accident-icon.png", label: "사고리스트", link: "/hiparking/accidentList", visibleRoles: [1, 4] },
            { title: "parkingList", icon: "/images/icon/parking-icon.png", label: "사업장관리", link: "/hiparking/parkingList", visibleRoles: [1, 4] },
            { title: "insuManager", icon: "/images/icon/schedule-icon.png", label: "보험관리", link: "/hiparking/insuManager", visibleRoles: [1, 4] },
            { title: "mypage", icon: "/images/icon/user-icon.png", label: "님", link: "/hiparking/mypage", visibleRoles: [1, 4] }
        ]
    },
    onetimeConsignMent: {
        logoSrc: "/images/logo/simg1day-logo.png",
        menuItems: [
            { title: "insuList", icon: "/images/icon/list-icon.png", label: "신청현황", link: "/onetimeConsignMent", visibleRoles: [4] },
            { title: "insuRequest", icon: "/images/icon/application-icon.png", label: "보험신청", link: "/insuRequest", visibleRoles: [1] },
            { title: "insuList", icon: "/images/icon/list-icon.png", label: "신청현황", link: "/onetimeConsignMent/insuList", visibleRoles: [1] },
            { title: "depositHistoryList", icon: "/images/icon/schedule-icon.png", label: "예치금관리", link: "/onetimeConsignMent/depositHistoryList", visibleRoles: [1, 4] },
            { title: "CompanyListPage", icon: "/images/icon/workplace-icon.png", label: "업체관리", link: "/onetimeConsignMent/CompanyListPage", visibleRoles: [4] },
            { title: "mypage", icon: "/images/icon/user-icon.png", label: "님", link: "/onetimeConsignMent/mypage", visibleRoles: [1, 4] }
        ]
    },
    kmpark: {
        logoSrc: "/images/logo/kmpark-logo.png",
        menuItems: [
            { title: "dashboard", icon: "/images/icon/dashboard-icon.png", label: "대시보드", link: "/kmpark", visibleRoles: [1, 4] },
            { title: "accidentList", icon: "/images/icon/list-icon.png", label: "사고리스트", link: "/kmpark/accidentList", visibleRoles: [1, 4] },
            { title: "errorList", icon: "/images/icon/accident-icon.png", label: "장애리스트", link: "/kmpark/errorList", visibleRoles: [1, 4] },
            { title: "parkingList", icon: "/images/icon/parking-icon.png", label: "사업장관리", link: "/kmpark/parkingList", visibleRoles: [1, 4] },
            { title: "insuManager", icon: "/images/icon/schedule-icon.png", label: "보험관리", link: "/kmpark/insuManager", visibleRoles: [1, 4] },
            { title: "mypage", icon: "/images/icon/user-icon.png", label: "님", link: "/kmpark/mypage", visibleRoles: [1, 4] }
        ]
    },
    starpickers: {
        logoSrc: "/images/logo/별따러가자-logo-white.png",
        menuItems: [
            { title: "dashboard", icon: "/images/icon/dashboard-icon.png", label: "대시보드", link: "/dashboard", visibleRoles: [1, 4] },
            { title: "main", icon: "/images/icon/motocycle.png", label: "보험접수", link: "/starpickers", visibleRoles: [1, 4] },
            { title: "underwriteList", icon: "/images/icon/list-icon.png", label: "접수현황", link: "/starpickers/underwriteList", visibleRoles: [1, 4] },
            { title: "mypage", icon: "/images/icon/user-icon.png", label: "님", link: "/starpickers/mypage", visibleRoles: [1, 4] }
        ]
    },
    kakao: {
        logoSrc: "/images/logo/kakao-logo.png",
        menuItems: [
            { title: "dashboard", icon: "/images/icon/dashboard-icon.png", label: "대시보드", link: "/kakao", visibleRoles: [1, 4] },
            { title: "accidentList", icon: "/images/icon/list-icon.png", label: "사고리스트", link: "/kakao/accidentList", visibleRoles: [1, 4] },
            { title: "insurancePay", icon: "/images/icon/schedule-icon.png", label: "보험료관리", link: "/kakao/payManager", visibleRoles: [1, 4] },
            { title: "mypage", icon: "/images/icon/user-icon.png", label: "님", link: "/kakao/mypage", visibleRoles: [1, 4] }
        ]
    }
};


export const getThemeConfig = (theme: string): Theme => {
    return themeConfigs[theme as keyof ThemeConfig];
};

export const getMenuItems = (config: Theme) => {
    return config.menuItems;
};

