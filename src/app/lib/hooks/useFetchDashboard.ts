/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-11-26 13:27:27
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-12-20 09:53:27
 * @FilePath: src/app/lib/hooks/useFetchDashboard.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


import { useState, useEffect } from 'react';
import {
    ChangeCounselData,
    ChangeGraph,
    CounselData,
    MonthAccidentData, MonthCumulativeData, ParamDashType2,
    TopBusinessData,
    TopCounselData
} from "@/@types/common";
import {getDashBoard} from "@/app/(Navigation-Group)/action";

type DashboardData = {
    counselData: CounselData[];
    changeData: ChangeCounselData[];
    topBusinessData: TopBusinessData[];
    topCounselData: TopCounselData[];
    monthAccidentData: MonthAccidentData[];
    changeGraphData: ChangeGraph[];
    monthCumulativeData: MonthCumulativeData[];
};

const useFetchDashboard = (bpk : string) => {
    const [tableData, setTableData] = useState<DashboardData | null>(null);
    const [doughnutValue, setDoughnutValue] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const [params, setParams] = useState<ParamDashType2>({
        job: 'dash',
        bpk: bpk,
        sDay: '2024-09',
        eDay: '2025-09',
    });
    
    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await getDashBoard(params);

            setTableData({
                counselData: result[0],
                changeData: result[1],
                topBusinessData: result[2],
                topCounselData: result[3],
                monthAccidentData: result[4],
                changeGraphData: result[5],
                monthCumulativeData: result[6],
            });

            if (result[0] && result[0].length > 0) {
                const lastValue = result[0][result[0].length - 1];
                setDoughnutValue(lastValue.lossRatio);
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, [params.job, params.bpk, params.sDay, params.eDay]);

    const updateParams = (newParams ) => {
        setParams((prevParams) => ({
            ...prevParams,
            ...newParams,
        }));
    };

    return { tableData, doughnutValue, loading, error, updateParams };
};

export default useFetchDashboard;
