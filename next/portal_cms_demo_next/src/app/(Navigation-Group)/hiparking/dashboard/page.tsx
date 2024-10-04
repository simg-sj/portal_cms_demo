'use client'
import Button from "@/app/components/common/button";
import Plus from  "@/assets/images/icon/plus-icon.png";
import {useState} from "react";
import { initialCounselData } from "@/config/data";
import {Chart as ChartJS, ArcElement} from "chart.js";
import {Doughnut} from "react-chartjs-2"

ChartJS.register(ArcElement);

const formatNumber = (num: string): string => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function Page() {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [counselData, setCounselData] = useState<CounselData[]>(initialCounselData);

    const toggleEditMode = () => {
        if (editMode) {
            const params = counselData.map(counsel => ({
                '가입보험료': counsel.estimateAmt,
                '변경보험료': counsel.repairAmt,
                '총보험료': counsel.total,
                '지급보험료': counsel.closingAmt,
            }));
            console.log("수정 보험료:", params);
        }
        setEditMode(!editMode);
    };

    const handleInputChange = (index: number, field: keyof CounselData, value: string) => {
        const updatedData = [...counselData];
        const numericValue = value.replace(/,/g, '');
        updatedData[index] = { ...updatedData[index], [field]: numericValue };
        setCounselData(updatedData);
    };

    //도넛차트
    const value = 38;
    const Data = {
        datasets: [
            {
                data: [value, 100 - value],
                backgroundColor: ["#f8a455", "#eeeeee"],
            },
        ],
    };

    const Options = {
    };

    return (
        <>
            <div className={'text-xl font-bold'}>현황 대시보드</div>
            <div className={'px-8 py-6 bg-white rounded-xl my-5'}>
                <div className={'text-lg font-semibold mb-6'}>계약현황</div>
                <div className={'flex justify-between'}>
                    <div>
                        <div className={'relative'}>
                        <Doughnut data={Data} options={Options} className={'w-[350px] h-[200px]'}>
                        </Doughnut>
                        <div className={'absolute top-1/2 left-1/2 text-center'}>
                            <div className={'text-gray-600 mb-1'}>손해율</div>
                            <div className={'text-3xl text-main-light font-semibold'}>{value} %</div>
                        </div>
                        </div>
                        <div className={'mt-4 text-right'}>
                            <div className={'text-gray-600'}>지급보험금</div>
                            <div className={'text-3xl font-bold'}>{formatNumber('168178432')}</div>
                        </div>
                    </div>
                    <div>
                        <div className={"flex justify-end mb-4"}>
                            <Button
                                color={"main"}
                                height={36}
                                width={120}
                                className={'mr-5'}
                                onClick={toggleEditMode}
                                fill={editMode}
                            >
                                {editMode ? '저장' : '수정'}
                            </Button>
                            <Button  color={"main"} fill height={36} width={120}>
                                <img src={Plus.src} alt={'추가'} width={16} className={'mr-1'} />
                                사업장 추가
                            </Button>
                        </div>
                        <table className={'ml-16'}>
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
                            <thead>
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
                            {counselData.map((counsel, index) => (
                                <tr key={index}>
                                    <td>{counsel.pNo}</td>
                                    <td>{counsel.sDay + '~' + counsel.eDay}</td>
                                    <td>{counsel.bCount}</td>
                                    <td className={'text-right'}>
                                        {editMode ? (
                                            <input
                                                className={'text-right'}
                                                type="text"
                                                value={formatNumber(counsel.estimateAmt)}
                                                onChange={(e) => handleInputChange(index, 'estimateAmt', e.target.value)}
                                            />
                                        ) : (
                                            formatNumber(counsel.estimateAmt)
                                        )}
                                    </td>
                                    <td className={'text-right'}>
                                        {editMode ? (
                                            <input
                                                className={'text-right'}
                                                type="text"
                                                value={formatNumber(counsel.repairAmt)}
                                                onChange={(e) => handleInputChange(index, 'repairAmt', e.target.value)}
                                            />
                                        ) : (
                                            formatNumber(counsel.repairAmt)
                                        )}
                                    </td>
                                    <td className={'text-right'}>
                                        {editMode ? (
                                            <input
                                                className={'text-right'}
                                                type="text"
                                                value={formatNumber(counsel.total)}
                                                onChange={(e) => handleInputChange(index, 'total', e.target.value)}
                                            />
                                        ) : (
                                            formatNumber(counsel.total)
                                        )}
                                    </td>
                                    <td className={'text-right'}>
                                        {editMode ? (
                                            <input
                                                className={'text-right'}
                                                type="text"
                                                value={formatNumber(counsel.closingAmt)}
                                                onChange={(e) => handleInputChange(index, 'closingAmt', e.target.value)}
                                            />
                                        ) : (
                                            formatNumber(counsel.closingAmt)
                                        )}
                                    </td>
                                    <td>{counsel.lossRatio}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}