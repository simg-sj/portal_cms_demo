import React, {forwardRef, useEffect, useImperativeHandle} from 'react';
import { useForm } from "react-hook-form";
import {UserCudType, UserListType, UserType} from "@/@types/common";
import {platformList} from "@/config/data";
import {useSession} from "next-auth/react";

export interface AddUserRef {
    getFormData: () => UserCudType;
    clearForm: () => void;
    validateForm: () => Promise<boolean>;
    setFormData: (data: UserListType) => void;
}

const AddUser = forwardRef<AddUserRef>((props, ref) => {
    const { data } = useSession();
    const {
        register,
        watch,
        reset,
        trigger,
        formState: { errors },
    } = useForm<UserCudType>({
        defaultValues: {
            uAuth: '',
            uName: '',
            platform: '',
            userPwd: '',
            bpk : data.user.bpk,
            userId: '',
            uMail: '',
            uCell: '',
            work: '',
            job : '',
            subContractYn : ''
        }
    });

    const platform = watch('platform');


    const clearForm = () => {
        reset();
    };

    const validateForm = async () => {
        const result = await trigger();
        return result;
    };

    const getFormData = () : UserCudType => {
        return watch();
    };

    const setFormData = (data: UserListType) => {
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
                        {...register('uName', {
                            required: "성함을 입력해주세요"
                        })}
                    />
                    {errors.uName && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.uName.message}</p>
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
                        {...register('uCell', {
                            required: "연락처를 입력해주세요"
                        })}
                    />
                    {errors.uCell && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.uCell.message}</p>
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
                        {...register('uMail', {
                            required: "이메일을 입력해주세요"
                        })}
                    />
                    {errors.uMail && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.uMail.message}</p>
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
                        {...register('userPwd', {
                            required: "비밀번호를 입력해주세요"
                        })}
                    />
                    {errors.userPwd && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.userPwd.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>플랫폼 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    {
                        platform ?
                            <>
                                <input
                                    type="text"
                                    readOnly={true}
                                    className={'w-full border rounded px-2 py-1'}
                                    {...register('platform')}
                                />
                            </>
                            :
                            <>
                                <select
                                    className={'w-full border rounded px-2 py-1'}
                                    {...register('platform', {
                                        required: "사용자 플랫폼을 선택해주세요",
                                        validate: value => value !== '' || '플랫폼을 선택해주세요'
                                    })}
                                >
                                    <option disabled hidden value={''}>플랫폼을 선택해주세요</option>
                                    {data.user.bpk && platformList[data.user.bpk] ? (
                                        platformList[data.user.bpk].map((idx, index) => (
                                            <option key={index} value={idx}>{idx}</option>
                                        ))
                                    ) : (
                                        <option disabled>플랫폼 데이터 없음</option>
                                    )}
                                </select>
                                {errors.platform && (<p className={'text-red-500 text-sm mt-1'}>{errors.platform.message}</p>)}
                            </>
                    }
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>권한 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1 h-[50px]">
                    <select
                        className={'w-full border rounded px-2 py-1'}
                        {...register('uAuth', {
                            required: "사용자 권한을 선택해주세요",
                            validate: value => value !== 'placeholder' || '관리자 혹은 사용자 권한을 선택해주세요'
                        })}
                    >
                        <option disabled={true} hidden={true} value={'placeholder'}>권한을 선택해주세요</option>
                        <option value={'user'}>사용자</option>
                        <option value={'admin'}>관리자</option>
                    </select>
                    {errors.uAuth && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.uAuth.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>직책</div>
                <div className="flex-1 h-[50px]">
                    <input
                        type="text"
                        placeholder={'등록할 사용자 직책을 입력하세요'}
                        {...register('work')}
                        className={'w-full border rounded px-2 py-1'}
                    />
                </div>
            </div>
        </form>
    );
});

AddUser.displayName = 'AddUser';

export default AddUser;