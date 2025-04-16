"use client"
import React, {useState} from "react";
import { ParkingRowType, UptParking} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import {convertClaimToUptParking} from "@/app/lib/common";
import dayjs from "dayjs";
import {parkingStatus} from "@/config/data";



interface ListProps {
    isEditing: boolean;
    onSave: (data: ParkingRowType) => void;
    rowData : ParkingRowType;
}

const HiparkingList = ({isEditing, rowData, onSave }: ListProps) => {

    const [editData, setEditData] = useState<UptParking>(convertClaimToUptParking(rowData));

    //필드값 변경시 formdata 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(e.target.value);
        setEditData((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        });
    };

    const handleSave = () => {
            if(editData) {
                onSave(editData);
            }else {
                alert('변경된 정보가 없습니다.');
                return;
            }
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
                        <th>주차장명</th>
                        <td colSpan={3}>{renderField('pklName', rowData.pklName, 'text')}</td>
                    </tr>
                    <tr>
                        <th>소재지</th>
                        <td colSpan={3}>{renderField('pklAddress', rowData.pklAddress, 'text')}</td>

                    </tr>
                    <tr>
                        <th>형태</th>
                        <td colSpan={3}>
                            {renderField('form', rowData.form, 'text')}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    주차장 상세정보
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
                        <th>면수</th>
                        <td colSpan={3}>{renderField('faceCount', rowData.faceCount ? rowData.faceCount : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>옥외 (㎡)</th>
                        <td colSpan={3}>{renderField('outdoor', rowData.outdoor ? rowData.outdoor : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>옥내 (㎡)</th>
                        <td colSpan={3}>{renderField('indoor', rowData.indoor ? rowData.indoor : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>기계식 (면)</th>
                        <td colSpan={3}>{renderField('mechanical', rowData.mechanical ? rowData.mechanical : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>카리프트 (대)</th>
                        <td colSpan={3}>{renderField('carLift', rowData.carLift ? rowData.carLift : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>세부 내역</th>
                        <td colSpan={3}>{renderField('detailHistory', rowData.detailHistory ? rowData.detailHistory : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>공동피보험자</th>
                        <td colSpan={3}>{renderField('coInsured', rowData.coInsured ? rowData.coInsured : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <td colSpan={3}>{renderField('status', rowData.status ? parkingStatus(rowData.status) : '-', 'text')}</td>
                    </tr>
                    {
                        rowData.status === 'NEW' &&
                        <tr>
                            <th>등록일</th>
                            <td>{renderField('updatedYMD', dayjs(rowData.updatedYMD).toDate(), 'date')}</td>
                        </tr>
                    }

                    {
                        rowData.status === 'EXPIRED' &&
                        <tr>
                            <th>만료일</th>
                            <td>{renderField('deletedYMD', dayjs(rowData.deletedYMD).toDate(), 'date')}</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
};

export default HiparkingList;