import {StaticImageData} from "next/image";
import React from "react";
import {User} from "next-auth";



interface MenuItemType {
    icon : StaticImageData | {};
    title : string;
    label: string;
    link: string;
    authLevel : number;
}

interface MenuItemProps extends MenuItemType {
    isActive: boolean;
    onClick: () => void;
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
    dPremiums ?: number;
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


interface ChangeGraph{
    cNo: number;
    cDay: string;
    pNo: string;
    pAdd: number;
    pEnd: number;
    AddAmt: number;
    EndAmt: number;
}
interface MonthCumulativeData {
    bpk : number
    changeDay : string
    counts : number
    total : number
    counts_percent_change : number
    total_percent_change : number
}
interface TopCounselData {
    pklName : string;
    total_sum : string;
}
interface TopBusinessData {
    pklName : string;
    count : number;
}

interface MonthAccidentData{
    changeDay: string;
    acceptNum: number;
    endNum: number;
    counselConst: number;
    disclaimerNum: number;
    suspense: number;
}


interface Theme {
    logoSrc: StaticImageData | {};
    menuItems: MenuItemType[];
}

interface ThemeConfig {
    [key: string]: Theme;
}

interface UserType extends User{
    index?: number;
    auth: string | null;
    name: string | null;
    platform: string | null;
    password?: string;
    userId: string;
    email: string | null;
    phone: string | null;
    work?: string | null;
    authLevel : number;
}

interface ParamType {
    bpk : number
    startDate : string;
    endDate : string;
    condition : string;
    text : string | null;
}

interface ParkingParamType{
    bpk : number;
    condition : string;
    text : string;
}

interface ImageType {
    location : string;
}




interface ClaimRowType {
    irpk: number;                       // Primary key, auto-increment
    bpk?: number | null;                // 업체키
    pNo : string;
    bNumber : string;
    platform : string;
    sDay : string;
    eDay : string;
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
    total?: string | null;              // 지급액(합계)
    rentPay?: string | null;            // 렌트비
    selfPay?: string | null;            // 자기부담금
    vat?: string | null;                // 부가세
    bCargeName ?: string
    bCell ?: string
    bMail ?: string
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
interface ParkingRowType {
    pklName : string;
    pklAddress: string;
    form: string;
    faceCount : string;
    detailHistory: string;
    indoor: boolean;                   // 실내 여부
    outdoor: boolean;                  // 실외 여부
    mechanical: boolean;               // 기계식 여부
    carLift: boolean;                  // 차량 리프트 여부
    memo : string;
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
    job : string;
    bpk : string;
    sDay : string;
    eDay : string;
}

interface UptClaim extends ClaimRowType {
    job : string;
}

interface FormData {
    partnerName: string; //제휴사명
    carNum: string; //차량번호
    carType: string; //차종
    accidentDate: string; //사고일시
    arrivalETA: string; //예상입고일정
    //피해규모
    propDamage: string; //대물
    persInjury: string; //대인
    etc: string; //기타
    accidentDetail: string; //사고내용
    confirmation?: string; //컴펌여부
    manager? : string; //컴펌담당자
}

interface Step1Props {
    onNext: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface Step2Props {
    onNext: () => void;
    onPrev: () => void;
    param: FormData;
}

interface Step3Props {
    onReset: () => void;
}