"use client"
import React, {useCallback, useEffect, useState} from "react";
import ImageUploader from "@/app/components/common/ui/input/fileUpload";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";
import dayjs from "dayjs";
import {
    ACCIDENT_DETAIL_TYPE_OPTIONS,
    ACCIDENT_TYPE_OPTIONS,
    APPROVAL_OPTIONS,
    STATE_OPTIONS
} from "@/config/data";

import {ClaimRowType, ImageType, InsuranceItem, UptClaim} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import {getImage, getPolicyList} from "@/app/(Navigation-Group)/action";
import cn from 'classnames';
import {convertClaimToUptClaim, getChangedFields} from "@/app/lib/common";
import {useNotifications} from "@/context/NotificationContext";

interface ListProps {
    isEditing: boolean;
    isNew?: boolean;
    rowData : ClaimRowType;
    onSave: (data: UptClaim) => void;
}



const AccidentDetailList = ({isEditing, isNew = false, rowData, onSave }: ListProps) => {
    const [images, setImages] = useState<ImageType[]>([]);
    const {showAlert} = useNotifications();
    const [pnoList, setPnoList] = useState<InsuranceItem[]>([]);
    // 초기에 rowData를 UptClaim으로 변환해서 editData로 설정
    const [editData, setEditData] = useState<ClaimRowType>(rowData);

    const getPnoList = async (bpk : number) => {

        let result = await getPolicyList(bpk);

        setPnoList(result);
    }

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
            getPnoList(rowData.bpk);
        }

    }, [rowData]);

    // 필드값 변경시 formdata 업데이트
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        let {name, value} = e.target;

        let deleteCommaValue = value.replaceAll(',','');

        setEditData((prev) => {
            return {...prev, [e.target.name]: deleteCommaValue};
        });
    };
    const handleSave = () => {
        const changed = getChangedFields(editData, rowData);
        const merged = {
            ...changed,
            bpk: rowData.bpk,
            irpk: rowData.irpk
        };
        if(isEditing){
            if (JSON.stringify(editData) !== JSON.stringify(rowData)) {
                console.log('test',changed);

                onSave(convertClaimToUptClaim(merged));

            } else {
                showAlert("변경된 정보가 없습니다.");
            }
        }

       /* if(isNew){
            if(editData) {
                onSave(param);
            }else {
                alert('변경된 정보가 없습니다.');
                return;
            }
        }*/

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
                    <CalenderPicker select={new Date(editData[key])} allowDate={false}  onChange={(date: Date | null) => {
                        setEditData((prevState) => ({
                            ...prevState,
                            [key]: dayjs(date).format('YYYY-MM-DD')
                        }))
                    }
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
                    (isEditing || isNew)  &&
                    <div className={cn("z-10", isEditing ? "absolute top-[32px] right-[272px]" : "absolute top-[32px] right-[160px]")}>
                        <Button color={"blue"} fill={true} height={35} width={100} onClick={()=>handleSave()}>
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
                        <td>{renderField('insuNum', rowData.insuNum, 'text')}</td>
                        <th>손조비용</th>
                        <td>{ renderField('repairAmt', rowData.repairAmt ? FormatNumber(Number(rowData.repairAmt))+'원' : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>상태</th>
                            {
                                isEditing ?
                                <td>
                                <select
                                    name={'closingStatus'}
                                    defaultValue={editData.closingStatus}
                                    onChange={handleChange}
                                    className="w-full p-1 border rounded"
                                >
                                    <option value="">선택하세요</option>
                                    {STATE_OPTIONS?.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                </td>
                                :
                                <td>{editData.closingStatus ? editData.closingStatus : '-'}</td>
                            }
                       {/* <td>{renderField('closingStatus', ClosingCode[rowData.closingCode], 'select', STATE_OPTIONS)}</td>*/}
                        <th>지급보험금</th>
                        <td>{ renderField('total', rowData.total ? FormatNumber(Number(rowData.total))+'원' : '-', 'text')}</td>
                    </tr>
                    <tr>
                        <th>사고접수일</th>
                        <td>{renderField('requestDate', dayjs(rowData.requestDate).toDate(), 'date')}</td>
                        <th>내부결재 여부</th>
                        {
                            isEditing ?
                                <td>
                                    <select
                                        name = 'approvalYN'
                                        defaultValue={rowData.approvalYN}
                                        onChange={handleChange}
                                        className="w-full p-1 border rounded"
                                    >
                                        <option value="">선택하세요</option>
                                        {APPROVAL_OPTIONS?.map(option => (
                                            <option key={option.title} value={option.value}>{option.title}</option>
                                        ))}
                                    </select>
                                </td>
                                :
                                <td>{rowData.approvalYN === 'Y'? '승인' : '미승인'}</td>
                        }
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
                        <td>{renderField('wName', rowData.wName)}</td>
                    </tr>
                    <tr>
                        <th>현장담당자</th>
                        <td>{renderField('inCargeName', rowData.inCargeName)}</td>
                        <th>현장담당자 연락처</th>
                        <td>{renderField('inCargePhone', rowData.inCargePhone)}</td>
                    </tr>
                    <tr>
                        <th>사업소명(주차장명)</th>
                        <td>{renderField('pklName', rowData.pklName)}</td>
                    </tr>
                    <tr>
                        <th>사고내용</th>
                        <td colSpan={3}>{renderField('accidentDetail', rowData.accidentDetail, 'textarea')}</td>
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
                                    isEditing={isEditing || isNew} onChange={function (images: ImageType[]): void {
                                    throw new Error("Function not implemented.");
                                }}                                />
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
                        <td>{renderField('wName', rowData.wName)}</td>
                        <th>피해자 연락처</th>
                        <td>{renderField('wCell', rowData.wCell)}</td>
                    </tr>
                    <tr>
                        <th>피해자 차량번호</th>
                        <td colSpan={3}>{renderField('vCarNum', rowData.vCarNum)}</td>
                    </tr>
                    <tr>
                        <th>차종</th>
                        <td>{renderField('vCarType', rowData.vCarType)}</td>
                        <th>차랑색상</th>
                        <td>{renderField('vCarColor', rowData.vCarColor)}</td>
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
                        {
                            isEditing ?
                                <td>
                                    <select
                                        name={'pNo'}
                                        defaultValue={editData.pNo}
                                        onChange={handleChange}
                                        className="w-full p-1 border rounded"
                                    >
                                        <option value="">선택하세요</option>
                                        {pnoList.map((state) => (
                                            <option key={state.irpk} value={state.pNo}>{state.pNo}</option>
                                        ))}
                                    </select>
                                </td>
                                :
                                <td>{editData.pNo}</td>
                        }
                        <th>보험기간</th>
                        <td>{rowData.sDay} ~ {rowData.eDay}</td>
                    </tr>
                    <tr>
                        <th>피보험자 상호</th>
                        <td>{rowData.platform}</td>
                        <th>피보험자 사업자등록번호</th>
                        <td>{rowData.bNumber}</td>
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
                        <td colSpan={3}>{renderField('bCargeName', rowData.bCargeName)}</td>
                    </tr>
                    <tr>
                        <th>업무 담당자 연락처</th>
                        <td>{renderField('bCell', rowData.bCell)}</td>
                        <th>업무 담당자 메일</th>
                        <td>{renderField('bMail', rowData.bMail)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
        ;
};

export default AccidentDetailList;
