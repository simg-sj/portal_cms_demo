import { useState, useEffect } from 'react';
import {
    DashboardData,
    MonthCumulativeData,
    ParamDashType2,
    CounselData,
    ChangeCounselData,
    TopBusinessData,
    TopCounselData,
    ChangeGraph,
    MonthAccidentData,
    ErrorData, TopErrorData
} from "@/@types/common";
import { getDashBoard } from "@/app/(Navigation-Group)/action";
import dayjs from "dayjs";

const useFetchDashboard = (bpk: number) => {
    const [tableData, setTableData] = useState<DashboardData | null>(null);
    const [doughnutValue, setDoughnutValue] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    let initDash : ParamDashType2 =  {
        job: 'dash',
        bpk: bpk,
        gbn: 'init',
        pNo : '',
        sDay: dayjs().subtract(5, 'month').format('YYYY-MM'),
        eDay: dayjs().format('YYYY-MM')
    };

    let emptyMonth: MonthCumulativeData[] = [{
        bpk: bpk,
        changeDay: "",
        counts: 0,
        total: 0,
        counts_percent_change: 0,
        total_percent_change: 0
    }];

    const fetchData = async (pNo : string | null) => {
        try {
            if (pNo) {
                initDash.pNo = pNo;
            }

            setLoading(true);
            const result = await getDashBoard(initDash);
            console.log(result);
            const monthCumulativeData = Array.isArray(result[6]) && result[6].length > 0 ? result[6] : emptyMonth;

            // 데이터 구조에 맞게 테이블 데이터 설정
            const dashboardData: DashboardData = {
                counselData: result[0] as CounselData[],
                changeData: result[1] as ChangeCounselData[] | ErrorData[],
                topBusinessData: result[2] as TopBusinessData[],
                topCounselData: result[3] as TopCounselData[],
                monthAccidentData: result[4] as MonthAccidentData[],
                changeGraphData: result[5] as ChangeGraph[],
                topErrorData : result[7] as TopErrorData[],
                monthCumulativeData: monthCumulativeData
            };

            // 테이블 데이터 업데이트
            setTableData(dashboardData);

            if (dashboardData.counselData && dashboardData.counselData.length > 0) {
                setDoughnutValue(dashboardData.counselData.at(- 1).lossRatio);
            }

            return pNo;
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(null);
    }, []);

    // ✅ 특정 데이터 업데이트
    const updateTableData = async (param : ParamDashType2, type : string ) => {
        try{
            param.gbn = type;

            const result = await getDashBoard(param);

            const monthCumulativeData = Array.isArray(result[6]) && result[6].length > 0 ? result[6] : emptyMonth;


            if (result[0][0].code === '401') {
                return '401';
            } else {
                switch (type) {
                    case 'top' :
                        // prev가 null이거나 undefined일 경우, 새로운 상태를 설정할 수 있도록 처리
                        setTableData((prev) => ({
                            ...prev,
                            topBusinessData: result[0],  // result를 changeData에 할당
                            topCounselData : result[1],
                            topErrorData : result[2],
                        }));
                        break;
                    case 'contract' :
                        setTableData((prev) => ({
                            ...prev,
                            changeData: result[0],  // result를 changeData에 할당
                            changeGraphData : result[1]
                        }));
                        break;
                    case 'month' :
                        setTableData((prev) => ({
                            ...prev,
                            monthAccidentData: result[0],  // result를 changeData에 할당
                        }));
                        break;
                    case  'init' :
                        setTableData((prev) => ({
                            counselData: result[0] as CounselData[],
                            changeData: result[1] as ChangeCounselData[],
                            topBusinessData: result[2] as TopBusinessData[],
                            topCounselData: result[3] as TopCounselData[],
                            monthAccidentData: result[4] as MonthAccidentData[],
                            changeGraphData: result[5] as ChangeGraph[],
                            topErrorData : result[7] as TopErrorData[],
                            monthCumulativeData: monthCumulativeData

                        }));
                    break;
                }

            }

        }catch (e){
            console.log(e);
        }
    };



    return {
        tableData,
        doughnutValue,
        loading,
        setDoughnutValue,
        error,
        updateTableData,
    };
};

export default useFetchDashboard;
