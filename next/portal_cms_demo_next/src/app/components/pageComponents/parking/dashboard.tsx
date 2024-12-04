'use client'
import Button from "@/app/components/common/ui/button";
import Excel from "@/assets/images/icon/excel-icon.png";
import "react-datepicker/dist/react-datepicker.css";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import EditableField from "@/app/components/common/ui/editField";
import useInputChange from "@/app/lib/customHook/inputChange";
import Tab from "@/app/components/common/ui/tab";
import Image from "next/image";
import CarIcon from '@/assets/images/icon/car-icon.png'
import ChargeIcon from '@/assets/images/icon/charge-icon.png'
import BarHorizonChart from "@/app/components/chart/BarHorizonChart";
import DayTerm from "@/app/components/common/ui/dayTerm";
import {
    ChangeCounselData,
    ChangeGraph,
    CounselData,
    MonthAccidentData,
    MonthCumulativeData, ParamDashType2,
} from "@/@types/common";
import CountUp from "@/app/components/common/ui/countUp";
import {TooltipItem} from "chart.js";
import {optionBarHorizon, optionDoughnut} from "@/config/data";

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
    tableData: {
        counselData: CounselData[];
        changeData: ChangeCounselData[];
        monthAccidentData: MonthAccidentData[];
        changeGraphData: ChangeGraph[];
        monthCumulativeData: MonthCumulativeData[];
    }
    setParam: (newParams: Partial<ParamDashType2>) => void;
}


export default function DashboardComponent({
                                            chartData,
                                            tableData, setParam,
                                           }: DashboardProps) {

    //table 데이터
    const {handleInputChange} = useInputChange({
        counselData: [{name: '', age: ''}],
        changeData: [{status: ''}]
    });



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
                        if(tableData.changeGraphData[dataIndex]){
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
                        return '데이터 없음'
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
                    <BarHorizonChart data={chartData.topCounsel} options={optionBarHorizon}/>
                </>
            ),
        },
        {
            label: '사고발생업소',
            content: (
                <>
                    <div className={'my-5 font-medium text-lg'}>사고발생업소 TOP 5</div>
                    <BarHorizonChart data={chartData.topBusiness}  options={optionBarHorizon}/>
                </>
            ),
        },
    ]


    return (
        <>
            <div className={'px-8 py-6 bg-white rounded-xl'}>
                <div className={'text-xl font-light mb-6'}>계약현황</div>
                <div className={'flex'}>
                    <div className={'w-[200px] mr-16'}>
                        <div className={'relative'}>
                            <DoughnutChart data={chartData.doughnut} options={optionDoughnut}></DoughnutChart>
                            <div
                                className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'}>
                                <div className={'text-gray-600 mb-1'}>손해율</div>
                                <CountUp end={chartData.doughnutValue} duration={5} className={'text-3xl font-semibold'} suffix={'%'}/>
                            </div>
                        </div>
                        <div className={'mt-4 text-right'}>
                            <div className={'text-gray-600'}>지급보험금</div>
                            <CountUp end={(tableData) && (tableData.counselData[0].closingAmt)  ? FormatNumber(tableData.counselData[0].closingAmt) : 0} duration={2} className={'text-3xl font-semibold'} suffix={'원'}/>
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
                                   {/* <th>변경보험료</th>*/}
                                    <th>총보험료</th>
                                    <th>지급보험금</th>
                                    <th>손조비용</th>
                                    <th>손해율</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.counselData.map((counsel, index) => (
                                    <tr key={index}>
                                        <td>{counsel.pNo}</td>
                                        <td>{counsel.sDay + '~' + counsel.eDay}</td>
                                        <td>{counsel.bCount}</td>
                                        {/*<td className={'text-right'}>
                                            <EditableField
                                                type={'number'}
                                                value={counsel.repairAmt}
                                                onChange={(value) => handleInputChange(index, 'repairAmt', value)}
                                            />
                                        </td>*/}
                                        <td className={'text-right'}>
                                            <EditableField
                                                type={'number'}
                                                value={counsel.total}
                                                onChange={(value) => handleInputChange(index, 'total', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                type={'number'}
                                                value={counsel.closingAmt}
                                                onChange={(value) => handleInputChange(index, 'closingAmt', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                type={'number'}
                                                value={counsel.repairCost}
                                                onChange={(value) => handleInputChange(index, 'repairCost', value)}
                                            />
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
                <div className={'text-xl font-light mb-6'}>계약변경현황</div>
                <div className={'flex'}>
                    <div className={'w-[1000px] mr-16'}>
                        <div className={'mb-5 font-medium text-lg'}>{`최근 ${tableData.changeGraphData.length}개월 계약변경현황`}</div>
                        <BarTwowayChart data={chartData.twowayBar} options={optionTwowayBar}/>
                    </div>
                    <div className={'w-full'}>
                        <div className={"flex justify-end mb-4 text-xl"}>
                            <DayTerm type="month" setParam={setParam}></DayTerm>
                        </div>
                        <div className={'max-h-[260px] overflow-y-auto'}>
                            <table className={'w-full relative'}>
                                <colgroup>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: ""}}/>
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: "200px"}}/>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'flex'}>
                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/6'}>
                    <div className={'text-xl font-light mb-6'}>월 누적 현황</div>
                    <div>
                        <div className={'my-10 bg-white shadow-lg px-5 py-5 rounded-xl'}>
                            <div className={'w-full'}>
                                <Image src={ChargeIcon} alt={'보험금아이콘'} width={30} height={30} className={'my-4'}/>
                                <div className={'text-gray-700 mb-2'}>월 누적 지급보험금</div>
                                <div className={'flex justify-end'}>
                                    <div
                                        className={tableData.monthCumulativeData[0].total_percent_change > 0 ? 'text-blue-500 font-medium' : 'text-red-500 font-medium'}
                                    >{tableData.monthCumulativeData[0].total_percent_change}</div>
                                </div>
                                <div className={'flex justify-between items-end'}>
                                    <CountUp
                                        end={tableData.monthCumulativeData[0]?.total ? FormatNumber(tableData.monthCumulativeData[0].total) : 0}
                                        duration={2} className={'text-3xl font-semibold'}/>
                                    <span className={'text-xl font-semibold ml-5'}> 원</span>
                                </div>
                            </div>
                        </div>
                        <div className={'my-10 bg-white shadow-lg px-5 py-5 rounded-xl'}>
                            <div className={'w-full'}>
                                <Image src={CarIcon} alt={'사고아이콘'} width={30} height={30} className={'my-4'}/>
                                <div className={'text-gray-700 mb-2'}>월 누적 사고접수</div>
                                <div className={'flex justify-end'}>
                                    <div
                                        className={tableData.monthCumulativeData[0].counts_percent_change > 0 ? 'text-blue-500 font-medium' : 'text-red-500 font-medium'}
                                    >{tableData.monthCumulativeData[0].counts_percent_change}</div>
                                </div>
                                <div className={'flex justify-between items-end'}>
                                    <CountUp
                                        end={tableData.monthCumulativeData[0]?.counts ? FormatNumber(tableData.monthCumulativeData[0].counts) : 0}
                                        duration={5} className={'text-3xl font-semibold'}/>
                                    <span className={'text-xl font-semibold ml-5'}> 건</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-2/6 mx-8'}>
                    <div className={'flex justify-between'}>
                        <div className={'text-xl font-light mb-6'}>Top 5</div>
                        <div className={"flex justify-end mb-4 text-xl"}>
                            <DayTerm type="month" setParam={setParam}></DayTerm>
                        </div>
                    </div>
                    <Tab tabs={tabs}/>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/2'}>
                    <div>
                        <div className={'flex justify-between'}>
                            <div className={'text-xl font-light mb-6'}>월별 사고접수현황</div>
                            <div className={"flex justify-end mb-4 text-xl"}>
                                <DayTerm type="month" setParam={setParam}></DayTerm>
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <div className={"flex justify-end mb-4"}>
                                <Button color={"green"} height={36} width={120}>
                                    <Image src={Excel.src} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                                    엑셀다운
                                </Button>
                            </div>
                            <div className={'max-h-[205px] overflow-y-auto'}>
                                <table className={'w-full relative'}>
                                    <thead className={'sticky left-0 top-0'}>
                                    <tr>
                                        <th>변경일</th>
                                        <th>접수건수</th>
                                        <th>종결건수</th>
                                        <th>보험금</th>
                                        <th>면책건수</th>
                                        <th>미결건수</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tableData.monthAccidentData.map((month, index) => (
                                        <tr key={index}>
                                            <td>{month.changeDay}</td>
                                            <td>{month.acceptNum}</td>
                                            <td>{month.endNum}</td>
                                            <td>{month.counselConst}</td>
                                            <td>{month.disclaimerNum}</td>
                                            <td>{month.suspense}</td>
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