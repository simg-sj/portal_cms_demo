import React from "react";
import Dashboard from "@/app/components/pageComponents/parking/dashboard";
import {changeCounselData, initialCounselData, monthAccidentData} from "@/config/data";

export default function Page() {
    //table 테이블 데이터
    const tableData ={
        counselData: initialCounselData, //계약현황
        changeData: changeCounselData, //계약변경현황
        monthAccidentData: monthAccidentData //월별사고접수현황
    }

    //도넛차트 데이터
    const doughnutValue = 33 //손해율데이터
    const dataDoughnut = {
        datasets: [
            {
                data: [doughnutValue, 100 - doughnutValue],
                backgroundColor: ["#6a95f6", "#eeeeee"], //color-main
            },
        ],
    };

    //양방향막대 데이터
    const dataTwowayBar = {
        labels: changeCounselData.map((d) => d.cDay), //최근6개월 계약변경 날짜
        datasets: [
            {
                label: '추가',
                data: changeCounselData.map((d) => d.pAdd), //최근6개월 추가사업장데이터
                backgroundColor: '#a3bbef', //color-main-light
            },
            {
                label: '종료',
                data: changeCounselData.map((d) => -d.pEnd), //최근6개월 종료사업장데이터
                backgroundColor: '#c0c0c0', //color-sub-light
            },
        ],
    };

    //원형차트 데이터
    const dataPieCounsel = {
        labels: ['정곡빌딩', '부산사학연금', '청주성모병원', '기타'], //월누적보험료 top5 업체명
        datasets: [
            {
                data: [38, 26, 11, 25], //월누적보험료 top5 비율 %
                backgroundColor: ['#6a95f6', '#a3bbef', '#868686', '#c0c0c0'], //color-main, color-main-light, color-sub, color-sub-light
            },
        ],
    };
    const dataPieAccident = {
        labels: ['제2주차장', '청주공항주차장', '서울스퀘어', '기타'], //월누적사고접수 top5 업체명
        datasets: [
            {
                data: [21, 16, 14, 49], //월누적사고접수 top5 업체 비율 %
                backgroundColor: ['#6a95f6', '#a3bbef', '#868686', '#c0c0c0'], //color-main, color-main-light, color-sub, color-sub-light
            },
        ],
    };

    //가로막대 데이터
    const topCounselData = {
        labels: ['정곡빌딩', '부산 사학연금', '청주성모병원', '서울스퀘어', '일산국립암센터'], //지급보험료 top5 업체명
        values: [2535000, 2282000, 1650000, 1609000, 1150000], //지급보험료 top5 지급보험금액
        color: '#a3bbef' //color-main-light
    };

    const topBusinessData = {
        labels: ['F1963 1 주차장', '가든호텔', '그랜드하얏인천', '그레이츠판교', '명지병원'], //사고발생업소 top5 업체명
        values: [4, 3, 3, 2, 1], //사고발생업소 top5 사고횟수
        color: '#a3bbef' //color-main-light
    };

    const chartData = {
        doughnut: dataDoughnut,
        doughnutValue: doughnutValue,
        twowayBar: dataTwowayBar,
        topCounsel: topCounselData,
        topBusiness: topBusinessData,
        pieCounsel: dataPieCounsel,
        pieAccident: dataPieAccident
    };

    return (
        <Dashboard
            chartData={chartData}
            tableData={tableData}
        >
        </Dashboard>
    )
}