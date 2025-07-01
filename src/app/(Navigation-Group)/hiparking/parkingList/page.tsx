"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "../../../../../public/images/icon/excel-icon.png";
import Plus from "../../../../../public/images/icon/plus-icon.png";
import ExcelUpload from "../../../../../public/images/icon/upload-white-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import ParkingDetailList from "@/app/components/pageComponents/parking/parkingDetail";
import Pagination from "@/app/components/common/ui/pagination";
import {
  addExcelParking,
  deleteClaimData,
  deleteGroup,
  getParking,
  updateCommon,
} from "@/app/(Navigation-Group)/action";
import {
  ButtonConfig,
  ParkingParamType,
  ParkingRowType,
  ParkingType,
  UptParking,
} from "@/@types/common";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddBusiness, {
  AddBusinessRef,
} from "@/app/components/pageComponents/parking/addBusiness-hiparking";
import AddExcelUpload from "@/app/components/pageComponents/parking/addExcelUpload";
import { onClickExcel } from "@/app/lib/onClickExcel";
import { parkingColumns } from "@/config/data";
import { useNotifications } from "@/context/NotificationContext";
import { ListContainer } from '@/app/components/common/ui/input/listContainer';

interface ColumnDefinition<T> {
  key: keyof T;
  header: string;
  defaultValue?: string;
  render?: (item: T) => string | number;
}

const itemsPerPage = 15;

export default function Page() {
  const [slideOpen, setSlideOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [excelOpen, setExcelOpen] = useState(false);
  const [excelData, setExcelData] = useState<ParkingType[]>([]);
  const { showAlert, showConfirm, resetNotiThen } = useNotifications();
  const businessRef = useRef<AddBusinessRef>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [data, setData] = useState<ParkingRowType[]>([]);
  const [rowData, setRowData] = useState<ParkingRowType>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [param, setParam] = useState<ParkingParamType>({
    bpk: 2,
    status: "all",
    condition: "pklName",
    text: "",
  });

  //페이지
  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    if (data.length > 0) {
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [data]);

  //슬라이드팝업
  const slideClose = () => {
    setSlideOpen(false);
    setSelectedRow(null);
    document.body.style.removeProperty("overflow");
  };

  const slideSave = async (data: UptParking) => {
    showConfirm("수정하시겠습니까?", async () => {
      data.table = "parkinglot";
      let result = await updateCommon(data);
      if (result.code === "200") {
        let reload = await getParking(param);
        setData(reload || []);
        resetNotiThen(() => {
          showAlert(result.msg, () => {
            slideClose();
          });
        });
      } else {
        resetNotiThen(() => {
          showAlert("서비스 오류입니다.");
        });
      }
    });
  };

  async function slideDelete<T extends UptParking>(rowData: T): Promise<void> {
    try {
      showConfirm("삭제하시겠습니까?", async () => {
        rowData.table = "parkinglot";
        let result = await deleteClaimData(rowData);
        if (result.code === "200") {
          let reload = await getParking(param);
          setData(reload);
          resetNotiThen(() => {
            showAlert(result.msg, () => {
              slideClose();
            });
          });
        } else {
          resetNotiThen(() => {
            showAlert("서비스 오류입니다.");
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  const SlideButtons: ButtonConfig[] = [
    {
      label: "편집",
      onClick: () => {},
      color: "blue",
      width: 100,
      height: 35,
    },
    {
      label: "삭제",
      onClick: () => {},
      color: "red",
      width: 100,
      height: 35,
    },
    {
      label: "닫기",
      onClick: slideClose,
      color: "gray",
      width: 100,
      height: 35,
    },
  ];

  //센터팝업(사업장추가)
  const addSave = async () => {
    if (businessRef.current) {
      const isValid = await businessRef.current.validateForm();

      if (isValid) {
        const formData = businessRef.current.getFormData();
        let form = "";
        if (formData.indoor?.checked) {
          form += "옥내";
        }

        if (formData.outdoor?.checked) {
          form += form ? ",옥외" : "옥외"; // 중간에 콤마 추가
        }

        if (formData.carLift?.checked) {
          form += form ? ",카리프트" : "카리프트"; // 중간에 콤마 추가
        }

        if (formData.mechanical?.checked) {
          form += form ? ",기계식" : "기계식"; // 중간에 콤마 추가
        }

        showConfirm("사업장을 추가하시겠습니까?", async () => {
          const param: UptParking = {
            bpk: 2,
            irpk: 0,
            job: "PARKING",
            gbn: "NEW",
            table: "parkinglot",
            pklName: formData.pkName,
            pklAddress: formData.pkAddress,
            form: form,
            pNo: formData.pNo,
            indoor: formData.indoor.checked ? formData.indoor.value : "-",
            outdoor: formData.outdoor.checked ? formData.outdoor.value : "-",
            mechanical: formData.mechanical.checked
              ? formData.mechanical.value
              : "-",
            carLift: formData.carLift.checked ? formData.carLift.value : "-",
            faceCount: formData.faceCount ? formData.faceCount : "-",
            detailHistory: formData.detailHistory,
            coInsured: formData.coInsured,
          };

          let { code, msg } = await updateCommon(param);

          if (code === "200") {
            resetNotiThen(() => {
              showAlert(msg, () => {
                setAddOpen(false);
              });
            });
          } else {
            resetNotiThen(() => {
              showAlert(msg, () => {});
            });
          }
        });
      }
    }
  };

  const addClose = () => {
    if (businessRef.current) {
      businessRef.current.clearForm();
    }
    setAddOpen(false);
  };

  const AddButtons = [
    {
      label: "확인",
      onClick: addSave,
      color: "main" as const,
      fill: true,
      width: 130,
      height: 40,
    },
    {
      label: "취소",
      onClick: addClose,
      color: "gray" as const,
      width: 130,
      height: 40,
    },
  ];

  //센터팝업(엑셀업로드)
  const excelClose = () => {
    setExcelOpen(false);
  };

  const excelSave = async () => {
    try {
      const countNew = excelData.filter((item) => item.status === "NEW").length;
      const countDel = excelData.filter((item) => item.status === "EXP").length;

      showConfirm(
        `추가: ${countNew} 삭제: ${countDel} 엑셀을 업로드 하시겠습니까?`,
        async () => {
          // bpk 컬럼 추가
          const addBpkData = excelData.map((row) => ({
            ...row,
            bpk: 2, // bpk 컬럼 추가 및 값 설정
          }));
          let res = await addExcelParking(addBpkData);
          if (res.status === "200") {
            resetNotiThen(() => {
              showAlert("업체 등록이 완료되었습니다.", () => {
                excelClose();
              });
            });
          } else {
            resetNotiThen(() => {
              showAlert("서비스 오류입니다.", () => {
                excelClose();
              });
            });
          }
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  const ExcelButton: ButtonConfig[] = [
    {
      label: "확인",
      onClick: excelSave,
      color: "main" as const,
      fill: true,
      width: 130,
      height: 40,
    },
    {
      label: "취소",
      onClick: excelClose,
      color: "gray" as const,
      width: 130,
      height: 40,
    },
  ];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleDeleteGroup = async () => {
    try {
      if (selectedItems.length === 0) {
        showAlert("삭제할 항목을 선택해주세요.");
      } else {
        showConfirm(
          `선택한 ${selectedItems.length}개의 항목을 삭제하시겠습니까?`,
          async () => {
            let param2 = {
              bpk: 2,
              table: "parkinglot",
              job: "DEL_LIST",
              irpkList: selectedItems,
            };
            let result = await deleteGroup(param2);

            if (result.code === "200") {
              setSelectedItems([]);
              let reload = await getParking(param);
              setData(reload);
              resetNotiThen(() => {
                showAlert(result.msg);
              });
            } else {
              resetNotiThen(() => {
                showAlert("서비스 오류입니다.");
              });
            }
          },
        );
      }
    } catch (e) {
      showAlert("서비스 오류입니다.");
    }
  };

  const onSearchClick = async () => {
    const result = await getParking(param);
    setData(result);
    setCurrentPage(0);
  };

  // 사고접수 리스트 컬럼
  const columns: ColumnDefinition<ParkingType>[] = [
    {
      key: "pklName",
      header: "사업장명",
    },
    {
      key: "pklAddress",
      header: "사업장주소",
    },
    {
      key: "form",
      header: "형태",
    },
    {
      key: "faceCount",
      header: "면수",
    },
    {
      key: "indoor",
      header: "옥외(㎡)",
    },
    {
      key: "outdoor",
      header: "옥내(㎡)",
    },
    {
      key: "mechanical",
      header: "기계식(면)",
    },
    {
      key: "carLift",
      header: "카리프트(대)",
    },
  ];
  useEffect(() => {
    onSearchClick();
  }, []);
  return (
    <div className={"space-y-3"}>
      <div className="flex min-h-20 items-center justify-between rounded-lg border border-gray-100 bg-white px-6">
        <div className="text-base font-semibold lg:text-lg">사업장 관리</div>
        <div className="flex items-center space-x-4">
          <Button
            color={"green"}
            height={32}
            width={120}
            className={"ml-5"}
            onClick={() =>
              onClickExcel(
                parkingColumns[param.status],
                "parking",
                data,
                "투루파킹_사업장_리스트.xlsx",
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
      <div className={"rounded-lg border border-gray-100 bg-white p-6 px-6"}>
        <div className="space-y-4 lg:space-y-0">
          {/* 기간, 검색항목 */}
          <div className="flex flex-col gap-4 space-y-1 lg:flex-row lg:items-end lg:gap-5">
            <div className="space-y-1">
              <div className="text-sm">상태</div>
              <select
                className="h-[35px] w-full rounded border border-gray-300 px-3 lg:w-[200px]"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setParam((prev: ParkingParamType) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
              >
                <option value={"all"}>전체</option>
                <option value={"NORMAL"}>정상</option>
                <option value={"NEW"}>신규</option>
                <option value={"EXPIRED"}>종료</option>
              </select>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4">
              <div className="space-y-1">
                <div className="text-sm">검색항목</div>
                <select
                  className="h-[35px] w-full rounded border border-gray-300 px-3 lg:w-[200px]"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setParam((prev: ParkingParamType) => ({
                      ...prev,
                      condition: e.target.value,
                    }));
                  }}
                >
                  <option value={"pklName"}>주차장명</option>
                  <option value={"pklAddress"}>주차장주소</option>
                </select>
              </div>
              <div className="flex flex-1 lg:max-w-[400px]">
                <input
                  type="text"
                  placeholder="검색항목 설정 후 검색"
                  className="h-[35px] flex-1 rounded-l rounded-r-none border border-gray-300 px-3"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setParam((prev: ParkingParamType) => ({
                      ...prev,
                      text: e.target.value,
                    }));
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
                    }
                  }}
                />
                <Button
                  color={"main"}
                  width={100}
                  height={35}
                  fill
                  className={"rounded-bl-none rounded-tl-none"}
                  onClick={onSearchClick}
                >
                  조회
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
        {/*<div className="flex min-h-20 items-center justify-between rounded-lg border border-gray-100 bg-white px-6">
        <div className={"flex items-center"}>
          <div className={"ml-2 mr-5 pt-1 font-medium text-gray-700"}>상태</div>
          <select
            className={"mr-5 w-[200px]"}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setParam((prev: ParkingParamType) => ({
                ...prev,
                status: e.target.value,
              }));
            }}
          >
            <option value={"all"}>전체</option>
            <option value={"NORMAL"}>정상</option>
            <option value={"NEW"}>신규</option>
            <option value={"EXPIRED"}>종료</option>
          </select>
          <div className={"ml-2 mr-5 pt-1 font-medium text-gray-700"}>
            검색조건
          </div>
          <select
            className={"w-[200px]"}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setParam((prev: ParkingParamType) => ({
                ...prev,
                condition: e.target.value,
              }));
            }}
          >
            <option value={"pklName"}>주차장명</option>
            <option value={"pklAddress"}>주차장주소</option>
          </select>
          <input
            type={"text"}
            placeholder={"검색조건 설정 후 검색해주세요"}
            className={
              "ml-5 h-[35px] w-[300px] rounded-br-none rounded-tr-none"
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setParam((prev: ParkingParamType) => ({
                ...prev,
                text: e.target.value,
              }));
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
              }
            }}
          />
          <Button
            color={"main"}
            width={100}
            height={35}
            fill
            className={"rounded-bl-none rounded-tl-none"}
            onClick={onSearchClick}
          >
            조회
          </Button>
        </div>
        <Button
          color={"green"}
          height={32}
          width={120}
          onClick={() =>
            onClickExcel(
              parkingColumns[param.status],
              "parking",
              data,
              "주차장_현황.xlsx",
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
      </div>*/}

        <div className={"mt-5 rounded-lg border border-gray-100 bg-white p-6"}>
          <div className={"flex justify-end"}>
            <div className={"flex justify-end sm:space-x-4 space-x-1"}>
              <Button
                color={"red"}
                fill={false}
                height={32}
                width={120}
                onClick={handleDeleteGroup}
              >
                삭제
              </Button>
              <Button
                color={"green"}
                fill
                height={32}
                width={120}
                onClick={() => setExcelOpen(true)}
              >
                <Image
                  src={ExcelUpload}
                  alt={"업로드"}
                  width={15}
                  height={15}
                  className={"mr-2"}
                />
                엑셀업로드
              </Button>
              <Button
                color={"main"}
                fill
                height={32}
                width={120}
                onClick={() => setAddOpen(true)}
              >
                <Image
                  src={Plus}
                  alt={"추가"}
                  width={16}
                  height={16}
                  className={"mr-1"}
                />
                사업장추가
              </Button>
            </div>
          </div>

          <CenterPopup
            isOpen={addOpen}
            onClose={addClose}
            title="사업장 추가"
            Content={() => <AddBusiness ref={businessRef} />}
            buttons={AddButtons}
          />
          <CenterPopup
            isOpen={excelOpen}
            onClose={excelClose}
            title="엑셀업로드"
            Content={AddExcelUpload}
            contentProps={{ setExcelData }}
            buttons={ExcelButton}
          />
          <SlidePopup
            isOpen={slideOpen}
            onClose={slideClose}
            title={"상세보기"}
            rowData={rowData}
            onDelete={slideDelete}
            Content={(props) => (
              <ParkingDetailList
                {...props}
                rowData={rowData}
                onSave={slideSave}
              />
            )}
            buttons={SlideButtons.map((button) => ({ ...button }))}
          />
          <div className={"mt-4"}>
            <ListContainer
              items={getPaginatedData()}
              getItemId={(item) => item.irpk}
              columns={columns}
              withCheckbox={true}
              selectedItems={selectedItems}
              selectedRow={selectedRow}
              onSelectionChange={setSelectedItems}
              onRowClick={(item) => {
                setSelectedRow(item.irpk);
                setSlideOpen(true);
                setRowData(item);
                document.body.style.overflow = "hidden";
              }}
            />
            {totalPages > 0 && (
              <Pagination
                maxNumber={totalPages}
                currentPage={currentPage + 1}
                onChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            )}
          </div>
        </div>
    </div>
  );
}
