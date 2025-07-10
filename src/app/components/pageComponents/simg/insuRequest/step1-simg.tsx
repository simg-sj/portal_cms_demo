"use client"

import React, { useEffect, useState } from 'react';
import Button from "@/app/components/common/ui/button/button";
import { Step1Props } from "@/@types/common";
import { useSession } from "next-auth/react";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";
import RefreshButton from '@/app/components/common/ui/refresh';
import { simg1TimeCorp } from '@/app/(Navigation-Group)/onetimeConsignMent/action';
import PostcodeModal from '@/app/components/common/ui/PostcodeModal';

const Step1 = ({
  onNext,
  watch,
  refetch,
  setValue,
  handleSubmit,
  errors,
  register,
}: Step1Props) => {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const bNumber = watch('bNumber');
  const handleRefresh = async () => {
    await refetch();
  };


  const onSubmit = (data) => {
    if (data) {
      onNext();
    } else {
      return;
    }
  };

  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const extraAddress = data.addressType === 'R' ? (data.bname || '') + (data.buildingName ? `, ${data.buildingName}` : '') : '';
    setValue('address' ,extraAddress ? `${fullAddress} (${extraAddress})` : fullAddress);
  };

  const fetchCnumber= async () => {
     try {
       let param = {
         job : 'search',
         bNumber : bNumber
       }

       let {data} = await simg1TimeCorp(param);
       setValue('cNumber', data[0].cNumber);
       setValue('address', data[0].address);
       setValue('contractor', data[0].bName);
     }catch (e){
       console.log(e);
     }
  }
  useEffect(() => {
    const pattern = /^\d{10}$/;
    if(pattern.test(bNumber)){
      fetchCnumber();
    }
  },[bNumber])

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div>
      <div className={"my-6 md:text-lg text-md font-light text-gray-700"}>
        SIMG 1일 책임보험 접수 페이지입니다. 예치금 잔액 확인 후 충전하기 버튼을
        클릭하여 충전 후 신청이 가능합니다.
      </div>
      <form className={"stepOne my-[50px] text-lg md:text-xl"}>
        <div className="mb-4 flex items-center justify-between rounded-xl bg-gray-50 p-4 shadow-sm">
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">예치금 잔액</p>
              <RefreshButton
                onClick={handleRefresh}
              />
            </div>
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              {Number(watch("balance")).toLocaleString()}원
            </p>
          </div>
          <Button
            color={"main"}
            fill={true}
            onClick={() => setIsOpen(true)}
            width={90}
            height={40}
            textSize={16}
            className={"md:!text-[16px] !text-sm !w-[70px] md:!w-[90px]"}
          >
            충전하기
          </Button>
        </div>
        {watch("balance") < 50000 && (
          <div className="error my-8 text-base text-red-500">
            예치금 잔액이 부족합니다.
          </div>
        )}


        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            사업자등록번호 <span className={"text-red-500"}>*</span>
          </div>
            <input
              type={"text"}
              name="bNumber"
              placeholder={"사업자등록번호를 입력해주세요."}
              {...register("bNumber", {
                required: "사업자등록번호를 입력해주세요.",
                pattern: {
                  value: /^\d{10}$/,
                  message: "올바른 사업자 번호가 아닙니다.",
                },
              })}
              className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
            />
        </div>
        {errors.bNumber && typeof errors.bNumber.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.bNumber.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            법인등록번호 <span className={"text-red-500"}>*</span>
          </div>
            <input
              type={"text"}
              name="cNumber"
              placeholder={"법인등록번호를 입력해주세요."}
              {...register("cNumber", {
                required: "법인등록번호를 입력해주세요.",
                pattern: {
                  value: /^\d{13}$/,
                  message: "법인등록번호를 형식이 아닙니다.",
                },
              })}
              className='w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]'
            />
        </div>
        {errors.cNumber && typeof errors.cNumber.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.cNumber.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            주소 <span className={"text-red-500"}>*</span>
          </div>
          <div className='flex sm:w-[300px] lg:w-[500px] xl:w-[600px]'>
            <input
              type={"text"}
              name="address"
              placeholder={"주소를 입력해주세요."}
              {...register("address", { required: "주소를 입력해주세요." })}
              className={"w-full"}
            />
            <Button textSize={16} className={"ml-4 md:!text-[16px] !text-sm !w-[70px] md:!w-[90px]"} color={'main'} width={60} height={35} fill={true} onClick={() => setIsPost(true)}>검색</Button>
          </div>
        </div>
        {
          isPost && (
            <PostcodeModal setValue={setValue} onClose={()=>setIsPost(false)}/>
          )
        }
        {errors.address && typeof errors.address.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.address.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            담당자 성명 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="contractName"
            placeholder={"담당자 성명을 입력해주세요."}
            {...register("contractName", {
              required: "담당자 성명을 입력해주세요.",
            })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.contractName && typeof errors.contractName.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.contractName.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            담당자 전화번호 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="contractCell"
            placeholder={"-없이 입력해주세요."}
            {...register("contractCell", {
              required: "담당자 전화번호를 입력해주세요.",
              pattern: {
                value: /^(01[0|1|6|7|8|9]|02|0[3-9][0-9])\-?\d{3,4}\-?\d{4}$/,
                message: "유효한 전화번호 형식이 아닙니다.",
              },
            })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.contractCell &&
          typeof errors.contractCell.message === "string" && (
            <div className="error text-base text-red-500">
              {errors.contractCell.message}
            </div>
        )}


        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            차대번호 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="viNumber"
            placeholder={"차대번호를 입력해주세요."}
            {...register("viNumber", { required: "차대번호를 입력해주세요." })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.viNumber && typeof errors.viNumber.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.viNumber.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            차량번호 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="carNumber"
            placeholder={"차량번호를 입력해주세요."}
            {...register("carNumber", {
              required: "차량번호를 입력해주세요.",
              pattern: {
                value: /^\d{2,3}[가-힣]{1}\d{4}$/,
                message: "유효한 차량번호 형식이 아닙니다.",
              },
            })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.carNumber && typeof errors.carNumber.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.carNumber.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            차종 <span className={"text-red-500"}>*</span>
          </div>
          <select
            name="vType"
            {...register("vType", { required: "차종을 입력해주세요." })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          >
            <option value=''>선택</option>
            <option value='SEDAN'>세단</option>
            <option value='VAN'>밴</option>
          </select>
        </div>
        {errors.vType && typeof errors.vType.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.vType.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            차량명 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="carName"
            placeholder={"차량명을 입력해주세요."}
            {...register("carName", { required: "차량명을 입력해주세요." })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.carName && typeof errors.carName.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.carName.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            차량연식 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="carYear"
            placeholder={"예: 2025"}
            {...register("carYear", { required: "차량연식을 입력해주세요.", pattern: {
                value: /^\d{4}$/,
                message: "4자리 숫자(예: 2025)를 입력해주세요.",
              }, validate: {
                validRange: (value) =>
                  Number(value) >= 1900 && Number(value) <= new Date().getFullYear()
                  || "연도(예:2025)만 입력해주세요.",
              },})}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.carYear && typeof errors.carYear.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.carYear.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            총 탑승 가능 인원 <span className={"text-red-500"}>*</span>
          </div>
          <select
            name="capacity"
            {...register("capacity", {
              required: "총 탑승 가능 인원을 입력해주세요.",
            })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          >
            <option value="">선택</option>
            {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}명
              </option>
            ))}
          </select>
        </div>
        {errors.capacity &&
          typeof errors.capacity.message === "string" && (
            <div className="error text-base text-red-500">
              {errors.capacity.message}
            </div>
          )}



        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            보험기간 <span className={"text-red-500"}>*</span>
          </div>
          <select
            name="contractDay"
            {...register("contractDay", {
              required: "보험기간을 선택해주세요",
            })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          >
            <option value={""}>선택</option>
            <option value={"1DAY"}>1일</option>
            <option value={"3DAY"}>3일</option>
            <option value={"6DAY"}>6일</option>
          </select>
        </div>
        {errors.contractDay &&
          typeof errors.contractDay.message === "string" && (
            <div className="error text-base text-red-500">
              {errors.contractDay.message}
            </div>
          )}
      </form>

      <div className={"my-10 flex"}>
        <Button
          color={watch("balance") < 50000 ? "gray" : "main"}
          disabled={watch("balance") < 50000 && true}
          fill={true}
          onClick={handleSubmit(onSubmit)}
          textSize={18}
          height={60}
          width={900}
          className={"!w-full"}
        >
          확인
        </Button>
      </div>
      {isOpen && (
        <DepositPopup
          setIsOpen={setIsOpen}
          data={data.user}
          balance={watch("balance")}
        />
      )}
    </div>
  );
};

export default Step1;
