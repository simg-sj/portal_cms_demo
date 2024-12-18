"use client"
import React, {useState, useEffect, useCallback} from "react";
import ImageUploader from "@/app/components/common/ui/fileUpload";
import DayTerm from "@/app/components/common/ui/dayTerm";
import CalenderPicker from "@/app/components/common/ui/calenderPicker";
import dayjs from "dayjs";
import {
    ACCIDENT_DETAIL_TYPE_OPTIONS,
    ACCIDENT_TYPE_OPTIONS,
    APPROVAL_OPTIONS,
    ClosingCode,
    STATE_OPTIONS
} from "@/config/data";
import {getImage} from "@/app/(Navigation-Group)/hiparking/action";
import {ClaimRowType, ImageType} from "@/@types/common";
import Button from "@/app/components/common/ui/button";
import FormatNumber from "@/app/components/common/ui/formatNumber";

interface ClaimType {
    irpk: number;
    index?: number;
    insuNum: string;
    accidentDate: string;
    closingAmt: number;
    pklAddress: string;
    wName: string;
    wCell: string;
    vCarNum: string;
}

interface ListProps {
    isEditing: boolean;
    isNew?: boolean;
    rowData : ClaimRowType;
    onSave: (data: ClaimRowType) => void;
}



const AccidentDetailList = ({isEditing, isNew = false, rowData, onSave }: ListProps) => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [editData, setEditData] = useState<ClaimRowType | ''>(rowData || '');
    const fetchImageData = useCallback(async (irpk: number) => {
        try {
            const fetchedImage = await getImage(irpk);
            setImages(fetchedImage);
        } catch (error) {
            console.error("Failed to fetch:", error);
        }
    }, []);


    useEffect(() => {
        // 이미지 데이터를 처음 로드하거나 irpk가 변경될 때만 호출
        if (!isNew && rowData.irpk) {
            fetchImageData(rowData.irpk);
        }

    }, [rowData]);


    // 필드값 변경시 formdata 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditData((prev) => {
            const updatedValue = { ...prev, [e.target.name]: e.target.value };
            return updatedValue;
        });
    };
    const handleSave = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(editData) {
            onSave(editData);
        }
    }
    // 입력필드 타입
    const renderField = (key: string, value: any, type: 'text' | 'select' | 'date' | 'dayterm' | 'textarea' = 'text', options?: string[]) => {
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
            case 'dayterm':
                return (
                    <DayTerm
                        sDay={dayjs(editData.sDay).toDate()}
                        eDay={dayjs(editData.eDay).toDate()}
                        setParam={setEditData}
                    />
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
                        <td colSpan={3}>{renderField('insuNum', editData.insuNum, 'text')}</td>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <td>{renderField('closingStatus', ClosingCode[editData.closingCode], 'select', STATE_OPTIONS)}</td>
                        <th>지급보험금</th>
                        <td>{ renderField('total', FormatNumber(editData.total)? FormatNumber(editData.total)+'원' : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>사고접수일</th>
                        <td>{renderField('requestDate', dayjs(editData.requestDate).toDate(), 'date')}</td>
                        <th>내부결재 여부</th>
                        <td>{renderField('approvalYN', editData.approvalYN, 'select', APPROVAL_OPTIONS)}</td>
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
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>사고일시</th>
                        <td>{renderField('accidentDate',dayjs(editData.accidentDate).toDate(), 'date')}</td>
                        <th>사고유형</th>
                        <td>{renderField('accidentType', editData.accidentType, 'select', ACCIDENT_TYPE_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <th>사고세부유형</th>
                        <td>{renderField('accidentDetailType', editData.accidentDetailType, 'select', ACCIDENT_DETAIL_TYPE_OPTIONS)}</td>
                        <th>접수자 성함</th>
                        <td>{renderField('wName', editData.wName)}</td>
                    </tr>
                    <tr>
                        <th>현장담당자</th>
                        <td>{renderField('inCargeName', editData.inCargeName)}</td>
                        <th>현장담당자 연락처</th>
                        <td>{renderField('inCargePhone', editData.inCargePhone)}</td>
                    </tr>
                    <tr>
                        <th>사업소명(주차장명)</th>
                        <td>{renderField('pklName', editData.pklName)}</td>
                    </tr>
                    <tr>
                        <th>사고내용</th>
                        <td colSpan={3}>{renderField('accidentDetail', editData.accidentDetail, 'textarea')}</td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colSpan={3}>
                            {renderField('wOpinion', editData.wOpinion, 'textarea')}
                        </td>
                    </tr>
                    <tr>
                        <th>사고 첨부파일</th>
                        <td colSpan={3}>
                            <div className="my-2">
                                <ImageUploader
                                    initialImages={images}
                                    isEditing={isEditing || isNew}
                                />
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    피해자정보
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
                        <th>피해자 이름</th>
                        <td>{renderField('wName', editData.wName)}</td>
                        <th>피해자 연락처</th>
                        <td>{renderField('wCell', editData.wCell)}</td>
                    </tr>
                    <tr>
                        <th>피해자 차량번호</th>
                        <td colSpan={3}>{renderField('vCarNum', editData.vCarNum)}</td>
                    </tr>
                    <tr>
                        <th>차종</th>
                        <td>{renderField('vCarType', editData.vCarType)}</td>
                        <th>차랑색상</th>
                        <td>{renderField('vCarColor', editData.vCarColor)}</td>
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
                        <th>증권번호</th>
                        <td>{editData.pNo}</td>
                        <th>보험기간</th>
                        <td>{editData.sDay} ~ {editData.eDay}</td>
                    </tr>
                    <tr>
                        <th>피보험자 상호</th>
                        <td>{editData.platform}</td>
                        <th>피보험자 사업자등록번호</th>
                        <td>{editData.bNumber}</td>
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
                        <th>업무 담당자 성함</th>
                        <td colSpan={3}>{renderField('bCargeName', editData.bCargeName)}</td>
                    </tr>
                    <tr>
                        <th>업무 담당자 연락처</th>
                        <td>{renderField('bCell', editData.bCell)}</td>
                        <th>업무 담당자 메일</th>
                        <td>{renderField('bMail', editData.bMail)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
};

export default AccidentDetailList;
