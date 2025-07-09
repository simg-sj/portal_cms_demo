"use client";
import React, { useState } from "react";
import { ParkingRowType, UptParking } from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import { convertClaimToUptParking, getChangedFields } from "@/app/lib/common";
import dayjs from "dayjs";
import { PARKING_STATUS, parkingStatus, STATE_OPTIONS } from "@/config/data";
import useFetchPnoList from "@/app/lib/hooks/useFetchPnoList";
import FormatNumber from "@/app/components/common/ui/formatNumber";

interface ListProps {
  isEditing: boolean;
  onSave: (data: ParkingRowType) => void;
  rowData: ParkingRowType;
}

const HiparkingList = ({ isEditing, rowData, onSave }: ListProps) => {
  const [editData, setEditData] = useState<ParkingRowType>(rowData);
  const { pNoList } = useFetchPnoList(rowData.bpk);

  //필드값 변경시 formdata 업데이트
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    console.log(e.target.name, e.target.value);
    setEditData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSave = () => {
    const changed = getChangedFields(editData, rowData);
    const merged = {
      ...changed,
      bpk: rowData.bpk,
      irpk: rowData.irpk,
      pNo: editData.pNo,
    };
    if (JSON.stringify(editData) !== JSON.stringify(rowData)) {
      onSave(convertClaimToUptParking(merged));
    } else {
      alert("변경된 정보가 없습니다.");
      return;
    }
  };

  //입력필드 타입
  const renderField = (
    key: string,
    value: any,
    type: "text" | "date" | "select" | "textarea" = "text",
    options?: string[],
  ) => {
    if (!isEditing) {
      if (type === "date") {
        return <span>{value ? dayjs(value).format("YYYY-MM-DD") : ""}</span>;
      } else {
        return <span>{value || "-"}</span>;
      }
    }
    switch (type) {
      case "select":
        return (
          <select
            name={key}
            defaultValue={value}
            onChange={handleChange}
            className={"w-full rounded border p-1"}
          >
            <option value="">선택하세요</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={key}
            defaultValue={value}
            onChange={() => handleChange}
            className={"h-[100px] w-full rounded border p-1"}
          />
        );
      default:
        return (
          <input
            type="text"
            name={key}
            defaultValue={value}
            onChange={handleChange}
            className={"w-full rounded border p-1"}
          />
        );
    }
  };

  return (
    <>
      <div>
        {isEditing && (
          <div className={"absolute right-[272px] top-[32px] z-10"}>
            <Button
              color={"blue"}
              fill={true}
              height={35}
              width={100}
              onClick={() => handleSave()}
            >
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
          주차장 정보
        </div>
        <div className={"grid-section"}>
          <div className={"cell-label-col"}>증권번호</div>
          {isEditing ? (
            <div className={"cell-value-col"}>
              <select
                defaultValue={rowData.pNo}
                onChange={handleChange}
                name="pNo"
                className={"w-full rounded border p-1"}
              >
                <option value="">선택하세요</option>
                {pNoList?.map((option) => (
                  <option key={option.irpk} value={option.pNo}>
                    {option.nickName + "[" + option.pNo + "]"}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className={"cell-value-col"}>
              {renderField("pNo", rowData.pNo, "text")}
            </div>
          )}
          <div className={"cell-label-col"}>주차장명</div>
          <div className={"cell-value-col"}>
            {renderField("pklName", rowData.pklName, "text")}
          </div>
          <div className={"cell-label-col"}>소재지</div>
          <div className={"cell-value-col"}>
            {renderField("pklAddress", rowData.pklAddress, "text")}
          </div>
          <div className={"cell-label-col"}>형태</div>
          <div className={"cell-value-col"}>
            {renderField("form", rowData.form, "text")}
          </div>
        </div>
        <div
          className={
            "mx-2 flex w-full items-center py-3 text-[17px] font-semibold mt-8"
          }
        >
          <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
          주차장 상세정보
        </div>
        <div className={"grid-section"}>
            <div className={"cell-label-col"}>면수</div>
            <div className={"cell-value-col"}>
              {renderField(
                "faceCount",
                rowData.faceCount ? rowData.faceCount : "-",
                "text",
              )}
            </div>
            <div className={"cell-label-col"}>옥외 (㎡)</div>
            <div className={"cell-value-col"}>
              {renderField(
                "outdoor",
                rowData.outdoor ? rowData.outdoor : "-",
                "text",
              )}
            </div>
            <div className={"cell-label-col"}>옥내 (㎡)</div>
            <div className={"cell-value-col"}>
              {renderField(
                "indoor",
                rowData.indoor ? rowData.indoor : "-",
                "text",
              )}
            </div>
            <div className={"cell-label-col"}>기계식 (면)</div>
            <div className={"cell-value-col"}>
              {renderField(
                "mechanical",
                rowData.mechanical ? rowData.mechanical : "-",
                "text",
              )}
            </div>
            <div className={"cell-label-col"}>카리프트 (대)</div>
            <div className={"cell-value-col"}>
              {renderField(
                "carLift",
                rowData.carLift ? rowData.carLift : "-",
                "text",
              )}
            </div>
            <div className={"cell-label-col"}>세부 내역</div>
            <div className={"cell-value-col"}>
              {renderField(
                "detailHistory",
                rowData.detailHistory ? rowData.detailHistory : "-",
                "text",
              )}
            </div>
            <div className={"cell-label-col"}>공동피보험자</div>
            <div className={"cell-value-col"}>
              {renderField(
                "coInsured",
                rowData.coInsured ? rowData.coInsured : "-",
                "text",
              )}
            </div>
            <div className={"cell-label-col"}>상태</div>
            {isEditing ? (
              <div className={"cell-value-col"}>
                <select
                  defaultValue={rowData.status}
                  onChange={handleChange}
                  className={"w-full rounded border p-1"}
                >
                  <option value="">선택하세요</option>
                  {PARKING_STATUS?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <td>{rowData.status ? rowData.status : "-"}</td>
            )}
          {rowData.status === "NEW" && (
            <>
              <div className={"cell-label-col"}>등록일</div>
              <div className={"cell-value-col"}>
                {renderField(
                  "updatedYMD",
                  dayjs(rowData.updatedYMD).toDate(),
                  "date",
                )}
              </div>
            </>
          )}

          {rowData.status === "EXPIRED" && (
            <>
              <div className={"cell-label-col"}>만료일</div>
              <div className={"cell-value-col"}>
                {renderField(
                  "deletedYMD",
                  dayjs(rowData.deletedYMD).toDate(),
                  "date",
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HiparkingList;
