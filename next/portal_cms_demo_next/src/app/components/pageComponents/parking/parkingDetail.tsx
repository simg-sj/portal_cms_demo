"use client"
import React, {useState} from "react";

interface ParkingDetailType {
    pkName: string; //주차장명
    pkAddress: string; //주차장주소
    pkType: 'indoor' | 'outdoor' | 'mechanical' | 'carLift'; //주차장구분
    pkArea: number;//면수
    pkDetail: string;//세부내역
    pkMemo: string;//메모 (공동피보험자)
}

interface ListProps {
    isEditing: boolean;
    onSave: (data: any) => void;
    rowData : ParkingDetailType;
    setRowData : React.Dispatch<React.SetStateAction<ParkingDetailType>>;
}

const HiparkingList = ({isEditing, rowData, setRowData }: ListProps) => {
    //input 빈값으로 변경
    const [formData, setFormData] = useState({
        pkName: '', //주차장명
        pkAddress: '', //주차장주소
        pkType: '', //주차장구분
        pkArea: '', //면수
        pkDetail: '', //세부내역
        pkMemo: '' //메모 (공동피보험자)
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
                        <td colSpan={3}>{renderField('pkName', rowData.pkName, 'text')}</td>
                    </tr>
                    <tr>
                        <th>주차장주소</th>
                        <td colSpan={3}>{renderField('pkAddress', rowData.pkAddress, 'text')}</td>

                    </tr>
                    <tr>
                        <th>주차장구분</th>
                        <td colSpan={3}>
                            {renderField('pkType', rowData.pkType, 'text')}
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
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>면수</th>
                        <td colSpan={3}>{renderField('pkArea', rowData.pkArea, 'text')}</td>
                    </tr>
                    <tr>
                        <th>세부내역</th>
                        <td colSpan={3}>{renderField('pkDetail', rowData.pkDetail, 'text')}</td>
                    </tr>
                    <tr>
                        <th>메모</th>
                        <td colSpan={3}>{renderField('pkMemo', rowData.pkMemo, 'textarea')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
};

export default HiparkingList;