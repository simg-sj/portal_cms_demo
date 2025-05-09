"use client"
import React, {useState} from "react";
import {ErrorType, ParkingRowType, UptParking} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import {convertClaimToUptParking, getChangedFields} from "@/app/lib/common";
import dayjs from "dayjs";
import {PARKING_STATUS} from "@/config/data";
import useFetchPnoList from "@/app/lib/hooks/useFetchPnoList";



interface ListProps {
    isEditing: boolean;
    onSave: (data: ErrorType) => void;
    rowData : ErrorType;
    isNew : boolean
}

const ErrorDetail = ({isEditing, rowData, onSave, isNew }: ListProps) => {

    const [editData, setEditData] = useState<ErrorType>(rowData);

    //필드값 변경시 formdata 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(e.target.name, e.target.value);
        setEditData((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    const handleSave = () => {
        /*const changed = getChangedFields(editData, rowData);
        const merged = {
            ...changed,
            bpk: rowData.bpk,
            irpk: rowData.irpk,
        };
        if (JSON.stringify(editData) !== JSON.stringify(rowData)) {

            onSave(convertClaimToUptParking(merged));
        }else {
            alert('변경된 정보가 없습니다.');
            return;
        }*/
    }

    //입력필드 타입
    const renderField = (key: string, value: any, type: 'text' | 'date' | 'select' | 'textarea' = 'text', options?: string[]) => {
        if (!isEditing) {
            if (type === 'date') {
                return <span>{value ? dayjs(value).format('YYYY-MM-DD') : ''}</span>;
            }else {
                return <span>{value || '-'}</span>;
            }
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
            case 'textarea':
                return (
                    <textarea
                        name={key}
                        defaultValue={value}
                        onChange={() =>handleChange}
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
                {isEditing
                    &&
                    <div className='absolute top-[32px] right-[272px] z-10'>
                        <Button color={"blue"} fill={true} height={35} width={100} onClick={() => handleSave()}>
                            저장
                        </Button>
                    </div>
                }
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    주차장 정보
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
                        <th>주차장코드</th>
                        <td colSpan={3}>{renderField('PJTcode', rowData.PJTcode, 'text')}</td>
                    </tr>
                    <tr>
                        <th>주차장명</th>
                        <td colSpan={3}>{renderField('pklName', rowData.pklName, 'text')}</td>
                    </tr>
                    <tr>
                        <th>소재지</th>
                        <td colSpan={3}>{renderField('pklAddress', rowData.pklAddress, 'text')}</td>

                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    상세정보
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "200px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>접수일</th>
                        <td>{renderField('createdYMD', dayjs(rowData.createdYMD).toDate(), 'date')}</td>
                    </tr>
                    <tr>
                        <th>장애구분</th>
                        <td colSpan={3}>{renderField('errorType', rowData.errorType ? rowData.errorType : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>발생위치</th>
                        <td colSpan={3}>{renderField('errorLocation', rowData.errorLocation ? rowData.errorLocation : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>상새내용</th>
                        <td colSpan={3}>{renderField('detail', rowData.detail ? rowData.detail : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>현장조치사항</th>
                        <td colSpan={3}>{renderField('resultType', rowData.resultType ? rowData.resultType : '-', 'text')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
};

export default ErrorDetail;