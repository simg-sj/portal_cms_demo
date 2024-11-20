import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, UseFormRegister } from "react-hook-form";

interface ParkingFormData {
    parkingName: string;
    parkingAddress: string;
    indoor: {
        checked: boolean;
        value: string;
    };
    outdoor: {
        checked: boolean;
        value: string;
    };
    mechanical: {
        checked: boolean;
        value: string;
    };
    carLift: {
        checked: boolean;
        value: string;
    };
}

export interface AddBusinessRef {
    getFormData: () => ParkingFormData;
    clearForm: () => void;
    validateForm: () => Promise<boolean>;
}

const AddBusiness = forwardRef<AddBusinessRef>((props, ref) => {
    const {
        register,
        watch,
        reset,
        trigger,
        formState: { errors },
    } = useForm<ParkingFormData>({
        defaultValues: {
            parkingName: '',
            parkingAddress: '',
            indoor: { checked: false, value: '' },
            outdoor: { checked: false, value: '' },
            mechanical: { checked: false, value: '' },
            carLift: { checked: false, value: '' },
        }
    });

    //체크박스 상태확인
    const watchIndoor = watch('indoor.checked');
    const watchOutdoor = watch('outdoor.checked');
    const watchMechanical = watch('mechanical.checked');
    const watchCarLift = watch('carLift.checked');


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

    // 주차장구분 input 컴포넌트
    const ParkingTypeField = ({
                                  label,
                                  type,
                                  unit,
                                  register,
                                  isChecked,
                                  errors
                              }: {
        label: string;
        type: 'indoor' | 'outdoor' | 'mechanical' | 'carLift';
        unit: string;
        register: UseFormRegister<ParkingFormData>;
        isChecked: boolean;
        errors: any;
    }) => (
        <label className={'flex items-center my-1'}>
            <input
                type="checkbox"
                {...register(`${type}.checked`)}
            />
            <div className={'mx-3 w-[60px]'}>{label}</div>
            <div className="relative flex-1">
                <input
                    type="text"
                    className={'border rounded px-2 py-1 w-full'}
                    disabled={!isChecked}
                    {...register(`${type}.value`, {
                        validate: (value) => {
                            if (watch(`${type}.checked`) && (!value || value.trim() === '')) {
                                return `${label} 값을 입력해주세요`;
                            }
                            return true;
                        },
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "숫자만 입력 가능합니다."
                        }
                    })}
                />
                {errors[type]?.value && (
                    <p className={'text-red-500 text-sm absolute'}>{errors[type].value.message}</p>
                )}
            </div>
            <div className={'ml-3'}>{unit}</div>
        </label>
    );

    return (
        <form className="space-y-4">
            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>주차장명 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder={'주차장명을 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('parkingName', {
                            required: "주차장명을 입력해주세요"
                        })}
                    />
                    {errors.parkingName && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.parkingName.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>주차장주소 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder={'주차장주소를 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('parkingAddress', {
                            required: "주차장주소를 입력해주세요"
                        })}
                    />
                    {errors.parkingAddress && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.parkingAddress.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>주차장구분 <span className={'text-red-500'}>*</span></div>
                <div className={'flex flex-col w-full space-y-6'}>
                    <ParkingTypeField
                        label="옥내"
                        type="indoor"
                        unit="㎡"
                        register={register}
                        isChecked={watchIndoor}
                        errors={errors}
                    />
                    <ParkingTypeField
                        label="옥외"
                        type="outdoor"
                        unit="㎡"
                        register={register}
                        isChecked={watchOutdoor}
                        errors={errors}
                    />
                    <ParkingTypeField
                        label="기계식"
                        type="mechanical"
                        unit="대"
                        register={register}
                        isChecked={watchMechanical}
                        errors={errors}
                    />
                    <ParkingTypeField
                        label="카리프트"
                        type="carLift"
                        unit="대"
                        register={register}
                        isChecked={watchCarLift}
                        errors={errors}
                    />
                </div>
            </div>
        </form>
    );
});

AddBusiness.displayName = 'AddBusiness';

export default AddBusiness;