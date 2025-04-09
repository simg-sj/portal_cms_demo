'use client'
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import CountUp from "@/app/components/common/ui/countUp";
import React, {useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import SelectDropdown from "@/app/components/common/ui/input/selectDropDown";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import Tab from "@/app/components/common/ui/tab";
import BarLineChart from "@/app/components/chart/BarLineChart";
import BarStandChart from "@/app/components/chart/BarStandChart";
import Image from "next/image";
import Search from "@/assets/images/icon/detail-icon.png";
import YearRangePicker from "@/app/components/common/ui/calender/yearTerm";
import {
    dashboardMonthType, dashboardPolicyType, dashboardYearType,
    kakaoDashboard,
    ParamDashType2
} from "@/@types/common";
import Error from "@/assets/images/icon/error-icon.png";

interface DashboardProps {
    chartData: {
        monthDoughnut: any;
        yearDoughnut: any;
        barStand: any;
        barMonthData: any;
        barYearData: any;
    };
    //수정해야됨 밑에 tableData, setParam
    tableData: {
        kakaoDashboard: kakaoDashboard[];
        monthTermData: dashboardMonthType;
        policyData: dashboardPolicyType;
        yearData: dashboardYearType[];
    }
    setParam: (newParams: Partial<ParamDashType2>) => void;
}

export default function DashboardComponents({
                                                tableData,
                                                chartData,
                                                setParam
                                            }: DashboardProps) {


    //증권 임의 데이터에서 추출
    const optionsCertificate = Array.from(
        new Set(tableData.kakaoDashboard.map(item => item.policyNumber))
    );

    const selectCertificate = (selected: string) => {
        console.log("선택 증권:", selected);
    };

    //년도 선택범위
    const currentYear = new Date().getFullYear();

    const [selectedRange, setSelectedRange] = useState<{ startYear: number; endYear: number }>({
        startYear: currentYear - 4, // 5년 전부터
        endYear: currentYear, // 올해까지
    });

    const handleYearSelect = () => {
        console.log(`선택한 연도: ${selectedRange.startYear} ~ ${selectedRange.endYear}`);
    };
    
    const tabs = [
        {
            label: '월별 추이 현황',
            content: (
                <>
                    <div className={"flex justify-end items-center mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <DayTerm type="oneYear" setParam={setParam}></DayTerm>
                            <Image src={Search} alt={"검색"} width={22} height={20}
                                   className={'cursor-pointer ml-3'}></Image>
                        </div>
                    </div>
                    <BarLineChart chartData={chartData.barMonthData}/>
                </>
            ),
        },
        {
            label: '년도별 추이 현황',
            content: (
                <>
                    <div className={"flex justify-end items-center mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <YearRangePicker onSelect={setSelectedRange} minYear={2021}/>
                            <Image src={Search} alt={"검색"} width={22} height={20}
                                   className={'cursor-pointer ml-3'} onClick={handleYearSelect}></Image>
                        </div>
                    </div>
                    <BarLineChart chartData={chartData.barYearData}/>
                </>
            ),
        },
    ]


    return (
        <div className={'space-y-5'}>
            <div className={'flex space-x-5'}>
                <div className={'px-8 py-6 bg-white rounded-xl w-[500px]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>기간별 현황</div>
                    </div>
                    <div className={"flex justify-end mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <DayTerm type="oneYear" setParam={setParam}></DayTerm>
                            <Image src={Search} alt={"검색"} width={22} height={20}
                                   className={'cursor-pointer ml-3'}></Image>
                        </div>
                    </div>
                    <div className={'flex items-end justify-between'}>
                        <div className={'w-[200px] mr-16'}>
                            <div className={'relative'}>
                                <DoughnutChart data={chartData.monthDoughnut}></DoughnutChart>
                                <div
                                    className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'}>
                                    <div className={'text-gray-600 mb-1'}>손해율</div>
                                    <CountUp end={tableData.monthTermData.periodLossRatio} duration={5} className={'text-2xl font-semibold'}
                                             suffix={'%'}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험금</div>
                                <CountUp
                                    end={tableData.monthTermData.periodInsurancePayout}
                                    duration={2} className={'text-xl font-semibold'} suffix={'원'}/>
                            </div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험료</div>
                                <CountUp
                                    end={tableData.monthTermData.periodPremium}
                                    duration={2} className={'text-xl font-semibold'} suffix={'원'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'px-8 py-6 bg-white rounded-xl w-[500px]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>증권별 현황</div>
                    </div>
                    <div className={"flex justify-end mb-4 text-lg"}>
                        <div className="flex justify-end mb-4 text-lg border rounded-lg py-1">
                            <SelectDropdown options={optionsCertificate} defaultLabel="증권을 선택하세요"
                                            onSelect={selectCertificate}/>
                        </div>
                    </div>
                    <div className={'flex items-end justify-between'}>
                        <div className={'w-[200px] mr-16'}>
                            <div className={'relative'}>
                                <DoughnutChart data={chartData.yearDoughnut}></DoughnutChart>
                                <div
                                    className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'}>
                                    <div className={'text-gray-600 mb-1'}>손해율</div>
                                    <CountUp end={tableData.policyData.policyLossRatio} duration={5} className={'text-2xl font-semibold'}
                                             suffix={'%'}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험금</div>
                                <CountUp
                                    end={tableData.policyData.policyInsurancePayout}
                                    duration={2} className={'text-xl font-semibold'} suffix={'원'}/>
                            </div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험료</div>
                                <CountUp
                                    end={tableData.policyData.policyPremium}
                                    duration={2} className={'text-xl font-semibold'} suffix={'원'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'px-8 py-6 bg-white rounded-xl w-[calc(100%-1050px)]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>월별 손해율</div>
                    </div>
                    <div className={"flex justify-end mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <DayTerm type="month" setParam={setParam}></DayTerm>
                            <Image src={Search} alt={"검색"} width={22} height={20}
                                   className={'cursor-pointer ml-3'}></Image>
                        </div>
                    </div>
                    <div className={'w-full mt-3'}>
                        <div className={'max-h-[250px] overflow-y-auto'}>
                            <table className={'w-full relative'}>
                                <colgroup>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                </colgroup>
                                <thead className={'sticky left-0 top-0'}>
                                <tr>
                                    <th>증권번호</th>
                                    <th>날짜</th>
                                    <th>운행건</th>
                                    <th>당월손해율</th>
                                    <th>누적손해율</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData?.kakaoDashboard?.length ? (
                                    tableData.kakaoDashboard.map((kakao, index) => (
                                        <tr key={index}>
                                            <td>{kakao.policyNumber}</td>
                                            <td>{kakao.year + '-' + kakao.month}</td>
                                            <td>{FormatNumber(Number(kakao.tripCount))}</td>
                                            <td>{kakao.lossRatio}%</td>
                                            <td>{kakao.cumulativeLossRatio}%</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            <div className={'flex items-centers justify-center my-[30px]'}>
                                                <Image src={Error.src} alt={'에러'} width={30} height={30}
                                                       className={'mr-5'}/>
                                                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex space-x-5'}>
                <div className={'px-8 py-6 bg-white rounded-xl w-[800px]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>최근 6개월 사고접수 현황</div>
                    </div>
                    <BarStandChart data={chartData.barStand}/>
                </div>
                <div className={'px-8 py-6 bg-white rounded-xl w-[calc(100%-830px)]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>사고내용</div>
                    </div>
                    <div className={"flex justify-end mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <DayTerm type="month" setParam={setParam}></DayTerm>
                            <Image src={Search} alt={"검색"} width={22} height={20}
                                   className={'cursor-pointer ml-3'}></Image>
                        </div>
                    </div>
                    <div className={'w-full mt-3'}>
                        <div className={'max-h-[250px] overflow-y-auto'}>
                            <table className={'w-full relative'}>
                                <colgroup>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                </colgroup>
                                <thead className={'sticky left-0 top-0'}>
                                <tr>
                                    <th rowSpan={2}>날짜</th>
                                    <th colSpan={2}>사고접수</th>
                                    <th rowSpan={2}>추산금액</th>
                                    <th rowSpan={2}>종결금액</th>
                                    <th rowSpan={2}>손해조사비</th>
                                    <th rowSpan={2}>보험금</th>
                                    <th rowSpan={2}>누적보험금</th>
                                </tr>
                                <tr>
                                    <th>인입</th>
                                    <th>접수</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData?.kakaoDashboard?.length ? (
                                    tableData.kakaoDashboard.map((kakao, index) => (
                                        <tr key={index}>
                                            <td>{kakao.year + '-' + kakao.month}</td>
                                            <td>{kakao.inboundCaseCount}</td>
                                            <td>{kakao.receivedCaseCount}</td>
                                            <td>{FormatNumber(Number(kakao.estimatedAmount))}</td>
                                            <td>{FormatNumber(Number(kakao.settledAmount))}</td>
                                            <td>{FormatNumber(Number(kakao.investigationCost))}</td>
                                            <td>{FormatNumber(Number(kakao.insurancePayout))}</td>
                                            <td>{FormatNumber(Number(kakao.cumulativeInsurancePayout))}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            <div className={'flex items-centers justify-center my-[30px]'}>
                                                <Image src={Error.src} alt={'에러'} width={30} height={30}
                                                       className={'mr-5'}/>
                                                <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'px-8 py-6 bg-white rounded-xl my-5 w-[calc(100%-10px)]'}>
                <Tab tabs={tabs}/>
            </div>
        </div>
    )
}