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
    onClick: () => void;
}

interface UserInfo {
    userId: string;
    password: string;
}


interface CounselData {
    pNo: string;
    sDay: string;
    eDay: string;
    bCount: number
    estimateAmt: number;
    repairAmt: number;
    total: number;
    closingAmt: number;
    lossRatio: number;
}

interface ChangeCounselData {
    cNo: number;
    cDay: string;
    pNo: string;
    pAdd: number;
    pEnd: number;
    AddAmt: number;
    EndAmt: number;
}

interface EditFieldProps {
    value: string | number;
    isEditing: boolean;
    onChange: (value: string) => void;
    type?: 'text' | 'number';
    className?: string;
}

