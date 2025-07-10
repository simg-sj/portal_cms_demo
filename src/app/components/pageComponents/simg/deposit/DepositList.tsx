"use client";
import React, { useState } from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "../../../../../../public/images/icon/excel-icon.png";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import { CheckboxContainer } from "@/app/components/common/ui/input/checkboxContainer";
import { ButtonConfig } from "@/@types/common";
import { hiparkingAccidentColumns } from "@/config/data";
import { onClickExcel } from "@/app/lib/onClickExcel";
import { useDepositList } from "@/app/lib/hooks/simg1Day/deposit/useDepositList";
import {
  DepositListProps,
  DepositListRequest,
  DepositListResponseItem,
} from "@/app/lib/simg1DayApi/deposit/types";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";
import { useSession } from "next-auth/react";
import SlidePopup from "@/app/components/popup/SlidePopup";
import DepositListDetail from "@/app/components/pageComponents/simg/deposit/DepositListDetail";
import { useNotifications } from "@/context/NotificationContext";
import { useConfirmAction } from "@/app/lib/hooks/simg1Day/deposit/useConfirmAction";
import cn from "classnames";
import {
  AdminColumns,
  UserColumns,
} from "@/app/components/pageComponents/simg/deposit/config";
import ReFresh from "../../../../../../public/images/icon/refresh-icon.png";
import { useDepositBalance } from "@/app/lib/hooks/simg1Day/deposit/useDepositBalance";
import RefreshButton from "@/app/components/common/ui/refresh";
import { ListContainer } from '@/app/components/common/ui/input/listContainer';

export default function DepositPage({ bpk, id, subIdYn }: DepositListProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [param, setParam] = useState<DepositListRequest>({
    job: "LIST",
    bpk,
    id,
    listType: "depositRequest",
    condition: "uCell",
    text: "",
    statusCode: "all",
    startDate: dayjs().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const { showAlert, resetNotiThen } = useNotifications();
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [rowData, setRowData] = useState<DepositListResponseItem | undefined>();

  // ✅ React Query 데이터 패칭
  const { data, refetch } = useDepositList(param);
  const { data: balance, refetch: refetchBalance } = useDepositBalance(bpk, id);

  // ✅ 공통 handleConfirm 함수 생성
  const { handleConfirm } = useConfirmAction({
    refetch,
    showAlert,
    resetNotiThen,
  });

  const closePopup = () => {
    setIsOpen(false);
    setSelectedRow(null);
    document.body.style.removeProperty("overflow");
  };

  // 리스트 데이터는 항상 data.data
  const insuData = data?.data || [];

  const popupButtons: ButtonConfig[] = [
    {
      label: "편집",
      onClick: () => {},
      color: "blue",
      width: 100,
      height: 35,
    },
    {
      label: "닫기",
      onClick: closePopup,
      color: "gray",
      width: 100,
      height: 35,
    },
  ];

  // ✅ 페이지네이션 데이터 추출
  const itemsPerPage = 10; // 기존 상수?
  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage;
    return insuData.slice(startIndex, startIndex + itemsPerPage);
  };

  // ✅ 검색 버튼 클릭
  const onSearchClick = () => {
    refetch();
    setCurrentPage(0);
  };
  console.log(data);
  return (
    <div className={"space-y-3"}>
      {/* 헤더 섹션 */}
      <div className="flex min-h-20 items-center justify-between rounded-lg border border-gray-100 bg-white px-6">
        <div className="text-base font-semibold lg:text-lg">예치금관리</div>
        <div className="flex items-center space-x-4">
          {subIdYn === "Y" ? (
            <>
              <div className="ml-2 flex min-w-[220px] items-center justify-between rounded-lg bg-gray-50 px-4 py-2 shadow-sm lg:min-w-[250px]">
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">예치금 잔액</p>
                    <RefreshButton onClick={() => refetchBalance()} />
                  </div>
                  <p className="text-md font-semibold text-gray-900">
                    {Number(balance).toLocaleString()}원
                  </p>
                </div>
                <Button
                  color={"main"}
                  fill={true}
                  onClick={() => setIsOpen(true)}
                  textSize={14}
                  width={50}
                  height={32}
                >
                  충전
                </Button>
              </div>
            </>
          ) : (
            <Button
              color={"green"}
              height={32}
              width={120}
              className={"ml-5"}
              onClick={() =>
                onClickExcel(
                  hiparkingAccidentColumns,
                  "accident",
                  insuData,
                  "1일책임보험_예치금리스트.xlsx",
                )
              }
            >
              <Image
                src={Excel}
                alt={"다운로드"}
                width={17}
                height={17}
                className={"mr-2"}
              />
              엑셀다운
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white px-6 py-4">
        <div className="mb-4 flex items-center space-x-3">
          <div className="font-medium">검색조건</div>
          <RefreshButton onClick={() => refetch()} />
        </div>

        {/* 반응형 검색 폼 */}
        <div className="space-y-4 lg:space-y-0">
          {/* 상태, 기간 */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-5">
            <div className="space-y-1">
              <div className="text-sm">상태</div>
              <select
                className="h-[35px] w-full rounded border border-gray-300 px-3 lg:w-[200px]"
                onChange={(e) =>
                  setParam((prev) => ({ ...prev, statusCode: e.target.value }))
                }
              >
                <option value="all">전체</option>
                <option value="READY">접수</option>
                <option value="COMPLETED">승인</option>
                <option value="CANCEL">취소</option>
              </select>
            </div>

            <div className="space-y-1">
              <div className="text-sm">기간</div>
              <DayTerm
                type={"day"}
                setParam={setParam}
                sDay={new Date(param.startDate)}
                eDay={new Date(param.endDate)}
                className={"w-full lg:w-[200px]"}
              />
            </div>

            {/* 검색 조건 (subIdYn이 "N"일 때만) */}
            {subIdYn === "N" && (
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4">
                <div className="space-y-1">
                  <div className="text-sm">검색항목</div>
                  <select
                    className="h-[35px] w-full rounded border border-gray-300 px-3 lg:w-[200px]"
                    onChange={(e) =>
                      setParam((prev) => ({ ...prev, condition: e.target.value }))
                    }
                  >
                    <option value={"uCell"}>연락처</option>
                  </select>
                </div>
                  <div className="flex flex-1 lg:max-w-[400px]">
                    <input
                      type="text"
                      placeholder="검색항목 설정 후 검색"
                      className="h-[35px] flex-1 rounded-l rounded-r-none border border-gray-300 px-3"
                      value={param.text}
                      onChange={(e) =>
                        setParam((prev) => ({ ...prev, text: e.target.value }))
                      }
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
                        }
                      }}
                    />
                    <Button
                      color="main"
                      width={100}
                      height={35}
                      fill
                      className="rounded-l-none rounded-r"
                      onClick={() => onSearchClick()}
                    >
                      조회
                    </Button>
                  </div>
                </div>
            )}
            {/* subIdYn이 "Y" 조회 버튼만 */}
            {subIdYn === "Y" && (
              <div className="flex justify-end">
                <Button
                  color="main"
                  width={100}
                  height={35}
                  fill
                  onClick={() => onSearchClick()}
                  className={"!w-full lg:!w-[100px]"}
                >
                  조회
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

     {/* <div
        className={
          "flex items-center justify-between rounded-lg border border-gray-100 bg-white p-6"
        }
      >
        <div className={"flex items-center"}>
           상태 필터
          <select
            className={"w-[200px]"}
            onChange={(e) =>
              setParam((prev) => ({ ...prev, statusCode: e.target.value }))
            }
          >
            <option value="all">전체</option>
            <option value="READY">접수</option>
            <option value="COMPLETED">승인</option>
            <option value="CANCEL">취소</option>
          </select>

           기간 필터
          <div
            className={
              "ml-2 flex items-center space-x-4 pt-1 font-medium text-gray-700"
            }
          >
            <div>기간</div>
            <DayTerm
              type={"day"}
              setParam={setParam}
              sDay={new Date(param.startDate)}
              eDay={new Date(param.endDate)}
            />
          </div>

           검색 조건
          {subIdYn === "N" && (
            <div className="ml-4 flex items-center space-x-4">
              <div className={"font-medium text-gray-700"}>검색조건</div>
              <select
                className={"w-[200px]"}
                onChange={(e) =>
                  setParam((prev) => ({ ...prev, condition: e.target.value }))
                }
              >
                <option value={"uCell"}>연락처</option>
              </select>
              <input
                type={"text"}
                placeholder={"검색조건 설정 후 검색해주세요"}
                className={
                  "ml-5 h-[35px] w-[300px] rounded-br-none rounded-tr-none"
                }
                onChange={(e) =>
                  setParam((prev) => ({ ...prev, text: e.target.value }))
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
                  }
                }}
              />
            </div>
          )}
          <Button
            color="main"
            width={100}
            height={35}
            fill
            className={cn(
              subIdYn === "N" ? "rounded-bl-none rounded-tl-none" : "ml-4",
            )}
            onClick={() => onSearchClick()}
          >
            조회
          </Button>
          <button className="ml-4" onClick={() => refetch()}>
            <Image src={ReFresh} alt={"새로고침"} width={20} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          {subIdYn === "Y" ? (
            <>
              <div className="ml-2 flex min-w-[220px] items-center justify-between rounded-lg bg-gray-50 px-4 py-2 shadow-sm">
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">예치금 잔액</p>
                    <button type={"button"} onClick={() => refetchBalance()}>
                      <Image src={ReFresh} alt={"새로고침"} width={20} />
                    </button>
                  </div>
                  <p className="text-md font-semibold text-gray-900">
                    {Number(balance).toLocaleString()}원
                  </p>
                </div>
                <Button
                  color={"main"}
                  fill={true}
                  onClick={() => setIsOpen(true)}
                  textSize={14}
                  width={50}
                  height={32}
                >
                  충전
                </Button>
              </div>
            </>
          ) : (
            <Button
              color={"green"}
              height={32}
              width={120}
              className={"ml-5"}
              onClick={() =>
                onClickExcel(
                  hiparkingAccidentColumns,
                  "accident",
                  insuData,
                  "1일책임보험_예치금리스트.xlsx",
                )
              }
            >
              <Image
                src={Excel}
                alt={"다운로드"}
                width={17}
                height={17}
                className={"mr-2"}
              />
              엑셀다운
            </Button>
          )}
        </div>
      </div>*/}

      {/* 리스트 */}
      <div className="rounded-lg border border-gray-100 bg-white p-3 lg:p-6">
      <ListContainer
          items={getPaginatedData()}
          getItemId={(item) => item.pspk}
          columns={subIdYn === "N" ? AdminColumns : UserColumns}
          selectedRow={selectedRow}
          selectedItems={selectedItems}
          withCheckbox={false}
          handleConfirm={(item) =>
            handleConfirm({ item, userId: session.user.id })
          }
          onSelectionChange={setSelectedItems}
          onRowClick={(item) => {
            setSelectedRow(item.pspk);
            if (subIdYn !== "Y") setIsOpen(true);
            setRowData(item);
            document.body.style.overflow = "hidden";
          }}
        />
        {insuData.length > 0 && (
          <Pagination
            maxNumber={Math.ceil(insuData.length / itemsPerPage)}
            currentPage={currentPage + 1}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      {subIdYn === "N" && isOpen && (
        <SlidePopup
          isOpen={isOpen}
          onClose={closePopup}
          title={"상세보기"}
          rowData={rowData}
          buttons={popupButtons.map((button) => ({ ...button }))}
          Content={(props) => (
            <DepositListDetail
              {...props}
              rowData={rowData}
              handleConfirm={(item) =>
                handleConfirm({ item, userId: session.user.id })
              }
              onClose={closePopup}
            />
          )}
        />
      )}
      {subIdYn === "Y" && isOpen && (
        <DepositPopup
          setIsOpen={setIsOpen}
          data={session.user}
          balance={balance}
        />
      )}
    </div>
  );
}
