'use client'
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import {optionDoughnut} from "@/config/data";
import CountUp from "@/app/components/common/ui/countUp";
import React, {useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import SelectIcon from "@/assets/images/icon/select-icon.png";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import Tab from "@/app/components/common/ui/tab";
import BarLineChart from "@/app/components/chart/BarLineChart";
import BarStandChart from "@/app/components/chart/BarStandChart";

export default function DashboardComponents({
                                                tableData,
                                                chartData,
                                                setParam
                                            }) {

    const [isOpen, setIsOpen] = useState(false);

    const barData = [65, 70, 75, 68, 72, 78, 80, 74, 85, 76, 70, 69]; // 손해율
    const lineData1 = [120, 115, 125, 130, 120, 135, 150, 140, 170, 145, 135, 125]; // 보험금
    const lineData2 = [180, 175, 190, 185, 172, 195, 205, 195, 210, 185, 180, 175]; // 보험료
    const months = ['2025-03', '2025-02', '2025-01', '2024-12', '2024-11', '2024-10', '2024-09', '2024-08', '2024-07', '2024-06', '2024-05', '2024-04'];


    const tabs = [
        {
            label: '월별 추이 현황',
            content: (
                <>
                    <div className={'flex justify-end'}>
                        <DayTerm type="month" setParam={setParam}></DayTerm>
                    </div>
                    <BarLineChart
                        barData={barData}
                        lineData1={lineData1}
                        lineData2={lineData2}
                        labels={months}
                        height={350}
                        barLabel="손해율"
                        line1Label="보험금"
                        line2Label="보험료"
                    />
                </>
            ),
        },
        {
            label: '년도별 추이 현황',
            content: (
                <>
                    <div className={'flex justify-end'}>
                        <DayTerm type="month" setParam={setParam}></DayTerm>
                    </div>
                    <div>그래프자리dkdkk</div>
                </>
            ),
        },
    ]

    const data = {
        labels: ['2025-03', '2025-02', '2025-01', '2024-12', '2024-11'],
        datasets: [
            {
                label: '인입건',
                data: [12, 19, 3, 5, 1],
                backgroundColor: '#ffd459',
            },
            {
                label: '접수건',
                data: [8, 15, 7, 9, 5],
                backgroundColor: '#a9a1a1',
            },
        ],
    };


    return (
        <div className={'space-y-5'}>
            <div className={'flex space-x-5'}>
                <div className={'px-8 py-6 bg-white rounded-xl w-[500px]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>기간별 현황</div>
                    </div>
                    <div className={'flex justify-end'}>
                        <DayTerm type="month" setParam={setParam}></DayTerm>
                    </div>
                    <div className={'flex items-end'}>
                        <div className={'w-[200px] mr-16'}>
                            <div className={'relative'}>
                                <DoughnutChart data={chartData.doughnut} options={optionDoughnut}></DoughnutChart>
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
                    <div className={'flex ml-[230px]'}>
                        <div className="relative w-40">
                            <button
                                className="w-[200px] flex items-center justify-between px-3 py-2 rounded bg-white"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                증권을 선택하세요
                                <img src={SelectIcon.src} alt="선택" width={12} height={12}></img>

                            </button>
                            {isOpen && (
                                <ul className="absolute left-0 w-[200px] bg-white border mt-1 rounded-lg shadow-md">
                                    <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">FA20247350967000</li>
                                    <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">FA20237350967000</li>
                                    <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">FA20227350967000</li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className={'flex items-end'}>
                        <div className={'w-[200px] mr-16'}>
                            <div className={'relative'}>
                                <DoughnutChart data={chartData.doughnut} options={optionDoughnut}></DoughnutChart>
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
                    <div className={'flex justify-end'}>
                        <DayTerm type="month" setParam={setParam}></DayTerm>
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
                                    <th>당월손해율</th>
                                    <th>누적손해율</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.counselData.map((counsel, index) => (
                                    <tr key={index}>
                                        <td>{counsel.pNo}</td>
                                        <td>{counsel.sDay + '-' + counsel.eDay}</td>
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
                    <BarStandChart data={data}/>
                </div>
                <div className={'px-8 py-6 bg-white rounded-xl w-[calc(100%-830px)]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>사고내용</div>
                    </div>
                    <div className={'flex justify-end'}>
                        <DayTerm type="month" setParam={setParam}></DayTerm>
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
                                        <td>{counsel.sDay + '-' + counsel.eDay}</td>
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
            <div className={'px-8 py-6 bg-white rounded-xl my-5 w-[calc(100%-45px)] mx-8'}>
                <Tab tabs={tabs}/>
            </div>
        </div>
    )
}