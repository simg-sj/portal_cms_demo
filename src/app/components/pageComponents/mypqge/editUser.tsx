import React, { useState } from "react";
import { UserType } from "@/@types/common";
import ButtonGroup from "@/app/components/common/ui/button/buttonGroup";


interface EditUserProps {
    userInfo: UserType;
    onSave?: (updatedData: UserType) => void;
    onClose?: () => void;
}

export default function EditUser({ userInfo, onSave }: EditUserProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<UserType>(userInfo);
    const [originalData, setOriginalData] = useState<UserType>(userInfo);

    const handleEdit = () => {
        setIsEditing(true);
        setOriginalData({ ...editedData });
    };

    const handleSave = () => {
        if (window.confirm('수정하시겠습니까?')) {
            const param = {
                아이디 : editedData.userId,
                성함 : editedData.name,
                연락처 : editedData.phone,
                이메일 : editedData.email,
                직책 : editedData.work,
            }
            console.log(param);
            onSave?.(editedData);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditedData(originalData);
        setIsEditing(false);
    };

    const handleChange = (field: keyof UserType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedData(prev => ({
            ...prev,
            [field]: e.target.value ?? ""
        }));
    };

    const renderField = (label: string, field: keyof UserType) => (
        <div>
            <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>{label}</h2>
            {isEditing ? (
                <input
                    type="text"
                    value={String(editedData[field] ?? "")}
                    onChange={handleChange(field)}
                    className="w-full px-2 py-1 border rounded"
                />
            ) : (
                <div className="px-2 py-1">
                    {String(editedData[field] ?? "")}
                </div>
            )}
        </div>
    );




    const buttons = isEditing ? [
        {
            label: "저장",
            onClick: handleSave,
            color: "blue" as const,
            fill: true,
            width: 100,
            height: 35,
        },
        {
            label: "취소",
            onClick: handleCancel,
            color: "gray" as const,
            width: 100,
            height: 35,
        }
    ] : [
        {
            label: "편집",
            onClick: handleEdit,
            color: "blue" as const,
            width: 100,
            height: 35,
        }
    ];

    return (
        <div className="relative pb-20">
            <div className='mt-8 flex flex-col text-xl space-y-4'>
                {renderField('아이디', 'userId')}
                {renderField('성함', 'name')}
                {renderField('연락처', 'phone')}
                {renderField('이메일', 'email')}
                {renderField('직책', 'work')}
                <div>
                    <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>권한</h2>
                    <div className="px-2 py-1">{editedData.auth}</div>
                </div>
            </div>

            {editedData.auth === 'user' ? (
                <div className={'my-16 text-gray-700'}>
                    * 비밀번호 변경 및 권한 변경은 업체 관리자에게 문의 바랍니다.
                </div>
            ) : (
                <div className={'my-16 text-gray-700'}>
                    * 비밀번호 변경 및 권한 변경은 SIMG 관리자에게 문의 바랍니다.
                 </div>
            )}

            <div className="absolute bottom-0 w-full">
                <ButtonGroup
                    buttons={buttons}
                />
            </div>
        </div>
    );
}