import React, {useEffect, useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import {PlatformList, Step1Props} from "@/@types/common";
import {useSession} from "next-auth/react";
import TimePicker from "@/app/components/common/ui/input/timePicker";
import {getPlatform} from "@/app/(Navigation-Group)/turu/action";
import AdminFormSection from "@/app/components/pageComponents/rentCar/accidentAccept/adminFormSection";
import Loading from "@/app/(Navigation-Group)/loading";

const Step1 = ({onNext, watch, setValue, handleSubmit,errors, register }: Step1Props) => {
    const {data} = useSession();
    const isSub = data?.user?.subIdYn === 'N';
    const [platformList, setPlatformList] = useState<PlatformList[]>([])
    const [loading, setLoading] = useState(true);



    const minETA = watch('accidentDate');


    const handleTimeChange = (timeString: string) => {
        setValue('accidentTime', timeString);
    };


    const fetchPlatform = async (bpk  : number) => {
        try {
            const result: PlatformList[] = await getPlatform(bpk);
            setPlatformList(result);
        } finally {
            setLoading(false); // 데이터 로딩 종료
        }
    }

    const onSubmit =  (data) => {
        if(data){
            onNext();
        }else {
            return;
        }
    };

    useEffect(() => {
        if (data?.user?.bpk) {
            if (!isSub) {
                setValue('platform', data.user.platform);
                setLoading(false); // 비관리자면 바로 로딩 끝
            } else {
                fetchPlatform(data.user.bpk);
                setValue('wName', data.user.name);
                setValue('bpk', data.user.bpk);
            }
        }
    }, [data]);


    return (
        <>
            <div className={'text-lg font-light my-6 px-[100px] text-gray-700'}>투루카 사고접수 페이지입니다. 사고접수 내용을 입력하여
                접수해주세요.
            </div>
            <form className={'text-xl my-[50px] stepOne'}>
                {/*관리자만 보이는 Form 컨펌여부*/}
                    {
                        isSub ? (
                            loading ? (
                                    <Loading/>
                                ) :
                            (
                                <AdminFormSection
                                    platformList={platformList}
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    watch={watch}
                                />
                            )
                        )
                            :
                    (
                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>제휴사명 <span className={'text-red-500'}>*</span>
                            </div>
                            <input
                                type={'text'}
                                name="platform"
                                readOnly={true}
                                {...register("platform")}
                                className={'w-[800px]'}
                            />
                        </div>
                    )

                }
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차량번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="vCarNum"
                        {...register("vCarNum", { required: "차량번호를 입력해주세요." })}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.vCarNum && typeof errors.vCarNum.message === 'string' && <div className="text-red-500 pl-[100px] text-base error">{errors.vCarNum.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고일자 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'date'}
                        name="accidentDate"
                        {...register("accidentDate", { required: "사고일자를 선택해주세요" })}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.accidentDate && typeof errors.accidentDate.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.accidentDate.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고시간 <span className={'text-red-500'}>*</span>
                    </div>
                    <TimePicker
                        onChange={handleTimeChange}
                    />
                </div>
                {errors.accidentTime && typeof errors.accidentTime.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.accidentTime.message}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>예상입고일정 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'date'}
                        name="arrivalETA"
                        {...register("arrivalETA", { required: "예상입고일정을 선택해주세요" })}
                        min={minETA}
                        className={'w-[800px]'}
                    />
                </div>
                {
                    errors.arrivalETA && typeof errors.arrivalETA.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.arrivalETA.message}</div>
                }

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고내용 <span className={'text-red-500'}>*</span>
                    </div>
                    <textarea rows={3}
                              className={'h-20 resize-none w-[800px]'}
                              name="accidentDetail"
                              {...register("accidentDetail", { required: "사고내용을 입력해주세요." })}
                              >
                    </textarea>
                </div>
                {errors.accidentDetail && typeof errors.accidentDetail.message === 'string' &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.accidentDetail.message}</div>}

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>파손사진</div>
                    <input
                        name='damagedImages'
                        type={'file'}
                        {...register('damagedImages')}
                        accept="image/*"
                        multiple={true}
                    />
                </div>

                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>견적서</div>
                    <input
                        name='estimate'
                        type={'file'}
                        {...register('estimate')}
                        accept="image/*"
                        multiple={true}
                    />
                </div>
            </form>
            <div className={'flex my-10 mx-[100px]'}>
                <Button color={"main"} fill={true} onClick ={handleSubmit(onSubmit)} textSize={18} width={1100} height={60}>확인</Button>
            </div>
        </>
    );
};

export default Step1;