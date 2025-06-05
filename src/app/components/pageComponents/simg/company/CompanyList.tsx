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
import {useNotifications} from "@/context/NotificationContext";
import cn from "classnames";
import ReFresh from "@/assets/images/icon/refresh-icon.png";
import {CompanyListProps, CompanyListRequest, CompanyListResponseItem} from "@/app/lib/simg1DayApi/company/types";
import {useCompanyList} from "@/app/lib/hooks/simg1Day/company/useCompanyList";
import {CompanyColumn} from "@/app/components/pageComponents/simg/company/config";






export default function CompanyList({ bpk, id, subIdYn }: CompanyListProps) {
    const [param, setParam] = useState<CompanyListRequest>({
        job: 'LIST',
        bpk,
        id,
        listType: 'companyList',
        condition: 'bName',
        text: '',
        statusCode: 'all',
        startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [rowData, setRowData] = useState<CompanyListResponseItem | undefined>();
    // ✅ React Query 데이터 패칭
    const { data, refetch } = useCompanyList(param);

    const closePopup = () => {
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

    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                {/* 검색/필터 UI */}
                <div className={'flex items-center'}>
                    {/* 검색 조건 */}
                        <div className='flex items-center space-x-4 ml-4'>
                            <div className={'text-gray-700 font-medium'}>검색조건</div>
                            <select
                                className={'w-[200px]'}
                                onChange={(e) => setParam((prev) => ({...prev, condition: e.target.value}))}>
                                <option value={'bName'}>업체명</option>
                                <option value={'uName'}>성명</option>
                                <option value={'uCell'}>연락처</option>
                                <option value={'bNumber'}>사업자번호</option>
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
                    <Button color="main" width={100} height={35} fill className={cn(subIdYn === 'N' ? "rounded-tl-none rounded-bl-none" : "ml-4")} onClick={() => onSearchClick()}>
                        조회
                    </Button>
                    <button className='ml-4' onClick={() => refetch()}>
                        <Image src={ReFresh} alt={'새로고침'} width={20} />
                    </button>
                </div>
                <div className='flex space-x-4 items-center'>

                            <Button color={"green"} height={32} width={120} className={'ml-5'} onClick={()  => onClickExcel(hiparkingAccidentColumns,'accident', insuData, '투루카_사고_리스트.xlsx')}>
                                <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                                엑셀다운
                            </Button>
                </div>
            </div>

            {/* 리스트 */}
            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <CheckboxContainer
                    items={getPaginatedData()}
                    getItemId={(item) => item.pspk}
                    columns={CompanyColumn}
                    selectedRow={selectedRow}
                    selectedItems={selectedItems}
                    onSelectionChange={setSelectedItems}
                    onRowClick={(item) => {
                        setSelectedRow(item.pspk);
                        setRowData(item);
                        document.body.style.overflow = 'hidden';
                    }}
                />
                {insuData.length > 0 && (
                    <Pagination maxNumber={Math.ceil(insuData.length / itemsPerPage)} currentPage={currentPage + 1} onChange={(page) => setCurrentPage(page)} />
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
        </>
    );
}
