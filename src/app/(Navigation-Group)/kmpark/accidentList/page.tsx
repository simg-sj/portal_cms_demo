"use client"
import React, {useEffect, useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import Plus from "@/assets/images/icon/plus-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import AccidentDetailList from "@/app/components/pageComponents/parking/accidentDetail";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import {getClaim, updateClaimData} from "@/app/(Navigation-Group)/action";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {ButtonConfig, ClaimRowType, UptClaim} from "@/@types/common";

interface ColumnDefinition<T> {
    key: keyof T;
    header: string;
    defaultValue?: string;
    render?: (item: T) => string | number;
}

interface ClaimType {
    irpk: number;
    index?: number;
    insuNum: string;
    accidentDate: string;
    closingAmt: number;
    pklAddress: string;
    wName: string;
    wCell: string;
    vCarNum: string;
}

interface ParamType {
    bpk: number;
    condition: string;
    endDate: string;
    startDate: string;
    text: string;
}

const itemsPerPage = 15;

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [data, setData] = useState<ClaimRowType[]>([]);
    const [rowData, setRowData] = useState<ClaimRowType | null>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<ParamType>({
        bpk : 3,
        condition: "wCell",
        endDate: "",
        startDate: "",
        text : ''
    });

    const getPaginatedData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    useEffect(() => {
        if(data.length > 0) {
            setTotalPages(Math.ceil(data.length / itemsPerPage));
        }
    }, [data]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const closePopup = () => {
        setIsOpen(false);
        setSelectedRow(null);
        document.body.style.removeProperty('overflow');
    };

    const handleSave = async (data: UptClaim) => {
        try{
            if (isNew) {
                window.confirm('등록하시겠습니까?')
                console.log('신규등록 데이터:', data);
            } else {
                window.confirm('저장하시겠습니까?')
                data.job = 'UPT';
                data.requestDate = dayjs(data.requestDate).format('YYYY-MM-DD HH:mm:ss');
                data.accidentDateTime = dayjs(data.accidentDateTime).format('YYYY-MM-DD HH:mm:ss');

                let result = await updateClaimData(data);

                if(result[0].code === '200'){

                    closePopup();
                }else {
                    alert('서비스 오류')
                }
            }
        }catch(e){
            console.log(e);
        }
    };

    const handleNewEntry = () => {
        setIsNew(true);
        setSelectedRow(null);
        setRowData()
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
                onClick: closePopup,
                color: "gray",
                width: 100,
                height: 35,
            },
        ];

    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const handleDeleteGroup = () => {
        if (selectedItems.size === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        if (window.confirm(`선택한 ${selectedItems.size}개의 항목을 삭제하시겠습니까?`)) {
            console.log('삭제할 항목 인덱스:', Array.from(selectedItems));
            return;
        }
    };

    const onSearchClick = async () => {
        const result = await getClaim(param);
        setData(result || []);
        setCurrentPage(0);
    }

    useEffect(()=>{
        onSearchClick();
    },[])

    // 사고접수 리스트 컬럼
    const columns: ColumnDefinition<ClaimRowType>[] = [
        {
            key: 'irpk',
            header: '고유번호',
            defaultValue: '-'
        },
        {
            key: 'insuNum',
            header: '접수번호'
        },
        {
            key: 'accidentDateTime',
            header: '사고일',
        },
        {
            key: 'closingAmt',
            header: '지급보험금',
            render: (item) => item.closingAmt
                ? `${item.closingAmt.toLocaleString()}원`
                : '-'
        },
        {
            key: 'pklName',
            header: '사고장소'
        },
        {
            key: 'wName',
            header: '피해자'
        },
        {
            key: 'wCell',
            header: '피해자연락처'
        },
        {
            key: 'vCarNum',
            header: '차량번호'
        },
    ];



    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 mr-2'}>기간</div>
                    <DayTerm type={'day'} setParam={setParam} sDay={new Date()} eDay={new Date()}/>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select
                        className={'w-[200px]'}
                        onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                            setParam((prev: ParamType) => ({
                                ...prev,
                                condition: e.target.value,
                            }))}
                        }
                    >
                        <option value={'wCell'}>피해자 연락처</option>
                        <option value={'vCarType'}>피해 차량번호</option>
                        <option value={'pklName'}>주차장명</option>
                    </select>
                    <input
                        type={'text'}
                        placeholder={'검색조건 설정 후 검색해주세요'}
                        className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                            setParam((prev: ParamType) => ({
                                ...prev,
                                text: e.target.value,
                            }))
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
                <Button color={"green"} height={32} width={120} className={'ml-5'}>
                    <Image src={Excel.src} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-end space-x-4'}>
                    <Button color={"red"} fill={false} height={32} width={120} onClick={handleDeleteGroup}>
                        삭제
                    </Button>
                    <Button color={"main"} fill height={32} width={120} onClick={handleNewEntry}>
                        <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                        신규등록
                    </Button>
                </div>
                <SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={isNew ? "신규 등록" : "상세보기"}
                    Content={(props) => <AccidentDetailList {...props} isNew={isNew} rowData={rowData || {}} onSave={handleSave}/>}
                    buttons={popupButtons}
                />
                <div className={'mt-4'}>
                    <CheckboxContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.irpk}
                        columns={columns}
                        selectedRow={selectedRow}
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
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </>
    )
}