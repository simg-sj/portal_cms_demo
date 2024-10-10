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

interface CounselData{
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

interface ChangeCounselData{
    cNo: number;
    cDay: string;
    pNo: string;
    pAdd: number;
    pEnd: number;
    AddAmt: number;
    EndAmt: number;
}

interface MonthAccidentData{
    changeDay: string;
    acceptNum: number;
    endNum: number;
    counselConst: number;
    disclaimerNum: number;
    suspense: number;
}

interface EditableFieldProps {
    value: string | number;
    onChange: (value: string) => void;
    className?: string;
}

interface DataState {
    counselData: CounselData[];
    changeData: ChangeCounselData[];
};

interface YearMonthPickerProps {
    maxDate?: Date;
    minDate?: Date;
    selected: Date | null;
    onChange: (date: Date | null) => void;
}