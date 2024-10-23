import EditableField from "@/app/components/common/EditField";
import React from "react";
import useInputChange from "@/app/lib/customHook/inputChange";





export default function EditUser({userInfo}: UserType) {
    const initialData = {
        counselData: [{name: '', age: ''}],
        changeData: [{status: ''}]
    }
    const { handleInputChange} = useInputChange(initialData);
    return (
        <div className='mt-8 flex flex-col text-xl space-y-4'>
            <div className='flex items-center w-[600px]'>
                <label className='text-gray-600 w-[300px]'>ID</label>
                <EditableField
                    type={'text'}
                    onChange={(value) => handleInputChange(0, 'EndAmt', value)}
                    value={userInfo.userId}
                />
            </div>
            <div className='flex items-center w-[600px]'>
                <label className='text-gray-600 w-[300px]'>이름</label>
                <EditableField
                    type={'text'}
                    onChange={(value) => handleInputChange(0, 'EndAmt', value)}
                    value={userInfo.name}/>
            </div>
            <div className='flex items-center w-[600px]'>
                <label className='text-gray-600 w-[300px]'>연락처</label>
                <EditableField
                    type={'text'}
                    onChange={(value) => handleInputChange(0, 'EndAmt', value)}
                    value={userInfo.phone}/>
            </div>
            <div className='flex items-center w-[600px]'>
                <label className='text-gray-600 w-[300px]'>이메일</label>
                <EditableField
                    type={'text'}
                    onChange={(value) => handleInputChange(0, 'EndAmt', value)}
                    value={userInfo.email}/>
            </div>
        </div>
    );
}
