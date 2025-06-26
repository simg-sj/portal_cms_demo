// 공통 컴포넌트 및 유틸 import
import Checkbox from "@/app/components/common/ui/input/checkbox";
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";
import { authText, SimgDeposit } from "@/config/data";
import dayjs from "dayjs";
import Button from "@/app/components/common/ui/button/button";
import { useState, useEffect } from "react";

interface ColumType {
  key: string;
  header: string;
}

interface ListContainerProps<T extends { status?: string }> {
  items: T[]; // 목록 데이터
  columns: ColumType[]; // 테이블/카드 컬럼 정의
  getItemId: (item: T) => number; // 각 아이템의 고유 ID 반환 함수
  withCheckbox?: boolean; // 체크박스 표시 여부
  onSelectionChange?: (selectedIds: number[]) => void; // 선택 항목 변경 시 콜백
  onRowClick?: (item: T) => void; // 행 클릭 시 콜백
  handleConfirm?: (item: T) => void; // 승인 버튼 클릭 시 콜백
  selectedRow?: number | null; // 현재 선택된 행 (단일)
  selectedItems: number[]; // 현재 선택된 항목 목록
}

export function ListContainer<T>({
  items,
  columns,
  getItemId,
  withCheckbox = true,
  onSelectionChange,
  handleConfirm,
  onRowClick,
  selectedRow,
  selectedItems,
}: ListContainerProps<T>) {
  // 화면 크기에 따라 뷰 모드 설정
  const [viewMode, setViewMode] = useState<
    "table" | "card-horizontal" | "card-vertical"
  >("table");

  // 화면 크기 변화에 따른 반응형 처리
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setViewMode("table");
      } else if (window.innerWidth >= 768) {
        setViewMode("card-horizontal");
      } else {
        setViewMode("card-vertical");
      }
    };

    handleResize(); // 초기 설정
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 전체 선택/해제 처리
  const toggleSelectAll = (checked: boolean) => {
    if (!withCheckbox) return;
    const allIds = items.map((item) => getItemId(item));
    const newSelectedItems = checked ? allIds : [];
    onSelectionChange?.(newSelectedItems);
  };

  // 개별 항목 선택 토글
  const toggleSelectItem = (id: number) => {
    if (!withCheckbox) return;
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id];
    onSelectionChange?.(newSelectedItems);
  };

  // 행 클릭 처리
  const handleRowClick = (item: T) => {
    onRowClick?.(item);
  };

  // 컬럼 값 렌더링 가공
  const safeRenderValue = (column: string, item: T) => {
    let value = item[column];
    if (column === "total" || column === "reqDeposit") {
      if (value) return Number(value).toLocaleString() + "원";
    }
    if (
      column === "requestDate" ||
      column === "accidentDate" ||
      column === "createdYMD"
    ) {
      if (value) {
        const format =
          column === "requestDate" ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm";
        return dayjs(value).format(format);
      }
    }
    if (column === "status") {
      return SimgDeposit[value]; // 상태 매핑
    }
    if (column === "isConfirmed") {
      return value === "Y" ? "승인" : "미승인";
    }
    if (value === null || value === undefined) return "-";
    if (column === "uAuth") {
      value = authText[item[column]];
    }
    return String(value);
  };

  // 선택 상태 확인
  const isAllSelected = selectedItems.length === items.length;
  const isSomeSelected =
    selectedItems.length > 0 && selectedItems.length < items.length;

  // 1024px 이상: 테이블 형태
  const renderTableView = () => (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max">
        <thead>
          <tr>
            {withCheckbox && (
              <th className="w-10 px-2 py-3 text-center">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isSomeSelected}
                  onChange={(event) => toggleSelectAll(event)}
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th key={index} className="whitespace-nowrap px-4 py-3 text-center">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (withCheckbox ? 1 : 0)}>
                <div className="my-[150px] flex items-center justify-center">
                  <Image
                    src={Error}
                    alt="에러"
                    width={30}
                    height={30}
                    className="mr-5"
                  />
                  <div className="text-lg text-gray-700">
                    데이터가 없습니다.
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            items.map((item, index) => {
              const id = getItemId(item);
              const isSelected =
                selectedRow === id || selectedItems.includes(id);

              return (
                <tr
                  key={`${id}-${index}`}
                  className={` ${onRowClick ? "cursor-pointer" : ""} ${isSelected ? "bg-main-lighter" : "hover:bg-main-lighter"} `}
                  onClick={() => handleRowClick(item)}
                >
                  {withCheckbox && (
                    <td
                      className="px-2 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={selectedItems.includes(id)}
                        onChange={() => toggleSelectItem(id)}
                      />
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="whitespace-nowrap px-4 py-3">
                      {column.key === "statusYn" &&
                      (item as any).status === "READY" ? (
                        <Button
                          fill
                          color="main"
                          width={80}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm(item);
                          }}
                        >
                          승인
                        </Button>
                      ) : (
                        safeRenderValue(column.key, item)
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );

  // 768~1023px: 카드 가로형
  const renderHorizontalCardView = () => (
    <div className="space-y-4">
      {withCheckbox && items.length > 0 && (
        <div className="mb-4 flex items-center">
          <Checkbox
            checked={isAllSelected}
            indeterminate={isSomeSelected}
            onChange={(event) => toggleSelectAll(event)}
            className="w-4"
          />
          <span className="ml-2 text-sm text-gray-600">전체선택</span>
        </div>
      )}
      {items.length === 0 ? (
        <div className="my-[150px] flex items-center justify-center">
          <Image
            src={Error}
            alt="에러"
            width={30}
            height={30}
            className="mr-5"
          />
          <div className="text-lg text-gray-700">데이터가 없습니다.</div>
        </div>
      ) : (
        items.map((item, index) => {
          const id = getItemId(item);
          const isSelected = selectedRow === id || selectedItems.includes(id);
          return (
            <div
              key={`${id}-${index}`}
              className={`rounded-lg border py-4 px-6 transition-colors ${onRowClick ? "cursor-pointer" : ""} ${isSelected ? "border-main-500 bg-main-lighter" : "border-gray-200 bg-white hover:bg-main-lighter"} `}
              onClick={() => handleRowClick(item)}
            >
              {withCheckbox && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedItems.includes(id)}
                    onChange={() => toggleSelectItem(id)}
                    className={"w-4"}
                  />
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="grid flex-1 grid-cols-2 gap-x-14 gap-y-3">
                  {columns.map((column, colIndex) => (
                    <div key={colIndex} className="flex justify-between">
                      <span className="min-w-[80px] font-medium text-gray-500">
                        {column.header}
                      </span>
                      <span className="text-right text-gray-900">
                        {column.key === "statusYn" &&
                        (item as any).status === "READY" ? (
                          <Button
                            fill
                            color="main"
                            width={80}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConfirm(item);
                            }}
                          >
                            승인
                          </Button>
                        ) : (
                          safeRenderValue(column.key, item)
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  // 768px 미만: 카드 세로형
  const renderVerticalCardView = () => (
    <div className="space-y-4">
      {withCheckbox && items.length > 0 && (
        <div className="ml-2 mb-4 flex items-center">
          <Checkbox
            checked={isAllSelected}
            indeterminate={isSomeSelected}
            onChange={(event) => toggleSelectAll(event)}
            className="w-4"
          />
          <span className="ml-2 text-sm text-gray-600">전체 선택</span>
        </div>
      )}
      {items.length === 0 ? (
        <div className="my-[150px] flex items-center justify-center">
          <Image
            src={Error}
            alt="에러"
            width={30}
            height={30}
            className="mr-5"
          />
          <div className="text-lg text-gray-700">데이터가 없습니다.</div>
        </div>
      ) : (
        items.map((item, index) => {
          const id = getItemId(item);
          const isSelected = selectedRow === id || selectedItems.includes(id);

          return (
            <div
              key={`${id}-${index}`}
              className={`rounded-lg border p-4 transition-colors ${onRowClick ? "cursor-pointer" : ""} ${isSelected ? "border-main-500 bg-main-lighter" : "border-gray-200 bg-white hover:bg-main-lighter"} `}
              onClick={() => handleRowClick(item)}
            >
              <div className="space-y-3">
                {withCheckbox && (
                  <div
                    className="flex justify-start"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={selectedItems.includes(id)}
                      onChange={() => toggleSelectItem(id)}
                      className="w-4"
                    />
                  </div>
                )}
                {columns.map((column, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {column.header}
                    </span>
                    <span className="text-right text-sm text-gray-900">
                      {column.key === "statusYn" &&
                      (item as any).status === "READY" ? (
                        <Button
                          fill
                          color="main"
                          width={80}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm(item);
                          }}
                        >
                          승인
                        </Button>
                      ) : (
                        safeRenderValue(column.key, item)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div>
      {viewMode === "table" && renderTableView()}
      {viewMode === "card-horizontal" && renderHorizontalCardView()}
      {viewMode === "card-vertical" && renderVerticalCardView()}
    </div>
  );
}
