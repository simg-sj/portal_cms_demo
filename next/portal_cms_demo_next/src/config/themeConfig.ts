import HiparkingLogo from '@/assets/images/logo/hiparking-logo.png'
import SimgLogo from '@/assets/images/logo/simg-round-logo.png'



const themeConfigs: ThemeConfigs = {
    hiparking: {
        logoSrc: HiparkingLogo,
        menuItems: {
            dashboard: "/hiparking/dashboard",
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
};

export const getThemeConfig = (theme: string): ThemeConfig => {
    return themeConfigs[theme]; // 기본값으로 simg 테마 사용
};

export const availableThemes = Object.keys(themeConfigs);