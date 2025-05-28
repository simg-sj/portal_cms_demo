import React, {useEffect, useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import {PlatformList, Step1Props} from "@/@types/common";
import {useSession} from "next-auth/react";
import TimePicker from "@/app/components/common/ui/input/timePicker";
import {getPlatform} from "@/app/(Navigation-Group)/turu/action";
import AdminFormSection from "@/app/components/pageComponents/rentCar/accidentAccept/adminFormSection";
import Loading from "@/app/(Navigation-Group)/loading";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";

const Step1 = ({onNext, setValue, handleSubmit,errors, register }: Step1Props) => {
    const {data} = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const onSubmit =  (data) => {
        if(data){
            onNext();
        }else {
            return;
        }
    };

    useEffect(() => {
        if (data?.user?.bpk) {
            setValue('bpk', data.user.bpk);
            setValue('partnerName', data.user.bName);
        }
    }, [data]);


    return (
        <div>
            <div className={'text-lg font-light my-6 px-[100px] text-gray-700'}>SIMG 1일 책임보험 접수 페이지입니다. 예치금 잔액 확인 후 충전하기 버튼을 클릭하여 충전 후 신청이 가능합니다.
            </div>
            <form className={'text-xl my-[50px] stepOne'}>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm mb-4 mx-[90px]">
                    <div>
                        <p className="text-sm text-gray-500">예치금 잔액</p>
                        <p className="text-2xl font-semibold text-gray-900">100,000원</p>
                    </div>
                    <Button color={"main"} fill={true} onClick={() => setIsOpen(true)} textSize={16} width={90}
                            height={40}>충전하기</Button>
                </div>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>피보험자 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="partnerName"
                        readOnly={true}
                        {...register("partnerName")}
                        className={'w-[800px]'}
                    />
                </div>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="vin"
                        placeholder={'차대번호를 입력해주세요.'}
                        {...register("vin", {required: "차대번호를 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.vin && typeof errors.vin.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.vin.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차량번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="vCarNum"
                        placeholder={'차량번호를 입력해주세요.'}
                        {...register("vCarNum", {required: "차량번호를 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.vCarNum && typeof errors.vCarNum.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.vCarNum.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>담당자 전화번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="inCargePhone"
                        placeholder={'-없이 입력해주세요.'}
                        {...register("inCargePhone")}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.vin && typeof errors.inCargePhone.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.inCargePhone.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차종 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="vCarType"
                        placeholder={'차종을 입력해주세요.'}
                        {...register("vCarType", {required: "차종을 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.vCarType && typeof errors.vCarType.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.vCarType.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>총 탑승 가능 인원 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'number'}
                        name="totalRiders"
                        placeholder={'숫자만 입력해주세요.'}
                        {...register("totalRiders", {required: "총 탑승 가능 인원을 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.totalRiders && typeof errors.totalRiders.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.totalRiders.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>보험기간 <span className={'text-red-500'}>*</span>
                    </div>
                    <select
                        name="insuTerm"
                        {...register("insuTerm", {required: "보험기간을 선택해주세요"})}
                        className={'w-[800px]'}
                    >
                        <option value={''}>
                            선택
                        </option>
                        <option value={'1'}>
                            1일
                        </option>
                        <option value={'3'}>
                            3일
                        </option>
                        <option value={'6'}>
                            6일
                        </option>
                    </select>
                </div>
                {
                    errors.insuTerm && typeof errors.insuTerm.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.insuTerm.message}</div>
                }
                {/*<div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>예치금 잔액
                    </div>
                    <div className={'flex w-[800px] space-x-4 items-center'}>
                        <div>
                            100,000원
                        </div>
                        <Button color={"main"} fill={true} onClick={() => setIsOpen(true)} textSize={18} width={120}
                                height={30}>충전하기</Button>
                    </div>
                </div>*/}
            </form>
            <div className={'flex my-10 mx-[100px]'}>
                <Button color={"main"} fill={true} onClick={handleSubmit(onSubmit)} textSize={18} width={1100}
                        height={60}>확인</Button>
            </div>
            {
                isOpen &&
                <DepositPopup setIsOpen={setIsOpen} data={data.user}/>
            }
        </div>
    );
};

export default Step1;