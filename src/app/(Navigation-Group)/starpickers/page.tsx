'use client'
import React, {useState} from 'react';
import Step1 from "@/app/components/pageComponents/liabilityIns/step1-star";
import Step2 from "@/app/components/pageComponents/liabilityIns/step2-star";
import Step3 from "@/app/components/pageComponents/rentCar/accidentAccept/step3";
import {dutyType} from "@/@types/common";


export default function Page() {
    //스탭
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<dutyType>(
        {
            ageRange: "",
            bName: "",
            bankName: "",
            bankNum: "",
            bikeCC: "",
            bikeName: "",
            bikeNum: "",
            bizId: "",
            bpk: 5,
            creaditNum: "",
            dambo: "",
            driverRange: "누구나운전",
            fuelType: "",
            gbn: "",
            gitaDambo: "선택안함",
            handlerName: "",
            handlerPhone: "",
            job: "",
            payMethod: "",
            registYMD: "",
            viNum: ""
        }
    );

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleReset = () => {
        setCurrentStep(1);
        setFormData({
            ageRange: "",
            bName: "",
            bankName: "",
            bankNum: "",
            bikeCC: "",
            bikeName: "",
            bikeNum: "",
            bizId: "",
            bpk: 5,
            creaditNum: "",
            dambo: "",
            driverRange: "누구나운전",
            fuelType: "",
            gbn: "",
            gitaDambo: "선택안함",
            handlerName: "",
            handlerPhone: "",
            job: "",
            payMethod: "",
            registYMD: "",
            viNum: ""
        });
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 onNext={handleNext} formData={formData} setFormData={setFormData}/>;
            case 2:
                return <Step2 onNext={handleNext} onPrev={handlePrev} param={formData}/>;
            case 3:
                return <Step3 onReset={handleReset}/>;
            default:
                return null;
        }
    };

    return (
        <div className={'flex justify-center'}>
            <div className={'px-8 py-6 bg-white rounded-xl w-full flex justify-center'}>
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