import {ChangeCounselData, CounselData, ListData, MonthAccidentData, UserType} from "@/@types/common";


export const initialCounselData: CounselData[] = [
    {
        pNo: "FA20235204423000",
        sDay: "2023-08-25",
        eDay: "2024-08-25",
        bCount: 11,
        estimateAmt: 529163785,
        closingAmt: 1917524,
        total: 531081309,
        repairAmt: 168178432,
        repairCost: 1654214,
        lossRatio: 66
    },
    {
        pNo: "FA202248562411100",
        sDay: "2022-08-25",
        eDay: "2023-08-25",
        bCount: 9,
        estimateAmt: 482456511,
        closingAmt: 3547551,
        total: 513521322,
        repairAmt: 205169521,
        repairCost: 1654214,
        lossRatio: 51
    },
    {
        pNo: "FA202168412220445",
        sDay: "2021-08-25",
        eDay: "2022-08-25",
        bCount: 11,
        estimateAmt: 529163785,
        closingAmt: 1917524,
        total: 531081309,
        repairAmt: 168178432,
        repairCost: 1654214,
        lossRatio: 32
    },
    {
        pNo: "FA202168412220445",
        sDay: "2021-08-25",
        eDay: "2022-08-25",
        bCount: 11,
        estimateAmt: 529163785,
        closingAmt: 1917524,
        total: 531081309,
        repairAmt: 168178432,
        repairCost: 1654214,
        lossRatio: 32
    },
];




export const changeCounselData: ChangeCounselData[] = [
    {
        cNo: 6,
        cDay: "2023-06",
        pNo: "FA20235204423000",
        pAdd: 1,
        pEnd: 1,
        AddAmt: 354354,
        EndAmt: 228544,
    },
    {
        cNo: 5,
        cDay: "2023-05",
        pNo: "FA20235204423001",
        pAdd: 12,
        pEnd: 4,
        AddAmt: 168178432,
        EndAmt: 1917524,
    },
    {
        cNo: 4,
        cDay: "2023-04",
        pNo: "FA20235204423045",
        pAdd: 3,
        pEnd: 2,
        AddAmt: 854354,
        EndAmt: 638544,
    },
    {
        cNo: 3,
        cDay: "2023-03",
        pNo: "FA2023524125000",
        pAdd: 1,
        pEnd: 1,
        AddAmt: 354354,
        EndAmt: 228544,
    },
    {
        cNo: 2,
        cDay: "2023-02",
        pNo: "FA20235204425123",
        pAdd: 3,
        pEnd: 2,
        AddAmt: 854354,
        EndAmt: 638544,
    },
    {
        cNo: 1,
        cDay: "2023-01",
        pNo: "FA20235241258522",
        pAdd: 1,
        pEnd: 1,
        AddAmt: 354354,
        EndAmt: 228544,
    },
];

export const monthAccidentData: MonthAccidentData[] = [
    {
        changeDay: "2024-08",
        acceptNum: 7,
        endNum: 4,
        counselConst: 6615000,
        disclaimerNum: 1,
        suspense: 4,
    },
    {
        changeDay: "2024-07",
        acceptNum: 8,
        endNum: 4,
        counselConst: 5431000,
        disclaimerNum: 2,
        suspense: 2,
    },
    {
        changeDay: "2024-06",
        acceptNum: 4,
        endNum: 0,
        counselConst: 0,
        disclaimerNum: 0,
        suspense: 4,
    },
]

export const listData: ListData[] = [
    {
        ppk: 1,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 2,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 3,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 4,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 5,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 6,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 7,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 8,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 9,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 10,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 11,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 12,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 13,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 14,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 15,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 16,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 17,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 18,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
    {
        ppk: 20,
        irpk: 240625120421,
        createdYMD: "2024-01-01",
        accidentDate: "2024-01-01",
        closingAmt: 5124051,
        accidentLocation: "어쩌구주차장",
        wName: "홍길동",
        wCell: "01000005555",
        vCarNum: "18바5214",
    },
]

export const ClosingCode= {
    '00' : '확인중',
    '01' : '접수',
    '02' : '접수 취소',
    '03' : '보류',
    '04' : '면책',
    '05' : '종결',
    '06' : '추산',
    '07' : '합의'
}


export const UserSet: UserType[] = [
    {
        index: 1,
        auth: '관리자',
        name: '홍홍홍',
        platform: '케이엠파크',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 2,
        auth: '사용자',
        name: '어쩌구',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 3,
        auth: '사용자',
        name: '저쩌구',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 4,
        auth: '관리자',
        name: '샤샤샥',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 5,
        auth: '관리자',
        name: '샤샤샥',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 6,
        auth: '관리자',
        name: '샤샤샥',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 7,
        auth: '관리자',
        name: '샤샤샥',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 8,
        auth: '관리자',
        name: '샤샤샥',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 5,
        auth: '관리자',
        name: '샤샤샥',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
    {
        index: 9,
        auth: '관리자',
        name: '샤샤샥',
        platform: '하이파킹',
        password: '1234',
        userId: 'hongildong',
        email: 'hong@hiparking.com',
        phone: '010-0000-0000',
        work: '팀장'
    },
]