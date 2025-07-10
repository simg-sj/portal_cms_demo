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
                <div
                  className={
                      "mx-2 flex w-full items-center py-3 text-[17px] font-semibold"
                  }
                >
                    <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
                    주차장 정보
                </div>
                <div className="grid-section">
                        <div className="cell-label-col">주차장코드</div>
                        <div className="cell-value-col">{renderField('PJTcode', rowData.PJTcode, 'text')}</div>
                        <div className="cell-label-col">주차장명</div>
                        <div className="cell-value-col">{renderField('pklName', rowData.pklName, 'text')}</div>
                        <div className="cell-label-col">소재지</div>
                        <div className="cell-value-col">{renderField('pklAddress', rowData.pklAddress, 'text')}</div>
                </div>
                <div
                  className={
                      "mx-2 flex w-full items-center py-3 text-[17px] font-semibold"
                  }
                >
                    <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
                    상세정보
                </div>
                <div className="grid-section">
                        <div className="cell-label-col">접수일</div>
                        <div className="cell-value-col">{renderField('createdYMD', dayjs(rowData.createdYMD).toDate(), 'date')}</div>
                        <div className="cell-label-col">장애구분</div>
                        <div className="cell-value-col">{renderField('errorType', rowData.errorType ? rowData.errorType : '-', 'text')}</div>
                        <div className="cell-label-col">발생위치</div>
                        <div className="cell-value-col">{renderField('errorLocation', rowData.errorLocation ? rowData.errorLocation : '-', 'text')}</div>
                        <div className="cell-label-col">상새내용</div>
                        <div className="cell-value-col">{renderField('detail', rowData.detail ? rowData.detail : '-', 'text')}</div>
                        <div className="cell-label-col">현장조치사항</div>
                        <div className="cell-value-col">{renderField('resultType', rowData.resultType ? rowData.resultType : '-', 'text')}</div>
                    </div>
            </div>
        </>
    )
        ;
};

export default ErrorDetail;