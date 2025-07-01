"use client";
import React, { useState } from "react";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "../../../../../../public/images/icon/excel-icon.png";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import { ButtonConfig } from "@/@types/common";
import { hiparkingAccidentColumns } from "@/config/data";
import { onClickExcel } from "@/app/lib/onClickExcel";
import {
  CompanyListProps,
  CompanyListRequest,
  CompanyListResponseItem,
} from "@/app/lib/simg1DayApi/company/types";
import { useCompanyList } from "@/app/lib/hooks/simg1Day/company/useCompanyList";
import { CompanyColumn } from "@/app/components/pageComponents/simg/company/config";
import RefreshButton from "@/app/components/common/ui/refresh";
import { ListContainer } from "@/app/components/common/ui/input/listContainer";

export default function CompanyList({ bpk, id, subIdYn }: CompanyListProps) {
  const [param, setParam] = useState<CompanyListRequest>({
    job: "LIST",
    bpk,
    id,
    listType: "companyList",
    condition: "bName",
    text: "",
    statusCode: "all",
    startDate: dayjs().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [rowData, setRowData] = useState<CompanyListResponseItem | undefined>();
  // ✅ React Query 데이터 패칭
  const { data, refetch } = useCompanyList(param);

  const closePopup = () => {
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

  return (
    <div className={"space-y-3"}>
      {/* 헤더 섹션 */}
      <div className="flex min-h-20 items-center justify-between rounded-lg border border-gray-100 bg-white px-6">
        <div className="lg:text-lg text-base font-semibold">업체관리</div>
        <div className="flex items-center space-x-4">
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4">
              <div className="space-y-1">
                <div className="text-sm">검색항목</div>
                <select
                  className="h-[35px] w-full rounded border border-gray-300 px-3 lg:w-[200px]"
                  onChange={(e) =>
                    setParam((prev) => ({ ...prev, condition: e.target.value }))
                  }
                >
                  <option value={"bName"}>업체명</option>
                  <option value={"uName"}>성명</option>
                  <option value={"uCell"}>연락처</option>
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
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <div className={"mt-5 rounded-lg border border-gray-100 bg-white p-6"}>
        <ListContainer
          items={getPaginatedData()}
          getItemId={(item) => item.pspk}
          columns={CompanyColumn}
          withCheckbox={false}
          selectedRow={selectedRow}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          onRowClick={(item) => {
            setSelectedRow(item.pspk);
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
      {/*{
                (subIdYn ==='N' && isOpen) &&
                <SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={"상세보기"}
                    rowData={rowData}
                    buttons={popupButtons.map(button => ({ ...button}))}
                    Content={(props) => <DepositListDetail {...props}  rowData={rowData} handleConfirm={(item)=> handleConfirm({item, userId : session.user.id})} onClose={closePopup}/>}
                />
            }*/}
    </div>
  );
}
