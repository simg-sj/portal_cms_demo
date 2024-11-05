"use client"
import React, {useState, useEffect} from "react";
import ImageUploader from "@/app/components/common/ui/fileUpload";
import DayTerm from "@/app/components/common/ui/dayTerm";
import CalenderPicker from "@/app/components/common/ui/calenderPicker";

interface HiparkingListProps {
    isEditing: boolean;
    onSave: (data: any) => void;
    isNew?: boolean;
}

const STATE_OPTIONS = ['확인중', '접수', '접수취소', '보류', '면책', '종결', '추산', '합의', '부재'];
const APPROVAL_OPTIONS = ['승인', '미승인'];
const ACCIDENT_TYPE_OPTIONS = ['주차장배상', '재물배상'];
const ACCIDENT_DETAIL_TYPE_OPTIONS = ['차대차', '시설물사고', '건물자체사고', '치료비', '기타'];


const HiparkingList = ({isEditing, onSave, isNew = false }: HiparkingListProps) => {
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
        if (!isNew) {
            setFormData({
                //임의 데이터
                ...formData,
                irpk: '24081915363',
                state: '접수',
                total: '0',
                accidentWDateTime: new Date('2024-02-02'),
                approvalYN: '승인',
                accidentDateTime: new Date('2024-02-01'),
                accidentType: '보유불명',
                accidentDT: '차량사고',
                wName: '홍길동',
                inCargeName: '백무시',
                inCargePhone: '010-5555-5555',
                pklName: '서판교점',
                accidentDetail: 'CCTV 사각지대 내 차량 사고 건',
                wOpnion: '경찰서 측에서 CCTV 영상만으로는 의심차량 있으나 확실한 가해자차량 특정 불가함을 확인 및 차주에 보험접수 진행 안내',
                aName: '홍길동',
                aPhone: '010-0000-0000',
                vCarNum: '11바4025',
                vCarType: 'SUV',
                vCarColor: '검정',
                pNo: 'FA20235204423000',
                sDate: {
                    startDate: new Date('2024-02-02'),
                    endDate: new Date('2024-02-02')
                },
                bName: '하이파킹',
                bNumer: '23526336812',
                bCargeName: '이파킹',
                bCell: '029965421',
                bMail: 'lee@parking.com'
            });
        }
    }, [isNew]);
    const [selectDate, setSelectDate] = useState(new Date());
    const [images, setImages] = useState([]);

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
                        <td colSpan={3}>{renderCell('irpk', formData.irpk)}</td>
                    </tr>
                    <tr>
                        <th>상태</th>
                        <td>{renderField('state', formData.state, 'select', STATE_OPTIONS)}</td>
                        <th>지급보험금</th>
                        <td>{renderField('total', formData.total)}</td>
                    </tr>
                    <tr>
                        <th>사고접수일</th>
                        <td>{renderField('accidentWDateTime', formData.accidentWDateTime, 'date')}</td>
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
                        <td>{renderField('accidentDateTime', formData.accidentDateTime, 'date')}</td>
                        <th>사고유형</th>
                        <td>{renderField('accidentType', formData.accidentType, 'select', ACCIDENT_TYPE_OPTIONS)}</td>
                    </tr>
                    <tr>
                        <th>사고세부유형</th>
                        <td>{renderField('accidentDT', formData.accidentDT, 'select', ACCIDENT_DETAIL_TYPE_OPTIONS)}</td>
                        <th>접수자 성함</th>
                        <td>{renderCell('wName', formData.wName)}</td>

                    </tr>
                    <tr>
                        <th>현장담당자</th>
                        <td>{renderCell('inCargeName', formData.inCargeName)}</td>
                        <th>현장담당자 연락처</th>
                        <td>{renderCell('inCargePhone', formData.inCargePhone)}</td>
                    </tr>
                    <tr>
                        <th>사업소명(주차장명)</th>
                        <td>{renderCell('pklName', formData.pklName)}</td>
                    </tr>
                    <tr>
                        <th>사고내용</th>
                        <td colSpan={3}>{renderCell('accidentDetail', formData.accidentDetail)}</td>
                    </tr>
                    <tr>
                        <th>비고</th>
                        <td colSpan={3}>
                            {renderField('wOpnion', formData.wOpnion, 'textarea')}
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
                        <td>{renderCell('aName', formData.aName)}</td>
                        <th>피해자 연락처</th>
                        <td>{renderCell('aPhone', formData.aPhone)}</td>
                    </tr>
                    <tr>
                        <th>피해자 차량번호</th>
                        <td colSpan={3}>{renderCell('vCarNum', formData.vCarNum)}</td>
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
                        <td>{renderCell('pNo', formData.pNo)}</td>
                        <th>보험기간</th>
                        <td>{renderField('sDate', formData.sDate, 'dayterm')}</td>
                    </tr>
                    <tr>
                        <th>피보험자 상호</th>
                        <td>{renderCell('bName', formData.bName)}</td>
                        <th>피보험자 사업자등록번호</th>
                        <td>{renderCell('bNumer', formData.bNumer)}</td>
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