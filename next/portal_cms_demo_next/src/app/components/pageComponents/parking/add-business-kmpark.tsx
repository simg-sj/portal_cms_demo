import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, UseFormRegister } from "react-hook-form";
import checkbox from "@/app/components/common/ui/checkbox";
import Checkbox from "@/app/components/common/ui/checkbox";

interface ParkingFormData {
    pkName: string;
    pkAddress: string;
    pkCode: string;
    pkSize: number;
    pkSize2: number;
}

export interface AddBusinessRef {
    getFormData: () => ParkingFormData;
    clearForm: () => void;
    validateForm: () => Promise<boolean>;
}

const AddBusinessKmpark = forwardRef<AddBusinessRef>((props, ref) => {
    const {
        register,
        watch,
        reset,
        trigger,
        formState: { errors },
    } = useForm<ParkingFormData>({
        defaultValues: {
            pkName: '',
            pkAddress: '',
            pkCode: '',
            pkSize: null,
            pkSize2: null
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

    useImperativeHandle(ref, () => ({
        getFormData,
        clearForm,
        validateForm
    }));


    return (
        <form className="space-y-4">
            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>주차장명 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder={'주차장명을 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('pkName', {
                            required: "주차장명을 입력해주세요"
                        })}
                    />
                    {errors.pkName && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.pkName.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>주차장주소 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder={'주차장주소를 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('pkAddress', {
                            required: "주차장주소를 입력해주세요"
                        })}
                    />
                    {errors.pkAddress && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.pkAddress.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>주차장코드 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder={'주차장코드를 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('pkCode', {
                            required: "주차장코드를 입력해주세요"
                        })}
                    />
                    {errors.pkCode && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.pkCode.message}</p>
                    )}
                </div>
            </div>

{/*            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>주차장구분 <span className={'text-red-500'}>*</span></div>
                <div className={'flex flex-col w-full space-y-6'}>
                </div>
            </div>*/}

            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>평수 <span className={'text-red-500'}>*</span></div>
                <div className="flex items-center">
                    <input
                        type="number"
                        placeholder={'평수를 입력하세요'}
                        className={'border rounded px-2 py-1 w-[331px]'}
                        {...register('pkSize', {
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "숫자만 입력 가능합니다."
                            }
                        })}
                    />
                    <div className={'ml-3'}>평</div>
                </div>
            </div>
            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>면적 <span className={'text-red-500'}>*</span></div>
                <div className="flex items-center">
                    <input
                        type="number"
                        placeholder={'면적을 입력하세요'}
                        className={'border rounded px-2 py-1 w-[331px]'}
                        {...register('pkSize2', {
                            pattern: {
                                value: /^[0-9]*$/,
                                message: "숫자만 입력 가능합니다."
                            }
                        })}
                    />
                    <div className={'ml-3'}>㎡</div>
                </div>
            </div>

        </form>
    );
});

AddBusinessKmpark.displayName = 'AddBusiness';

export default AddBusinessKmpark;