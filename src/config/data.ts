
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



export const STATE_OPTIONS = ['확인중', '접수', '접수 취소', '보류', '면책', '종결', '추산', '합의', '부재'];
export const APPROVAL_OPTIONS = ['승인', '미승인'];
export const ACCIDENT_TYPE_OPTIONS = ['주차장배상', '재물배상', '치료비'];
export const ACCIDENT_DETAIL_TYPE_OPTIONS = ['차대차', '시설물사고','배상책임', '발렛사고','재물배상', '건물자체사고', '치료비', '기타'];
export const BSN_CODE = {'케이엠파크' : {bpk :'01', fileName :'케이엠파크_sample'} ,'하이파킹' : {bpk :'02', fileName :'하이파킹_sample'}};
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