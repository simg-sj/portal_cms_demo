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
                backgroundColor: ["#92aaf5", "#eeeeee"], // color-main
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
                    backgroundColor: '#b2c7f3',
                },
                {
                    label: '종료 사업장',
                    data: tableData?.changeGraphData?.map((d) => -d.pEnd) || [],
                    backgroundColor: '#d3d3d3',
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
                color: '#b2c7f3',
            },
            topBusiness: {
                labels: tableData?.topBusinessData?.map((d) => d.pklName) || [],
                values: tableData?.topBusinessData?.map((d) => d.count) || [],
                color: '#d3d3d3',
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
