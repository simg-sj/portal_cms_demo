interface MenuItems {
    dashboard?: string;
    list: string;
    mypage: string;
}

interface Theme {
    logoSrc: StaticImageData;
    menuItems: MenuItems;
}

interface ThemeConfig {
    [key: string]: Theme;
}

interface MenuItemType {
    icon: StaticImageData;
    label: string;
    link: string;
}

interface MenuItemProps extends MenuItemType {
    isActive: boolean;
}

interface UserInfo {
    userId: string;
    password: string;
}

interface UserData {
    userId: string;
    password: string;
    affiliation: string;
}

interface CounselData {
    pNo: string;
    sDay: string;
    eDay: string;
    bCount: number;
    estimateAmt: string;
    repairAmt: string;
    total: string;
    closingAmt: string;
    lossRatio: string;
}