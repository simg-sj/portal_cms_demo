interface MenuItems {
    dashboard?: string;
    list: string;
    mypage: string;
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
    repairCost: number;
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
interface DatePickerProps {
    maxDate?: Date;
    minDate?: Date;
}

interface DataState {
    counselData: CounselData[];
    changeData: ChangeCounselData[];
};

interface ListData {
    ppk: number;
    irpk: number;
    createdYMD: string;
    accidentDate: string;
    closingAmt: number;
    accidentLocation: string;
    wName: string;
    wCell: string;
    vCarNum: string;
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

interface MenuItemType {
    icon: string,
    label: string,
    link: string,
}

interface MenuItemProps extends MenuItemType {
    isActive: boolean;
}

interface ThemeConfigs {
    [key: string]: ThemeConfig;
}


interface ThemeConfig {
    logoSrc: string;
    menuItems: {
        dashboard?: string;
        list?: string;
        mypage: string;
    };
}

interface UserType {
    auth: string | null;
    name: string | null;
    platform: string | null;
    password?: string;
    userId: string;
    email: string | null;
    phone: string | null;
    work: string | null;
}