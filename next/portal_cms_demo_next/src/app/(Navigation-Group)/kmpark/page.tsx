'use client'
import Button from "@/app/components/common/ui/button";
import Plus from "@/assets/images/icon/plus-icon.png";
import React, {useState} from "react";
import YearMonthPicker from "@/app/components/common/ui/yearMonthPicker";
import "react-datepicker/dist/react-datepicker.css";
import {initialCounselData, changeCounselData} from "@/config/data";
import DoughnutChart from "@/app/components/chart/DoughnutChart";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import EditableField from "@/app/components/common/ui/editField";
import {optionDoughnut} from "@/config/themeConfig";
import useInputChange from "@/app/lib/customHook/inputChange";
import Image from "next/image";

interface DataState {
    counselData: CounselData[];
    changeData: ChangeCounselData[];
};

export default function Page() {
    const [data, setData] = useState<DataState>({
        counselData: initialCounselData,
        changeData: changeCounselData,
    });
    const initialData = {
        counselData: [{ name: '', age: '' }],
        changeData: [{ status: '' }],
    };
    const { param , handleInputChange } = useInputChange(initialData);


    //도넛차트
    const value = data.counselData[0].lossRatio
    const dataDoughnut = {
        datasets: [
            {
                data: [value, 100 - value],
                backgroundColor: ["#4a7ff7", "#eeeeee"],
            },
        ],
    };

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
                                <div className={'text-3xl font-semibold'}>{value} %</div>
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
                                                value={counsel.estimateAmt}
                                                onChange={(value) => handleInputChange(index, 'estimateAmt', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                value={counsel.repairAmt}
                                                onChange={(value) => handleInputChange(index, 'repairAmt', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                value={counsel.total}
                                                onChange={(value) => handleInputChange(index, 'total', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
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
                        그래프
                    </div>
                    <div className={'w-full'}>
                        <div className={"flex justify-between mb-4"}>
                            <YearMonthPicker />
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
                                                value={changeData.pAdd}
                                                onChange={(value) => handleInputChange(index, 'pAdd', value)}
                                            />
                                        </td>
                                        <td>
                                            <EditableField
                                                value={changeData.pEnd}
                                                onChange={(value) => handleInputChange(index, 'pEnd', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
                                                value={changeData.AddAmt}
                                                onChange={(value) => handleInputChange(index, 'AddAmt', value)}
                                            />
                                        </td>
                                        <td className={'text-right'}>
                                            <EditableField
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
        </>
    )
}