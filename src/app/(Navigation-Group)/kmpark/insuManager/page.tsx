"use client";
import Tooltip from "@/app/components/common/ui/tooltip";
import CountCard from "@/app/components/common/CountCard";
import AlarmIcon from "@/assets/images/icon/alarm-icon.png";
import CheckChargeIcon from "@/assets/images/icon/checckCharge-icon.png";
import ChargeIcon from "@/assets/images/icon/charge-icon.png";
import React, { useState, useEffect } from "react";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Plus from "@/assets/images/icon/plus-icon.png";
import WarningIcon from "@/assets/images/icon/warning-icon.png";
import EditIcon from "@/assets/images/icon/edit-icon.png";
import DeleteIcon from "@/assets/images/icon/delete-icon.png";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import CenterPopup from "@/app/components/popup/CenterPopup";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import { useForm } from "react-hook-form";
import { getPolicyList, updateCommon } from "@/app/(Navigation-Group)/action";
import {
  DayRange,
  DeleteType,
  InsuFormData,
  InsuranceItem,
} from "@/@types/common";
import dayjs from "dayjs";
import { modeString } from "@/config/data";
import { useSession } from "next-auth/react";
import { useNotifications } from "@/context/NotificationContext";

export default function Page() {
  // 보험 목록 예비데이터
  const [insuranceList, setInsuranceList] = useState<InsuranceItem[]>([]);
  const { data } = useSession();
  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMode, setIsMode] = useState("" as "add" | "edit" | "reNew");
  const [selectedInsurance, setSelectedInsurance] =
    useState<InsuranceItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [days, setDays] = useState<DayRange>({
    sDay: "",
    eDay: "",
  });
  // 알림창
  const { showAlert, showConfirm, resetNotiThen } = useNotifications();
  // 오늘 날짜
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 통계 계산
  const [stats, setStats] = useState({
    renewalCount: 0,
    totalCount: 0,
    totalPremium: 0,
  });

  // 보험 통계 계산 함수
  const calculateStats = () => {
    const renewalCount = insuranceList.filter((item) => {
      const endDate = new Date(item.eDay);
      const differenceInDays =
        (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

      // 오늘 이후 30일 이내인 경우만 카운트
      return differenceInDays > 0 && differenceInDays <= 30;
    }).length;

    const totalPremium = insuranceList
      .filter((item) => item.useYNull === "Y") // useYNull이 'Y'인 항목만 필터링
      .reduce((sum, item) => sum + Number(item.yPremiums), 0); // 필터링된 항목의

    setStats({
      renewalCount,
      totalCount: insuranceList.filter((item) => item.useYNull === "Y").length,
      totalPremium,
    });
  };

  // 보험 목록이 변경될 때마다 통계 재계산
  useEffect(() => {
    calculateStats();
  }, [insuranceList]);

  const fetch = async (bpk: number) => {
    let result = await getPolicyList(bpk);

    setInsuranceList(result);
  };
  useEffect(() => {
    if (data && data.user.bpk) {
      const { bpk } = data.user;
      fetch(bpk);
      setValue("bpk", bpk);
    }
  }, [data]);

  // Form 설정
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InsuFormData>({
    defaultValues: {
      bpk: 1,
      productName: "",
      pNo: "",
      insurer: "",
      nickName: "",
      sDay: "",
      eDay: "",
      yPremiums: null,
      useYNull: "Y",
    },
  });

  // 팝업 열기 (추가)
  const openAddPopup = () => {
    reset();
    setIsMode("add");
    setSelectedInsurance(null);

    setIsPopupOpen(true);
  };

  // 팝업 열기 (편집)
  const openEditPopup = (insurance: InsuranceItem) => {
    setIsMode("edit");
    setSelectedInsurance(insurance);
    // 폼 필드 초기화
    Object.keys(insurance).forEach((key) => {
      if (key in insurance) {
        console.log(key);
        console.log(insurance[key as keyof InsuranceItem]);
        setValue(
          key as keyof InsuFormData,
          insurance[key as keyof InsuranceItem],
        );
      }
    });
    setIsPopupOpen(true);
  };

  // 팝업 열기 (갱신)
  const openReNewPopup = (insurance: InsuranceItem) => {
    setIsMode("reNew");
    setSelectedInsurance(insurance);
    let reSday = dayjs(insurance["sDay"]).add(1, "days").format("YYYY-MM-DD");
    let reEday = dayjs(reSday).add(1, "years").format("YYYY-MM-DD");

    setValue("irpk", insurance["irpk"]);
    setValue("nickName", insurance["nickName"]);
    setValue("productName", insurance["productName"]);
    setValue("pNo", "");
    setValue("insurer", "");
    setValue("sDay", reSday);
    setValue("eDay", reEday);
    setValue("yPremiums", null);

    setIsPopupOpen(true);
  };

  // 팝업 닫기
  const closePopup = () => {
    setIsPopupOpen(false);
    setConfirmDeleteId(null);
  };

  // 삭제 확인 팝업 열기
  const openDeleteConfirmPopup = (id: string) => {
    setConfirmDeleteId(id);
  };

  // 보험 항목 삭제
  const deleteInsurance = async (id: string) => {
    setInsuranceList((prevList) => prevList.filter((item) => item.irpk !== id));
    let bpk = insuranceList.find((item) => item.irpk === id)?.bpk;

    let param: DeleteType = {
      bpk: bpk,
      irpk: id,
      table: "policyMaster",
      job: "DELETE",
    };
    const { code, msg } = await updateCommon(param);
    if (code === "200") {
      showAlert(msg);

      setConfirmDeleteId(null);
      await fetch(2);
      closePopup();
    } else {
      showAlert(msg);
    }
  };

  // 보험 데이터 제출
  const onSubmit = async (data: InsuFormData) => {
    let updatedInsurance: InsuranceItem;
    let title = "";
    if (isMode === "edit" && selectedInsurance) {
      // 편집 모드: 기존 항목 업데이트
      updatedInsurance = { ...data, irpk: selectedInsurance.irpk };
      setInsuranceList((prevList) =>
        prevList.map((item) =>
          item.irpk === selectedInsurance.irpk
            ? { ...data, irpk: item.irpk }
            : item,
        ),
      );
      title = "수정하시겠습니까?";
      updatedInsurance.job = "UPT";
      updatedInsurance.table = "policyMaster";
    }

    if (isMode === "reNew") {
      title = "갱신하시겠습니까?";
      // 추가 모드: 새 항목 추가
      updatedInsurance = {
        ...data,
      };

      setInsuranceList((prevList) => [...prevList, updatedInsurance]);
      updatedInsurance.job = "Policy";
      updatedInsurance.gbn = "RENEW";
    }

    if (isMode === "add") {
      title = "추가하시겠습니까?";
      // 추가 모드: 새 항목 추가
      updatedInsurance = {
        ...data,
      };

      console.log(updatedInsurance);
      setInsuranceList((prevList) => [...prevList, updatedInsurance]);
      updatedInsurance.job = "Policy";
      updatedInsurance.gbn = "ADD";
    }

    showConfirm(`${title}`, async () => {
      let result = await updateCommon(updatedInsurance);

      if (result.code === "200") {
        showAlert(result.msg);
        await fetch(2);

        //reset(); // 데이터 초기화
        closePopup(); // 팝업 닫기
      } else {
        showAlert(result.msg);
      }
    });
  };

  // 만료일까지 남은 일수 계산
  const daysUntilExpiration = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 보험 상태 확인 (만료 또는 갱신 예정)
  const getInsuranceStatus = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    return endDate < today ? "만료" : "갱신예정";
  };

  // 날짜 형식 변환 (YYYY-MM-DD -> YYYY.MM.DD)
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, ".");
  };

  useEffect(() => {
    setValue("sDay", days.sDay);
    setValue("eDay", days.eDay);
  }, [days]);

  // 팝업 Content에 표시할 컴포넌트
  const PopupContent = () => {
    return (
      <form className="space-y-4">
        <div className={"my-3 flex flex-col sm:flex-row"}>
          <div className={"mb-1 w-[110px] sm:mb-0"}>
            별칭 <span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              {...register("nickName", { required: "별칭을 입력해주세요" })}
              placeholder={"별칭을 입력하세요"}
              className={"w-full rounded border px-2 py-1"}
            />
            {errors.nickName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.nickName.message}
              </p>
            )}
          </div>
        </div>

        <div className={"my-3 flex flex-col sm:flex-row"}>
          <div className={"mb-1 w-[110px] sm:mb-0"}>
            보험명 <span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              {...register("productName", {
                required: "보험명을 입력해주세요",
              })}
              placeholder={"보험명을 입력하세요"}
              className={"w-full rounded border px-2 py-1"}
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productName.message}
              </p>
            )}
          </div>
        </div>

        <div className={"my-3 flex flex-col sm:flex-row"}>
          <div className={"mb-1 w-[110px] sm:mb-0"}>
            증권번호 <span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              {...register("pNo", { required: "증권번호를 입력해주세요" })}
              placeholder={"증권번호를 입력하세요"}
              className={"w-full rounded border px-2 py-1"}
            />
            {errors.pNo && (
              <p className="mt-1 text-sm text-red-500">{errors.pNo.message}</p>
            )}
          </div>
        </div>

        <div className={"my-3 flex flex-col sm:flex-row"}>
          <div className={"mb-1 w-[110px] sm:mb-0"}>
            보험사 <span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <input
              type="text"
              {...register("insurer", { required: "보험사를 입력해주세요" })}
              placeholder={"보험사를 입력하세요"}
              className={"w-full rounded border px-2 py-1"}
            />
            {errors.insurer && (
              <p className="mt-1 text-sm text-red-500">
                {errors.insurer.message}
              </p>
            )}
          </div>
        </div>

        <div className={"my-3 flex flex-col sm:flex-row"}>
          <div className={"mb-1 w-[110px] sm:mb-0"}>
            보험기간 <span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <DayTerm
              type={"day"}
              setDays={setDays}
              sDay={watch("sDay") ? new Date(watch("sDay")) : new Date()}
              eDay={watch("eDay") ? new Date(watch("eDay")) : new Date()}
              allowFutureEndDate={true}
            />
            {(!watch("sDay") || !watch("eDay")) && (
              <p className="mt-1 text-sm text-red-500">
                보험기간을 선택해주세요
              </p>
            )}
          </div>
        </div>

        <div className={"my-3 flex flex-col sm:flex-row"}>
          <div className={"mb-1 w-[110px] sm:mb-0"}>
            보험료 <span className="text-red-500">*</span>
          </div>
          <div className="flex-1">
            <input
              type="number"
              {...register("yPremiums", {
                required: "보험료를 입력해주세요",
                valueAsNumber: true,
              })}
              placeholder={"보험료를 입력하세요"}
              className={"w-full rounded border px-2 py-1"}
            />
            {errors.yPremiums && (
              <p className="mt-1 text-sm text-red-500">
                {errors.yPremiums.message}
              </p>
            )}
          </div>
        </div>
      </form>
    );
  };

  // 삭제 확인 팝업 컴포넌트
  const DeleteConfirmContent = () => {
    return (
      <div className="mb-5 text-center">
        <p className="text-lg">해당 보험을 삭제하시겠습니까?</p>
        <p className="mt-2 text-sm text-gray-500">
          삭제된 데이터는 복구할 수 없습니다.
        </p>
      </div>
    );
  };

  return (
    <>
      <div className={"rounded-lg bg-white p-6"}>
        <div className={"mb-6 flex items-center"}>
          <div className={"text-lg font-light"}>보험관리</div>
          <Tooltip
            content={
              "보험관리 추가 버튼으로 현재 가입되어 있는 보험을 추가하여 해당 페이지에서 모든 보험을 관리할 수 있으며, 갱신 예정인 보험을 1달전에 알림으로 알려드립니다. 갱신 정보는 보험관리추가 버튼을 통해 추가할 수 있습니다."
            }
          />
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
          <CountCard
            icon={AlarmIcon.src}
            title={"갱신예정 보험"}
            value={stats.renewalCount.toString()}
            unit={"건"}
          />
          <CountCard
            icon={CheckChargeIcon.src}
            title={"가입 보험"}
            value={stats.totalCount.toString()}
            unit={"건"}
          />
          <CountCard
            icon={ChargeIcon.src}
            title={"총 보험료"}
            value={stats.totalPremium.toString()}
            unit={"원"}
          />
        </div>
      </div>
      <div className={"my-5 rounded-lg bg-white p-6"}>
        <div className="mb-4 flex items-center justify-between">
          <div className={"mb-6 text-lg font-light"}>보험리스트</div>
          <Button
            color={"main"}
            fill
            height={32}
            width={132}
            onClick={openAddPopup}
          >
            <Image
              src={Plus.src}
              alt={"추가"}
              width={14}
              height={14}
              className={"mr-1"}
            />
            보험관리추가
          </Button>
        </div>

        {/* 보험 리스트 렌더링 */}
        {insuranceList.map((insurance, index) => {
          const isExpired = new Date(insurance.eDay) < today;
          const daysLeft = daysUntilExpiration(insurance.eDay);
          const useYNull = insurance.useYNull === "Y";
          const showWarning = !isExpired && daysLeft <= 30 && useYNull;
          const status = getInsuranceStatus(insurance.eDay);
          const formattedEndDate = formatDate(insurance.eDay);

          return (
            <div
              className={"my-3 rounded-xl border border-gray-200"}
              key={index}
            >
              <div className="mb-5 flex flex-col items-start justify-between gap-2 px-4 pt-5 sm:flex-row sm:items-center sm:px-7">
                <div>
                  <Button
                    color={isExpired ? "gray" : "main"}
                    fill={isExpired}
                    height={26}
                    width={180}
                    rounded={true}
                    textSize={14}
                    style={{ cursor: "default" }}
                  >
                    {formattedEndDate} {status}
                  </Button>
                  <div className={"relative mx-2 my-4 text-lg font-semibold"}>
                    <div>{insurance.nickName}</div>
                  </div>
                </div>
                <div
                  className={
                    "flex lg:items-center items-end space-x-4 self-end sm:self-auto md:flex-row flex-col"
                  }
                >
                  {/* 만료 예정 경고 섹션 */}
                  {showWarning && (
                    <div className="flex items-center space-x-2 mb-2 lg:mb-0">
                      <div
                        className={
                          "flex items-center rounded-lg bg-gray-100 px-5 py-2 text-sm"
                        }
                      >
                        <Image
                          src={WarningIcon.src}
                          alt={"경고"}
                          width={18}
                          height={18}
                          className={"mr-2"}
                        />
                        <div>보험 갱신일정이 {daysLeft}일 남았습니다.</div>
                        <Button
                          className={"ml-2"}
                          color={"red"}
                          fill
                          height={25}
                          width={70}
                          onClick={() => openReNewPopup(insurance)}
                        >
                          갱신하기
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className={'flex space-x-2'}>
                  <Image
                    src={EditIcon.src}
                    alt={"수정"}
                    width={60}
                    height={60}
                    className={
                      "h-[20px] w-[20px] cursor-pointer object-cover object-[0px] hover:object-[-31px]"
                    }
                    onClick={() => openEditPopup(insurance)}
                  />
                  <Image
                    src={DeleteIcon.src}
                    alt={"삭제"}
                    width={60}
                    height={60}
                    className={
                      "h-[20px] w-[20px] cursor-pointer object-cover object-[0px] hover:object-[-31px]"
                    }
                    onClick={() => openDeleteConfirmPopup(insurance.irpk)}
                  />
                  </div>
                </div>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-7 lg:grid-cols-3 xl:grid-cols-5">
                <div className={"w-[300px]"}>
                  <div className={"mb-2 text-sm text-gray-600"}>증권번호</div>
                  <div>{insurance.pNo}</div>
                </div>
                <div className={"w-[300px]"}>
                  <div className={"mb-2 text-sm text-gray-600"}>상품명</div>
                  <div>{insurance.productName}</div>
                </div>
                <div className={"w-[300px]"}>
                  <div className={"mb-2 text-sm text-gray-600"}>보험사</div>
                  <div>{insurance.insurer}</div>
                </div>
                <div className={"w-[400px]"}>
                  <div className={"mb-2 text-sm text-gray-600"}>보험기간</div>
                  <div>
                    {insurance.sDay} ~ {insurance.eDay}
                  </div>
                </div>
                <div className={"w-[300px]"}>
                  <div className={"mb-2 text-sm text-gray-600"}>보험료</div>
                  <div>
                    <span>{FormatNumber(insurance.yPremiums)}</span> 원
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* 보험이 없을 경우 표시 */}
        {insuranceList.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            등록된 보험이 없습니다. 보험관리추가 버튼을 통해 보험을
            추가해주세요.
          </div>
        )}
      </div>

      {/* 보험 추가/편집 팝업 */}
      <CenterPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title={"보험관리 " + modeString[isMode]}
        Content={PopupContent}
        buttons={[
          {
            label: "확인",
            onClick: handleSubmit(onSubmit),
            color: "main",
            fill: true,
            width: 130,
            height: 40,
          },
          {
            label: "취소",
            onClick: closePopup,
            color: "gray",
            width: 130,
            height: 40,
          },
        ]}
      />

      {/* 삭제 확인 팝업 */}
      <CenterPopup
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title={"보험 삭제"}
        Content={DeleteConfirmContent}
        buttons={[
          {
            label: "삭제",
            onClick: () => confirmDeleteId && deleteInsurance(confirmDeleteId),
            color: "red",
            fill: true,
            width: 130,
            height: 40,
          },
          {
            label: "취소",
            onClick: () => setConfirmDeleteId(null),
            color: "gray",
            width: 130,
            height: 40,
          },
        ]}
      />
    </>
  );
}
