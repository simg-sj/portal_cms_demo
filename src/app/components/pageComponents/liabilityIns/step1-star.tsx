"use client"
import React, {useEffect} from "react";
import type {dutyRowType, Step1Props} from "@/@types/common";
import {useSession} from "next-auth/react";
import {useForm, Controller} from "react-hook-form";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";
import dayjs from "dayjs";
import {bankList} from "@/config/data";
import AddExcelUploadReceipt from "@/app/components/pageComponents/parking/addExcelUploadReceipt";


const ErrorMessage = ({ message }: { message?: string }) => {
    return message ? <div className="text-red-500 pl-[100px] text-base error">{message}</div> : null;
};

const Step1 = ({onNext, formData, setFormData}: Step1Props) => {
    const {data} = useSession();
    const { register, handleSubmit, formState: { errors }, reset, control, watch } = useForm<dutyRowType>({
        defaultValues:  formData || {}
    });

    const Ncase = watch('Ncase');
    const regi = watch('registYMD');
    const payType = watch('payMethod');

/*    useEffect(() => {
        if (data?.user) {
            reset({
                bName: data.user.bName,
                bizId: data.user.bNo,
            });
        }
    }, [data, reset]);*/

    useEffect(() => {
        if (data?.user) {
            // formData가 있는 경우, 플랫폼과 사업자번호 정보를 유지하면서 기존 formData 값도 유지
            if (formData) {
                reset({
                    ...formData,
                    bName: data.user.bName,
                    bizId: data.user.bNo,
                });
            } else {
                // formData가 없는 경우에는 플랫폼과 사업자번호만 설정
                reset({
                    bName: data.user.bName,
                    bizId: data.user.bNo,
                });
            }
        } else if (formData) {
            // 세션 데이터는 없지만 formData가 있는 경우
            reset(formData);
        }
    }, [data, reset, formData]);


    const onSubmit = (formData: dutyRowType) => {
        console.log(formData);
        setFormData(formData);
        onNext();
    };
    return (
        <>
            <div className={'text-lg font-light my-6 px-[100px] text-gray-700'}>
                별따러가자 책임 보험접수 페이지입니다. 보험접수 내용을 입력하여 접수해주세요.
            </div>
            <form className={'text-xl my-[50px] stepOne'} onSubmit={handleSubmit(onSubmit)}>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>접수 건수 <span
                        className={'text-red-500'}>*</span></div>
                    <div className={'flex w-[800px]'}>
                        <label className={'flex items-center w-1/2 text-xl'}>
                            <input
                                type={'radio'}
                                value="single"
                                {...register("Ncase", {required: "접수건수는 필수값입니다."})}
                            />
                            <div className={'ml-3'}>단일</div>
                        </label>
                        <label className={'flex items-center w-1/2 text-xl'}>
                            <input
                                type={'radio'}
                                value="multiple"
                                {...register("Ncase", {required: "접수건수는 필수값입니다."})}
                            />
                            <div className={'ml-3'}>다중</div>
                        </label>
                    </div>
                </div>
                <ErrorMessage message={errors.Ncase?.message}/>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>플랫폼 <span
                        className={'text-red-500'}>*</span></div>
                    <input
                        type={'text'}
                        readOnly={true}
                        {...register("bName")}
                        className={'w-[800px]'}
                    />
                </div>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사업자번호 <span
                        className={'text-red-500'}>*</span></div>
                    <input
                        type={'text'}
                        {...register("bizId")}
                        readOnly={true}
                        className={'w-[800px]'}
                    />
                </div>
                {Ncase === 'single' &&
                    <>
                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>담당자 이름 <span
                                className={'text-red-500'}>*</span>
                            </div>
                            <input
                                type={'text'}
                                {...register("handlerName", {
                                    required: "담당자 이름은 필수입니다."
                                })}
                                className={'w-[800px]'}
                            />
                        </div>

                        <ErrorMessage message={errors.handlerName?.message}/>

                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>담당자 전화번호 <span
                                className={'text-red-500'}>*</span>
                            </div>
                            <input
                                type={'text'}
                                placeholder={'-없이 입력해주세요.'}
                                {...register("handlerPhone", {
                                    required: "담당자 전화번호는 필수입니다.",
                                    pattern: {
                                        value: /^(01[0-9])(\d{3,4})(\d{4})$/, // 핸드폰 번호 정규식 (010-xxxx-xxxx 형식)
                                        message: "전화번호 형식이 잘못되었습니다.",
                                    },
                                })}
                                onChange={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                }}
                                className={'w-[800px]'}
                            />
                        </div>
                        <ErrorMessage message={errors.handlerPhone?.message}/>

                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>이륜차량 이름 <span
                                className={'text-red-500'}>*</span>
                            </div>
                            <input
                                type={'text'}
                                {...register("bikeName", {
                                        required: "차량명은 필수입니다."

                                    }
                                )}
                                className={'w-[800px]'}
                            />
                        </div>
                        <ErrorMessage message={errors.bikeName?.message}/>

                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>차량번호
                            </div>
                            <input
                                type={'text'}
                                {...register("bikeNum")}
                                className={'w-[800px]'}
                            />
                        </div>


                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                            </div>
                            <input
                                type={'text'}
                                {...register("viNum", {
                                    required: "차대번호는 필수입니다."

                                })}
                                className={'w-[800px]'}
                            />
                        </div>
                        <ErrorMessage message={errors.viNum?.message}/>


                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>연료<span className={'text-red-500'}>*</span>
                            </div>
                            <select
                                {...register("fuelType", {
                                        required: "연료을 선택해주세요."

                                    }
                                )}
                                className={'w-[800px]'}
                            >
                                <option value={''}>
                                    선택
                                </option>
                                <option value={'전기 外'}>
                                    전기 外
                                </option>
                                <option value={'전기'}>
                                    전기
                                </option>
                            </select>
                        </div>
                        <ErrorMessage message={errors.fuelType?.message}/>
                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>배기량 <span className={'text-red-500'}>*</span>
                            </div>
                            <select
                                {...register("bikeCC", {
                                        required: "배기량을 선택해주세요."

                                    }
                                )}
                                className={'w-[800px]'}
                            >
                                <option value={''}>
                                    선택
                                </option>
                                <option value={'경형'}>
                                    50cc 이하 경형
                                </option>
                                <option value={'소형A'}>
                                    50cc초과~100cc이하 소형A
                                </option>
                                <option value={'소형B'}>
                                    100cc초과~125cc이하 소형B
                                </option>
                                <option value={'중형'}>
                                    125cc초과~260cc이하 중형
                                </option>
                                <option value={'대형'}>
                                    260cc초과 대형
                                </option>
                            </select>
                        </div>
                        <ErrorMessage message={errors.bikeCC?.message}/>

                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>연식<span
                                className={'text-red-500'}>*</span>
                            </div>
                            <div className={'flex items-center w-[800px]'}>
                                <div className={'mr-3 w-full'}>
                                    <div className={'w-[800px]'}>
                                        <Controller
                                            control={control}
                                            name="registYMD"
                                            rules={{ required: "연식을 선택해주세요." }}
                                            render={({field}) => (
                                                <CalenderPicker
                                                    maxDate={new Date()} // 오늘 날짜까지 선택 가능
                                                    minDate={new Date(2000, 0, 1)} // 2000년 1월 1일부터 선택 가능
                                                    selected={regi}
                                                    onChange={(date) => {
                                                        if (date) {
                                                            const formatDate = dayjs(date).format('YYYY-MM-DD');
                                                            field.onChange(formatDate);
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ErrorMessage message={errors.registYMD?.message}/>

                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>등록일<span
                                className={'text-red-500'}>*</span>
                            </div>
                            <div className={'flex items-center w-[800px]'}>
                                <div className={'mr-3 w-full'}>
                                    <div className={'w-[800px]'}>
                                        <Controller
                                            control={control}
                                            name="registYMD"
                                            rules={{ required: "등록일을 선택해주세요." }}
                                            render={({field}) => (
                                                <CalenderPicker
                                                    maxDate={new Date()} // 오늘 날짜까지 선택 가능
                                                    minDate={new Date(2000, 0, 1)} // 2000년 1월 1일부터 선택 가능
                                                    selected={field.value}
                                                    onChange={(date) => {
                                                        if (date) {
                                                            const formatDate = dayjs(date).format('YYYY-MM-DD');
                                                            field.onChange(formatDate);
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ErrorMessage message={errors.registYMD?.message}/>

                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>운전자범위<span className={'text-red-500'}>*</span>
                            </div>
                            <select
                                {...register("driverRange"
                                )}
                                className={'w-[800px]'}
                            >
                                <option value={'누구나운전'}>
                                    누구나운전
                                </option>
                            </select>
                        </div>

                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>연령범위 <span className={'text-red-500'}>*</span>
                            </div>
                            <select
                                {...register("ageRange", {
                                        required: "연령범위를 선택해주세요."

                                    }
                                )}
                                className={'w-[800px]'}
                            >
                                <option value={''}>
                                    선택
                                </option>
                                <option value={'전연령'}>
                                    전연령
                                </option>
                                <option value={'만 21세이상'}>
                                    만 21세이상
                                </option>
                                <option value={'만 24세이상'}>
                                    만 24세이상
                                </option>
                                <option value={'만 26세이상'}>
                                    만 26세이상
                                </option>
                                <option value={'만 30세이상'}>
                                    만 30세이상
                                </option>
                                <option value={'만 35세 이상'}>
                                    만 35세 이상
                                </option>
                            </select>
                        </div>
                        <ErrorMessage message={errors.ageRange?.message}/>


                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>담보 <span className={'text-red-500'}>*</span>
                            </div>
                            <select
                                {...register("dambo", {
                                        required: "담보를 선택해주세요."

                                    }
                                )}
                                className={'w-[800px]'}
                            >
                                <option value={''}>
                                    선택
                                </option>
                                <option value={'의무보험'}>
                                    의무보험
                                </option>
                                <option value={'책임보험'}>
                                    책임보험
                                </option>
                            </select>
                        </div>
                        <ErrorMessage message={errors.dambo?.message}/>


                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>
                                기타 담보 조정사항
                            </div>
                            <select
                                {...register("gitaDambo")}
                                className={'w-[800px]'}
                            >
                                <option value={'선택안함'}>
                                    선택안함
                                </option>
                                <option value={'대물한도 2000만원 3000만원'}>
                                    대물한도 2000만원 3000만원
                                </option>
                                <option value={'대물한도 5000만원 상향'}>
                                    대물한도 5000만원 상향
                                </option>
                                <option value={'대물한도 7000만원 상향'}>
                                    대물한도 7000만원 상향
                                </option>
                                <option value={'대물한도 1억원 상향'}>
                                    대물한도 1억원 상향
                                </option>
                            </select>
                        </div>


                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>결제수단 <span className={'text-red-500'}>*</span>
                            </div>
                            <select
                                {...register("payMethod", {
                                        required: "결제수단을 선택해주세요."

                                    }
                                )}
                                className={'w-[800px]'}
                            >
                                <option value={''}>
                                    선택
                                </option>
                                <option value={'신용카드'}>
                                    신용카드
                                </option>
                                <option value={'자동이체'}>
                                    자동이체
                                </option>
                            </select>
                        </div>
                        <ErrorMessage message={errors.payMethod?.message}/>

                        {
                            payType === '신용카드' &&
                            <>
                                <div className={'flex px-[100px] py-5 items-center'}>
                                    <div className={'font-medium w-[300px] mr-1'}>카드번호 <span
                                        className={'text-red-500'}>*</span>
                                    </div>
                                    <input
                                        type={'text'}
                                        placeholder={'-없이 입력해 주세요.'}
                                        {...register("creaditNum", {
                                            required: "카드번호를 입력해주세요."

                                        })}
                                        onChange={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                        className={'w-[800px]'}
                                    />
                                </div>
                                <ErrorMessage message={errors.creaditNum?.message}/>
                            </>

                        }

                        {
                            payType === '자동이체' &&
                            <>
                                <div className={'flex px-[100px] py-5 items-center'}>
                                    <div className={'font-medium w-[300px] mr-1'}>은행명 <span
                                        className={'text-red-500'}>*</span>
                                    </div>
                                    <select
                                        {...register("bankName", {
                                                required: "은행명을 선택해주세요."

                                            }
                                        )}
                                        className={'w-[800px]'}
                                    >
                                        {
                                            bankList.map((bank, index) =>
                                                <option key={index} value={bank.value}>{bank.label}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <ErrorMessage message={errors.bankName?.message}/>

                                <div className={'flex px-[100px] py-5 items-center'}>
                                    <div className={'font-medium w-[300px] mr-1'}>계좌번호 <span
                                        className={'text-red-500'}>*</span>
                                    </div>
                                    <input
                                        type={'text'}
                                        placeholder={'-없이 입력해 주세요.'}
                                        {...register("bankNum", {
                                            required: "계좌번호를 입력해주세요."

                                        })}
                                        onChange={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                        className={'w-[800px]'}
                                    />
                                </div>
                                <ErrorMessage message={errors.bankNum?.message}/>

                            </>
                        }
                    </>
                }
                {Ncase === 'multiple' &&
                    <>
                        <AddExcelUploadReceipt></AddExcelUploadReceipt>
                    </>
                }


                <div className={'flex my-10 mx-[100px]'}>
                    <button type={'submit'} className={'w-[1100px] text-[18px] h-[60px] bg-main rounded-lg text-white'}>
                        확인
                    </button>
                </div>
            </form>
        </>
    )
        ;
};

export default Step1;
