import EditableField from "@/app/components/common/ui/input/editField";
import React from "react";
import useInputChange from "@/app/lib/customHook/inputChange";
import {UserType} from "@/@types/common";

interface EditUserProps {
    userInfo: UserType;
}

export default function EditUser({userInfo}: EditUserProps) {
    const initialData = {
        counselData: [{name: '', age: ''}],
        changeData: [{status: ''}]
    }
    const {handleInputChange} = useInputChange(initialData);
    return (
        <>
            <div className='mt-8 flex flex-col text-xl space-y-4'>
                <div>
                    <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>ID</h2>
                    <EditableField
                        type={'text'}
                        onChange={(value) => handleInputChange(0, 'userId', value)}
                        value={userInfo.userId}
                    />
                </div>
                <div>
                    <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>성함</h2>
                    <EditableField
                        type={'text'}
                        onChange={(value) => handleInputChange(0, 'name', value)}
                        value={userInfo.name}/>
                </div>
                <div>
                    <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>연락처</h2>
                    <EditableField
                        type={'text'}
                        onChange={(value) => handleInputChange(0, 'phone', value)}
                        value={userInfo.phone}/>
                </div>
                <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>이메일</h2>
                <div>
                    <EditableField
                        type={'text'}
                        onChange={(value) => handleInputChange(0, 'email', value)}
                        value={userInfo.email}/>
                </div>
                <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>직책</h2>
                <div>
                    <EditableField
                        type={'text'}
                        onChange={(value) => handleInputChange(0, 'work', value)}
                        value={userInfo.work}/>
                </div>
                <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>권한</h2>
                <div>{userInfo.auth}</div>
            </div>
            {
                userInfo.auth === 'user' ?
                    <div className={'my-16 text-gray-700'}>* 비밀번호 변경 및 권한 변경은 관리자에게 문의 바랍니다.</div>
                    : <div className={'my-16 text-gray-700'}>* 비밀번호 변경 및 권한 변경은 SIMG 관리자에게 문의 바랍니다.</div>
            }
        </>
    );
}
