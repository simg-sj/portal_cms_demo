import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Image from "next/image";
import Search from "@/assets/images/icon/detail-icon.png";
import EmptyDataWrapper from "@/app/components/common/ui/input/EmptyDataWrapper";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import React, {useState} from "react";
import {TooltipItem} from "chart.js";
import Error from "@/assets/images/icon/error-icon.png";
import dayjs from "dayjs";
import {DashboardData, ExtendedParamType, ParamDashType2} from "@/@types/common";


interface ContractProps {
    chartData: {
        doughnut: any;
        doughnutValue: number;
        twowayBar: any;
        topCounsel: any;
        topBusiness: any;
        pieCounsel: any;
        pieAccident: any;
    };
    bpk : number;
    tableData: DashboardData;
    handleParam : (type: string, param : ParamDashType2) => Promise<void>
    param : ParamDashType2
    setParam : React.Dispatch<React.SetStateAction<ExtendedParamType>>
}


const ErrorChart = ({ tableData, chartData, handleParam, param, setParam } : ContractProps) => {
    const [days, setDays] = useState({
        type : 'contract',
        sDay: dayjs().subtract(5, 'month').format('YYYY-MM'),
        eDay: dayjs().format('YYYY-MM')
    });

    const optionBar = {
        responsive: true,
        scales: {
            x: {
                stacked: false, // 스택 제거
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'left',
                align: 'end',
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: 'black',
                bodyColor: 'black',
                borderWidth: 1,
                borderColor: '#e7e7e7',
                bodyAlign: 'center' as const,
                titleAlign: 'center' as const,
                position: 'average' as const,
                yAlign: 'bottom' as const,
                callbacks: {
                    label: (context: TooltipItem<'bar'>) => {
                        const dataIndex = context.dataIndex;
                        if (tableData.changeGraphData[dataIndex]) {
                            return [
                                `접수건: ${tableData.changeGraphData[dataIndex].pAdd}`,
                            ];
                        }
                        return '데이터 없음';
                    },
                },
            },
        },
    };


    console.log("@@@2", chartData.twowayBar)

    return (
        <div>
            <div className={'text-lg font-light mb-6'}>장애접수율</div>
            <div className={'flex'}>
                <div className={'w-[1000px] mr-16'}>
                    <div
                        className={'mb-5 font-medium text-[16px]'}>{`최근 ${tableData.changeGraphData.length}개월 장애접수현황`}</div>
                    <BarTwowayChart data={chartData.twowayBar} options={optionBar}/>
                </div>
                <div className={'w-full'}>
                    <div className={"flex justify-end mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <DayTerm type="month" condition={'contract'} sDay={new Date(days.sDay)} eDay={new Date(days.eDay)} setDays={setDays} setParam={setParam}></DayTerm>
                            <button onClick={() => handleParam('contract', param)}>
                                <Image src={Search} alt={"검색"} width={22} height={20} className={'cursor-pointer ml-3'}></Image>
                            </button>
                        </div>
                    </div>
                    <div className={'max-h-[260px] overflow-y-auto'}>
                        <table className={'w-full relative'}>
                            <colgroup>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: "120px"}}/>
                                <col style={{width: "120px"}}/>
                                <col style={{width: "120px"}}/>
                                <col style={{width: "120px"}}/>
                            </colgroup>
                            <thead className={'sticky left-0 top-0'}>
                            <tr>
                                <th rowSpan={2}>No</th>
                                <th rowSpan={2}>접수월</th>
                                <th colSpan={4}>장애구분</th>
                                <th rowSpan={2}>총 건수</th>
                            </tr>
                            <tr>
                                <th>장애</th>
                                <th>정기권</th>
                                <th>환불</th>
                                <th>기타</th>
                            </tr>
                            </thead>
                            <tbody>
                            <EmptyDataWrapper data={tableData.changeGraphData}>
                                {tableData.changeData.map((changeData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{changeData.cDay}</td>
                                        <td>
                                            {changeData.itemDefect > 0 ? FormatNumber(changeData.itemDefect) : 0}건
                                        </td>
                                        <td>
                                            {changeData.subscriptionPass > 0 ? FormatNumber(changeData.subscriptionPass) : 0}건
                                        </td>
                                        <td>
                                            {changeData.refundStatus > 0 ? FormatNumber(changeData.refundStatus) : 0}건
                                        </td>
                                        <td>
                                            {changeData.etcReason > 0 ? FormatNumber(changeData.etcReason) : 0}건
                                        </td>
                                        <td>
                                            {changeData.total > 0 ? FormatNumber(changeData.total) : 0}건
                                        </td>
                                    </tr>
                                ))}
                            </EmptyDataWrapper>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorChart;