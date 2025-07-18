"use client"
import React, { useEffect, useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "../../../../../public/images/icon/excel-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import {
    deleteClaimData,
    deleteGroup,
    getClaim, getError,
    updateCommon
} from "@/app/(Navigation-Group)/action";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {ButtonConfig, ClaimRowType, UptClaim, ParamType, ErrorType} from "@/@types/common";
import AccidentDetailList from "@/app/components/pageComponents/parking/accidentDetail";
import {hiparkingAccidentColumns, initRowData} from "@/config/data";
import {onClickExcel} from "@/app/lib/onClickExcel";
import {useNotifications} from "@/context/NotificationContext";
import ErrorDetail from "@/app/components/pageComponents/parking/errorDetail";
import { ListContainer } from '@/app/components/common/ui/input/listContainer';

interface ColumnDefinition<T> {
    key: keyof T;
    header: string;
    defaultValue?: string;
    render?: (item: T) => string | number;
}

const itemsPerPage = 15;

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [data, setData] = useState<ErrorType[]>([]);
    const {showAlert, showConfirm, resetNotiThen } = useNotifications();
    const [currentPage, setCurrentPage] = useState(0);
    const [rowData, setRowData] = useState<ErrorType>(initRowData);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<ParamType>({
        bpk: 1,
        condition: "wCell",
        endDate: dayjs().format('YYYY-MM-DD'),
        startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        text: ''
    });

    const getPaginatedData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return data.slice(startIndex, endIndex);
    }

    useEffect(() => {
        if (data.length > 0) {
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        }
    }, [data]);

    const closePopup = () => {
        setIsOpen(false);
        setSelectedRow(null);
        document.body.style.removeProperty('overflow');
    };

    const handleSave = async (data: UptClaim) => {
        try {
            if (isNew) {
                window.confirm('등록하시겠습니까?')
            } else {
                showConfirm("수정하시겠습니까?", async () => {
                    console.log(data);
                    let result = await updateCommon(data);
                    if (result.code === "200") {
                        const reload = await getError(param);
                        setData(reload || []);

                        resetNotiThen(() => {
                            showAlert("수정되었습니다.", () => {
                                closePopup();
                            });
                        })
                    } else {
                        resetNotiThen(() => {
                            showAlert("서비스 오류입니다.", () => {
                            });
                        })
                    }
                })
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleNewEntry = () => {
        setIsNew(true);
        setSelectedRow(null);
        setRowData(initRowData)
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const popupButtons: ButtonConfig[] = isNew
        ? [
            {
                label: "취소",
                onClick: closePopup,
                color: "gray",
                width: 100,
                height: 35,
            },
        ]
        : [
            {
                label: "편집",
                onClick: () => {
                },
                color: "blue",
                width: 100,
                height: 35,
            },
            {
                label: "삭제",
                onClick: () => {
                },
                color: "red",
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

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleDeleteGroup = async () => {
        if (selectedItems.length === 0) {
            showAlert('삭제할 항목을 선택해주세요.');
            return;
        }
        showConfirm(`선택한 ${selectedItems.length}개의 항목을 삭제하시겠습니까?`, async () => {
            let param2 = {
                bpk : 1,
                table : 'claimRequest',
                job : 'DEL_LIST',
                irpkList : selectedItems
            }
            let result = await deleteGroup(param2);
            if(result.code === '200') {
                setSelectedItems([]);
                let reload = await getError(param);
                setData(reload);

                resetNotiThen(() => {
                    showAlert(result.msg, () => {
                        closePopup();
                    });
                })

                closePopup();
            }else {
                alert("서비스 오류입니다.");
            }
        });
    };
// 삭제버튼 클릭
    async function handleDelete<T extends UptClaim>(rowData: T): Promise<void> {
        try {
            showConfirm('삭제하시겠습니까?', async () => {
                rowData.table = 'claimRequest';
                console.log(rowData)
                let result = await deleteClaimData(rowData);
                if(result.code === '200'){
                    let reload = await getError(param);
                    setData(reload);
                    resetNotiThen(() => {
                        showAlert("삭제되었습니다.", () => {
                            closePopup();
                        });
                    })
                }else {
                    resetNotiThen(() => {
                        showAlert("서비스 오류입니다..", () => {
                            closePopup();
                        });
                    })
                }
            });
        } catch (e) {
            console.log(e);
        }
    }


    const onSearchClick = async () => {
        const result = await getError(param);

        setData(result || []);
        setCurrentPage(0);
    }
    useEffect(() => {
        onSearchClick();
    }, []);
    // 사고접수 리스트 컬럼
    const columns: ColumnDefinition<ErrorType>[] = [
        {
            key: 'PJTcode',
            header: '주차장코드',
        },
        {
            key: 'pklName',
            header: '주차장명'
        },
        {
            key: 'wName',
            header: '접수자',
        },
        {
            key: 'wCell',
            header: '연락처',
        },
        {
            key: 'vCarNum',
            header: '차량번호'
        },
        {
            key: 'errorType',
            header: '장애구분'
        },
        {
            key: 'errorLocation',
            header: '발생위치'
        }
    ];

    return (
      <div className={"space-y-3"}>
          <div className="flex min-h-20 items-center justify-between rounded-lg border border-gray-100 bg-white px-6">
              <div className="text-base font-semibold lg:text-lg">장애리스트</div>
              <div className="flex items-center space-x-4">
                  <Button color={"green"} height={32} width={120} className={'ml-5'} onClick={()  => onClickExcel(hiparkingAccidentColumns,'accident', data, '케이엠파크_장애_리스트.xlsx')}>
                      <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                      엑셀다운
                  </Button>
              </div>
          </div>
          <div className={"rounded-lg border border-gray-100 bg-white p-6"}>
              <div className="space-y-4 lg:space-y-0">
                  {/* 기간, 검색항목 */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-5">
                      <div className="space-y-1">
                          <div className="text-sm">기간</div>
                          <DayTerm type={'day'} setParam={setParam} sDay={new Date(param.startDate)} eDay={new Date(param.endDate)} className={"w-full lg:w-[200px]"}/>
                      </div>
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-4">
                          <div className="space-y-1">
                              <div className="text-sm">검색항목</div>
                              <select
                                className="h-[35px] w-full rounded border border-gray-300 px-3 lg:w-[200px]"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setParam((prev: ParamType) => ({
                                        ...prev,
                                        condition: e.target.value,
                                    }))
                                }
                                }
                              >
                                  <option value={'wCell'}>피해자 연락처</option>
                                  <option value={'vCarNum'}>피해 차량번호</option>
                                  <option value={'pklName'}>주차장명</option>
                              </select>
                          </div>
                          <div className="flex flex-1 lg:max-w-[400px]">
                              <input
                                type="text"
                                placeholder="검색항목 설정 후 검색"
                                className="h-[35px] flex-1 rounded-l rounded-r-none border border-gray-300 px-3"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setParam((prev: ParamType) => ({
                                        ...prev,
                                        text: e.target.value,
                                    }))
                                }}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') {
                                        onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
                                    }
                                }}
                              />
                              <Button
                                color={"main"}
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
            {/*<div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 mr-2'}>기간</div>
                    <DayTerm type={'day'} setParam={setParam} sDay={new Date(param.startDate)} eDay={new Date(param.endDate)}/>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select
                        className={'w-[200px]'}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setParam((prev: ParamType) => ({
                                ...prev,
                                condition: e.target.value,
                            }))
                        }
                        }
                    >
                        <option value={'wCell'}>피해자 연락처</option>
                        <option value={'vCarNum'}>피해 차량번호</option>
                        <option value={'pklName'}>주차장명</option>
                    </select>
                    <input
                        type={'text'}
                        placeholder={'검색조건 설정 후 검색해주세요'}
                        className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setParam((prev: ParamType) => ({
                                ...prev,
                                text: e.target.value,
                            }))
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
                            }
                        }}
                    />
                    <Button
                        color={'main'}
                        width={100}
                        height={35}
                        fill
                        className={'rounded-tl-none rounded-bl-none'}
                        onClick={onSearchClick}
                    >
                        조회
                    </Button>
                </div>
                <Button color={"green"} height={32} width={120} className={'ml-5'} onClick={()  => onClickExcel(hiparkingAccidentColumns,'accident', data, '하이파킹_사고_리스트.xlsx')}>
                    <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>
*/}
            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-end'}>
                        <Button color={"red"} fill={false} height={32} width={120} onClick={handleDeleteGroup}>
                            삭제
                        </Button>
                        {/*<Button color={"main"} fill height={32} width={120} onClick={handleNewEntry}>
                            <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                            신규등록
                        </Button>*/}
                </div>
                <SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={isNew ? "신규 등록" : "상세보기"}
                    rowData={rowData}
                    onDelete={handleDelete}
                    Content={(props) => <ErrorDetail {...props} isNew={isNew} rowData={rowData} onSave={handleSave}/>}
                    buttons={popupButtons.map(button => ({ ...button}))}
                />
                <div className={'mt-4'}>
                    <ListContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.irpk}
                        columns={columns}
                        withCheckbox={true}
                        selectedRow={selectedRow}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        onRowClick={(item) => {
                            setIsNew(false);
                            setSelectedRow(item.irpk);
                            setIsOpen(true);
                            setRowData(item);
                            document.body.style.overflow = 'hidden';
                        }}
                    />
                    {totalPages > 0 && (
                        <Pagination
                            maxNumber={totalPages}
                            currentPage={currentPage + 1}
                            onChange={(page) => {setCurrentPage(page);}}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
