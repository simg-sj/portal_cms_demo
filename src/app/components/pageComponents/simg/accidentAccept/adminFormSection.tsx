import React, { useEffect } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PlatformList, rcAccidentRowType } from "@/@types/common";
import {User} from "next-auth";

interface Props {
    platformList: PlatformList[];
    register: UseFormRegister<any>;
    errors: FieldErrors;
    setValue: UseFormSetValue<any>;
    watch: UseFormWatch<any>;
}

const AdminFormSection = ({
                              platformList, register, errors, setValue, watch
                          }: Props) => {
    const bName = watch('partnerName');
    const confirmation = watch('confirmation');

    useEffect(() => {
        if (bName) {
            const selected = platformList.find(state => state.bName === bName);
            if (selected) {
                setValue('inCargeName', selected.inCargeName);
                setValue('inCargePhone', selected.inCargePhone);
                setValue('reCompany', selected.reCompany);
            }
        }
    }, [bName, platformList]);

    return (
        <>
            <div className="flex px-[100px] py-5 items-center">
                <div className="font-medium w-[300px] mr-1">컨펌여부 <span className="text-red-500">*</span></div>
                <div className="flex items-center">
                    <label className="flex items-center mr-10">
                        <input
                            type="radio"
                            name="confirmation"
                            value={'Y'}
                            {...register("confirmation", { required: "컨펌여부를 선택해주세요" })}
                            className="mr-3"
                        />
                        <span>예</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="confirmation"
                            value={'N'}
                            {...register("confirmation", { required: "컨펌여부를 선택해주세요" })}
                            className="mr-3"
                        />
                        <span>아니오</span>
                    </label>
                    {confirmation === 'Y' && (
                        <input
                            type="text"
                            name="wName"
                            {...register("wName", { required: "사용자를 입력해주세요." })}
                            className="ml-20 w-[560px]"
                        />

                    )}
                </div>
            </div>
            {/* ✅ 에러 메시지 출력 */}
            {errors.confirmation && typeof errors.confirmation.message === "string" && (
                <div className="text-red-500 pl-[100px] text-base error">{errors.confirmation.message}</div>
            )}
            {confirmation === "Y" && errors.wName && typeof errors.wName.message === "string" && (
                <div className="text-red-500 pl-[100px] text-sm">{errors.wName.message}</div>
            )}

            {/* 제휴사, 담당자명, 연락처 */}
            <div className="flex px-[100px] py-5 items-center">
                <div className="font-medium w-[300px] mr-1">제휴사명 <span className="text-red-500">*</span></div>
                <select
                    name="partnerName"
                    className="w-[800px]"
                    {...register("partnerName", { required: "제휴사를 선택해주세요" })}
                    defaultValue=""
                >
                    <option value="">제휴사를 선택해주세요.</option>
                    {platformList.map((state, index) => (
                        <option key={index} value={state.bName}>{state.bName}</option>
                    ))}
                    <option value="etc">기타</option>
                </select>
            </div>
            {errors.partnerName && typeof errors.partnerName.message === "string" && (
                <div className="text-red-500 pl-[100px] text-base error">{errors.partnerName.message}</div>
            )}


        </>
    );
};

export default AdminFormSection;
