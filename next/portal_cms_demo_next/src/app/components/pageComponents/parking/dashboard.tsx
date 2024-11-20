'use client'
import Button from "@/app/components/common/ui/button";
import Plus from "@/assets/images/icon/plus-icon.png";
import Excel from "@/assets/images/icon/excel-icon.png";
import React, {useState, useRef, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import EditableField from "@/app/components/common/ui/editField";
import useInputChange from "@/app/lib/customHook/inputChange";
import Tab from "@/app/components/common/ui/tab";
import Image from "next/image";
import BarHorizonChart from "@/app/components/chart/BarHorizonChart";
import PieChart from "@/app/components/chart/PieChart";
import DayTerm from "@/app/components/common/ui/dayTerm";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddBusiness, { AddBusinessRef } from "@/app/components/pageComponents/parking/add-business";
import {ChangeCounselData, CounselData, MonthAccidentData, ParamType} from "@/@types/common";
import {getDashBoard} from "@/app/(Navigation-Group)/hiparking/action";
import CountUp from "@/app/components/common/ui/countUp";
import {TooltipItem} from "chart.js";
import {Context} from "chartjs-plugin-datalabels";

interface DashboardProps {
    chartData: {
        doughnut: any;
        doughnutValue: number; //손해율 데이터 props 전달 수정
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
    }
}


export default function DashboardComponent({
                                            chartData,
                                            tableData
                                           }: DashboardProps) {
    //사업장추가팝업
    const [isOpen, setIsOpen] = useState(false);
    const businessRef = useRef<AddBusinessRef>(null);
    const [param ,setParam] = useState<ParamType>();

    const handleConfirm = async () => {
        if (businessRef.current) {
            const isValid = await businessRef.current.validateForm();

            if (isValid) {
                const formData = businessRef.current.getFormData();
                if (window.confirm(`${formData.parkingName}사업장을 추가하시겠습니까?`)) {
                    const param = {
                        '주차장명': formData.parkingName,
                        '주차장주소:': formData.parkingAddress,
                        '옥내:': formData.indoor.checked ? formData.indoor.value : '',
                        '옥외:': formData.outdoor.checked ? formData.outdoor.value : '',
                        '기계식:': formData.mechanical.checked ? formData.mechanical.value : '',
                        '카리프트:': formData.carLift.checked ? formData.carLift.value : ''
                    };
                    console.log(param);
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                    console.log('저장취소');
                }
            }
        }
    };

    const handleClose = () => {
        if (businessRef.current) {
            businessRef.current.clearForm();
        }
        setIsOpen(false);
    };

    const popupButton = [
        {
            label: "확인",
            onClick: handleConfirm,
            color: "main" as const,
            fill: true,
            width: 130,
            height: 40
        },
        {
            label: "취소",
            onClick: handleClose,
            color: "gray" as const,
            width: 130,
            height: 40
        }
    ];

    //table 데이터
    const [data, setData] = useState(tableData);
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
                        if (datasetIndex === 0) {
                            return [
                                `추가 사업장: ${data.changeData[dataIndex].pAdd}`,
                                `추가 보험금: ${data.changeData[dataIndex].AddAmt.toLocaleString()} 원`,
                            ];
                        } else {
                            return [
                                `종료 사업장: ${data.changeData[dataIndex].pEnd}`,
                                `감소 보험금: ${data.changeData[dataIndex].EndAmt.toLocaleString()} 원`,
                            ];
                        }
                    },
                },
            },
        },
    };

     //가로막대 옵션
     const optionBarHorizon = {
        indexAxis: 'y' as const,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 15,
                    },
                },
            },
        },
        layout: {
            padding: {
                right: 60,
            },
        },
        cutout: '75%',
    };

     //도넛차트 옵션
     const optionDoughnut = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
        },
        cutout: '75%',
    };

     //원형차트 옵션
    const optionPie = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: 'black',
                bodyColor: 'black',
                borderWidth: 1,
                borderColor: '#e7e7e7',
                bodyAlign: 'center',
                titleAlign: 'center',
                position: 'nearest',
                yAlign: 'bottom',
            },
            datalabels: {
                formatter: function (value: number, context: Context) {
                    const dataset = context.chart.data.datasets[0];
                    const total = dataset.data.reduce((acc: number, val: unknown) => acc + (typeof val === 'number' ? val : 0), 0);
                    if (total === 0) return '0%';
                    const percentage = ((value / total) * 100).toFixed(0) + "%";
                    return percentage;
                },
                color: '#fff',
                anchor: 'center',
                align: 'center',
                font: {
                    size: 15,
                    weight: 'normal',
                },
            },
        },
        responsive: false,
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

    useEffect(() => {
        async function fetchData(){
            try {
                console.log(param);
                const result = await getDashBoard({'job' : 'dash','bpk' : '2','sDay': '2024-09', 'eDay' :'2024-11'});
                console.log(result);
            }   catch(e){
                console.log(e);
            }
        }

        fetchData();
    }, []);
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
                            <CountUp end={FormatNumber(data.counselData[0].closingAmt)} duration={2} className={'text-3xl font-semibold'} suffix={'원'}/>
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <div className={"flex justify-end mb-4"}>
                            <Button color={"main"} fill height={36} width={120} onClick={() => setIsOpen(true)}>
                                <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                                사업장 추가
                            </Button>
                        </div>
                        <CenterPopup
                            isOpen={isOpen}
                            onClose={handleClose}
                            title="사업장 추가"
                            Content={() => <AddBusiness ref={businessRef} />}
                            buttons={popupButton}
                        />
                        <div className={'max-h-[205px] overflow-y-auto'}>
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
                                    <th>변경보험료</th>
                                    <th>총보험료</th>
                                    <th>지급보험금</th>
                                    <th>손조비용</th>
                                    <th>손해율</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.counselData.map((counsel, index) => (
                                    <tr key={index}>
                                        <td>{counsel.pNo}</td>
                                        <td>{counsel.sDay + '~' + counsel.eDay}</td>
                                        <td>{counsel.bCount}</td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                type={'number'}
                                                value={counsel.repairAmt}
                                                onChange={(value) => handleInputChange(index, 'repairAmt', value)}
                                            />
                                        </td>
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
                        <div className={'mb-5 font-medium text-lg'}>최근 6개월 계약변경현황</div>
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
                                    <th>종료
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.changeData.map((changeData, index) => (
                                    <tr key={index}>
                                        <td>{changeData.cNo}</td>
                                        <td>{changeData.cDay}</td>
                                        <td>{changeData.pNo}</td>
                                        <td>
                                            <EditableField
                                                type={'number'}
                                                value={changeData.pAdd}
                                                onChange={(value) => handleInputChange(index, 'pAdd', value)}
                                            />
                                        </td>
                                        <td>
                                            <EditableField
                                                type={'number'}
                                                value={changeData.pEnd}
                                                onChange={(value) => handleInputChange(index, 'pEnd', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                type={'number'}
                                                value={changeData.AddAmt}
                                                onChange={(value) => handleInputChange(index, 'AddAmt', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                type={'number'}
                                                value={changeData.EndAmt}
                                                onChange={(value) => handleInputChange(index, 'EndAmt', value)}
                                            />
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
                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/4'}>
                    <div className={'flex justify-between'}>
                        <div className={'text-xl font-light mb-6'}>Top 5</div>
                        <div className={"flex justify-end mb-4 text-xl"}>
                            <DayTerm type="month" setParam={setParam}></DayTerm>
                        </div>
                    </div>
                    <Tab tabs={tabs}/>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/4 mx-8'}>
                    <div>
                        <div className={'text-xl font-light mb-6'}>월 누적</div>
                        <div className={'flex justify-between relative'}>
                            <div className={'absolute w-[220px]'}>
                                <div className={'flex justify-between'}>
                                    <div className={'text-gray-700'}>월 누적 지급보험금</div>
                                    <div className={'text-blue-500 font-medium'}>+ 23%</div>
                                </div>
                                <CountUp end={FormatNumber(data.counselData[0].closingAmt)} duration={2} className={'text-3xl font-semibold'}/>
                                <span className={'text-xl font-semibold'}> 원</span>
                            </div>
                            <PieChart data={chartData.pieCounsel} options={optionPie}></PieChart>
                        </div>
                        <div className={'flex justify-between relative'}>
                            <div className={'absolute w-[220px]'}>
                                <div className={'flex justify-between'}>
                                    <div className={'text-gray-700'}>월 누적 사고접수</div>
                                    <div className={'text-red-500 font-medium'}>- 10%</div>
                                </div>
                                <CountUp end={7} duration={5} className={'text-3xl font-semibold'}/>
                                <span className={'text-xl font-semibold'}>건</span>
                            </div>
                            <PieChart data={chartData.pieAccident} options={optionPie}></PieChart>
                        </div>
                    </div>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-2/4'}>
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
                                    <colgroup>
                                        <col style={{width: ""}}/>
                                        <col style={{width: ""}}/>
                                        <col style={{width: ""}}/>
                                        <col style={{width: ""}}/>
                                        <col style={{width: ""}}/>
                                        <col style={{width: ""}}/>
                                    </colgroup>
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
                                    {data.monthAccidentData.map((month, index) => (
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