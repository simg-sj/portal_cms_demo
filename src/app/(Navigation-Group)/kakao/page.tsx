'use client';
import React from 'react';
import Dashboard from "@/app/components/pageComponents/insuranceDashboard";
import useFetchDashboard from "@/app/lib/hooks/useFetchDashboard";
import Loading from "@/app/(Navigation-Group)/loading";

export default function Page() {
    //임의데이터
    const kakaoDashboardMockData = [
        {
            year: 2025,
            month: 2,
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
            periodLossRatio: 40,
            policyLossRatio: 40,
            yearlyLossRatio: 40,
            yearlyInsurancePayout: 200000,
            yearlyPremium: 500000
        },

    ];



    const { tableData, doughnutValue, loading, error, updateParams } = useFetchDashboard(2);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 도넛 차트 데이터
    const dataDoughnut = {
        datasets: [
            {
                data: [doughnutValue || 0, 100 - (doughnutValue || 0)],
                backgroundColor: ["#ffe07b", "#eeeeee"], // color-main
            },
        ],
    };

    //세로막대그래프 데이터
    const dataBarstand = {
        labels: ['2025-03', '2025-02', '2025-01', '2024-12', '2024-11'],
        datasets: [
            {
                label: '인입건',
                data: [12, 19, 3, 5, 1],
                backgroundColor: '#ffe49c',
            },
            {
                label: '접수건',
                data: [8, 15, 7, 9, 5],
                backgroundColor: '#a9a1a1',
            },
        ],
    };



    // 차트 데이터
    const chartData = loading
        ? null
        : {
            doughnut: dataDoughnut,
            doughnutValue: doughnutValue || 0,
            barStand: dataBarstand,
        };

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
