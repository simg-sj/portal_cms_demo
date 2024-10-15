'use client'
import Button from "@/app/components/common/button";
import Plus from "@/assets/images/icon/plus-icon.png";
import Download from "@/assets/images/icon/download-icon.png";
import React, {useEffect, useState} from "react";
import YearMonthPicker from "@/app/components/common/YearMonthPicker";
import "react-datepicker/dist/react-datepicker.css";
import {initialCounselData, changeCounselData, monthAccidentData} from "@/config/data";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import BarTwowayChart from "@/app/components/chart/BarTwowayChart";
import FormatNumber from "@/app/components/common/formatNumber";
import EditableField from "@/app/components/common/EditField";
import useInputChange from "@/app/lib/customHook/inputChange";
import Tab from "@/app/components/common/tab";
import {optionDoughnut, optionTwowayBar} from "@/config/themeConfig";
import Image from "next/image";
import BarHorizonChart from "@/app/components/chart/BarHorizonChart";

interface DataState {
    counselData: CounselData[];
    changeData: ChangeCounselData[];
};

const topCounselData = {
    labels: ['정곡빌딩', '부산 사학연금', '청주성모병원', '서울스퀘어', '일산국립암센터'],
    values: [2535000, 2282000, 1650000, 1609000, 1150000],
};

const topBusinessData = {
    labels: ['F1963 1 주차장', '가든호텔', '그랜드하얏인천', '그레이츠판교', '명지병원'],
    values: [4, 3, 3, 2, 1],
};


export default function Page() {
    const data :DataState = {
        counselData: initialCounselData,
        changeData: changeCounselData,
    };
    const initialData = {
        counselData: [{name: '', age: ''}],
        changeData: [{status: ''}]
    }
    const {handleInputChange} = useInputChange(initialData);

    //기간 시작일, 종료일 조건지정
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date && endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
        if (date && startDate && date < startDate) {
            setStartDate(null);
        }
    };

    //기간 3개월단위
    useEffect(() => {
        const threeMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
        setStartDate(threeMonthsAgo);
        setEndDate(new Date());
    }, []);

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

    //tab
    const tabs = [
        {
            label: '지급보험금',
            content: (
                <BarHorizonChart data={topCounselData} bgClass={'#fcd174'}/>
            ),
        },
        {
            label: '사고발생업소',
            content: (
                <BarHorizonChart data={topBusinessData} bgClass={'#fcd174'}/>
            ),
        },
    ]

    return (
        <>
            <div className={'text-xl font-bold'}>현황 대시보드</div>
            <div className={'px-8 py-6 bg-white rounded-xl my-5'}>
                <div className={'text-xl font-light mb-6'}>계약현황</div>
                <div className={'flex'}>
                    <div className={'w-[200px] mr-16'}>
                        <div className={'relative'}>
                            <DoughnutChart data={dataDoughnut} options={optionDoughnut}></DoughnutChart>
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
                            <Button color={"main"} fill height={36} width={120}>
                                <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                                사업장 추가
                            </Button>
                        </div>
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
                                    <th>가입보험료</th>
                                    <th>변경보험료</th>
                                    <th>총보험료</th>
                                    <th>지급보험료</th>
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
                                        <td>{counsel.lossRatio}</td>
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
                        <BarTwowayChart data={dataTwowayBar} options={optionTwowayBar}/>
                    </div>
                    <div className={'w-full'}>
                        <div className={"flex justify-end mb-4 text-xl"}>
                            <YearMonthPicker
                                maxDate={endDate || new Date()}
                                minDate={undefined}
                                selected={startDate}
                                onChange={handleStartDateChange}
                            />
                            <div className={'font-bold'}>~</div>
                            <YearMonthPicker
                                maxDate={new Date()}
                                minDate={startDate || undefined}
                                selected={endDate}
                                onChange={handleEndDateChange}
                            />
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
                            <YearMonthPicker
                                maxDate={endDate || new Date()}
                                minDate={undefined}
                                selected={startDate}
                                onChange={handleStartDateChange}
                            />
                            <div className={'font-bold'}>~</div>
                            <YearMonthPicker
                                maxDate={new Date()}
                                minDate={startDate || undefined}
                                selected={endDate}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </div>
                    <Tab tabs={tabs}/>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-1/4 mx-8'}>
                    <div>
                        <div className={'text-xl font-light mb-6'}>월 누적</div>
                        <div className={'flex justify-between'}>
                            <div className={'w-3/5'}>
                                <div className={'flex justify-between'}>
                                    <div className={'text-gray-700'}>지급보험금</div>
                                    <div className={'text-blue-500 font-medium'}>+ 23%</div>
                                </div>
                                <div className={'text-3xl font-bold mt-2 text-end'}>168,178,432 <span
                                    className={'text-xl font-semibold'}>원</span></div>
                            </div>

                        </div>
                        <div className={'flex justify-between mt-10'}>
                            <div className={'w-3/5'}>
                                <div className={'flex justify-between'}>
                                    <div className={'text-gray-700'}>사고접수</div>
                                    <div className={'text-red-500 font-medium'}>- 10%</div>
                                </div>
                                <div className={'text-3xl font-bold mt-2 text-end'}>7 <span
                                    className={'text-xl font-semibold'}>건</span></div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={'px-8 py-6 bg-white rounded-xl my-5 w-2/4'}>
                    <div>
                        <div className={'flex justify-between'}>
                            <div className={'text-xl font-light mb-6'}>월별 사고접수현황</div>
                            <div className={"flex justify-end mb-4 text-xl"}>
                                <YearMonthPicker
                                    maxDate={endDate || new Date()}
                                    minDate={undefined}
                                    selected={startDate}
                                    onChange={handleStartDateChange}
                                />
                                <div className={'font-bold'}>~</div>
                                <YearMonthPicker
                                    maxDate={new Date()}
                                    minDate={startDate || undefined}
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <div className={"flex justify-end mb-4"}>
                                <Button color={"green"} fill height={36} width={120}>
                                    <Image src={Download.src} alt={'다운로드'} width={16} height={16} className={'mr-2'}/>
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