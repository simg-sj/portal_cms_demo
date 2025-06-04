import React, { useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import { Step1Props} from "@/@types/common";
import {useSession} from "next-auth/react";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";
import Image from "next/image";
import ReFresh from "@/assets/images/icon/refresh-icon.png";

const Step1 = ({onNext,watch, refetch, handleSubmit,errors, register }: Step1Props) => {
    const {data} = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const onSubmit =  (data) => {
        if(data){
            onNext();
        }else {
            return;
        }
    };
    console.log(watch('balance'))
    return (
        <div>
            <div className={'text-lg font-light my-6 px-[100px] text-gray-700'}>SIMG 1일 책임보험 접수 페이지입니다. 예치금 잔액 확인 후 충전하기 버튼을 클릭하여 충전 후 신청이 가능합니다.
            </div>
            <form className={'text-xl my-[50px] stepOne'}>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm mb-4 mx-[90px]">
                    <div>
                        <div className='flex space-x-2 items-center'>
                            <p className="text-sm text-gray-500">예치금 잔액</p>
                            <button type={'button'} onClick={() => refetch()}>
                                <Image src={ReFresh} alt={'새로고침'} width={20} />
                            </button>
                        </div>
                        <p className="text-2xl font-semibold text-gray-900">{Number(watch('balance')).toLocaleString()}원</p>
                    </div>
                        <Button color={"main"} fill={true} onClick={() => setIsOpen(true)} textSize={16} width={90}
                                height={40}>충전하기
                        </Button>
                </div>
                {
                    watch('balance') < 50000 &&
                    <div className="text-red-500 pl-[100px] text-base my-8 error">예치금 잔액이 부족합니다.</div>
                }


                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>피보험자 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="contractor"
                        placeholder={'피보험자를 입력해주세요.'}
                        {...register("contractor", {required : '피보험자를 입력해주세요.'})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.contractor && typeof errors.contractor.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.contractor.message}</div>}

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사업자번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="bNumber"
                        placeholder={'사업자번호를 입력해주세요.'}
                        {...register("bNumber" , {required: "사업자번호를 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.bNumber && typeof errors.bNumber.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.bNumber.message}</div>}

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>담당자 전화번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="contractCell"
                        placeholder={'-없이 입력해주세요.'}
                        {...register("contractCell", {required : '담당자 전화번호를 입력해주세요.'})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.contractCell && typeof errors.contractCell.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.contractCell.message}</div>}


                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="viNumer"
                        placeholder={'차대번호를 입력해주세요.'}
                        {...register("viNumber", {required: "차대번호를 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.vinNumber && typeof errors.vinNumber.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.vinNumber.message}</div>}

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차량번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNumber"
                        placeholder={'차량번호를 입력해주세요.'}
                        {...register("carNumber", {required: "차량번호를 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNumber && typeof errors.carNumber.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.carNumber.message}</div>}

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차종 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="vType"
                        placeholder={'차종을 입력해주세요.'}
                        {...register("vType", {required: "차종을 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.vType && typeof errors.vType.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.vType.message}</div>}

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>총 탑승 가능 인원 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'number'}
                        name="capacity"
                        placeholder={'숫자만 입력해주세요.'}
                        {...register("capacity", {required: "총 탑승 가능 인원을 입력해주세요."})}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.capacity && typeof errors.capacity.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.capacity.message}</div>}

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>보험기간 <span className={'text-red-500'}>*</span>
                    </div>
                    <select
                        name="contractDay"
                        {...register("contractDay", {required: "보험기간을 선택해주세요"})}
                        className={'w-[800px]'}
                    >
                        <option value={''}>
                            선택
                        </option>
                        <option value={'1DAY'}>
                            1일
                        </option>
                        <option value={'3DAY'}>
                            3일
                        </option>
                        <option value={'6DAY'}>
                            6일
                        </option>
                    </select>
                </div>
                {
                    errors.contractDay && typeof errors.contractDay.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.contractDay.message}</div>
                }
            </form>

            <div className={'flex my-10 mx-[100px]'}>
                <Button color={watch('balance') < 50000 ? 'gray' : 'main'} disabled={watch('balance') < 50000 && true } fill={true} onClick={handleSubmit(onSubmit)} textSize={18} width={1100}
                        height={60}>확인</Button>
            </div>
            {
                isOpen &&
                <DepositPopup setIsOpen={setIsOpen} data={data.user} balance={watch('balance')}/>
            }
        </div>
    );
};

export default Step1;