'use client'
import Button from "@/app/components/common/ui/button/button";
import Excel from "@/assets/images/icon/excel-icon.png";
import "react-datepicker/dist/react-datepicker.css";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import EditableField from "@/app/components/common/ui/input/editField";
import Tab from "@/app/components/common/ui/tab";
import Image from "next/image";
import CarIcon from '@/assets/images/icon/car-icon.png'
import ChargeIcon from '@/assets/images/icon/charge-icon.png'
import BarHorizonChart from "@/app/components/chart/BarHorizonChart";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import {
    ChangeCounselData,
    ChangeGraph,
    CounselData, DashboardData,
    MonthAccidentData,
    MonthCumulativeData, ParamDashType2,
} from "@/@types/common";
import CountUp from "@/app/components/common/ui/countUp";
import {TooltipItem} from "chart.js";
import Error from "@/assets/images/icon/error-icon.png";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import CountCard from "@/app/components/common/CountCard";
import Search from "@/assets/images/icon/detail-icon.png"
import {number} from "prop-types";
import dayjs from "dayjs";
import {onClickExcel} from "@/app/lib/onClickExcel";
import {hiparkingAccidentColumns, monthColumns, policyColumns} from "@/config/data";

interface DashboardProps {
    chartData: {
        doughnut: any;
        doughnutValue: number;
        twowayBar: any;
        topCounsel: any;
        topBusiness: any;
        pieCounsel: any;
        pieAccident: any;
    };
    tableData: DashboardData;
    setDoughnutValue : React.Dispatch<SetStateAction<number | null>>;
    updateTableData : (param : ParamDashType2, type : string) => void;
}

interface DoughnutValueType {
    lossRatio: number
    closingAmt : number
}

export default function DashboardComponent({
                                               chartData,
                                               tableData,
                                               updateTableData,
                                               setDoughnutValue,
                                           }: DashboardProps) {
    //업체별 라우팅 옵션
    const pathname = usePathname();
    const isHiparkingRoute = pathname.includes('/hiparking')
    const [donutValues, setDounutValues] = useState<DoughnutValueType>({
        lossRatio: tableData.counselData.at(-1).lossRatio,
        closingAmt: tableData.counselData.at(-1).closingAmt,
    })

    const [param, setParam] = useState<ParamDashType2>({
        job: 'dash',
        bpk: 2,
        gbn: '',
        sDay: dayjs().subtract(6, 'month').format('YYYY-MM'),
        eDay: dayjs().format('YYYY-MM')
    })

    const handleParam = (type: string) => {
        updateTableData(param, type);
    };

    const handleDoughnut = (counsel) => {
        setDounutValues({lossRatio : counsel.lossRatio, closingAmt : counsel.closingAmt});
        setDoughnutValue(counsel.lossRatio);
    }
    //양방향막대 옵션
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


    const tabs = [
        {
            label: '지급보험금',
            content: (
                <>
                    <div className={'my-5 font-medium text-lg'}>지급보험금 TOP 5</div>
                    <BarHorizonChart data={chartData.topCounsel}/>
                </>
            ),
        },
        {
            label: '사고발생업소',
            content: (
                <>
                    <div className={'my-5 font-medium text-lg'}>사고발생업소 TOP 5</div>
                    <BarHorizonChart data={chartData.topBusiness}/>
                </>
            ),
        },
    ]

    return (
        <>
            <div className={'px-8 py-6 bg-white rounded-xl'}>
                <div className={'flex justify-between items-start'}>
                    <div className={'text-lg font-light mb-6'}>계약현황</div>
                    <Button color={"green"} height={32} width={120} onClick={()  => onClickExcel(policyColumns,'policy', tableData.counselData, '증권별_손해자료.xlsx')}>
                        <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                        엑셀다운
                    </Button>
                </div>
                <div className={'flex'}>
                    <div className={'w-[200px] mr-16'}>
                        <div className={'relative'}>
                            <DoughnutChart data={chartData.doughnut}></DoughnutChart>
                            <div
                                className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'}>
                                <div className={'text-gray-600 mb-1'}>손해율</div>
                                <CountUp end={donutValues.lossRatio} duration={5} className={'text-2xl font-semibold'}
                                         suffix={'%'}/>
                            </div>
                        </div>
                        <div className={'mt-4 text-right'}>
                            <div className={'text-gray-600'}>지급보험금</div>
                            <CountUp
                                end={donutValues.closingAmt}
                                duration={2} className={'text-2xl font-semibold'} suffix={'원'}/>
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <div className={'max-h-[250px] overflow-y-auto'}>
                            <table className={'w-full relative'}>
                                <colgroup>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: ""}}/>
                                </colgroup>
                                <thead className={'sticky left-0 top-0'}>
                                <tr>
                                    <th>증권번호</th>
                                    <th>보험기간</th>
                                    <th>사업장수</th>
                                    <th>총보험료</th>
                                    <th>지급보험금</th>
                                    <th>손조비용</th>
                                    <th>손해율</th>
                                </tr>
                                </thead>
                                <tbody className={'colTable'}>
                                {tableData.counselData.map((counsel, index) => (
                                    <tr key={index}  onClick={() => handleDoughnut(counsel)} className={'cursor-pointer hover:bg-main-lighter'}>
                                        <td>{counsel.pNo}</td>
                                        <td>{counsel.sDay + '~' + counsel.eDay}</td>
                                        <td>{counsel.bCount}</td>
                                        <td className={'text-center'}>
                                            {counsel.total.toLocaleString()}원
                                        </td>
                                        <td className={'text-center'}>
                                            {counsel.closingAmt.toLocaleString()}원
                                        </td>
                                        <td className={'text-center'}>
                                            {counsel.repairCost.toLocaleString()}원
                                        </td>
                                        <td>{counsel.lossRatio} %</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div className={'px-8 py-6 bg-white rounded-xl my-5'}>
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
                                <DayTerm type="month" sDay={new Date(param.sDay)} eDay={new Date(param.eDay)} setParam={setParam}></DayTerm>
                                <button onClick={() => handleParam('contract')}>
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
                                    {isHiparkingRoute && (
                                        <>
                                            <col style={{width: "200px"}}/>
                                            <col style={{width: "200px"}}/>
                                        </>)}
                                </colgroup>
                                <thead className={'sticky left-0 top-0'}>
                                <tr>
                                    <th rowSpan={2}>No</th>
                                    <th rowSpan={2}>변경일</th>
                                    <th rowSpan={2}>증권번호</th>
                                    <th colSpan={2}>사업장수</th>
                                    {isHiparkingRoute && (
                                        <>
                                            <th colSpan={2}>변경보험료</th>
                                        </>)}
                                </tr>
                                <tr>
                                    <th>추가</th>
                                    <th>종료</th>
                                    {isHiparkingRoute && (
                                        <>
                                            <th>추가</th>
                                            <th>종료</th>
                                        </>)}
                                </tr>
                                </thead>
                                <tbody>
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
                                        {isHiparkingRoute && (
                                            <>
                                                <td className={'text-right'}>
                                                    {changeData.AddAmt > 0 ? FormatNumber(changeData.AddAmt) : 0}원
                                                </td>
                                                <td className={'text-right'}>
                                                    {changeData.EndAmt > 0 ? FormatNumber(changeData.EndAmt) : 0}원
                                                </td>
                                            </>)}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'flex'}>
                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/6'}>
                    <div className={'text-lg font-light mb-6'}>월 누적 현황</div>
                    <div>
                        <CountCard
                            icon={ChargeIcon}
                            title={'월 누적 보험금'}
                            value={tableData.monthCumulativeData[0]?.total
                                ? FormatNumber(tableData.monthCumulativeData[0].total)
                                : 0}
                            unit={"원"}
                            percentChange={tableData.monthCumulativeData[0].total_percent_change}
                        />
                        <CountCard
                            icon={CarIcon}
                            title={'월 누적 사고접수'}
                            value={tableData.monthCumulativeData[0]?.counts ? FormatNumber(tableData.monthCumulativeData[0].counts) : 0}
                            unit={"건"}
                            percentChange={tableData.monthCumulativeData[0].counts_percent_change}
                        />
                    </div>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-2/6 mx-8'}>
                    <div className={'flex justify-between'}>
                        <div className={'text-lg font-light mb-6'}>Top 5</div>
                        <div className={"flex justify-end mb-4 text-lg"}>
                            <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                                <DayTerm type="month" sDay={new Date(param.sDay)} eDay={new Date(param.eDay)} setParam={setParam}></DayTerm>
                                <button onClick={() => handleParam('top')}>
                                    <Image src={Search} alt={"검색"} width={22} height={20}
                                           className={'cursor-pointer ml-3'}></Image>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Tab tabs={tabs}/>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/2'}>
                    <div>
                        <div className={'flex justify-between'}>
                            <div className={'text-lg font-light mb-6'}>월별 사고접수현황</div>
                            <div className={"flex justify-end mb-4 text-lg"}>
                                <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                                    <DayTerm type="month" sDay={new Date(param.sDay)} eDay={new Date(param.eDay)} setParam={setParam}></DayTerm>
                                    <button onClick={() => handleParam('month')}>
                                        <Image src={Search} alt={"검색"} width={22} height={20}
                                               className={'cursor-pointer ml-3'}></Image>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <div className={"flex justify-end mb-4"}>
                                <Button color={"green"} height={32} width={120} onClick={()  => onClickExcel(monthColumns,'month', tableData.monthAccidentData, '월별_사고접수_현황.xlsx')}>
                                    <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                                    엑셀다운
                                </Button>
                            </div>
                            <div className={'max-h-[350px] overflow-y-auto'}>
                                <table className={'w-full relative'}>
                                    <thead className={'sticky left-0 top-0'}>
                                    <tr>
                                        <th>변경일</th>
                                        <th>접수건수</th>
                                        <th>종결건수</th>
                                        <th>추산건수</th>
                                        <th>면책건수</th>
                                        <th>보험금</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tableData.monthAccidentData.map((month, index) => (
                                        <tr key={index}>
                                            <td>{month.changeDay}</td>
                                            <td>{month.acceptNum}</td>
                                            <td>{month.endNum}</td>
                                            <td>{month.estimateNum}</td>
                                            <td>{month.disclaimerNum}</td>
                                            <td>{month.total}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}