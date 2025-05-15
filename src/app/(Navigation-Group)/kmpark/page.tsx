'use client';

import React from 'react';
import Dashboard from "@/app/components/pageComponents/parking/dashboard";
import useFetchDashboard from "@/app/lib/hooks/useFetchDashboard";
import Loading from "@/app/(Navigation-Group)/loading";

export default function Page() {
    const { tableData, doughnutValue, setDoughnutValue, loading, error, updateTableData } = useFetchDashboard(1);

    if (error) {
        return <div>서비스 오류입니다.</div>;
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

    // 막대 데이터
    const dataTwowayBar = loading
        ? { labels: [], datasets: [] }
        : {
            labels: tableData?.changeGraphData?.map((d) => d.cDay) || [],
            datasets: [
                {
                    label: '접수건',
                    data: tableData?.changeGraphData?.map((d) => d.pAdd) || [],
                    backgroundColor: '#b2c7f3',
                }
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
            topError: {
                labels: tableData?.topErrorData?.map((d) => d.pklName) || [],
                values: tableData?.topErrorData?.map((d) => d.count) || [],
                color: '#ff6d6d',
            },
            pieCounsel: [],  // 추가
            pieAccident: [], // 추가
        };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <Dashboard bpk={1} chartData={chartData} tableData={tableData} setDoughnutValue={setDoughnutValue}  updateTableData={updateTableData} />
            )}
        </>
    );
}
