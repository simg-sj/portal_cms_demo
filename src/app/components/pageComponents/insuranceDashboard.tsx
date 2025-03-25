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
    kakaoDashboard,
    ParamDashType2
} from "@/@types/common";

interface DashboardProps {
    chartData: {
        doughnut: any;
        doughnutValue: number;
        barStand: any;
        barMonthData: any;
        barYearData: any;
        barLine: any;
    };
    //수정해야됨 밑에 tableData, setParam
    tableData: {
        kakaoDashboard: kakaoDashboard[];
    }
    setParam: (newParams: Partial<ParamDashType2>) => void;
}

export default function DashboardComponents({
                                                tableData,
                                                chartData,
                                                setParam
                                            }: DashboardProps) {

    //증권 데이터
    const optionsCertificate = [
        "FA20247350967000",
        "FA20234719000000",
        "FA20221647354000",
        "FA20217790748000",
    ];

    const selectCertificate = (selected: string) => {
        console.log("선택된 값:", selected);
    };

    //월별추이 데이터
    const barMonthData = {
        barData: [65, 70, 75, 68, 72, 78, 80, 74, 85, 76, 70, 69],
        lineData1: [120, 115, 125, 130, 120, 135, 150, 140, 170, 145, 135, 125],
        lineData2: [180, 175, 190, 185, 172, 195, 205, 195, 210, 185, 180, 175],
        labels: ['2025-03', '2025-02', '2025-01', '2024-12', '2024-11', '2024-10', '2024-09', '2024-08', '2024-07', '2024-06', '2024-05', '2024-04'],
        barLabel: '손해율',
        line1Label: '보험금',
        line2Label: '보험료',
        configColor: {
            barColor1: '#ffe49c',
            lineColor1: '#a9a1a1',
            lineColor2: '#654f4f',
        }
    };
    //년도별추이 데이터
    const barYearData = {
        barData: [65, 70, 75, 68, 72],
        lineData1: [120, 115, 125, 130, 120],
        lineData2: [180, 175, 190, 185, 172],
        labels: ['2025', '2024', '2023', '2022', '2021'],
        barLabel: '손해율',
        line1Label: '보험금',
        line2Label: '보험료',
        configColor: {
            barColor1: '#ffe49c',
            lineColor1: '#a9a1a1',
            lineColor2: '#654f4f',
        }
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
                    <BarLineChart chartData={barMonthData}/>
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
                    <BarLineChart chartData={barYearData}/>
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
                    <div className={'flex items-end'}>
                        <div className={'w-[200px] mr-16'}>
                            <div className={'relative'}>
                                <DoughnutChart data={chartData.doughnut}></DoughnutChart>
                                <div
                                    className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'}>
                                    <div className={'text-gray-600 mb-1'}>손해율</div>
                                    <CountUp end={38} duration={5} className={'text-2xl font-semibold'}
                                             suffix={'%'}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험금</div>
                                <CountUp
                                    end={168178432}
                                    duration={2} className={'text-2xl font-semibold'} suffix={'원'}/>
                            </div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험료</div>
                                <CountUp
                                    end={375736378}
                                    duration={2} className={'text-2xl font-semibold'} suffix={'원'}/>
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
                    <div className={'flex items-end'}>
                        <div className={'w-[200px] mr-16'}>
                            <div className={'relative'}>
                                <DoughnutChart data={chartData.doughnut}></DoughnutChart>
                                <div
                                    className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'}>
                                    <div className={'text-gray-600 mb-1'}>손해율</div>
                                    <CountUp end={46} duration={5} className={'text-2xl font-semibold'}
                                             suffix={'%'}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험금</div>
                                <CountUp
                                    end={168178432}
                                    duration={2} className={'text-2xl font-semibold'} suffix={'원'}/>
                            </div>
                            <div className={'mt-4 text-right'}>
                                <div className={'text-gray-600'}>누적보험료</div>
                                <CountUp
                                    end={375736378}
                                    duration={2} className={'text-2xl font-semibold'} suffix={'원'}/>
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
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
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
                                {tableData.counselData.map((counsel, index) => (
                                    <tr key={index}>
                                        <td>{counsel.pNo}</td>
                                        <td>{counsel.sDay}</td>
                                        <td>{FormatNumber(Number(20508))}</td>
                                        <td>
                                        00 %
                                        </td>
                                        <td>
                                            00 %
                                        </td>
                                    </tr>
                                ))}
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
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
                                </colgroup>
                                <thead className={'sticky left-0 top-0'}>
                                <tr>
                                    <th rowSpan={2}>날짜</th>
                                    <th colSpan={2}>사고접수</th>
                                    <th rowSpan={2}>추산금액</th>
                                    <th rowSpan={2}>종결금액</th>
                                    <th rowSpan={2}>손해조사비용</th>
                                    <th rowSpan={2}>보험금</th>
                                    <th rowSpan={2}>누적보험금</th>
                                </tr>
                                <tr>
                                    <th>인입건</th>
                                    <th>접수건</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.counselData.map((counsel, index) => (
                                    <tr key={index}>
                                        <td>{counsel.sDay}</td>
                                        <td>12</td>
                                        <td>4</td>
                                        <td>{FormatNumber(Number(100000))}</td>
                                        <td>{FormatNumber(Number(100000))}</td>
                                        <td>{FormatNumber(Number(100000))}</td>
                                        <td>{FormatNumber(Number(100000))}</td>
                                        <td>{FormatNumber(Number(100000))}</td>
                                    </tr>
                                ))}
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