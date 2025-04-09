'use client';
import React, {useMemo} from 'react';
import Dashboard from "@/app/components/pageComponents/insuranceDashboard";
import useFetchDashboard from "@/app/lib/hooks/useFetchDashboard";
import Loading from "@/app/(Navigation-Group)/loading";

export default function Page() {
    //임의데이터 카카오테이블
    const kakaoTableData = [
        {
            year: '2025',
            month: '02',
            policyNumber: "FA20247350967000",
            tripCount: 439867,
            premium: 14504985,
            cumulativePremium: 375736378,
            inboundCaseCount: 18,
            receivedCaseCount: 1,
            estimatedAmount: 1531000,
            settledAmount: 0,
            investigationCost: 0,
            insurancePayout: 1531000,
            cumulativeInsurancePayout: 178636535,
            lossRatio: 11,
            cumulativeLossRatio: 48,
        },
        {
            year: '2025',
            month: '01',
            policyNumber: "FA20247350967000",
            tripCount: 437762,
            premium: 14415249,
            cumulativePremium: 361231393,
            inboundCaseCount: 24,
            receivedCaseCount: 6,
            estimatedAmount: 320000,
            settledAmount: 4618000,
            investigationCost: 2341610,
            insurancePayout: 7279610,
            cumulativeInsurancePayout: 177105535,
            lossRatio: 50,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '12',
            policyNumber: "FA20247350967000",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '11',
            policyNumber: "FA20247350967454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 32,
            receivedCaseCount: 6,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '10',
            policyNumber: "FA20247350967454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 24,
            receivedCaseCount: 9,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '09',
            policyNumber: "FA20247350967454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '08',
            policyNumber: "FA20247350967454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '07',
            policyNumber: "FA2024735555454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '06',
            policyNumber: "FA2024735555454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '05',
            policyNumber: "FA2024735555454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '04',
            policyNumber: "FA2024735555454",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '03',
            policyNumber: "FA202520152445",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
        {
            year: '2024',
            month: '02',
            policyNumber: "FA202520152445",
            tripCount: 498208,
            premium: 16194837,
            cumulativePremium: 346816144,
            inboundCaseCount: 20,
            receivedCaseCount: 7,
            estimatedAmount: 0,
            settledAmount: 509000,
            investigationCost: 2840620,
            insurancePayout: 3349620,
            cumulativeInsurancePayout: 169825925,
            lossRatio: 21,
            cumulativeLossRatio: 49,
        },
    ];
    //기간별현황
    const kakaoMonthData =
        {
            periodLossRatio: 51,
            periodInsurancePayout: 202888380,
            periodPremium: 84564615422
        };
    //증권별현황
    const kakaoPolicyData =
        {
            policyLossRatio: 23,
            policyInsurancePayout: 482155424,
            policyPremium: 557218864
        };
    //년도별 추이현황
    const kakaoYearData = [
        {
            year: '2025',
            yearLossRatio: 30,
            yearInsurancePayout: 65432120,
            yearPremium: 55214205
        },
        {
            year: '2024',
            yearLossRatio: 49,
            yearInsurancePayout: 45675123,
            yearPremium: 68859541
        },
        {
            year: '2023',
            yearLossRatio: 51,
            yearInsurancePayout: 20888380,
            yearPremium: 54187211
        },
        {
            year: '2022',
            yearLossRatio: 43,
            yearInsurancePayout: 18763380,
            yearPremium: 43306240
        },
        {
            year: '2021',
            yearLossRatio: 29,
            yearInsurancePayout: 1525000,
            yearPremium: 5326130
        },
    ]
    //임의 데이터 여기까지

    const { loading, error, updateParams } = useFetchDashboard(2);

    const tableData = {
        kakaoDashboard: kakaoTableData,
        monthTermData: kakaoMonthData,
        policyData: kakaoPolicyData,
        yearData: kakaoYearData,
    }

    const chartData = useMemo(() => {
        if (loading) return null;

        // 도넛 차트 데이터 - 기간별현황
        const dataMonthDoughnut = {
            datasets: [
                {
                    data: [tableData.monthTermData.periodLossRatio || 0, 100 - (tableData.monthTermData.periodLossRatio || 0)],
                    backgroundColor: ["#ffe07b", "#eeeeee"], // color-main
                },
            ],
        };
        // 도넛 차트 데이터 - 증권별현황
        const dataYearDoughnut = {
            datasets: [
                {
                    data: [tableData.policyData.policyLossRatio || 0, 100 - (tableData.policyData.policyLossRatio || 0)],

                    backgroundColor: ["#ffe07b", "#eeeeee"], // color-main
                },
            ],
        };

        //세로막대그래프 데이터 (최근 6개월간 인입건)
        const recentData = kakaoTableData.slice(0,6) //최근 6개월 데이터 불러오기
        const dataBarstand = {
            labels: recentData.map(item => `${item.year}-${item.month}`), //그래프라벨 년도-월
            datasets: [
                {
                    label: '인입건',
                    data: recentData.map(item => item.inboundCaseCount), //인입건 데이터
                    backgroundColor: '#ffe49c',
                },
                {
                    label: '접수건',
                    data: recentData.map(item => item.receivedCaseCount), //접수건 데이터
                    backgroundColor: '#a9a1a1',
                },
            ],
        };

        //월별추이 데이터 (최근 12개월간)
        const yearData = kakaoTableData.slice(0,12) //최근 12개월 데이터 불러오기
        const dataBarMonth = {
            labels: yearData.map(item => `${item.year}-${item.month}`), //그래프라벨 년도-월
            barData: yearData.map(item => item.lossRatio), //막대데이터 - 월별 손해율
            lineData1: yearData.map(item => item.insurancePayout), //선데이터 - 월별 보험금
            lineData2: yearData.map(item => item.premium), //선데이터 - 월별 보험료
            barLabel: '손해율',
            line1Label: '보험금',
            line2Label: '보험료',
            configColor: {
                barColor1: '#ffe49c',
                lineColor1: '#a9a1a1',
                lineColor2: '#654f4f',
            }
        };
        //년도별추이 데이터
        const dataBarYear = {
            labels: tableData.yearData.map(item => item.year), //그래프라벨 년도
            barData: tableData.yearData.map(item => item.yearLossRatio), //막대데이터 - 년도별 손해율
            lineData1: tableData.yearData.map(item => item.yearInsurancePayout), //선데이터 - 년도별 보험료
            lineData2: tableData.yearData.map(item => item.yearPremium), //선데이터 - 년도별 보험금
            barLabel: '손해율',
            line1Label: '보험금',
            line2Label: '보험료',
            configColor: {
                barColor1: '#ffe49c',
                lineColor1: '#a9a1a1',
                lineColor2: '#654f4f',
            }
        };

        return {
            monthDoughnut: dataMonthDoughnut,
            yearDoughnut: dataYearDoughnut,
            barStand: dataBarstand,
            barMonthData: dataBarMonth,
            barYearData: dataBarYear,
        };
    }, [kakaoTableData, loading]);

        if (error) {
            return <div>Error: {error.message}</div>;
        }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Dashboard chartData={chartData} tableData={tableData} setParam={updateParams}/>
                )}
        </>
    );
}
