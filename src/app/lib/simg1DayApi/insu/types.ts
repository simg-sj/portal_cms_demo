
export interface InsuranceListRequest {
    job: string;
    bpk: number;
    id ?: string;
    irpk ?: number;
    bNumber ?: string;
    listType ?: 'insuranceManagement';
    condition?: string;
    text?: string;
    statusCode?: string;
    startDate?: string;
    endDate?: string;
}

export interface InsuListResponseItem {
    bNumber: string;          // 사업자번호 (예: "1234")
    bpk: number;              // 업체 고유키 (예: 3)
    capacity: number;         // 탑승 인원 (예: 8)
    carNumber: string;        // 차량번호 (예: "1234바1234")
    contractCell: string;     // 계약자 연락처 (예: "010123456778")
    contractId: string;       // 계약 ID (예: "HS1100000004")
    contractor: string;       // 계약자명 (예: "아라리요")
    contratName: string | null; // 계약명 (nullable)
    createdYMD: string;       // 생성일시 (ISO8601, 예: "2025-06-02T07:56:51.000Z")
    deletedYMD: string | null; // 삭제일시 (nullable)
    fromDay: string | null;    // 시작일 (nullable)
    impk: number;             // 보험 고유키 (예: 1100000004)
    insurCorp: string;        // 보험사 코드 (예: "HA")
    insurType: string | null;  // 보험 타입 (nullable)
    pNo: string | null;        // 정책 번호 (nullable)
    pState: string;           // 계약 상태 (예: "READY")
    premium: number;          // 보험료 (예: 0)
    reqPeriod: string;        // 요청 기간 (예: "3DAY")
    requestDay: string;       // 요청일 (YYYYMMDD, 예: "20250602")
    toDay: string | null;      // 종료일 (nullable)
    updatedYMD: string;       // 수정일시 (ISO8601, 예: "2025-06-02T07:56:51.000Z")
    useYN: string;            // 사용 여부 (예: "Y")
    userId: string;           // 사용자 ID (예: "simgUser")
    vType: string;            // 차량 종류 (예: "몰랑")
    viNumber: string | null;   // 차량 식별번호 (nullable)
    [key: string]: any;
}

export interface InsuListColumnType {
    contractId : number;
    bNumber : string;
    contractor : string;
    contractCell: string;
    carNumber : string;
    viNumber : string;
    requestDay : string;
    premium : string;
    insuTerm : string;
    pState : string;
}


export interface InsuListType {
    bpk: number;
    id: string;
    subIdYn : string;
}

export interface InsuListSuccessResponse {
    code: string;
    msg?: string;
    data: InsuListResponseItem[];
}