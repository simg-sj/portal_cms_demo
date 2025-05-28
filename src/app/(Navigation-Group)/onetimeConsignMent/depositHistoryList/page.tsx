"use client"
import React, { useEffect, useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import {
    deleteClaimData,
    deleteGroup,
    updateCommon
} from "@/app/(Navigation-Group)/action";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {
    ButtonConfig,
    UptClaim,
    rcAccidentType,
    rcAccidentRowType,
    RcParamType,
    Simg1DayType,
    Simg1DayDeposit, Simg1DaySearch
} from "@/@types/common";
import AccidentDetailList from "@/app/components/pageComponents/rentCar/rcAccidentDetail";
import {hiparkingAccidentColumns, initRcRowData} from "@/config/data";
import {onClickExcel} from "@/app/lib/onClickExcel";
import {useNotifications} from "@/context/NotificationContext";
import {turuApi1002} from "@/app/(Navigation-Group)/turu/action";
import {useSession} from "next-auth/react";
import {simg1TimeDeposit} from "@/app/(Navigation-Group)/onetimeConsignMent/action";

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
    const {data} = useSession();
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [insuData, setInsuData] = useState<rcAccidentRowType[]>([]);
    const {showAlert, showConfirm, resetNotiThen } = useNotifications();
    const [currentPage, setCurrentPage] = useState(0);
    const [rowData, setRowData] = useState<rcAccidentRowType>(initRcRowData);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<Simg1DaySearch>({
        bpk: 0,
        condition: "bName",
        endDate: dayjs().format('YYYY-MM-DD'),
        startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        text: '',
        statusCode : 'all',
    });

    const getPaginatedData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return insuData.slice(startIndex, endIndex);
    }

    useEffect(() => {
        if (insuData.length > 0) {
            setTotalPages(Math.ceil(insuData.length / itemsPerPage));
        }
    }, [data]);

    const closePopup = () => {
        setIsOpen(false);
        setSelectedRow(null);
        document.body.style.removeProperty('overflow');
    };

    /*const handleSave = async (data: UptClaim) => {
        try {
            if (isNew) {
                window.confirm('등록하시겠습니까?')
            } else {
                showConfirm("수정하시겠습니까?", async () => {
                    let result = await updateCommon(data);
                    if (result.code === "200") {
                        const reload = await turuApi1002(param);
                        setInsuData(reload || []);

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
    };*/


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
                bpk : 4,
                table : 'rcAccident',
                job : 'DEL_LIST',
                irpkList : selectedItems
            }
            let result = await deleteGroup(param2);
            if(result.code === '200') {
                setSelectedItems([]);
                let reload = await simg1TimeDeposit(param);
                setInsuData(reload);

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
   /* async function handleDelete<T extends UptClaim>(rowData: T): Promise<void> {
        try {
            showConfirm('삭제하시겠습니까?', async () => {
                rowData.table = 'rcAccident';
                console.log(rowData)
                let result = await deleteClaimData(rowData);
                if(result.code === '200'){
                    let reload = await turuApi1002(param);
                    setInsuData(reload);
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
    }*/


    const onSearchClick = async () => {
        const result = await simg1TimeDeposit(param);

        setInsuData(result || []);
        setCurrentPage(0);
    }
    useEffect(() => {
        onSearchClick();
    }, []);

    useEffect(() => {
        if (data?.user?.bpk) {
            setParam((prev: RcParamType) => ({
                ...prev,
                bpk : data?.user?.bpk
            }))
        }
    }, [data]);
    
    // 사고접수 리스트 컬럼
    const columns: ColumnDefinition<Simg1DayDeposit>[] = [
        {
            key: 'insuNum',
            header: '접수번호',
        },
        {
            key: 'bName',
            header: '업체명',
        },
        {
            key: 'bNumber',
            header: '사업자번호',
        },
        {
            key: 'requestDate',
            header: '신청일자',
            render: (item) => item.requestDate
                ? dayjs(item.requestDate).format('YYYY-MM-DD')
                : '-'
        },
        {
            key: 'addDeposit',
            header: '신청 금액'
        },
        {
            key: 'status',
            header: '신청 현황',
        },
        {
            key: 'status',
            header: '예치금 승인',
        }
    ];


    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-2'}>상태</div>
                    <select
                        className={'w-[200px]'}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setParam((prev: RcParamType) => ({
                                ...prev,
                                statusCode: e.target.value,
                            }))
                        }
                        }
                    >
                        <option value={'all'}>전체</option>
                        <option value={'READY'}>접수</option>
                        <option value={'COMPLETED'}>승인</option>
                        <option value={'CANCEL'}>취소</option>
                    </select>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 flex items-center space-x-4'}>
                        <div>기간</div>
                        <DayTerm type={'day'} setParam={setParam} sDay={new Date(param.startDate)} eDay={new Date(param.endDate)}/>
                    </div>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select
                        className={'w-[200px]'}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setParam((prev: RcParamType) => ({
                                ...prev,
                                condition: e.target.value,
                            }))
                        }
                        }
                    >
                        <option value={'insuNum'}>업체명</option>
                    </select>
                    <input
                        type={'text'}
                        placeholder={'검색조건 설정 후 검색해주세요'}
                        className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setParam((prev: RcParamType) => ({
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
                <Button color={"green"} height={32} width={120} className={'ml-5'} onClick={()  => onClickExcel(hiparkingAccidentColumns,'accident', insuData, '투루카_사고_리스트.xlsx')}>
                    <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-between'}>
                    <div className={'text-lg font-light mb-6'}>예치금 현황</div>
                    <div className={'flex justify-end space-x-4'}>
                        <Button color={"red"} fill={false} height={32} width={120} onClick={handleDeleteGroup}>
                            삭제
                        </Button>
                        {/*<Button color={"main"} fill height={32} width={120} onClick={handleNewEntry}>
                            <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                            신규등록
                        </Button>*/}
                    </div>
                </div>
                {/*<SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={"상세보기"}
                    rowData={rowData}
                    onDelete={handleDelete}
                    Content={(props) => <AccidentDetailList {...props} isNew={isNew} rowData={rowData} onSave={handleSave}/>}
                    buttons={popupButtons.map(button => ({ ...button}))}
                />*/}
                <div className={'mt-4'}>
                    <CheckboxContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.irpk}
                        columns={columns}
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
        </>
    )
}
