import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from "react-hook-form";
import {UserType} from "@/@types/common";

export interface AddUserRef {
    getFormData: () => UserType;
    clearForm: () => void;
    validateForm: () => Promise<boolean>;
    setFormData: (data: UserType) => void;
}

const AddUser = forwardRef<AddUserRef>((props, ref) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors },
    } = useForm<UserType>({
        defaultValues: {
            auth: 'placeholder',
            name: '',
            platform: 'placeholder',
            password: '',
            userId: '',
            email: '',
            phone: '',
            work: '',
        }
    });


    const clearForm = () => {
        reset();
    };

    const validateForm = async () => {
        const result = await trigger();
        return result;
    };

    const getFormData = () => {
        return watch();
    };

    const setFormData = (data: UserType) => {
        reset(data);
    }

    useImperativeHandle(ref, () => ({
        getFormData,
        clearForm,
        validateForm,
        setFormData,
    }));

    return (
        <form className="space-y-4">
            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>성함 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <input
                        type="text"
                        placeholder={'등록할 사용자 성함을 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('name', {
                            required: "성함을 입력해주세요"
                        })}
                    />
                    {errors.name && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.name.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>연락처 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <input
                        type="text"
                        placeholder={'등록할 사용자 연락처를 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('phone', {
                            required: "연락처를 입력해주세요"
                        })}
                    />
                    {errors.phone && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.phone.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>이메일 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <input
                        type="text"
                        placeholder={'등록할 사용자 이메일을 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('email', {
                            required: "이메일을 입력해주세요"
                        })}
                    />
                    {errors.email && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.email.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>아이디 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <input
                        type="text"
                        placeholder={'등록할 사용자 아이디를 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('userId', {
                            required: "아이디를 입력해주세요"
                        })}
                    />
                    {errors.userId && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.userId.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>비밀번호 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <input
                        type="text"
                        placeholder={'등록할 사용자 비밀번호를 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('password', {
                            required: "비밀번호를 입력해주세요"
                        })}
                    />
                    {errors.password && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.password.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>플랫폼 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <select
                        className={'w-full border rounded px-2 py-1'}
                        {...register('platform', {
                            required: "사용자 플랫폼을 선택해주세요",
                            validate: value => value !== 'placeholder' || '플랫폼을 선택해주세요'
                        })}
                    >
                        <option disabled={true} hidden={true} value={'placeholder'}>플랫폼을 선택해주세요</option>
                        <option value={'하이파킹'}>하이파킹</option>
                        <option value={'케이엠파크'}>케이엠파크</option>
                    </select>
                    {errors.platform && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.platform.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>권한 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <select
                        className={'w-full border rounded px-2 py-1'}
                        {...register('auth', {
                            required: "사용자 권한을 선택해주세요",
                            validate: value => value !== 'placeholder' || '관리자 혹은 사용자 권한을 선택해주세요'
                        })}
                    >
                        <option disabled={true} hidden={true} value={'placeholder'}>권한을 선택해주세요</option>
                        <option value={'사용자'}>사용자</option>
                        <option value={'관리자'}>관리자</option>
                    </select>
                    {errors.auth && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.auth.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>직책</div>
                <div className="flex-1 h-[50px]">
                    <input
                        type="text"
                        placeholder={'등록할 사용자 직책을 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                    />
                </div>
            </div>
        </form>
    );
});

AddUser.displayName = 'AddUser';

export default AddUser;