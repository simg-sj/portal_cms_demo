import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, UseFormRegister } from "react-hook-form";

interface ErrorFormData {
    title: string;
    contents : string;
}

export interface ErrorReceptionRef {
    getFormData: () => ErrorFormData;
    clearForm: () => void;
    validateForm: () => Promise<boolean>;
}

const ErrorReception = forwardRef<ErrorReceptionRef>((props, ref) => {
    const {
        register,
        watch,
        reset,
        trigger,
        formState: { errors },
    } = useForm<ErrorFormData>({
        defaultValues: {
            title: '',
            contents: '',
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
                <div className={'w-[110px]'}>제목 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder={'제목을 입력하세요'}
                        className={'w-full border rounded px-2 py-1'}
                        {...register('title', {
                            required: "제목을 입력해주세요"
                        })}
                    />
                    {errors.title && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.title.message}</p>
                    )}
                </div>
            </div>

            <div className={'flex my-3'}>
                <div className={'w-[110px]'}>오류내용 <span className={'text-red-500'}>*</span></div>
                <div className="flex-1">
                    <textarea
                        placeholder={'오류내용을 입력하세요'}
                        className={'w-full border rounded px-2 py-1 h-[120px] resize-none'}
                        {...register('contents', {
                            required: "오류내용을 입력해주세요"
                        })}
                    />
                    {errors.contents && (
                        <p className={'text-red-500 text-sm mt-1'}>{errors.contents.message}</p>
                    )}
                </div>
            </div>

        </form>
    );
});

ErrorReception.displayName = 'ErrorReception';

export default ErrorReception;