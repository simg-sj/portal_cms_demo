'use client';
import React from 'react';
import Dashboard from "@/app/components/pageComponents/parking/dashboard";
import useFetchDashboard from "@/app/lib/hooks/useFetchDashboard";
import Loading from "@/app/(Navigation-Group)/loading";

export default function Page() {
    const { tableData, doughnutValue, setDoughnutValue, loading, error, updateTableData } = useFetchDashboard(2);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 도넛 차트 데이터
    const dataDoughnut = {
        datasets: [
            {
                data: [doughnutValue || 0, 100 - (doughnutValue || 0)],
                backgroundColor: ["#fdae68", "#eeeeee"], // color-main
            },
        ],
    };

    // 양방향 막대 데이터
    const dataTwowayBar = loading
        ? { labels: [], datasets: [] }
        : {
            labels: tableData?.changeGraphData?.map((d) => d.cDay) || [],
            datasets: [
                {
                    label: '추가 사업장',
                    data: tableData?.changeGraphData?.map((d) => d.pAdd) || [],
                    backgroundColor: '#fdae68',
                },
                {
                    label: '종료 사업장',
                    data: tableData?.changeGraphData?.map((d) => -d.pEnd) || [],
                    backgroundColor: '#8e52fd',
                },
            ],
        };

    // 차트 데이터
    const chartData = loading
        ? null
        : {
            doughnut: dataDoughnut,
            doughnutValue: doughnutValue || 0,
            twowayBar: dataTwowayBar,
            topCounsel: {
                labels: tableData?.topCounselData?.map((d) => d.pklName) || [],
                values: tableData?.topCounselData?.map((d) => d.total_sum) || [],
                color: '#fdae68',
            },
            topBusiness: {
                labels: tableData?.topBusinessData?.map((d) => d.pklName) || [],
                values: tableData?.topBusinessData?.map((d) => d.count) || [],
                color: '#8e52fd',
            },
            pieCounsel: [],  // 추가
            pieAccident: [], // 추가
        };



    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Dashboard bpk={2} chartData={chartData} tableData={tableData} setDoughnutValue={setDoughnutValue}  updateTableData={updateTableData} />
            )}
        </>
    );
}