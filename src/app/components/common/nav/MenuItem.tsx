import Link from "next/link";
import Image from "next/image";
import { MenuItemProps } from "@/@types/common";
import React from "react";
import { useNotifications } from "@/context/NotificationContext";

export default function MenuItem({
  icon,
  label,
  link,
  isActive,
  onClick,
}: MenuItemProps) {
  const { renewals } = useNotifications(); // 알림 데이터 가져오기

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={link}
      className={`relative my-5 flex cursor-pointer items-center rounded-md px-4 py-4 lg:flex-col lg:px-1 lg:py-2 ${isActive ? "bg-white bg-opacity-30" : "hover:bg-white hover:bg-opacity-30"}`}
      onClick={handleClick}
    >
      <Image src={icon} alt={label} width={28} />
      <div className="ml-5 mt-0 text-[16px] text-white lg:ml-0 lg:mt-2 lg:text-[12px]">
        {label}
      </div>
      {label === "보험관리" && renewals.length > 0 && (
        <div className="absolute right-1 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm text-white">
          !
        </div>
      )}
    </Link>
  );
}

/*
import React, { useState } from "react";
import Button from "@/app/components/common/ui/button/button";
import { Step1Props } from "@/@types/common";
import { useSession } from "next-auth/react";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";

const Step1 = ({
                 onNext,
                 getValues,
                 handleSubmit,
                 errors,
                 register,
               }: Step1Props) => {
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const onSubmit = (data) => {
    if (data) {
      onNext();
    } else {
      return;
    }
  };

  return (
    <div>
      <div className={"my-6 break-keep text-lg font-light text-gray-700"}>
        SIMG 1일 책임보험 접수 페이지입니다. 예치금 잔액 확인 후 충전하기 버튼을
        클릭하여 충전 후 신청이 가능합니다.
      </div>
      <form className={"stepOne my-[50px] text-xl"}>
        <div className="mb-4 flex items-center justify-between rounded-xl bg-gray-50 p-4 shadow-sm">
          <div>
            <p className="text-sm text-gray-500">예치금 잔액</p>
            <p className="text-2xl font-semibold text-gray-900">
              {Number(getValues("balance")).toLocaleString()}원
            </p>
          </div>
          <Button
            color={"main"}
            fill={true}
            onClick={() => setIsOpen(true)}
            textSize={16}
            width={90}
            height={40}
          >
            충전하기
          </Button>
        </div>
        {getValues("balance") < 50000 && (
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
            피보험자 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="contractor"
            placeholder={"피보험자를 입력해주세요."}
            {...register("contractor", {
              required: "피보험자를 입력해주세요.",
            })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.contractor && typeof errors.contractor.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.contractor.message}
          </div>
        )}

        <div
          className={
            "flex flex-col items-start justify-between space-y-3 py-5 sm:flex-row sm:items-center sm:space-y-0"
          }
        >
          <div className={"mr-1 font-medium"}>
            사업자번호 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="bNumber"
            placeholder={"사업자번호를 입력해주세요."}
            {...register("bNumber", { required: "사업자번호를 입력해주세요." })}
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
            담당자 전화번호 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"text"}
            name="contractCell"
            placeholder={"-없이 입력해주세요."}
            {...register("contractCell", {
              required: "담당자 전화번호를 입력해주세요.",
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
            name="viNumer"
            placeholder={"차대번호를 입력해주세요."}
            {...register("viNumer", { required: "차대번호를 입력해주세요." })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.viNumer && typeof errors.viNumer.message === "string" && (
          <div className="error text-base text-red-500">
            {errors.viNumer.message}
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
            {...register("carNumber", { required: "차량번호를 입력해주세요." })}
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
          <input
            type={"text"}
            name="vType"
            placeholder={"차종을 입력해주세요."}
            {...register("vType", { required: "차종을 입력해주세요." })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
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
            총 탑승 가능 인원 <span className={"text-red-500"}>*</span>
          </div>
          <input
            type={"number"}
            name="capacity"
            placeholder={"숫자만 입력해주세요."}
            {...register("capacity", {
              required: "총 탑승 가능 인원을 입력해주세요.",
            })}
            className={"w-full sm:w-[300px] lg:w-[500px] xl:w-[600px]"}
          />
        </div>
        {errors.capacity && typeof errors.capacity.message === "string" && (
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
          color={getValues("balance") < 50000 ? "gray" : "main"}
          disabled={getValues("balance") < 50000 && true}
          fill={true}
          onClick={handleSubmit(onSubmit)}
          textSize={18}
          width={900}
          height={60}
          className={"!w-full"}
        >
          확인
        </Button>
      </div>
      {isOpen && (
        <DepositPopup
          setIsOpen={setIsOpen}
          data={data.user}
          balance={getValues("balance")}
        />
      )}
    </div>
  );
};

export default Step1;*/


