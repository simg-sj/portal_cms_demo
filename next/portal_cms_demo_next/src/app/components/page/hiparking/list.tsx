"use client"
import React, {useState, useEffect} from "react";
import ImageUploader from "@/app/components/common/ui/fileUpload";
import DayTerm from "@/app/components/common/ui/dayTerm";
import CalenderPicker from "@/app/components/common/ui/calenderPicker";
import dayjs from "dayjs";
import {ClosingCode} from "@/config/data";
import {getImage} from "@/app/(Navigation-Group)/hiparking/action";

interface HiparkingListProps {
    isEditing: boolean;
    onSave: (data: any) => void;
    isNew?: boolean;
    rowData : ClaimType;
}

const STATE_OPTIONS = ['확인중', '접수', '접수취소', '보류', '면책', '종결', '추산', '합의', '부재'];
const APPROVAL_OPTIONS = ['승인', '미승인'];
const ACCIDENT_TYPE_OPTIONS = ['주차장배상', '재물배상'];
const ACCIDENT_DETAIL_TYPE_OPTIONS = ['차대차', '시설물사고', '건물자체사고', '치료비', '기타'];



const HiparkingList = ({isEditing, onSave, isNew = false, rowData }: HiparkingListProps) => {
    //input 빈값으로 변경
    const [formData, setFormData] = useState({
        irpk: '',
        state: '',
        total: '',
        accidentWDateTime: null,
        approvalYN: '',
        accidentDateTime: null,
        accidentType: '',
        accidentDT: '',
        wName: '',
        inCargeName: '',
        inCargePhone: '',
        pklName: '',
        accidentDetail: '',
        wOpnion: '',
        aName: '',
        aPhone: '',
        vCarNum: '',
        vCarType: '',
        vCarColor: '',
        pNo: '',
        sDate: {
            startDate: null,
            endDate: null
        },
        bName: '',
        bNumer: '',
        bCargeName: '',
        bCell: '',
        bMail: ''
    });

    useEffect(() => {
        if (!isNew && rowData.irpk) {
            const fetchImage = async () => {
                try {
                    const fetchedImage = await getImage(rowData.irpk);

                    setImages(fetchedImage);
                } catch (error) {
                    console.error("Failed to fetch image:", error);
                }
            };
            fetchImage();

        }
    }, [isNew, rowData.irpk]);

    const [selectDate, setSelectDate] = useState(new Date());
    const [images, setImages] = useState<ImageType[]>([]);

    //필드값 변경시 formdata 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    //dayterm 업데이트
    const handleDayTermChange = (startDate: Date | null, endDate: Date | null) => {
        setFormData({
            ...formData,
            sDate: { startDate, endDate }
        });
    };
    //편집모드 입력필드
    const renderCell = (key: string, value: string) => {
        return isEditing || isNew ? (
            <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-1 border rounded"
            />
        ) : value;
    };
    //입력필드 타입
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
                        value={value}
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
                    <CalenderPicker selected={selectDate} onChange={(date: Date | null) => setSelectDate(date)}/>
                );
            case 'dayterm':
                return (
                    <DayTerm
                        startDate={value.startDate}
                        endDate={value.endDate}
                        onChange={handleDayTermChange}
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className={"w-full p-1 border rounded h-[100px]"}
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full p-1 border rounded"
                    />
                );
        }
    };


    const handleImageChange = (newImages) => {
        setImages(newImages);
    };



    return(
        <>
            <div>
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
                        <td colSpan={3}>{renderCell('insuNum', rowData.insuNum)}</td>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <td>{renderField('closingCode', ClosingCode[rowData.closingCode], 'select', STATE_OPTIONS)}</td>
                        <th>지급보험금</th>
                        <td>{renderField('total', rowData.total)}</td>
                    </tr>
                    <tr>
                        <th>사고접수일</th>
                        <td>{renderField('requestDate', dayjs(rowData.requestDate).toDate(), 'date')}</td>
                        <th>내부결재 여부</th>
                        <td>{renderField('approvalYN', formData.approvalYN, 'select', APPROVAL_OPTIONS)}</td>
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
                        <td>{renderField('accidentDate',dayjs(rowData.accidentDate).toDate(), 'date')}</td>
                        <th>사고유형</th>
                        <td>{renderField('accidentType', rowData.accidentType, 'select', ACCIDENT_TYPE_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <th>사고세부유형</th>
                        <td>{renderField('accidentDetailType', rowData.accidentDetailType, 'select', ACCIDENT_DETAIL_TYPE_OPTIONS)}</td>
                        <th>접수자 성함</th>
                        <td>{renderCell('wName', rowData.wName)}</td>

                    </tr>
                    <tr>
                        <th>현장담당자</th>
                        <td>{renderCell('inCargeName', rowData.inCargeName)}</td>
                        <th>현장담당자 연락처</th>
                        <td>{renderCell('inCargePhone', rowData.inCargePhone)}</td>
                    </tr>
                    <tr>
                        <th>사업소명(주차장명)</th>
                        <td>{renderCell('pklName', rowData.pklName)}</td>
                    </tr>
                    <tr>
                        <th>사고내용</th>
                        <td colSpan={3}>{renderCell('accidentDetail', rowData.accidentDetail)}</td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colSpan={3}>
                            {renderField('wOpinion', rowData.wOpinion, 'textarea')}
                        </td>
                    </tr>
                    <tr>
                        <th>사고 첨부파일</th>
                        <td colSpan={3}>
                            <div className="my-2">
                                <ImageUploader
                                    initialImages={images}
                                    isEditing={isEditing || isNew}
                                    onChange={handleImageChange}
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
                        <td>{renderCell('wName', rowData.wName)}</td>
                        <th>피해자 연락처</th>
                        <td>{renderCell('wCell', rowData.wCell)}</td>
                    </tr>
                    <tr>
                        <th>피해자 차량번호</th>
                        <td colSpan={3}>{renderCell('vCarNum', rowData.vCarNum)}</td>
                    </tr>
                    <tr>
                        <th>차종</th>
                        <td>{renderCell('vCarType', formData.vCarType)}</td>
                        <th>차랑색상</th>
                        <td>{renderCell('vCarColor', formData.vCarColor)}</td>
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
                        <td>{renderCell('pNo', rowData.pNo)}</td>
                        <th>보험기간</th>
                        <td>{renderField('sDate',{startDate : dayjs(rowData.sDay).toDate(), endDate : dayjs(rowData.eDay).toDate()}, 'dayterm')}</td>
                    </tr>
                    <tr>
                        <th>피보험자 상호</th>
                        <td>{renderCell('bName', rowData.platform)}</td>
                        <th>피보험자 사업자등록번호</th>
                        <td>{renderCell('bNumer', rowData.bNumber)}</td>
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
                        <td colSpan={3}>{renderCell('bCargeName', formData.bCargeName)}</td>
                    </tr>
                    <tr>
                        <th>업무 담당자 연락처</th>
                        <td>{renderCell('bCell', formData.bCell)}</td>
                        <th>업무 담당자 메일</th>
                        <td>{renderCell('bMail', formData.bMail)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
        ;
};

export default HiparkingList;