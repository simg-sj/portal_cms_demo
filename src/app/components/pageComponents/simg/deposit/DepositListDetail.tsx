"use client";
import React, { useCallback, useEffect, useState } from "react";
import ImageUploader from "@/app/components/common/ui/input/fileUpload";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";
import dayjs from "dayjs";
import {
  ACCIDENT_DETAIL_TYPE_OPTIONS,
  ACCIDENT_TYPE_OPTIONS,
  APPROVAL_OPTIONS,
  ClosingCode,
  STATE_OPTIONS,
} from "@/config/data";

import {
  CargoInsuType,
  ClaimRowType,
  ImageType,
  InsuranceItem,
  ParkingRowType,
  UptClaim,
  UptParking,
} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import { getImage, getPolicyList } from "@/app/(Navigation-Group)/action";
import cn from "classnames";
import { convertClaimToUptClaim, getChangedFields } from "@/app/lib/common";
import { useNotifications } from "@/context/NotificationContext";
import {
  DepositListRequest,
  DepositListResponseItem,
} from "@/app/lib/simg1DayApi/deposit/types";
import { useForm } from "react-hook-form";
import { useConfirmAction } from "@/app/lib/hooks/simg1Day/deposit/useConfirmAction";

interface ListProps {
  isEditing: boolean;
  onClose: () => void;
  handleConfirm: (rowData: DepositListResponseItem) => void;
  rowData: DepositListResponseItem;
  onSave?: (data: UptClaim) => void;
}

const DepositListDetail = ({
  isEditing,
  rowData,
  handleConfirm,
  onSave,
  onClose,
}: ListProps) => {
  const { register } = useForm({
    defaultValues: {
      job: "DEPOSIT",
      gbn: "D_MODIFY",
      bpk: rowData.bpk,
      pspk: rowData.pspk,
      amount: rowData.reqDeposit,
    },
  });

  const handleSave = () => {};

  const handleDepositConfirm = () => {
    handleConfirm(rowData);
    onClose();
  };

  return (
    <>
      <div>
        {isEditing && (
          <div
            className={cn(
              "z-10",
              isEditing
                ? "absolute right-[153px] top-[32px]"
                : "absolute right-[160px] top-[32px]",
            )}
          >
            <Button color={"blue"} fill={true} height={35} width={100}>
              저장
            </Button>
          </div>
        )}
        <div
          className={
            "mx-2 flex w-full items-center py-3 text-[17px] font-semibold"
          }
        >
          <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
          접수현황
        </div>
          <div className="grid-section">
              <div className="cell-label">접수번호</div>
              <div className="cell-value">{rowData.pspk}</div>
              <div className="cell-label">상태</div>
              <div className="cell-value">{rowData.status ? rowData.status : "-"}</div>

              <div className="cell-label">잔액</div>
              <div className="cell-value">
                {rowData.repairAmt
                  ? FormatNumber(Number(rowData.repairAmt)) + "원"
                  : "-"}
              </div>
              <div className="cell-label">신청 금액</div>
              <div className="cell-value">
                {isEditing ? (
                  <input
                    type={"number"}
                    name={"amount"}
                    {...register("amount")}
                  />
                ) : (
                  FormatNumber(Number(rowData.reqDeposit)) + "원"
                )}
              </div>

              <div className="cell-label">신청일</div>
              <div className="cell-value">{dayjs(rowData.requestDate).format("YYYY-MM-DD")}</div>
              <div className="cell-label">승인</div>
              {rowData.status === "READY" ? (
                <div className="cell-value">
                  <Button
                    fill={true}
                    color={"main"}
                    width={80}
                    onClick={() => handleDepositConfirm()}
                  >
                    승인
                  </Button>
                </div>
              ) : (
                <div className="cell-value">{rowData.status}</div>
              )}
          </div>
        <div
          className={
            "mx-2 mt-8 flex w-full items-center py-3 text-[17px] font-semibold"
          }
        >
          <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
          접수 정보
        </div>
          <div className="grid-section">
              <div className="cell-label">업체명</div>
              <div className="cell-value">{rowData.bName}</div>
              <div className="cell-label">사업자번호</div>
              <div className="cell-value">{rowData.bNumber}</div>
      </div>
      </div>
    </>
  );
};

export default DepositListDetail;
