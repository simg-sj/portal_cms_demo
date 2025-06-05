export interface CompanyColumnType {
    bpk : string;
    bName : string;
    bNumber : string;
    uName : number;
    uCell : string;
    balance : number;
    userId : string;
}

export interface CompanyListResponseItem {
    bpk : string;
    bName : string;
    bNumber : string;
    uName : number;
    uCell : string;
    balance : number;
    userId : string;
    [key: string]: any;
}

export interface CompanyListSuccessResponse {
    code: string;
    msg?: string;
    data: CompanyListResponseItem[];
}

export interface CompanyListRequest {
    job: string;
    bpk: number;
    id ?: string;
    irpk ?: number;
    bNumber ?: string;
    listType ?: 'companyList';
    condition?: string;
    text?: string;
    statusCode?: string;
    startDate?: string;
    endDate?: string;
}

export interface CompanyListProps {
    bpk: number;
    id: string;
    subIdYn : string;
}