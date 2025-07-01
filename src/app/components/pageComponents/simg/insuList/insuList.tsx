"use client";
import React, { useState, useEffect } from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "../../../../../../public/images/icon/excel-icon.png";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import { hiparkingAccidentColumns } from "@/config/data";
import { onClickExcel } from "@/app/lib/onClickExcel";
import { useNotifications } from "@/context/NotificationContext";
import { useSession } from "next-auth/react";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";
import { useConfirmAction } from "@/app/lib/hooks/simg1Day/deposit/useConfirmAction";
import {
  InsuListType,
  InsuranceListRequest,
} from "@/app/lib/simg1DayApi/insu/types";
import { useInsuList } from "@/app/lib/hooks/simg1Day/insu/useInsuList";
import { InsuListColumn } from "@/app/components/pageComponents/simg/insuList/config";
import { useDepositBalance } from "@/app/lib/hooks/simg1Day/deposit/useDepositBalance";
import RefreshButton from "@/app/components/common/ui/refresh";
import { ListContainer } from "@/app/components/common/ui/input/listContainer";

export default function InsuListPage({ bpk, id, subIdYn }: InsuListType) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [param, setParam] = useState<InsuranceListRequest>({
    job: "LIST",
    bpk,
    id,
    listType: "insuranceManagement",
    condition: "contractor",
    text: "",
    statusCode: "all",
    startDate: dayjs().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const { showAlert, resetNotiThen } = useNotifications();
  const [currentPage, setCurrentPage] = useState(0); // 0부터 시작하도록 다시 변경
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 반응형 itemsPerPage 상태
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // ✅ React Query 데이터 패칭
  const { data, refetch } = useInsuList(param);
  const { data: balance, refetch: refetchBalance } = useDepositBalance(bpk, id);

  // ✅ 공통 handleConfirm 함수 생성
  const { handleConfirm } = useConfirmAction({
    refetch,
    showAlert,
    resetNotiThen,
  });

  // 반응형 itemsPerPage 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(20); // 기존 갯수 유지
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(10); // 1024px 미만
      } else {
        setItemsPerPage(5); // 768px 미만
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 페이지 변경 시 currentPage 초기화
  useEffect(() => {
    setCurrentPage(0); // 0으로 초기화
  }, [itemsPerPage]);

  // 리스트 데이터 - 다양한 데이터 구조 가능성 체크
  const insuData = (() => {
    if (!data) return [];

    // 가능한 데이터 구조들을 체크
    if (Array.isArray(data)) return data;
    if (data.data && Array.isArray(data.data)) return data.data;
    return [];
  })();

  // ✅ 페이지네이션 데이터 추출
  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage; // currentPage를 그대로 사용 (0부터 시작)
    const paginatedData = insuData.slice(startIndex, startIndex + itemsPerPage);
    return paginatedData;
  };

  // ✅ 검색 버튼 클릭
  const onSearchClick = () => {
    refetch();
    setCurrentPage(0); // 0으로 초기화
  };

  // 페이지 변경 핸들러
  const handlePageChange = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className={"space-y-3"}>
      {/* 헤더 섹션 */}
      <div className="flex min-h-20 items-center justify-between rounded-lg border border-gray-100 bg-white px-6">
        <div className="text-base font-semibold lg:text-lg">신청현황</div>
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
                  "투루카_사고_리스트.xlsx",
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

      {/* 검색/필터 UI */}
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
                value={param.statusCode}
                onChange={(e) =>
                  setParam((prev) => ({ ...prev, statusCode: e.target.value }))
                }
              >
                <option value="all">전체</option>
                <option value="READY">대기</option>
                <option value="UNDERWRITE">심사중</option>
                <option value="ACCEPTED">통과</option>
                <option value="REJECTED">거절</option>
                <option value="ERROR">에러</option>
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
                    value={param.condition}
                    onChange={(e) =>
                      setParam((prev) => ({
                        ...prev,
                        condition: e.target.value,
                      }))
                    }
                  >
                    <option value={"contractor"}>피보험자</option>
                    <option value={"carNumber"}>차량번호</option>
                    <option value={"viNumber"}>차대번호</option>
                    <option value={"bNumber"}>사업자번호</option>
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
                        onSearchClick();
                      }
                    }}
                  />
                  <Button
                    color="main"
                    width={100}
                    height={35}
                    fill
                    className="rounded-l-none rounded-r"
                    onClick={onSearchClick}
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
                  onClick={onSearchClick}
                  className={"!w-full lg:!w-[100px]"}
                >
                  조회
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 리스트 섹션 - 반응형 개선 */}
      <div className="rounded-lg border border-gray-100 bg-white p-3 lg:p-6">
        <ListContainer
          items={getPaginatedData()}
          getItemId={(item) => item.contractId}
          columns={InsuListColumn}
          selectedItems={selectedItems}
          withCheckbox={false}
          handleConfirm={(item) =>
            handleConfirm({ item, userId: session.user.id })
          }
          onSelectionChange={setSelectedItems}
        />

        {/* 페이지네이션 */}
        {insuData.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              maxNumber={Math.ceil(insuData.length / itemsPerPage)}
              currentPage={currentPage + 1} // Pagination 컴포넌트는 1부터 시작하므로 +1
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* 예치금 충전 팝업 */}
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
