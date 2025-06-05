"use client"
import React, { useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {
    ButtonConfig,
} from "@/@types/common";
import {hiparkingAccidentColumns} from "@/config/data";
import {onClickExcel} from "@/app/lib/onClickExcel";
import {useDepositList} from "@/app/lib/hooks/simg1Day/deposit/useDepositList";
import {
    DepositListProps,
    DepositListRequest,
    DepositListResponseItem,
} from "@/app/lib/simg1DayApi/deposit/types";
import DepositPopup from "@/app/components/pageComponents/simg/depositPopup";
import {useSession} from "next-auth/react";
import SlidePopup from "@/app/components/popup/SlidePopup";
import DepositListDetail from "@/app/components/pageComponents/simg/deposit/DepositListDetail";
import {useNotifications} from "@/context/NotificationContext";
import {useConfirmAction} from "@/app/lib/hooks/simg1Day/deposit/useConfirmAction";
import cn from "classnames";
import {AdminColumns, UserColumns} from "@/app/components/pageComponents/simg/deposit/config";
import ReFresh from "@/assets/images/icon/refresh-icon.png";
import {useDepositBalance} from "@/app/lib/hooks/simg1Day/deposit/useDepositBalance";






export default function DepositPage({ bpk, id, subIdYn }: DepositListProps) {
    const {data : session} = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [param, setParam] = useState<DepositListRequest>({
        job: 'LIST',
        bpk,
        id,
        listType: 'depositRequest',
        condition: 'uCell',
        text: '',
        statusCode: 'all',
        startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
    });
    const { showAlert, resetNotiThen } = useNotifications();
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [rowData, setRowData] = useState<DepositListResponseItem | undefined>();
    // ✅ React Query 데이터 패칭
    const { data, refetch } = useDepositList(param);
    const { data : balance, refetch:refetchBalance } = useDepositBalance(bpk,id);

    // ✅ 공통 handleConfirm 함수 생성
    const { handleConfirm } = useConfirmAction({
        refetch,
        showAlert,
        resetNotiThen,
    });

    const closePopup = () => {
        setIsOpen(false);
        setSelectedRow(null);
        document.body.style.removeProperty('overflow');
    };

// 리스트 데이터는 항상 data.data
    const insuData = data?.data || [];



    const popupButtons: ButtonConfig[] = [
            {
                label: "편집",
                onClick: () => {
                },
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
    console.log(data)
    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                {/* 검색/필터 UI */}
                <div className={'flex items-center'}>
                    {/* 상태 필터 */}
                    <select className={'w-[200px]'} onChange={(e) => setParam((prev) => ({ ...prev, statusCode: e.target.value }))}>
                        <option value="all">전체</option>
                        <option value="READY">접수</option>
                        <option value="COMPLETED">승인</option>
                        <option value="CANCEL">취소</option>
                    </select>

                    {/* 기간 필터 */}
                    <div className={'text-gray-700 font-medium pt-1 ml-2 flex items-center space-x-4'}>
                        <div>기간</div>
                        <DayTerm type={'day'} setParam={setParam} sDay={new Date(param.startDate)} eDay={new Date(param.endDate)} />
                    </div>

                    {/* 검색 조건 */}
                    {
                        subIdYn === 'N' &&
                        <div className='flex items-center space-x-4 ml-4'>
                            <div className={'text-gray-700 font-medium'}>검색조건</div>
                            <select
                                className={'w-[200px]'}
                                onChange={(e) => setParam((prev) => ({...prev, condition: e.target.value}))}>
                                <option value={'uCell'}>연락처</option>
                            </select>
                            <input
                                type={'text'}
                                placeholder={'검색조건 설정 후 검색해주세요'}
                                className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                                onChange={(e) => setParam((prev) => ({...prev, text: e.target.value}))}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') {
                                        onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
                                    }
                                }}
                            />
                        </div>
                    }
                    <Button color="main" width={100} height={35} fill className={cn(subIdYn === 'N' ? "rounded-tl-none rounded-bl-none" : "ml-4")} onClick={() => onSearchClick()}>
                        조회
                    </Button>
                    <button className='ml-4' onClick={() => refetch()}>
                        <Image src={ReFresh} alt={'새로고침'} width={20} />
                    </button>
                </div>
                <div className='flex space-x-4 items-center'>
                    {
                        subIdYn === 'Y' ?
                            <>
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg shadow-sm min-w-[220px] ml-2">
                                    <div>
                                        <div className='flex space-x-2 items-center'>
                                            <p className="text-sm text-gray-500">예치금 잔액</p>
                                            <button type={'button'} onClick={() => refetchBalance()}>
                                                <Image src={ReFresh} alt={'새로고침'} width={20} />
                                            </button>
                                        </div>
                                        <p className="text-md font-semibold text-gray-900">{Number(balance).toLocaleString()}원</p>
                                    </div>
                                    <Button color={"main"} fill={true} onClick={() => setIsOpen(true)} textSize={14} width={50}
                                            height={32}>충전</Button>
                                </div>
                            </>
                            :
                            <Button color={"green"} height={32} width={120} className={'ml-5'} onClick={()  => onClickExcel(hiparkingAccidentColumns,'accident', insuData, '투루카_사고_리스트.xlsx')}>
                                <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                                엑셀다운
                            </Button>
                    }
                </div>
            </div>

            {/* 리스트 */}
            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                    <CheckboxContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.pspk}
                        columns={subIdYn === 'N' ? AdminColumns : UserColumns}
                        selectedRow={selectedRow}
                        selectedItems={selectedItems}
                        handleConfirm={(item)=> handleConfirm({item, userId : session.user.id})}
                        onSelectionChange={setSelectedItems}
                        onRowClick={(item) => {
                            setSelectedRow(item.pspk);
                            if(subIdYn !== 'Y') setIsOpen(true);
                            setRowData(item);
                            document.body.style.overflow = 'hidden';
                        }}
                    />
                {insuData.length > 0 && (
                    <Pagination maxNumber={Math.ceil(insuData.length / itemsPerPage)} currentPage={currentPage + 1} onChange={(page) => setCurrentPage(page)} />
                )}
            </div>
            {
                (subIdYn ==='N' && isOpen) &&
                <SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={"상세보기"}
                    rowData={rowData}
                    buttons={popupButtons.map(button => ({ ...button}))}
                    Content={(props) => <DepositListDetail {...props}  rowData={rowData} handleConfirm={(item)=> handleConfirm({item, userId : session.user.id})} onClose={closePopup}/>}
                />
            }
            {
                (subIdYn ==='Y' && isOpen) &&
                    <DepositPopup setIsOpen={setIsOpen} data={session.user} balance={balance}/>
            }
        </>
    );
}
