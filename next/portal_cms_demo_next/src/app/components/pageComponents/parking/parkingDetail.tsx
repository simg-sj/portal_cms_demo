"use client"
import React, {useState} from "react";
import {ParkingRowType} from "@/@types/common";



interface ListProps {
    isEditing: boolean;
    onSave: (data: any) => void;
    rowData : ParkingRowType;
    setRowData : React.Dispatch<React.SetStateAction<ParkingRowType>>;
}

const HiparkingList = ({isEditing, rowData, setRowData }: ListProps) => {
    //input 빈값으로 변경
    const [formData, setFormData] = useState({
        pklName: '', //주차장명
        pklAddress: '', //주차장주소
        form : '',
        faceCount: '', //면수
        detailHistory: '', //세부내역
        memo: '' //메모 (공동피보험자)
    });

    //필드값 변경시 formdata 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //입력필드 타입
    const renderField = (key: string, value: any, type: 'text' | 'select' | 'textarea' = 'text', options?: string[]) => {
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
                        <th>옥외</th>
                        <td colSpan={3}>{renderField('outdoor', rowData.outdoor ? rowData.outdoor : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>옥내</th>
                        <td colSpan={3}>{renderField('indoor', rowData.indoor ? rowData.indoor : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>기계식(면)</th>
                        <td colSpan={3}>{renderField('mechanical', rowData.mechanical ? rowData.mechanical : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>카리프트(대)</th>
                        <td colSpan={3}>{renderField('carLift', rowData.carLift ? rowData.carLift : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>세부 내역</th>
                        <td colSpan={3}>{renderField('detailHistory', rowData.detailHistory ? rowData.detailHistory : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>메모</th>
                        <td colSpan={3}>{renderField('memo', rowData.memo ? rowData.memo : '-', 'textarea')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
};

export default HiparkingList;