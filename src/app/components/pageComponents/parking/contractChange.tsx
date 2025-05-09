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


const ContractComponent = ({ tableData, chartData, handleParam, param, setParam } : ContractProps) => {
    const [days, setDays] = useState({
        type : 'contract',
        sDay: dayjs().subtract(5, 'month').format('YYYY-MM'),
        eDay: dayjs().format('YYYY-MM')
    });

    const optionTwowayBar = {
        responsive: true,
        scales: {
            x: {
                stacked: true
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
                align: 'end'
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
                        const datasetIndex = context.datasetIndex;
                        if (tableData.changeGraphData[dataIndex]) {
                            if (datasetIndex === 0) {
                                return [
                                    `추가 사업장: ${tableData.changeGraphData[dataIndex].pAdd}`,
                                    `추가 보험금: ${tableData.changeGraphData[dataIndex].AddAmt.toLocaleString()} 원`,
                                ];
                            } else {
                                return [
                                    `종료 사업장: ${tableData.changeGraphData[dataIndex].pEnd}`,
                                    `감소 보험금: ${tableData.changeGraphData[dataIndex].EndAmt.toLocaleString()} 원`,
                                ];
                            }
                        }
                        return (
                            <div className={'flex items-centers justify-center my-[150px]'}>
                                <Image src={Error} alt={'에러'} width={30} height={30} className={'mr-5'}/>
                                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
                            </div>
                        )
                    },
                },
            },
        },
    };


    return (
        <div>
            <div className={'text-lg font-light mb-6'}>계약변경현황</div>
            <div className={'flex'}>
                <div className={'w-[1000px] mr-16'}>
                    <div
                        className={'mb-5 font-medium text-[16px]'}>{`최근 ${tableData.changeGraphData.length}개월 계약변경현황`}</div>
                    <BarTwowayChart data={chartData.twowayBar} options={optionTwowayBar}/>
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
                                <col style={{width: ""}}/>
                                <col style={{width: "80px"}}/>
                                <col style={{width: "80px"}}/>
                                <col style={{width: "200px"}}/>
                                <col style={{width: "200px"}}/>
                            </colgroup>
                            <thead className={'sticky left-0 top-0'}>
                            <tr>
                                <th rowSpan={2}>No</th>
                                <th rowSpan={2}>변경일</th>
                                <th rowSpan={2}>증권번호</th>
                                <th colSpan={2}>사업장수</th>
                                <th colSpan={2}>변경보험료</th>
                            </tr>
                            <tr>
                                <th>추가</th>
                                <th>종료</th>
                                <th>추가</th>
                                <th>종료</th>
                            </tr>
                            </thead>
                            <tbody>
                            <EmptyDataWrapper data={tableData.changeGraphData}>
                                {tableData.changeData.map((changeData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{changeData.cDay}</td>
                                        <td>{changeData.pNo}</td>
                                        <td>
                                            {changeData.pAdd}
                                        </td>
                                        <td>
                                            {changeData.pEnd}
                                        </td>
                                        <td className={'text-right'}>
                                            {changeData.AddAmt > 0 ? FormatNumber(changeData.AddAmt) : 0}원
                                        </td>
                                        <td className={'text-right'}>
                                            {changeData.EndAmt > 0 ? FormatNumber(changeData.EndAmt) : 0}원
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

export default ContractComponent;