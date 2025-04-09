import {StaticImageData} from "next/image";
import React from "react";


interface MenuItemType {
    icon: StaticImageData | {};
    title: string;
    label: string;
    link: string;
    authLevel: number;
}

interface MenuItemProps extends MenuItemType {
    isActive: boolean;
    onClick: () => void;
}

//주차장대시보드 계약현황
interface CounselData {
    pNo: string; //증권번호
    sDay: string; //보험시작일
    eDay: string; //보험종료일
    bCount: number //사업장수
    estimateAmt: number;
    repairAmt: number;
    total: number; //총보험료
    closingAmt: number; //지급보험금
    repairCost: number; //손조비용
    lossRatio: number; //손해율
    dPremiums?: number;
}


type DashboardData = {
    counselData: CounselData[];
    changeData: ChangeCounselData[];
    topBusinessData: TopBusinessData[];
    topCounselData: TopCounselData[];
    monthAccidentData: MonthAccidentData[];
    changeGraphData: ChangeGraph[];
    monthCumulativeData: MonthCumulativeData[] | [];
    code ? : string;
};

//주차장대시보드 계약변경현황
interface ChangeCounselData {
    cNo: number;
    cDay: string;
    pNo: string;
    pAdd: number;
    pEnd: number;
    AddAmt: number;
    EndAmt: number;
}

//주차장대시보드 계약변경현황 그래프
interface ChangeGraph {
    cNo: number;
    cDay: string; //변경일
    pNo: string; //증권번호
    pAdd: number; //추가사업장
    pEnd: number; //종료사업장
    AddAmt: number; //변경보험료 추가
    EndAmt: number; //변경보험료 종료
}

//주차장대시보드 월누적사현황
interface MonthCumulativeData {
    bpk: number
    changeDay: string
    counts: number
    total: number
    counts_percent_change: number
    total_percent_change: number
}
//주차장대시보드 지급보험금 top5
interface TopCounselData {
    pklName: string;
    total_sum: string;
}
//주차장대시보드 사고발생업소 top5
interface TopBusinessData {
    pklName: string;
    count: number;
}
//주차장대시보드 월별사고접수현황
interface MonthAccidentData {
    changeDay: string;
    acceptNum: number;
    endNum: number;
    total: number;
    disclaimerNum: number;
    estimateNum: number;
}


interface Theme {
    logoSrc: StaticImageData | {};
    menuItems: MenuItemType[];
}

interface ThemeConfig {
    [key: string]: Theme;
}

interface UserType {
    upk?: number,
    bpk : number,
    irpk : number,
    auth: string ,
    name: string ,
    bName : string,
    password?: string,
    userId: string,
    email?: string,
    phone?: string,
    platform?: string,
    work?: string,
    authLevel: number,
    userInfo?: UserType
}

interface UserUpk {
    upks : string;
    gbn : string;
    job : string;
}

interface SearchParams {
    uAuth: string;
    searchCondition: string;
    searchKeyword: string;
    gbn : string;
    job : string;
    bpk : string;
}

interface resultCode {
    code : string;
    msg : string;
}

// 유니언 타입
type ExtendedParamType = ParamDashType2 | ParamType | BaseParamType;
type ExtendedClaimRowType = ClaimRowType | rcAccidentRowType | dutyRowType | ParkingRowType;



interface UserListType {
    irpk: number;
    userId: string;
    uName: string;
    upk : number;
    bpk : number;
    uMail: string;
    uCell: string;
    uAuth : string;
    userPwd ?: string;
    platform ?: string;
    gbn?: string;
    code ?: string;
    work ?: string;
}

interface UserCudType extends UserListType{
   job : string;
   table ?: string;
}

// 주차장 사고접수 타입
interface ParamType {
    bpk: number
    startDate: string;
    endDate: string;
    condition: string;
    text: string | null;
}

// 주차장 검색 조건 타입
interface ParkingParamType {
    bpk: number;
    status : string;
    condition: string;
    text: string;
}

// 이미지 타입
interface ImageType {
    location: string;
}


// 주차장 사고 접수 타입
interface ClaimRowType {
    irpk: number;                       // Primary key, auto-increment
    bpk?: number | null;                // 업체키
    pNo?: string;
    bNumber ?: string;
    platform?: string;
    sDay?: string;
    eDay?: string;
    cpk?: number | null;                // simg 통합 CMS에서의 업체키 세팅값
    insuNum?: string | null;            // 사고 접수 번호
    pklName?: string | null;            // 주차장명
    wName?: string | null;              // 접수자 이름
    wCell?: string | null;              // 접수자 휴대폰번호
    inCargeName?: string | null;        // 담당자 이름
    inCargePhone?: string | null;       // 담당자 연락처
    wEmail?: string | null;             // 접수자 이메일
    PJTcode?: string | null;            // 프로젝트 코드
    pklAddress?: string | null;         // 사고 지역
    vCarType?: string | null;           // 차종
    vCarColor?: string | null;          // 차량 색상
    vCarNum?: string | null;            // 피해 차량 번호
    accidentType?: string | null;       // 사고 유형
    accidentDetailType?: string | null; // 사고 세부 유형
    accidentDetail?: string | null;     // 사고 상세 내용
    requestDate?: string | null;        // 접수일
    accidentDate?: string | null;       // 사고일자
    accidentDateTime?: string | null;   // 사고일시
    wOpinion?: string | null;           // 접수자 기타 의견
    memo?: string | null;               // 메모
    closingCode?: string | null;        // 처리 코드
    closingStatus?: string | null;      // 처리 상태
    estimateAmt?: string | null;        // 추산액
    closingAmt?: string | null;         // 종결액
    repairAmt?: string | null;          // 손조비용
    total?: number | null;              // 지급액(합계)
    rentPay?: string | null;            // 렌트비
    selfPay?: string | null;            // 자기부담금
    vat?: string | null;                // 부가세
    bCargeName?: string
    bCell?: string
    bMail?: string
    selfTotal?: string | null;          // 합계(자기부담금)
    selfYN?: string | null;             // 정산여부(자기부담금)
    depositYN?: string | null;          // 입금 여부
    payDate?: string | null;            // 청구 월자
    infoUseAgree?: string | null;       // 개인정보 제공 동의
    infoOfferAgree?: string | null;     // 개인정보 제3자 제공 동의
    approvalYN?: string | null;         // 내부 결재 여부
    useYNull?: string | null;           // 사용 여부
    createdYMD?: Date | null;           // 생성일자 (datetime)
}

// 주차장 타입
interface ParkingType {
    pklpk: number;                     // 고유 식별자, 주차장 키 (Primary Key)
    bpk: number;                       // 업체 키 (Business Primary Key)
    pklName: string;                   // 주차장 이름
    PJTcode: string;                   // 프로젝트 코드
    pklAddress: string;                // 주차장 주소
    region: string;                    // 지역
    city: string;                      // 도시
    form: string;                      // 주차장 형태 (예: 지하, 지상 등)
    faceCount: number;                 // 면수 (주차장 면수)
    indoor: boolean;                   // 실내 여부
    outdoor: boolean;                  // 실외 여부
    mechanical: boolean;               // 기계식 여부
    carLift: boolean;                  // 차량 리프트 여부
    detailHistory: string;             // 상세 이력
    coInsured: boolean;                // 공동 보험 여부
    town: string;                      // 소속된 마을/구역
    fileDay: string;                   // 파일 기록 날짜
    status: string;                    // 상태 (예: 활성, 비활성 등)
    useYNull: string;                  // 사용 여부
    createdYMD: Date;                  // 생성일자
}

interface ParkingTypeKm {
    pklpk: number;                     // 고유 식별자, 주차장 키 (Primary Key)
    bpk: number;                       // 업체 키 (Business Primary Key)
    pklName: string;                   // 주차장 이름
    PJTcode: string;                   // 프로젝트 코드
    pklAddress: string;                // 주차장 주소
    region: string;                    // 지역
    area : string;
    insuType : string;
    city: string;                      // 도시
    form: string;                      // 주차장 형태 (예: 지하, 지상 등)
    faceCount: number;                 // 면수 (주차장 면수)
    indoor: boolean;                   // 실내 여부
    outdoor: boolean;                  // 실외 여부
    mechanical: boolean;               // 기계식 여부
    carLift: boolean;                  // 차량 리프트 여부
    detailHistory: string;             // 상세 이력
    coInsured: boolean;                // 공동 보험 여부
    town: string;                      // 소속된 마을/구역
    fileDay: string;                   // 파일 기록 날짜
    status: string;                    // 상태 (예: 활성, 비활성 등)
    useYNull: string;                  // 사용 여부
    createdYMD: Date;                  // 생성일자
}

// 주차장 타입
interface ParkingRowType {
    bpk: number;
    irpk : number;
    pklName?: string;
    pklAddress?: string;
    form?: string;
    faceCount?: string;
    detailHistory?: string;
    indoor?: boolean;                   // 실내 여부
    outdoor?: boolean;                  // 실외 여부
    mechanical?: boolean;               // 기계식 여부
    carLift?: boolean;                  // 차량 리프트 여부
    memo?: string;
    status? : string;
    updatedYMD?: Date;
    deletedYMD?: Date;
}

// 트루카 책임보험 사고 타입 정의
interface rcAccidentType {
    irpk: number;
    bpk: number; // 업체키
    insuNum?: string;
    partnerName: string; // 제휴사명
    carNum: string; // 차량번호
    accidentDate: string; // 사고 일시
    arrivalETA: string; // 예상 입고 일정 (nullable)
    propDamage: string | null; // 대물 (nullable)
    persInjury: string | null; // 대인 (nullable)
    etc: string | null; // 기타 (nullable)
    accidentDetail: string; // 사고내용 (nullable)
    isConfirmed: string; // 컨펌 여부 (nullable)
    confirmedBy: string | null; // 컨펌 담당자 (nullable)
    statusCode?: string;
    memo?: string;
    createdYMD?: string; // 생성일
}


interface ButtonConfig {
    label: string;
    onClick: () => void;
    color: "main" | "sub" | "blue" | "green" | "red" | "gray" | "dark-gray";
    fill?: boolean;
    rounded?: boolean;
    textSize?: number;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
}


interface DashBoardType {
    length: number;
    counselData: CounselData[];
    changeCounselData: ChangeCounselData[];
}

interface ParamDashType2 {
    job: string;
    bpk: number;
    gbn : string;
    sDay: string;
    eDay: string;
}

interface UptClaim extends ClaimRowType {
    job: string;
    table : string;
    irpk : number;
    bpk : number;
    requestDate : string;
    accidentDate : string;
}

interface UptParking extends ParkingRowType {
    job: string;
    table : string;
    irpk : number;
    bpk : number;
}

// 트루카
interface rcAccidentRowType extends rcAccidentType {
    gbn?: string;
    job?: string;
    accidentTime: string;
    accidentDateTime: string;
}


// 책임보험 타입 정의
interface dutyType {
    irpk : number;
    ncase: 'single' | 'multiple' | '';
    bpk: number; // 업체키
    handlerName: string; // 담당자 이름
    handlerPhone: string; // 담당자 전화번호
    bizId: string; // 렌탈사 보유코드 / 사업자번호
    bName : string;
    bikeNum ?: string; // 차량번호
    viNum: string; // 차대번호
    bikeName: string; // 차량이름
    bikeCC: string; // 배기량
    fuelType : string;
    registYMD: string // 연식
    driverRange: string ; // 운전자 범위
    ageRange: string; // 연령범위
    dambo: string; // 담보
    gitaDambo ?: string; // 기타 담보 조정 사항
    payMethod : string;
    creaditNum : string;
    bankName : string;
    bankNum : string;
}


// 책임보험 타입 확장
interface dutyRowType extends dutyType {
    gbn?: string;
    job?: string;
}



interface Step1Props {
    onNext: () => void;
    formData: rcAccidentRowType | dutyType;
    setFormData: React.Dispatch<React.SetStateAction<rcAccidentRowType | dutyType>>;
}

interface Step2PropsDT {
    onNext: () => void;
    onPrev: () => void;
    param: dutyType;
}

interface Step2PropsLC {
    onNext: () => void;
    onPrev: () => void;
    param: dutyType;
}

interface Step3Props {
    onReset: () => void;
}

//카카오 보험대시보드
interface kakaoDashboard {
    year: string;                         // 년도
    month: string;                        // 월
    policyNumber: string;                 // 증권번호
    tripCount: number;                    // 운행건
    premium: number;                      // 보험료
    cumulativePremium: number;            // 누적보험료
    inboundCaseCount: number;             // 인입건
    receivedCaseCount: number;            // 접수건
    estimatedAmount: number;              // 추산금액
    settledAmount: number;                // 종결금액
    investigationCost: number;            // 손해조사비용
    insurancePayout: number;              // 보험금
    cumulativeInsurancePayout: number;    // 누적보험금
    lossRatio: number;                    // 손해율
    cumulativeLossRatio: number;          // 누적손해율
}

//카카오대시보드 - 기간별현황
interface dashboardMonthType {
    periodLossRatio: number;              // 기간별 손해율
    periodInsurancePayout: number;        // 기간별 누적보험금
    periodPremium: number;                // 기간별 누적보험료
}
//카카오대시보드 - 증권별현황
interface dashboardPolicyType {
    policyLossRatio: number;              // 증권별 손해율
    policyInsurancePayout: number;        // 증권별 누적보험금
    policyPremium: number;                // 증권별 누적보험료
}
//카카오대시보드 - 년도별 추이현황
interface dashboardYearType {
    year: string;                       // 년도
    yearLossRatio: number;              // 년도별 손해율
    yearInsurancePayout: number;        // 년도별 보험금
    yearPremium: number;                // 년도별 보험료
}

interface kakaoPayType {
    year: string;
    month: string;
    twoPay: number;
    twoCount: number;
    fourPay: number;
    fourCount: number;
}

// 적재물 타입
interface CargoInsuType  {
    id: string; // 고유 ID
    accidentDate?: string | null; // 사고 일자 (YYYY-MM-DD)
    accidentTime?: string | null; // 사고 시간 (HH:MM:SS)
    reportDate?: string | null; // 접수 일자 (YYYY-MM-DD)
    accidentLocation?: string | null; // 사고 장소
    accidentDetails?: string | null; // 사고 내용
    riderName?: string | null; // 이름
    contactNumber?: string | null; // 연락처
    email?: string | null; // 이메일
    orderNumber?: string | null; // 오더번호
    departureLocation?: string | null; // 물품 배송 출발지
    destinationLocation?: string | null; // 물품 배송 목적지
    senderContact?: string | null; // 물품 보낸 사람 연락처
    receiverContact?: string | null; // 물품 받는 사람 연락처
    damagedGoods?: string | null; // 피해물품
    damageAmount?: number | null; // 피해금액
    reportNumber?: string | null; // 접수번호
    platform?: string | null; // 플랫폼
    status?: string | null; // 상태 (예: 접수, 진행 중, 종결)
    estimatedAmount?: number | null; // 추산 금액
    finalAmount?: number | null; // 종결 금액
    investigationCost?: number | null; // 손해조사 비용
    residualGoods?: string | null; // 잔존물
    insuranceTotal?: number | null; // 보험금계
    insuranceStatus?: string | null; // 보험 진행상황 or 처리 결과
    customerSettlement?: number | null; // 고객 합의금
    simgDeposit?: number | null; // SIMG 입금액
    depositReceipt?: "Y" | "N"; // 입금증 유/무 (Y/N)
    agreementDoc?: string | null; // 합의서 종류
    paymentDate?: string | null; // 지급(입금) 일자 (YYYY-MM-DD)
    officialRequest?: string | null; // 공문 요청일
    remarks?: string | null; // 비고
    createdAt?: string; // 생성 일시 (ISO 형식 문자열)
    updatedAt?: string; // 수정 일시 (ISO 형식 문자열)
};

