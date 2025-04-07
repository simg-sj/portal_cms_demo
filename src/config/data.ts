import dayjs from "dayjs";
import {ClaimRowType, UptClaim} from "@/@types/common";

export const ClosingCode= {
    '00' : '확인중',
    '01' : '접수',
    '02' : '접수 취소',
    '03' : '보류',
    '04' : '면책',
    '05' : '종결',
    '06' : '추산',
    '07' : '합의',
    null : '선택'
}


export const ConfirmCode= {
    'Y' : '승인',
    'N' : '미승인',
    null : '-'
}

export const r= {
    'Y' : '승인',
    'N' : '미승인'
}

export const platformList= {
    '1' : ['케이엠파크'],
    '2' : ['하이파킹'],
    '3' : ['에스아이엠지'],
    '4' : ['트루카'],
    '5' : ['별따러가자','테스트1','테스트2','테스트3','테스트4'],
    '6' : ['카카오']
}

export const bankList = [
    { value: "", label: "은행을 선택하세요" },
    { value: "신한", label: "신한" },
    { value: "경남", label: "경남" },
    { value: "광주", label: "광주" },
    { value: "국민", label: "국민" },
    { value: "기업", label: "기업" },
    { value: "농협", label: "농협" },
    { value: "지역농축협", label: "지역농축협" },
    { value: "부산", label: "부산" },
    { value: "상호저축", label: "상호저축" },
    { value: "새마을", label: "새마을" },
    { value: "수협", label: "수협" },
    { value: "신협", label: "신협" },
    { value: "씨티", label: "씨티" },
    { value: "아이엠뱅크(대구)", label: "아이엠뱅크(대구)" },
    { value: "우리", label: "우리" },
    { value: "우체국", label: "우체국" },
    { value: "전북", label: "전북" },
    { value: "토스뱅크", label: "토스뱅크" },
    { value: "하나", label: "하나" },
    { value: "케이뱅크", label: "케이뱅크" },
    { value: "카카오뱅크", label: "카카오뱅크" },
    { value: "SC제일은행", label: "SC제일은행" },
];



export const authText = {'user' : '사용자', 'admin' : '관리자'}
export const STATE_OPTIONS = ['확인중', '접수', '접수 취소', '보류', '면책', '종결', '추산', '합의', '부재'];
export const APPROVAL_OPTIONS = ['승인', '미승인'];
export const ACCIDENT_TYPE_OPTIONS = ['주차장배상', '재물배상', '치료비'];
export const ACCIDENT_DETAIL_TYPE_OPTIONS = ['차대차', '시설물사고','배상책임', '발렛사고','재물배상', '건물자체사고', '치료비', '기타'];
export const BSN_CODE = {'케이엠파크' : {bpk :'01', fileName :'케이엠파크_sample'} ,'하이파킹' : {bpk :'02', fileName :'하이파킹_sample'}};
export const tabs = {
    'user': [{'label': '마이페이지' , 'Yn' : 'Y'}, {'label': '관리자 정보', 'Yn' : 'Y'}, {'listType' : 'adminList' , 'Yn' : 'N'}],
    'admin': [{'label': '마이페이지' , 'Yn' : 'Y'}, {'label': '사용자 목록' , 'Yn' : 'Y'}, {'listType' : 'userList' , 'Yn' : 'N'}]
}

export const initRowData : ClaimRowType = {
    irpk: 0,                      // Primary key, auto-increment
    bpk: null,                     // 업체키
    pNo: "",                       // 계약번호 또는 프로젝트 번호
    bNumber: "",                   // 사업자 번호
    platform: "",                  // 플랫폼 정보
    sDay: "",                      // 시작일
    eDay: "",                      // 종료일
    cpk: null,                     // simg 통합 CMS 업체키
    insuNum: '-',                 // 사고 접수 번호
    pklName: null,                 // 주차장명
    wName: null,                   // 접수자 이름
    wCell: null,                   // 접수자 휴대폰번호
    inCargeName: null,             // 담당자 이름
    inCargePhone: null,            // 담당자 연락처
    wEmail: null,                   // 접수자 이메일
    PJTcode: null,                 // 프로젝트 코드
    pklAddress: null,              // 사고 지역
    vCarType: null,                // 차종
    vCarColor: null,               // 차량 색상
    vCarNum: null,                 // 피해 차량 번호
    accidentType: null,            // 사고 유형
    accidentDetailType: null,      // 사고 세부 유형
    accidentDetail: null,          // 사고 상세 내용
    requestDate: dayjs().format('YYYY-MM-DD'),             // 접수일
    accidentDate: dayjs().format('YYYY-MM-DD'),            // 사고일자
    accidentDateTime: dayjs().format('YYYY-MM-DD'),        // 사고일시
    wOpinion: null,                // 접수자 기타 의견
    memo: null,                    // 메모
    closingCode: null,             // 처리 코드
    closingStatus: null,           // 처리 상태
    estimateAmt: null,             // 추산액
    closingAmt: null,              // 종결액
    repairAmt: null,               // 손조비용
    total: null,                   // 지급액(합계)
    rentPay: null,                 // 렌트비
    selfPay: null,                 // 자기부담금
    vat: null,                     // 부가세
    bCargeName: null,              // 업체 담당자 이름
    bCell: null,                   // 업체 담당자 연락처
    bMail: null,                   // 업체 담당자 이메일
    selfTotal: null,               // 합계(자기부담금)
    selfYN: null,                  // 정산여부(자기부담금)
    depositYN: null,               // 입금 여부
    payDate: null,                 // 청구 월자
    infoUseAgree: null,            // 개인정보 제공 동의
    infoOfferAgree: null,          // 개인정보 제3자 제공 동의
    approvalYN: null,              // 내부 결재 여부
    useYNull: null,                // 사용 여부
    createdYMD: null,              // 생성일자 (datetime)
};


export const hiparkingAccidentColumns = [
    { title: '순번', col: 'row' },
    { title: '연도', col: 'year' },
    { title: '접수 월', col: 'month' },
    { title: '상태', col: 'closingStatus' },
    { title: '주차장명', col: 'pklName' },
    { title: '접수번호', col: 'insuNum' },
    { title: '사고일자', col: 'accidentDate' },
    { title: '접수일자', col: 'requestDate' },
    { title: '사고내용', col: 'accidentDetail' },
    { title: '보험금', col: 'total' },
    { title: '피해자', col: 'wName' },
    { title: '피해자 연락처', col: 'wCell' },
    { title: '차량번호', col: 'vCarNum' },
    { title: '비고(메모)', col: 'memo' },
];

export const policyColumns = [
    { title: '증권번호', col: 'pNo' },
    { title: '보험기간', col: 'insuTerm' },
    { title: '총 보험료', col: 'total' },
    { title: '지급 보험금(추산+종결)', col: 'closingAmt' },
    { title: '손조비용', col: 'repairCost' },
    { title: '보험금 + 손조비용', col: 'clrc' },
    { title: '손해율', col: 'lossRatio' }
];

export const monthColumns = [
    { title: '연도', col: 'changeDay' },
    { title: '접수건수', col: 'acceptNum' },
    { title: '종결건수', col: 'endNum' },
    { title: '추산건수', col: 'estimateNum' },
    { title: '면책건수', col: 'disclaimerNum' },
    { title: '지급 보험금(추산+종결)', col: 'total' }
];

export const parkingColumns = [
    { title: '순번', col: 'row' },
    { title: '사업장명', col: 'pklName' },
    { title: '사업장주소', col: 'pklAddress' },
    { title: '사업장코드', col: 'PJTcode' },
    { title: '형태', col: 'form' },
    { title: '면수', col: 'faceCount' },
    { title: '옥내(m2)', col: 'indoor' },
    { title: '옥외(m2)', col: 'outdoor' },
    { title: '기계식(대수)', col: 'mechanical' },
    { title: '카리프트(대수)', col: 'carLift' },
];

export const parkingColumnsAll = [
    { title: '순번', col: 'row' },
    { title: '사업장명', col: 'pklName' },
    { title: '사업장주소', col: 'pklAddress' },
    { title: '사업장코드', col: 'PJTcode' },
    { title: '형태', col: 'form' },
    { title: '면수', col: 'faceCount' },
    { title: '옥내(m2)', col: 'indoor' },
    { title: '옥외(m2)', col: 'outdoor' },
    { title: '기계식(대수)', col: 'mechanical' },
    { title: '카리프트(대수)', col: 'carLift' },
    { title: '종료일자(', col: 'deletedYMD' }
];