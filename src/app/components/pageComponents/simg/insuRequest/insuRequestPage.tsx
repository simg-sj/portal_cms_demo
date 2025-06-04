'use client'
import React, {useState} from 'react';
import Step1 from "@/app/components/pageComponents/simg/insuRequest/step1-simg";
import Step2 from "@/app/components/pageComponents/simg/insuRequest/step2-simg";
import Step3 from "@/app/components/pageComponents/simg/insuRequest/step3";
import {useForm} from "react-hook-form";

interface InsuRequestType {
    bpk : number;
    id : string;
    balance : number;
}
export default function InsuRequestPage({bpk, id, balance} : InsuRequestType) {
    //스탭
    const [currentStep, setCurrentStep] = useState(1);

    // Form 설정
    const { register, reset, getValues, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            job : 'INSURANCE',
            gbn : 'I_REQ',
            bpk : bpk,
            id : id,
            balance : balance,
            bNumber : "",
            carNumber: "",
            viNumber : "",
            contractor : "",
            vType: "",
            capacity: "",
            contractCell: "",
            contractDay : ""
        },
    });

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data: any) => {
        if(data){
            handleNext();
        }else {
            return;
        }
    };


    const handleReset = () => {
        setCurrentStep(1);
        reset();
    };



    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 onNext={handleNext} watch={watch} getValues={getValues} handleSubmit={handleSubmit} errors={errors} register={register} />;
            case 2:
                return <Step2 onNext={handleNext} onPrev={handlePrev} getValues={getValues} register={register}/>;
            case 3:
                return <Step3 onReset={handleReset}/>;
            default:
                return null;
        }
    };

    return (
        <div className={'flex justify-center'}>
            <div className={'px-8 py-6 bg-white rounded-xl w-full flex justify-center min-h-[calc(100vh-50px)]'}>
                <div>
                    <div className="flex mx-[100px] mb-[50px] text-main-light font-bold text-2xl step mt-5">
                        <div
                            className={`border-main-light border-2 rounded-full px-[25px] py-[15px] ${currentStep === 1 ? 'bg-main-light text-white' : ''}`}
                        >1
                        </div>
                        <div className="w-[50px] h-[4px] bg-main-light mt-7"></div>
                        <div
                            className={`border-main-light border-2 rounded-full px-[25px] py-[15px] ${currentStep === 2 ? 'bg-main-light text-white' : ''}`}
                        >2
                        </div>
                        <div className="w-[50px] h-[4px] bg-main-light mt-7"></div>
                        <div
                            className={`border-main-light border-2 rounded-full px-[25px] py-[15px] ${currentStep === 3 ? 'bg-main-light text-white' : ''}`}
                        >3
                        </div>
                    </div>
                    {renderStep()}
                </div>
            </div>
        </div>
    )
}