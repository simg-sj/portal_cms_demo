import React, {useEffect, useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import type {dutyRowType, Step1Props} from "@/@types/common";
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import dayjs from "dayjs";
import button from "@/app/components/common/ui/button/button";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";


const Step1 = ({onNext, formData, setFormData}: Step1Props) => {
    const {data} = useSession();
    const today = dayjs().format('YYYY-MM-DD');
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<dutyRowType>({
        defaultValues: {
            bpk : 8,
        }
    });
    const fromDay = watch('startDate');
    const handleNext = (data : dutyRowType) => {
        console.log(data)
    };
    return (
        <>
            <div className={'text-lg font-light my-6 px-[100px] text-gray-700'}>별따러가자 책임 보험접수 페이지입니다. 보험접수 내용을 입력하여
                접수해주세요.
            </div>
            <form className={'text-xl my-[50px] stepOne'} onSubmit={handleSubmit(handleNext)}>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>배대사 <span
                        className={'text-red-500'}>*</span></div>
                    <input
                        type={'text'}
                        name="bName"
                        readOnly={true}
                        defaultValue={data?.user?.bName}
                        className={'w-[800px]'}
                    />
                </div>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사업자번호 <span
                        className={'text-red-500'}>*</span></div>
                    <input
                        type={'text'}
                        name="bNo"
                        {...register("bNo", {
                            required: "사업자번호는 필수입니다."

                        })}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.partnerName &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.partnerName}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        {...register("carNum", {
                            required: "차대번호는 필수입니다."

                        })}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>보험기간 <span className={'text-red-500'}>*</span>
                    </div>
                    {/*<DayTerm  type={'day'} setParam={setFormData} sDay={new Date(formData.startDate)} eDay={new Date(formData.endDate)}/>*/}
                    <div className={'flex items-center w-[800px]'}>
                        <div className={'mr-3 w-full'}>
                            <div className={'w-1/2 mr-3 text-[16px] text-gray-700'}>시작일</div>
                            <div className={'w-[400px]'}>
                                <CalenderPicker
                                    maxDate={fromDay || new Date()}
                                    minDate={new Date()}
                                    selected={new Date()}
                                />
                            </div>
                        </div>
                        <div className={'w-full'}>
                            <div className={'w-1/2 text-[16px] text-gray-700'}>종료일</div>
                            <div className={'mr-3 w-full'}>
                                    <CalenderPicker
                                        minDate={new Date(fromDay)}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                {errors.endDate &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.endDate}</div>
                }
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차량명 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carType"
                        {...register("carType", {
                                required: "차량명은 필수입니다."

                            }
                        )}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차량번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        {...register("carNum")}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>연료 / 배기량 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="displacement"
                        {...register("displacement", {
                                required: "연료/배기량은 필수입니다."

                            }
                        )}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>등록일 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="modelYear"
                        {...register("modelYear", {
                                required: "등록일을 입력해주세요."

                            }
                        )}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>년식<span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="modelYear"
                        {...register("modelYear", {
                                required: "년식을 입력해주세요."

                            }
                        )}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>운전자범위 / 연령범위 <span className={'text-red-500'}>*</span>
                    </div>
                    <select
                        defaultValue={'00'}
                        name="driverScope"
                        {...register("driverScope", {
                                required: "등록일/년식을 입력해주세요."

                            }
                        )}
                        className={'w-[800px]'}
                    >
                        <option value={'00'} disabled={true}>
                            선택
                        </option>
                        <option value={'01'}>
                            누구나
                        </option>
                        <option value={'02'}>
                            기명1인한정
                        </option>
                        <option value={'03'}>
                            가족한정
                        </option>
                    </select>
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>담보 <span className={'text-red-500'}>*</span>
                    </div>
                    <select
                        name="carNum"
                        defaultValue={'00'}
                        {...register("pawn", {
                                required: "담보를 선택해주세요."

                            }
                        )}
                        className={'w-[800px]'}
                    >
                        <option value={'00'} disabled={true}>
                            선택
                        </option>
                        <option value={'01'}>
                            의무보험
                        </option>
                        <option value={'02'}>
                            책임보험
                        </option>
                    </select>
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>
                        기타 담보 조정사항
                    </div>
                    <input
                        type={'text'}
                        name="etcPawn"
                        {...register("etcPawn"
                        )}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>
                        증권번호
                        <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="pNo"
                        {...register("pNo", {
                                required: "증권번호를 입력해주세요."

                            }
                        )}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>
                        보험료
                        <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="premium"
                        {...register("premium", {
                                required: "보험료를 입력해주세요."

                            }
                        )}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>결제수단 <span className={'text-red-500'}>*</span>
                    </div>
                    <select
                        name="carNum"
                        defaultValue={'00'}
                        {...register("payType", {
                                required: "결제수단을 선택해주세요."

                            }
                        )}
                        className={'w-[800px]'}
                    >
                        <option value={'00'} disabled={true}>
                            선택
                        </option>
                        <option value={'01'}>
                            가상계좌
                        </option>
                        <option value={'02'}>
                            계좌이체
                        </option>
                        <option value={'03'}>
                            신용카드
                        </option>
                    </select>
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                {
                    <>
                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>
                                보험료
                                <span className={'text-red-500'}>*</span>
                            </div>
                            <input
                                type={'text'}
                                name="premium"
                                {...register("premium", {
                                        required: "보험료를 입력해주세요."

                                    }
                                )}
                                className={'w-[800px]'}
                            />
                        </div>
                        {errors.carNum &&
                            <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                    </>
                }
                <div className={'flex my-10 mx-[100px]'}>
                    <button type={'submit'} className={'w-[1100px] text-[18px] h-[60px] bg-main rounded-lg text-white'}>
                        확인
                    </button>
                </div>
            </form>
        </>
    );
};

export default Step1;
