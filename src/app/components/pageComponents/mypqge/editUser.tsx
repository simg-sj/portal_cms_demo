import React, { useState } from "react";
import {UptClaim, UserCudType, UserListType, UserType} from "@/@types/common";
import ButtonGroup from "@/app/components/common/ui/button/buttonGroup";
import {authText} from "@/config/data";
import {userService} from "@/app/(Navigation-Group)/action";
import {convertClaimToUptClaim, convertUser} from "@/app/lib/common";


interface EditUserProps {
    userInfo: UserType;
    onClose?: () => void;
    setUserInfo : React.Dispatch<React.SetStateAction<UserType>>
}

export default function EditUser({ userInfo }: EditUserProps) {
    const [isEditing, setIsEditing] = useState(false);
    // 초기에 rowData를 UptClaim으로 변환해서 editData로 설정
    const [editedData, setEditedData] = useState<UserCudType>(convertUser(userInfo));
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (window.confirm('수정하시겠습니까?')) {
            console.log("e",editedData);
            console.log("u",userInfo);
            /*if (window.confirm(`${userInfo.name} ${authText[userInfo.auth]} 를 수정하시겠습니까?`)) {
                let param : any  = {
                    ...userInfo,
                    job : 'CUD',
                    gbn : 'UPD'
                }

                let result = await userService(param);


                if("code" in result){
                    if (result.code === "200") {
                        alert('수정되었습니다.');
                    }else {
                        alert('서비스 오류입니다.');
                    }
                    setIsEditing(false);
                }
            }*/
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = (field: keyof UserCudType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedData(prev => ({
            ...prev,
            [field]: e.target.value ?? ""
        }));
    };

    const renderField = (label: string, field: keyof UserCudType) => (
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
                <div>
                    <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>권한</h2>
                    <div className="px-2 py-1">{userInfo.userId}</div>
                </div>
                {renderField('성함', 'uName')}
                {renderField('연락처', 'uCell')}
                {renderField('이메일', 'uMail')}
                {renderField('직책', 'work')}
                <div>
                    <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>권한</h2>
                    <div className="px-2 py-1">{authText[userInfo.auth]}</div>
                </div>
            </div>

            {userInfo.auth === 'user' ? (
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