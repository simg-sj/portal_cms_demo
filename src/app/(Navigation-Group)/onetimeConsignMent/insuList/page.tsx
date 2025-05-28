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
    InsuFormData
} from "@/@types/common";
import AccidentDetailList from "@/app/components/pageComponents/rentCar/rcAccidentDetail";
import {hiparkingAccidentColumns, initRcRowData, modeString} from "@/config/data";
import {onClickExcel} from "@/app/lib/onClickExcel";
import {useNotifications} from "@/context/NotificationContext";
import {turuApi1002} from "@/app/(Navigation-Group)/turu/action";
import {useSession} from "next-auth/react";
import CenterPopup from "@/app/components/popup/CenterPopup";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";

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
    const [param, setParam] = useState<RcParamType>({
        bpk: 0,
        condition: "insuNum",
        endDate: dayjs().format('YYYY-MM-DD'),
        startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        text: '',
        statusCode : 'all',
        isConfirmed : 'all'
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
                let reload = await turuApi1002(param);
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

    const onSearchClick = async () => {
        const result = await turuApi1002(param);

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
    const columns: ColumnDefinition<Simg1DayType>[] = [
        {
            key: 'insuNum',
            header: '접수번호',
        },
        {
            key: 'partnerName',
            header: '업체명',
        },
        {
            key: 'partnerName',
            header: '담당자 연락처',
        },
        {
            key: 'vin',
            header: '차대번호'
        },
        {
            key: 'carType',
            header: '차종'
        },
        {
            key: 'carNum',
            header: '차량번호'
        },
        {
            key: 'status',
            header: '상태',
        },
        {
            key: 'pNo',
            header: '증권번호',
        },
        {
            key: 'insuTerm',
            header: '보험기간',
            render: (item) => item.insuTerm
                ? dayjs(item.insuTerm).format('YYYY-MM-DD')
                : '-'
        },
        {
            key: 'premium',
            header: '보험료',
        },
        {
            key: 'policy',
            header: '증권',
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
                        <option value={'UNDERWRITE'}>심사중</option>
                        <option value={'ACCEPTED'}>승인</option>
                        <option value={'REJECTED'}>거절</option>
                        <option value={'ERROR'}>에러</option>
                    </select>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>기간</div>
                    <DayTerm type={'day'} setParam={setParam} sDay={new Date(param.startDate)} eDay={new Date(param.endDate)}/>
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
                        <option value={'insuNum'}>차대번호</option>
                        <option value={'inCargePhone'}>차량번호</option>
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
                    <div className='flex space-x-4 items-center'>
                    {
                        data?.user?.subIdYn === 'Y' ?
                            <>
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg shadow-sm min-w-[220px] ml-2">
                                    <div>
                                        <p className="text-sm text-gray-500">예치금 잔액</p>
                                        <p className="text-md font-semibold text-gray-900">100,000원</p>
                                    </div>
                                    <Button color={"main"} fill={true} onClick={() => setIsOpen(true)} textSize={14} width={50}
                                            height={32}>충전</Button>
                                </div>
                                <div>
                                    예치금 잔액 : 100,000원
                                </div>
                                <Button color={"main"} fill height={32} width={120} onClick={() => setIsOpen(true)}>
                                    충전하기
                                </Button>
                            </>
                            :
                            <Button color={"green"} height={32} width={120} className={'ml-5'} onClick={()  => onClickExcel(hiparkingAccidentColumns,'accident', insuData, '투루카_사고_리스트.xlsx')}>
                                <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                                엑셀다운
                            </Button>
                    }
                </div>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-between'}>
                    <div className={'text-lg font-light mb-6'}>신청현황</div>
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
            {
                isOpen &&
                <DepositPopup setIsOpen={setIsOpen}/>
            }
        </>
    )
}
