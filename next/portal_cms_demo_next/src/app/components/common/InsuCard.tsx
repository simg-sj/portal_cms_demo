import React, { useState } from 'react';
import Image from 'next/image';
import EditIcon from "@/assets/images/icon/edit-icon.png";
import DeleteIcon from "@/assets/images/icon/delete-icon.png";
import SaveIcon from "@/assets/images/icon/save-icon.png";
import WarningIcon from "@/assets/images/icon/warning-icon.png";
import Button from "@/app/components/common/ui/button";
import CalenderPicker from "@/app/components/common/ui/calenderPicker";

interface InsuranceItem {
    insuName: string;
    insuNumber: string;
    insuranceCompany: string;
    managementCompany: string;
    startDate: Date;
    endDate: Date;
    insuranceCost: number;
    onDelete: (insuNumber: string) => void;
    isEditing?: boolean;
}

const InsuCard = ({
                      insuName,
                      insuNumber,
                      insuranceCompany,
                      managementCompany,
                      startDate,
                      endDate,
                      insuranceCost,
                      onDelete,
                      isEditing: initialIsEditing = false
                  }: InsuranceItem) => {
    const [isEditing, setIsEditing] = useState(initialIsEditing);
    const [editData, setEditData] = useState({
        insuName,
        insuNumber,
        insuranceCompany,
        managementCompany,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        insuranceCost,
    });

    // 날짜 포맷 맞추기
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }).format(date);
    };

    // D-day 계산
    const calculateDday = (endDate: Date): number => {
        const today = new Date();
        const dday = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return dday;
    };

    // 보험 상태 계산
    const calculateInsuranceStatus = () => {
        const today = new Date();
        const insuranceEndDate = new Date(endDate);
        const oneMonthBefore = new Date(insuranceEndDate);
        oneMonthBefore.setMonth(insuranceEndDate.getMonth() - 1);

        const dday = calculateDday(insuranceEndDate);

        if (today > insuranceEndDate) {
            return {
                status: 'expired',
                color: 'gray',
                fill: true,
                label: `${formatDate(insuranceEndDate)} 만료`
            };
        } else if (dday <= 30 && dday > 0) {
            return {
                status: 'renewalSoon',
                color: 'blue',
                fill: false,
                label: `${formatDate(insuranceEndDate)} 갱신예정`,
                dday: dday
            };
        } else {
            return {
                status: 'active',
                color: 'blue',
                fill: false,
                label: `${formatDate(insuranceEndDate)} 갱신예정`
            };
        }
    };

    const insuranceStatus = calculateInsuranceStatus();

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(`${insuName}을(를) 삭제하시겠습니까?`);
        if (confirmDelete) {
            console.log(`삭제할 데이터 증권번호: ${insuNumber}`);
            onDelete(insuNumber);
        }
    };

    const handleSave = () => {
        const confirmSave = window.confirm("저장하시겠습니까?");
        if (confirmSave) {
            console.log("저장된 내용:", editData);
            setIsEditing(false);
        }
    };


    return (
        <div className={'rounded-xl border border-gray-200 my-3'}>
            <div className={'flex justify-between items-start px-7 pt-5 mb-5'}>
                <div>
                    <Button
                        color={insuranceStatus.color}
                        fill={insuranceStatus.fill}
                        height={26}
                        width={180}
                        rounded={true}
                        textSize={14}
                    >
                        {insuranceStatus.label}
                    </Button>
                    <div className={'font-semibold text-lg my-4 mx-2 relative'}>
                        {isEditing ? (
                            <input
                                type="text"
                                name="insuName"
                                value={editData.insuName}
                                onChange={handleInputChange}
                                className={'h-7 rounded'}
                            />
                        ) : (
                            <div>{editData.insuName}</div>
                        )}
                    </div>
                </div>
                <div className={'flex items-center space-x-4'}>
                    {insuranceStatus.status === 'renewalSoon' && (
                        <div className={'flex items-center text-sm py-2 px-5 bg-gray-100 rounded-lg'}>
                            <Image
                                src={WarningIcon.src}
                                alt={'경고'}
                                width={18}
                                height={18}
                                className={'cursor-pointer mr-2'}
                            />
                            <div>갱신일정이 {insuranceStatus.dday}일 남았습니다. 보험관리를 추가하여 갱신정보를 입력해주세요.</div>
                        </div>
                    )}
                    {isEditing ? (
                        <Image src={SaveIcon.src} alt={'저장'} width={120} height={120}
                               onClick={handleSave}
                               className={'cursor-pointer object-cover object-[0px] h-[20px] w-[20px] hover:object-[-30px]'}/>
                    ) : (
                        <Image
                            src={EditIcon.src}
                            alt={'수정'}
                            width={60}
                            height={60}
                            className={'cursor-pointer object-cover object-[0px] h-[20px] w-[20px] hover:object-[-31px]'}
                            onClick={handleEditToggle}
                        />
                    )}
                    <Image
                        src={DeleteIcon.src}
                        alt={'삭제'}
                        width={60}
                        height={60}
                        className={'cursor-pointer object-cover object-[0px] h-[20px] w-[20px] hover:object-[-31px]'}
                        onClick={handleDelete}
                    />
                </div>
            </div>

            <div className={'flex justify-between items-end px-7 mb-5'}>
                <div className={'w-[300px]'}>
                    <div className={'text-gray-600 mb-2 text-sm'}>증권번호</div>
                    {isEditing ? (
                        <input
                            type="text"
                            name="insuNumber"
                            value={editData.insuNumber}
                            onChange={handleInputChange}
                            className={'h-7 rounded'}
                        />
                    ) : (
                        <div>{editData.insuNumber}</div>
                    )}
                </div>
                <div className={'w-[300px]'}>
                    <div className={'text-gray-600 mb-2 text-sm'}>보험사</div>
                    {isEditing ? (
                        <input
                            type="text"
                            name="insuranceCompany"
                            value={editData.insuranceCompany}
                            onChange={handleInputChange}
                            className={'h-7 rounded'}
                        />
                    ) : (
                        <div>{editData.insuranceCompany}</div>
                    )}
                </div>
                <div className={'w-[300px]'}>
                    <div className={'text-gray-600 mb-2 text-sm'}>담당사</div>
                    {isEditing ? (
                        <input
                            type="text"
                            name="managementCompany"
                            value={editData.managementCompany}
                            onChange={handleInputChange}
                            className={'h-7 rounded'}
                        />
                    ) : (
                        <div>{editData.managementCompany}</div>
                    )}
                </div>
                <div className={'w-[400px]'}>
                    <div className={'text-gray-600 mb-2 text-sm'}>보험기간</div>
                    {isEditing ? (
                        <div className={'flex items-center'}>
                            <CalenderPicker
                                selected={editData.startDate}
                                onChange={(date) => setEditData(prev => ({...prev, startDate: date}))}
                            />
                            <div className={'mx-1'}>~</div>
                            <CalenderPicker
                                selected={editData.endDate}
                                onChange={(date) => setEditData(prev => ({...prev, endDate: date}))}
                            />
                        </div>
                    ) : (
                        <div>{formatDate(editData.startDate)} ~ {formatDate(editData.endDate)}</div>
                    )}
                </div>
                <div className={'w-[300px]'}>
                    <div className={'text-gray-600 mb-2 text-sm'}>보험료</div>
                    {isEditing ? (
                        <div>
                            <input
                                type="number"
                                name="insuranceCost"
                                value={editData.insuranceCost}
                                onChange={handleInputChange}
                                className={'h-7 rounded'}
                            />
                            <span> 원</span>
                        </div>
                    ) : (
                        <div><span>{editData.insuranceCost}</span> 원</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InsuCard;
