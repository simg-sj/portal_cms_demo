"use client"
import React, {useState} from "react";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";
import dayjs from "dayjs";
import {APPROVAL_OPTIONS, ClosingCode, ConfirmCode, STATE_OPTIONS} from "@/config/data";
import {rcAccidentRowType} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";


interface ListProps {
    isEditing: boolean;
    isNew?: boolean;
    rowData : rcAccidentRowType;
    onSave: (data: rcAccidentRowType) => void;
}



export default function RcAccidentDetailList ({isEditing, isNew = false, rowData, onSave }: ListProps){
    const [editData, setEditData] = useState<rcAccidentRowType>(rowData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setEditData((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };
    const handleSave = () => {
        if(editData) {
            onSave(editData);
        }
    }
    // 입력필드 타입
    const renderField = (key: string, value: any, type: 'text' | 'select' | 'date' |  'textarea' = 'text', options?: string[]) => {
        if (!isEditing && !isNew) {
            if (type === 'date') {
                return value ? value.toLocaleDateString() : '';
            }
            if (type === 'dayterm') {
                return `${value.startDate?.toLocaleDateString()} ~ ${value.endDate?.toLocaleDateString()}`;
            }
            return value;
        }
        switch (type) {
            case 'select':
                return (
                    <select
                        name={key}
                        defaultValue={value}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                    >
                        <option value="">선택하세요</option>
                        {options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'date':
                return (
                    <CalenderPicker selected={dayjs(editData[key]).toDate()} onChange={(date: Date | null) =>
                        setEditData((prevState) => ({
                            ...prevState,
                            [key]: dayjs(date).format('YYYY-MM-DD')
                        }))
                    }/>
                );
            case 'textarea':
                return (
                    <textarea
                        name={key}
                        defaultValue={value}
                        onChange={handleChange}
                        className={"w-full p-1 border rounded h-[100px]"}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        name={key}
                        defaultValue={value}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                    />
                );
        }
    };

    return(
        <>
            <div>
                {
                    isEditing
                        &&
                    <div className='absolute top-[32px] right-[272px] z-10'>
                        <Button color={"blue"} fill={true} height={35} width={100} onClick={handleSave}>
                            저장
                        </Button>
                    </div>
                }
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    접수현황
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>접수번호</th>
                        <td colSpan={3}>{renderField('insuNum', editData.insuNum ? editData.insuNum : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <td>{renderField('statusCode', editData.statusCode?ClosingCode[editData.statusCode] : '-', 'select', STATE_OPTIONS)}</td>
                        <th>지급보험금</th>
                        {/*<td>{ renderField('total', FormatNumber(editData.total)? FormatNumber(editData.total)+'원' : '-', 'text')}</td>*/}
                    </tr>
                    <tr>
                        <th>사고접수일</th>
                        <td>{renderField('createdYMD', dayjs(editData.createdYMD).toDate(), 'date')}</td>
                        <th>컨펌 여부</th>
                        <td>{renderField('isConfirmed',editData.isConfirmed ? ConfirmCode[editData.isConfirmed] : '-', 'select', APPROVAL_OPTIONS)}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    사고정보
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>차량번호</th>
                        <td colSpan={3}>{renderField('carNum', editData.carNum)}</td>
                    </tr>
                    <tr>
                        <th>사고일시</th>
                        <td>{renderField('accidentDate', dayjs(editData.accidentDate).toDate(), 'date')}</td>
                    </tr>
                    <tr>
                        <th>예상입고일정</th>
                        <td>{renderField('arrivalETA', dayjs(editData.arrivalETA).format('YYYY-MM-DD'))}</td>
                    </tr>
                    <tr>
                        <th>사고내용</th>
                        <td colSpan={3}>{renderField('accidentDetail', editData.accidentDetail, 'textarea')}</td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colSpan={3}>
                            {renderField('memo', editData.memo ? editData.memo : '-', 'textarea')}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    피해규모
                </div>
                <table className={'colTable text-[15px]'}>
                <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>대물</th>
                            <td colSpan={3}>{renderField('propDamage', editData.propDamage ? editData.propDamage : '-')}</td>
                        </tr>
                        <tr>
                            <th>대인</th>
                            <td>{renderField('persInjury', editData.persInjury ? editData.persInjury : '-')}</td>
                        </tr>
                        <tr>
                            <th>기타</th>
                            <td>{renderField('etc', editData.etc ? editData.etc : '-')}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    계약사항
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>제휴사명</th>
                        <td>{editData.partnerName}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    접수자정보
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>담당자 성함</th>
                        <td colSpan={3}>{renderField('confirmedBy', editData.confirmedBy ? editData.confirmedBy : '-')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
};

