
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
    '5' : ['별따러가자','테스트1','테스트2','테스트3','테스트4']
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
//가로막대 옵션
export const optionBarHorizon = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false,
            },
            ticks: {
                display: false,
            },
        },
        y: {
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 15,
                },
            },
        },
    },
    layout: {
        padding: {
            right: 120,
        },
    },
    cutout: '75%',
};

//도넛차트 옵션
export const optionDoughnut = {
    responsive: true,
    plugins: {
        tooltip: {
            enabled: false,
        },
    },
    cutout: '75%',
};

