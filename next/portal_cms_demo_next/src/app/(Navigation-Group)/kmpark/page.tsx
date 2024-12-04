'use client';

import React from 'react';
import Dashboard from "@/app/components/pageComponents/parking/dashboard";
import useFetchDashboard from "@/app/lib/hooks/useFetchDashboard";
import Loading from "@/app/(Navigation-Group)/loading";

export default function Page() {
    const { tableData, doughnutValue, loading, error, updateParams } = useFetchDashboard('3');

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 도넛 차트 데이터
    const dataDoughnut = {
        datasets: [
            {
                data: [doughnutValue || 0, 100 - (doughnutValue || 0)],
                backgroundColor: ["#6a95f6", "#eeeeee"], // color-main
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
                    backgroundColor: '#a3bbef',
                },
                {
                    label: '종료 사업장',
                    data: tableData?.changeGraphData?.map((d) => -d.pEnd) || [],
                    backgroundColor: '#c0c0c0',
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
                color: '#a3bbef',
            },
            topBusiness: {
                labels: tableData?.topBusinessData?.map((d) => d.pklName) || [],
                values: tableData?.topBusinessData?.map((d) => d.count) || [],
                color: '#a3bbef',
            },
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
