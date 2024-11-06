'use client'
import Button from "@/app/components/common/ui/button";
import Plus from "@/assets/images/icon/plus-icon.png";
import Excel from "@/assets/images/icon/excel-icon.png";
import React, {useState, useRef} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {initialCounselData, changeCounselData, monthAccidentData, topCounselData, topBusinessData} from "@/config/data";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import EditableField from "@/app/components/common/ui/editField";
import useInputChange from "@/app/lib/customHook/inputChange";
import Tab from "@/app/components/common/ui/tab";
import {
    optionHiparkingBarHorizon,
    optionHiparkingDoughnut,
    optionHiparkingPie,
    optionHiparkingTwowayBar
} from "@/config/themeConfig";
import Image from "next/image";
import BarHorizonChart from "@/app/components/chart/BarHorizonChart";
import PieChart from "@/app/components/chart/PieChart";
import DayTerm from "@/app/components/common/ui/dayTerm";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddBusiness, { AddBusinessRef } from "@/app/components/page/hiparking/add-business";
import {DataState} from "@/@types/common";


interface ButtonConfig {
    label: string;
    onClick: () => void;
    color: "main" | "sub" | "blue" | "green" | "red" | "gray" | "dark-gray";
    fill?: boolean;
    rounded?: boolean;
    textSize?: number;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
}


export default function Page() {
    //사업장추가팝업
    const [isOpen, setIsOpen] = useState(false);
    const businessRef = useRef<AddBusinessRef>(null);
    const [param ,setParam] = useState();

    const handleConfirm = async () => {
        if (businessRef.current) {
            const isValid = await businessRef.current.validateForm();

            if (isValid) {
                const formData = businessRef.current.getFormData();
                if (window.confirm(`${formData.parkingName}사업장을 추가하시겠습니까?`)) {
                    const param = {
                        '로그아웃사용자': formData.parkingName,
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

    const [data, setData] = useState<DataState>({
        counselData: initialCounselData,
        changeData: changeCounselData,
    });
    const initialData = {
        counselData: [{name: '', age: ''}],
        changeData: [{status: ''}]
    }
    const {handleInputChange} = useInputChange(initialData);


    //도넛 차트
    const doughnutValue = data.counselData[0].lossRatio
    const dataDoughnut = {
        datasets: [
            {
                data: [doughnutValue, 100 - doughnutValue],
                backgroundColor: ["#f8a455", "#eeeeee"],
            },
        ],
    };

    //양방향 막대차트
    const dataTwowayBar = {
        labels: changeCounselData.map((d) => d.cDay),
        datasets: [
            {
                label: '추가',
                data: changeCounselData.map((d) => d.pAdd),
                backgroundColor: '#fdae68',
            },
            {
                label: '종료',
                data: changeCounselData.map((d) => -d.pEnd),
                backgroundColor: '#fcd174',
            },
        ],
    };


    //원형차트
    const dataPieCounsel = {
        labels: ['정곡빌딩', '부산사학연금', '청주성모병원', '기타'],
        datasets: [
            {
                data: [38, 26, 11, 25],
                backgroundColor: ['#f1923e', '#fdae68', '#efb944', '#fcd174'],
            },
        ],
    };
    const dataPieAccident = {
        labels: ['제2주차장', '청주공항주차장', '서울스퀘어', '기타'],
        datasets: [
            {
                data: [21, 16, 14, 49],
                backgroundColor: ['#f1923e', '#fdae68', '#efb944', '#fcd174'],
            },
        ],
    };


    //tab
    const tabs = [
        {
            label: '지급보험금',
            content: (
                <>
                    <div className={'my-5 font-medium text-lg'}>지급보험금 TOP 5</div>
                    <BarHorizonChart data={topCounselData} options={optionHiparkingBarHorizon}/>
                </>
            ),
        },
        {
            label: '사고발생업소',
            content: (
                <>
                    <div className={'my-5 font-medium text-lg'}>사고발생업소 TOP 5</div>
                    <BarHorizonChart data={topBusinessData}/>
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
                            <DoughnutChart data={dataDoughnut} options={optionHiparkingDoughnut}></DoughnutChart>
                            <div
                                className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'}>
                                <div className={'text-gray-600 mb-1'}>손해율</div>
                                <div className={'text-3xl font-semibold'}>{doughnutValue} %</div>
                            </div>
                        </div>
                        <div className={'mt-4 text-right'}>
                            <div className={'text-gray-600'}>지급보험금</div>
                            <div className={'text-3xl font-bold'}>{FormatNumber(data.counselData[0].closingAmt)}</div>
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
                                    <col style={{width: "200px"}}/>
                                    <col style={{width: ""}}/>
                                </colgroup>
                                <thead className={'sticky left-0 top-0'}>
                                <tr>
                                    <th>증권번호</th>
                                    <th>보험기간</th>
                                    <th>사업장수</th>
                                    <th>가입보험료</th>
                                    <th>변경보험료</th>
                                    <th>총보험료</th>
                                    <th>지급보험료</th>
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
                                                value={counsel.estimateAmt}
                                                onChange={(value) => handleInputChange(index, 'estimateAmt', value)}
                                            />
                                        </td>
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
                        <BarTwowayChart data={dataTwowayBar} options={optionHiparkingTwowayBar}/>
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
                                <div className={'text-3xl font-bold mt-2 text-end'}>168,178,432 <span
                                    className={'text-xl font-semibold'}>원</span></div>
                            </div>
                            <PieChart data={dataPieCounsel} options={optionHiparkingPie}></PieChart>
                        </div>
                        <div className={'flex justify-between relative'}>
                            <div className={'absolute w-[220px]'}>
                                <div className={'flex justify-between'}>
                                    <div className={'text-gray-700'}>월 누적 사고접수</div>
                                    <div className={'text-red-500 font-medium'}>- 10%</div>
                                </div>
                                <div className={'text-3xl font-bold mt-2 text-end'}>7 <span
                                    className={'text-xl font-semibold'}>건</span></div>
                            </div>
                            <PieChart data={dataPieAccident} options={optionHiparkingPie}></PieChart>
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
                                    {monthAccidentData.map((month, index) => (
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