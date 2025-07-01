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
  STATE_OPTIONS,
} from "@/config/data";

import {
  ClaimRowType,
  ImageType,
  InsuranceItem,
  UptClaim,
} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import { getImage, getPolicyList } from "@/app/(Navigation-Group)/action";
import cn from "classnames";
import { convertClaimToUptClaim, getChangedFields } from "@/app/lib/common";
import { useNotifications } from "@/context/NotificationContext";
import GridRow from "@/app/components/common/ui/gridTable";

interface ListProps {
  isEditing: boolean;
  isNew?: boolean;
  rowData: ClaimRowType;
  onSave: (data: UptClaim) => void;
}

const AccidentDetailList = ({
  isEditing,
  isNew = false,
  rowData,
  onSave,
}: ListProps) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const { showAlert } = useNotifications();
  const [pnoList, setPnoList] = useState<InsuranceItem[]>([]);
  // 초기에 rowData를 UptClaim으로 변환해서 editData로 설정
  const [editData, setEditData] = useState<ClaimRowType>(rowData);

  const getPnoList = async (bpk: number) => {
    let result = await getPolicyList(bpk);

    setPnoList(result);
  };

  const fetchImageData = useCallback(async (irpk: number) => {
    try {
      const fetchedImage = await getImage(irpk);
      setImages(fetchedImage);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  }, []);

  useEffect(() => {
    // 이미지 데이터를 처음 로드하거나 irpk가 변경될 때만 호출
    if (!isNew && rowData.irpk) {
      fetchImageData(rowData.irpk);
      getPnoList(rowData.bpk);
    }
  }, [rowData]);

  // 필드값 변경시 formdata 업데이트
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    let { name, value } = e.target;

    let deleteCommaValue = value.replaceAll(",", "");

    setEditData((prev) => {
      return { ...prev, [e.target.name]: deleteCommaValue };
    });
  };
  const handleSave = () => {
    const changed = getChangedFields(editData, rowData);
    const merged = {
      ...changed,
      bpk: rowData.bpk,
      irpk: rowData.irpk,
    };
    if (isEditing) {
      if (JSON.stringify(editData) !== JSON.stringify(rowData)) {
        console.log("test", changed);

        onSave(convertClaimToUptClaim(merged));
      } else {
        showAlert("변경된 정보가 없습니다.");
      }
    }

    /* if(isNew){
            if(editData) {
                onSave(param);
            }else {
                alert('변경된 정보가 없습니다.');
                return;
            }
        }*/
  };

  // 입력필드 타입
  const renderField = (
    key: string,
    value: any,
    type: "text" | "select" | "date" | "dayterm" | "textarea" = "text",
    options?: string[],
  ) => {
    if (!isEditing && !isNew) {
      if (type === "date") {
        return value ? value.toLocaleDateString() : "";
      }
      if (type === "dayterm") {
        return `${value.startDate?.toLocaleDateString()} ~ ${value.endDate?.toLocaleDateString()}`;
      }
      return value;
    }
    switch (type) {
      case "select":
        return (
          <select
            name={key}
            defaultValue={value}
            onChange={handleChange}
            className="w-full rounded border p-1"
          >
            <option value="">선택하세요</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "date":
        return (
          <CalenderPicker
            select={new Date(editData[key])}
            allowDate={false}
            onChange={(date: Date | null) => {
              setEditData((prevState) => ({
                ...prevState,
                [key]: dayjs(date).format("YYYY-MM-DD"),
              }));
            }}
          />
        );
      case "dayterm":
        return (
          <DayTerm
            sDay={dayjs(editData.sDay).toDate()}
            eDay={dayjs(editData.eDay).toDate()}
            setParam={setEditData}
          />
        );
      case "textarea":
        return (
          <textarea
            name={key}
            defaultValue={value}
            onChange={handleChange}
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
            className="w-full rounded border p-1"
          />
        );
    }
  };

  return (
    <>
      <div>
        {(isEditing || isNew) && (
          <div
            className={cn(
              "z-10",
              isEditing
                ? "absolute right-[272px] top-[32px]"
                : "absolute right-[160px] top-[32px]",
            )}
          >
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
        {/* 접수현황 */}

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
          <div className="cell-value">{renderField("insuNum", rowData.insuNum, "text")}</div>

          <div className="cell-label">손조비용</div>
          <div className="cell-value">
            {renderField(
              "repairAmt",
              rowData.repairAmt
                ? FormatNumber(Number(rowData.repairAmt)) + "원"
                : "-",
              "text",
            )}
          </div>

          <div className="cell-label">상태</div>
          {isEditing ? (
            <div className="cell-value">
              <select
                name={"closingStatus"}
                defaultValue={editData.closingStatus}
                onChange={handleChange}
                className="w-full rounded border p-1"
              >
                <option value="">선택하세요</option>
                {STATE_OPTIONS?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="cell-value">{editData.closingStatus ? editData.closingStatus : "-"}</div>
          )}
          <div className="cell-label">지급보험금</div>
          <div className="cell-value">
            {renderField(
              "total",
              rowData.total
                ? FormatNumber(Number(rowData.total)) + "원"
                : "-",
              "text",
            )}
          </div>

          <div className="cell-label">사고접수일</div>
          <div className="cell-value">
            {renderField(
              "requestDate",
              dayjs(rowData.requestDate).toDate(),
              "date",
            )}
          </div>

          <div className="cell-label">내부결재 여부</div>
          {isEditing ? (
            <div className="cell-value">
              <select
                name="approvalYN"
                defaultValue={rowData.approvalYN}
                onChange={handleChange}
                className="w-full rounded border p-1"
              >
                <option value="">선택하세요</option>
                {APPROVAL_OPTIONS?.map((option) => (
                  <option key={option.title} value={option.value}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="cell-value">{rowData.approvalYN === "Y" ? "승인" : "미승인"}</div>
          )}
        </div>

        {/*사고정보*/}
        <div
          className={
            "mx-2 mt-8 flex w-full items-center py-3 text-[17px] font-semibold"
          }
        >
          <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
          사고정보
        </div>
        <div className="grid-section">
              <div className={'cell-label'}>사고일시</div>
              <div className={'cell-value'}>
                {renderField(
                  "accidentDate",
                  dayjs(rowData.accidentDate).toDate(),
                  "date",
                )}
              </div>
              <div className={'cell-label'}>사고유형</div>
              <div className={'cell-value'}>
                {renderField(
                  "accidentType",
                  rowData.accidentType,
                  "select",
                  ACCIDENT_TYPE_OPTIONS,
                )}
              </div>
              <div className={'cell-label'}>사고세부유형</div>
              <div className={'cell-value'}>
                {renderField(
                  "accidentDetailType",
                  rowData.accidentDetailType,
                  "select",
                  ACCIDENT_DETAIL_TYPE_OPTIONS,
                )}
              </div>
              <div className={'cell-label'}>접수자 성함</div>
              <div className={'cell-value'}>{renderField("wName", rowData.wName)}</div>
              <div className={'cell-label'}>현장담당자</div>
              <div className={'cell-value'}>{renderField("inCargeName", rowData.inCargeName)}</div>
              <div className={'cell-label'}>현장담당자 연락처</div>
              <div className={'cell-value'}>{renderField("inCargePhone", rowData.inCargePhone)}</div>
              <div className={'cell-label-col'}>사업소명(주차장명)</div>
              <div className={'cell-value-col'}>{renderField("pklName", rowData.pklName)}</div>
              <div className={'cell-label-col'}>사고내용</div>
              <div className={'cell-value-col'}>
                {renderField(
                  "accidentDetail",
                  rowData.accidentDetail,
                  "textarea",
                )}
              </div>
              <div className={'cell-label-col'}>비고</div>
              <div className={'cell-value-col'}>
                {renderField("wOpinion", rowData.wOpinion, "textarea")}
              </div>

              <div className={'cell-label-col'}>사고 첨부파일</div>
              <div className={'cell-value-col'}>
                <div className="my-2">
                  <ImageUploader
                    initialImages={images}
                    isEditing={isEditing || isNew}
                    onChange={function (images: ImageType[]): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </div>
              </div>

        </div>
        {/*피해자정보*/}
        <div
          className={
            "mx-2 mt-8 flex w-full items-center py-3 text-[17px] font-semibold"
          }
        >
          <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
          피해자정보
        </div>
        <div className="grid-section">
              <div className={'cell-label'}>피해자 이름</div>
              <div className={'cell-value'}>{renderField("wName", rowData.wName)}</div>
              <div className={'cell-label'}>피해자 연락처</div>
              <div className={'cell-value'}>{renderField("wCell", rowData.wCell)}</div>
              <div className={'cell-label'}>피해자 차량번호</div>
              <div className={'cell-value'}>{renderField("vCarNum", rowData.vCarNum)}</div>
              <div className={'cell-label'}>차종</div>
              <div className={'cell-value'}>{renderField("vCarType", rowData.vCarType)}</div>
              <div className={'cell-label'}>차랑색상</div>
              <div className={'cell-value'}>{renderField("vCarColor", rowData.vCarColor)}</div>
          </div>

        {/*계약사항*/}
        <div
          className={
            "mx-2 mt-8 flex w-full items-center py-3 text-[17px] font-semibold"
          }
        >
          <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
          계약사항
        </div>
        <div className="grid-section">
        <div className={'cell-label'}>증권번호</div>
              {isEditing ? (
                <div className={'cell-value'}>
                  <select
                    name={"pNo"}
                    defaultValue={editData.pNo}
                    onChange={handleChange}
                    className="w-full rounded border p-1"
                  >
                    <option value="">선택하세요</option>
                    {pnoList.map((state) => (
                      <option key={state.irpk} value={state.pNo}>
                        {state.pNo}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className={'cell-value'}>{editData.pNo}</div>
              )}
              <div className={'cell-label'}>보험기간</div>
              <div className={'cell-value'}>
                {rowData.sDay} ~ {rowData.eDay}
              </div>
              <div className={'cell-label'}>피보험자 상호</div>
              <div className={'cell-value'}>{rowData.platform}</div>
              <div className={'cell-label'}>피보험자 사업자등록번호</div>
              <div className={'cell-value'}>{rowData.bNumber}</div>
            </div>
        {/*접수자정보*/}
        <div
          className={
            "mx-2 mt-8 flex w-full items-center py-3 text-[17px] font-semibold"
          }
        >
          <div className={"mr-2 h-4 w-1.5 bg-main"}></div>
          접수자정보
        </div>
        <div className="grid-section">
              <div className={'cell-label'}>업무 담당자 성함</div>
              <div className={'cell-value'}>
                {renderField("bCargeName", rowData.bCargeName)}
              </div>
              <div className={'cell-label'}>업무 담당자 연락처</div>
              <div className={'cell-value'}>{renderField("bCell", rowData.bCell)}</div>
              <div className={'cell-label'}>업무 담당자 메일</div>
              <div className={'cell-value'}>{renderField("bMail", rowData.bMail)}</div>
        </div>
      </div>
    </>
  );
};

export default AccidentDetailList;
