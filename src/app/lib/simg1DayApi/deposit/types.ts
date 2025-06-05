// SIMG 1일 책임보험(중고차) - 예치금 충전
export interface SimgDepositType {
    job : string;
    gbn : string;
    bpk : number;
    id : string;
    irpk ?: number;
    bNumber : string;
    amount ?: string;
}

// SIMG 1일 책임보험(중고차) - 보험 신청 접수 현황
export interface Simg1DaySearch {
    job : string;
    listType : string;
    id : string;
    bpk: number
    startDate: string;
    endDate: string;
    condition: string;
    text: string | null;
    statusCode : string;
}


export interface Simg1DayDeposit {
    pspk : number;
    bpk : string;
    userId : string;
    uName : string;
    uCell ?: string;
    reqDeposit : string;
    statusYn : string;
    status : string;
    createdYMD : Date;
}

export interface DepositListResponseItem {
    pspk : number;
    bpk : string;
    bName : string;
    bNumber : string;
    reqDeposit : number;
    statusYn : string;
    status : string;
    createdYMD : Date;
    [key: string]: any;
}

export interface DepositListSuccessResponse {
    code: string;
    msg?: string;
    data: DepositListResponseItem[];
}

export interface DepositListRequest {
    job: string;
    bpk: number;
    id ?: string;
    irpk ?: number;
    bNumber ?: string;
    listType ?: 'depositRequest';
    condition?: string;
    text?: string;
    statusCode?: string;
    startDate?: string;
    endDate?: string;
}

export interface DepositListProps {
    bpk: number;
    id: string;
    subIdYn : string;
}
