"use client";

import React, { useEffect, useState } from "react";
import Step1 from "@/app/components/pageComponents/simg/insuRequest/step1-simg";
import Step2 from "@/app/components/pageComponents/simg/insuRequest/step2-simg";
import Step3 from "@/app/components/pageComponents/simg/insuRequest/step3";
import { useForm } from "react-hook-form";
import { useDepositBalance } from "@/app/lib/hooks/simg1Day/deposit/useDepositBalance";

interface InsuRequestType {
  bpk: number;
  id: string;
}

export default function InsuRequestPage({ bpk, id }: InsuRequestType) {
  const [currentStep, setCurrentStep] = useState(1);

  // ✅ 예치금 가져오기
  const { data: balance = 0, refetch } = useDepositBalance(bpk, id);

  // ✅ Form 초기화
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      job: "INSURANCE",
      gbn: "I_REQ",
      bpk,
      id,
      balance: 0, // 초기값은 0, 실제 값은 useEffect로 반영
      bNumber: "",
      carNumber: "",
      viNumber: "",
      contractor: "",
      vType: "",
      capacity: "",
      contractCell: "",
      contractDay: "",
    },
  });

  // ✅ balance가 변경되면 폼에 반영
  useEffect(() => {
    setValue("balance", balance);
  }, [balance, setValue]);

  // ✅ 단계 이동
  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleReset = async () => {
    const result = await refetch();
    setValue("balance", result.data ?? 0);
    setCurrentStep(1);
  };

  const onSubmit = async (data: any) => {
    if (data) handleNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            refetch={refetch}
            onNext={handleNext}
            watch={watch}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
          />
        );
      case 2:
        return (
          <Step2
            onNext={handleNext}
            onPrev={handlePrev}
            getValues={getValues}
            register={register}
          />
        );
      case 3:
        return <Step3 onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className={"flex justify-center"}>
      <div
        className={
          "flex min-h-[calc(100vh-50px)] w-full justify-center rounded-xl bg-white px-8 py-6"
        }
      >
        <div>
          <div className="step mb-[50px] mt-5 flex text-xl font-bold text-main-light md:text-2xl">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`rounded-full border-2 border-main-light px-[18px] py-[9px] md:px-[25px] md:py-[15px] ${
                    currentStep === step ? "bg-main-light text-white" : ""
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div className="mt-7 h-[2px] w-[40px] bg-main-light md:h-[4px] md:w-[50px]" />
                )}
              </React.Fragment>
            ))}
          </div>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
