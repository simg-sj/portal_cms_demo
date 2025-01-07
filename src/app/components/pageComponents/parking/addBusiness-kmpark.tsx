import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, UseFormRegister } from "react-hook-form";

interface ParkingFormData {
    pkName: string;
    pkAddress: string;
    PJTcode: string;
    faceCount: number;
    indoor: {
        checked: boolean;
    };
    outdoor: {
        checked: boolean;
    };
    mechanical: {
        checked: boolean;
    };
    carLift: {
        checked: boolean;
    };
    form: {
        checked: boolean;
        value: string;
    };
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
            PJTcode: '',
            faceCount: null,
            indoor: { checked: false},
            outdoor: { checked: false},
            mechanical: { checked: false},
            carLift: { checked: false},
            form: { checked: false, value: ''},
        }
    });


    const watchIndoor = watch('indoor.checked');
    const watchOutdoor = watch('outdoor.checked');
    const watchMechanical = watch('mechanical.checked');
    const watchCarLift = watch('carLift.checked');
    const watchForm = watch('form.checked');

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

    const checkAtLeastOneChecked = () => {
        return watchIndoor || watchOutdoor || watchMechanical || watchCarLift || watchForm;
    };


    // 주차장구분 input 컴포넌트
    const ParkingTypeField = ({
                                  label,
                                  type,
                                  register,
                                  isChecked
                              }: {
        label: string;
        type: 'indoor' | 'outdoor' | 'mechanical' | 'carLift' | 'form';
        register: UseFormRegister<ParkingFormData>;
        isChecked: boolean;
    }) => (
        <label className={'flex items-center my-1'}>
            <input
                type="checkbox"
                {...register(`${type}.checked`)}
            />
            <div className={'mx-3 w-[60px]'}>{label}</div>
            {type === 'form' && (
                <div className="relative flex-1">
                    <input
                        type="text"
                        className={'border rounded px-2 py-1 w-full'}
                        {...register('form.value')}
                        disabled={!isChecked}
                        placeholder={'기타 주차장 구분을 입력하세요'}
                    />
                </div>
            )}
            {type !== 'form' && <div className={'ml-3'}></div>}
        </label>
    );



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
                        {...register('PJTcode', {
                            required: "주차장코드를 입력해주세요"
                        })}
                    />
                    {errors.PJTcode && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.PJTcode.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>주차장구분 <span className={'text-red-500'}>*</span></div>
                <div className={'flex flex-col w-full space-y-6'}>
                    <div className={'h-[4px]'}>
                    {(!watchIndoor && !watchOutdoor && !watchMechanical && !watchCarLift && !watchForm) && (
                        <p className={'text-gray-600 text-sm'}>* 주차장 구분을 1개 이상 선택해주세요.</p>
                    )}
                    </div>
                    <ParkingTypeField
                        label="옥내"
                        type="indoor"
                        register={register}
                        isChecked={watchIndoor}
                    />
                    <ParkingTypeField
                        label="옥외"
                        type="outdoor"
                        register={register}
                        isChecked={watchOutdoor}
                    />
                    <ParkingTypeField
                        label="기계식"
                        type="mechanical"
                        register={register}
                        isChecked={watchMechanical}
                    />
                    <ParkingTypeField
                        label="카리프트"
                        type="carLift"
                        register={register}
                        isChecked={watchCarLift}
                    />
                    <ParkingTypeField
                        label="기타"
                        type="form"
                        register={register}
                        isChecked={watchForm}
                    />
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>면적 <span className={'text-red-500'}>*</span></div>
                <div>
                <div className="flex items-center">
                    <input
                        type="number"
                        placeholder={'면적을 입력하세요'}
                        className={'border rounded px-2 py-1 w-[331px]'}
                        {...register('faceCount', {
                            required: "면적을 입력해주세요",
                        })}
                    />
                    <div className={'ml-3'}>㎡</div>
                </div>
                {errors.faceCount && (
                    <p className={'text-red-500 text-sm mt-1'}>{errors.faceCount.message}</p>
                )}
                </div>
            </div>
        </form>
    );
});

AddBusinessKmpark.displayName = 'AddBusiness';

export default AddBusinessKmpark;