'use client'
import Button from "@/app/components/common/ui/button/button";
import Excel from "@/assets/images/icon/excel-icon.png";
import "react-datepicker/dist/react-datepicker.css";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import Tab from "@/app/components/common/ui/tab";
import Image from "next/image";
import CarIcon from '@/assets/images/icon/car-icon.png'
import ChargeIcon from '@/assets/images/icon/charge-icon.png'
import BarHorizonChart from "@/app/components/chart/BarHorizonChart";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import {DashboardData, ParamDashType2,} from "@/@types/common";
import CountUp from "@/app/components/common/ui/countUp";
import React, {SetStateAction, useEffect, useState} from "react";
import CountCard from "@/app/components/common/CountCard";
import Search from "@/assets/images/icon/detail-icon.png"
import dayjs from "dayjs";
import {onClickExcel} from "@/app/lib/onClickExcel";
import {monthColumns, platformList, policyColumns} from "@/config/data";
import cn from "classnames";
import {useNotifications} from "@/context/NotificationContext";
import Notifications from "@/app/components/popup/Notifications";
import EmptyDataWrapper from "@/app/components/common/ui/input/EmptyDataWrapper";
import ContractComponent from "@/app/components/pageComponents/parking/contractChange";
import ErrorChart from "@/app/components/pageComponents/parking/errorChart";

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
    bpk: number;
    tableData: DashboardData;
    setDoughnutValue: React.Dispatch<SetStateAction<number | null>>;
    updateTableData: (param: ParamDashType2, type: string) => Promise<string>;
}

interface DoughnutValueType {
    lossRatio: number
    closingAmt: number
}

export default function DashboardComponent({
                                               chartData,
                                               tableData,
                                               bpk,
                                               updateTableData,
                                               setDoughnutValue,
                                           }: DashboardProps) {
    //업체별 라우팅 옵션
    const {showAlert} = useNotifications();
    const {renewals} = useNotifications(); // 알림 데이터 가져오기
    const [donutValues, setDounutValues] = useState<DoughnutValueType>({
        lossRatio: tableData.counselData.at(-1).lossRatio,
        closingAmt: tableData.counselData.at(-1).closingAmt,
    })

    const [param, setParam] = useState<ParamDashType2>({
        job: 'dash',
        bpk: bpk,
        gbn: '',
        pNo: '',
        sDay: dayjs().subtract(5, 'month').format('YYYY-MM'),
        eDay: dayjs().format('YYYY-MM')
    })
    const [days, setDays] = useState([
        {
            type: 'contract',
            sDay: dayjs().subtract(5, 'month').format('YYYY-MM'),
            eDay: dayjs().format('YYYY-MM')
        },
        {
            type: 'top',
            sDay: dayjs().subtract(5, 'month').format('YYYY-MM'),
            eDay: dayjs().format('YYYY-MM')
        },
        {
            type: 'month',
            sDay: dayjs().subtract(5, 'month').format('YYYY-MM'),
            eDay: dayjs().format('YYYY-MM')
        }
    ]);
    const handleParam = async (type: string, param: ParamDashType2) => {
        let code = await updateTableData(param, type);

        if (code === '401') {
            showAlert('데이터가 없습니다.');
        }
    };

    const handleDoughnut = async (counsel) => {
        const pNo = counsel.pNo;

        setParam({...param, pNo});


        // ✅ 도넛 차트용 값만 로컬 상태에 반영
        setDounutValues({
            lossRatio: counsel.lossRatio,
            closingAmt: counsel.closingAmt,
        });

        setDoughnutValue(counsel.lossRatio);
    };

    useEffect(() => {
        if (tableData?.counselData?.length > 0) {
            const maxLossItem = tableData.counselData.reduce((prev, curr) =>
                curr.total > prev.total ? curr : prev
            );


            // 상태 업데이트
            setDounutValues({
                lossRatio: maxLossItem.lossRatio,
                closingAmt: maxLossItem.closingAmt,
            });

            setDoughnutValue(maxLossItem.lossRatio); // 도넛 차트에도 반영

            setParam((prev) => ({
                ...prev,
                pNo: maxLossItem.pNo,
            }));
        }

    }, []);

    useEffect(() => {
        updateTableData(param, 'init');
    }, [param.pNo]);


    return (
        <>
            <div className={'px-8 py-6 bg-white rounded-xl'}>
                <div className={'flex justify-between items-start'}>
                    <div className={'text-lg font-light mb-6'}>계약현황</div>
                    <Button color={"green"} height={32} width={120}
                            onClick={() => onClickExcel(policyColumns, 'policy', tableData.counselData, '증권별_손해자료.xlsx')}>
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
                                    <col style={{width: "300px"}}/>
                                    <col style={{width: "100px"}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "100px"}}/>
                                </colgroup>
                                <thead className={'sticky left-0 top-0'}>
                                <tr>
                                    <th>증권번호</th>
                                    <th>별칭</th>
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
                                    <tr key={index} onClick={() => handleDoughnut(counsel)}
                                        className={cn('cursor-pointer hover:bg-main-lighter', {'bg-main-lighter': param.pNo === counsel.pNo})}>
                                        <td>{counsel.pNo}</td>
                                        <td className={'break-keep'}>{counsel.nickName}</td>
                                        <td className={'break-keep'}>{counsel.sDay + ' ~ ' + counsel.eDay}</td>
                                        <td>{counsel.bCount}</td>
                                        <td className={'text-center'}>
                                            {Number(counsel.total).toLocaleString()}원
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

            <div className={'flex space-x-8'}>
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

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-5/6'}>
                    <div>
                        <div className={'flex justify-between'}>
                            <div className={'text-lg font-light mb-6'}>월별 사고접수현황</div>
                            <div className={"flex justify-end mb-4 text-lg"}>
                                <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                                    <DayTerm type="month" condition={'month'} sDay={new Date(days[2].sDay)}
                                             eDay={new Date(days[2].eDay)} setDays={setDays}
                                             setParam={setParam}></DayTerm>
                                    <button onClick={() => handleParam('month', param)}>
                                        <Image src={Search} alt={"검색"} width={22} height={20}
                                               className={'cursor-pointer ml-3'}></Image>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <div className={"flex justify-end mb-4"}>
                                <Button color={"green"} height={32} width={120}
                                        onClick={() => onClickExcel(monthColumns, 'month', tableData.monthAccidentData, '월별_사고접수_현황.xlsx')}>
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
                                    <EmptyDataWrapper data={tableData.monthAccidentData}>
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
                                    </EmptyDataWrapper>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    renewals.length > 0 &&
                    <Notifications/>
                }
            </div>

            <div className={'flex space-x-8'}>
                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/2'}>
                    <div className={'flex justify-between'}>
                        <div className={'text-lg font-light mb-6'}>지금보험금 Top 5</div>
                        <div className={"flex justify-end mb-4 text-lg"}>
                            <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                                <DayTerm type="month" condition={'top'} sDay={new Date(days[1].sDay)}
                                         eDay={new Date(days[1].eDay)} setDays={setDays} setParam={setParam}></DayTerm>
                                <button onClick={() => handleParam('top', param)}>
                                    <Image src={Search} alt={"검색"} width={22} height={20}
                                           className={'cursor-pointer ml-3'}></Image>
                                </button>
                            </div>
                        </div>
                    </div>
                    <BarHorizonChart data={chartData.topCounsel}/>
                </div>
                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/2'}>
                    <div className={'flex justify-between'}>
                        <div className={'text-lg font-light mb-6'}>사고발생업소 Top 5</div>
                        <div className={"flex justify-end mb-4 text-lg"}>
                            <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                                <DayTerm type="month" condition={'top'} sDay={new Date(days[1].sDay)}
                                         eDay={new Date(days[1].eDay)} setDays={setDays} setParam={setParam}></DayTerm>
                                <button onClick={() => handleParam('top', param)}>
                                    <Image src={Search} alt={"검색"} width={22} height={20}
                                           className={'cursor-pointer ml-3'}></Image>
                                </button>
                            </div>
                        </div>
                    </div>
                    <BarHorizonChart data={chartData.topBusiness}/>
                </div>
            </div>
        </>
    )
}