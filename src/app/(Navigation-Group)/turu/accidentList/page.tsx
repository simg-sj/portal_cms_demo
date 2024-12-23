"use client"
import React, {useCallback, useEffect, useState} from "react";
import DayTerm from "@/app/components/common/ui/dayTerm";
import Button from "@/app/components/common/ui/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import Plus from "@/assets/images/icon/plus-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import {
    deleteClaimData, deleteGroup,
    getClaim,
    getImage,
    getRcAccidentList,
    rcPortalRoute,
} from "@/app/(Navigation-Group)/action";
import {CheckboxContainer} from "@/app/components/common/ui/checkboxContainer";
import {
    ButtonConfig,
    ParamType,
    rcAccidentType, rcAccidentRowType,
} from "@/@types/common";
import AccidentDetailList from "@/app/components/pageComponents/parking/accidentDetail";

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
    const [data, setData] = useState<rcAccidentType[]>([]);
    const [rowData, setRowData] = useState<rcAccidentRowType | null>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<ParamType>({
        bpk: 4,
        condition: "partnerName",
        endDate: dayjs().format('YYYY-MM-DD'),
        startDate: dayjs().format('YYYY-MM-DD'),
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const closePopup = () => {
        setIsOpen(false);
        setSelectedRow(null);
        document.body.style.removeProperty('overflow');
    };

    const handleSave = async (data: rcAccidentRowType) => {
       try {
                if(window.confirm('저장하시겠습니까?')){
                    data.job = 'UPT';
                    data.accidentDate = dayjs(data.accidentDate).format('YYYY-MM-DD HH:mm:ss');
                    data.arrivalETA = dayjs(data.arrivalETA).format('YYYY-MM-DD');
                    console.log(data);
                    let result = await rcPortalRoute(data);
                    console.log(result)
                    if (result.code === '200') {
                        let reload = await getRcAccidentList(param);
                        setData(reload || []);
                        closePopup();
                    } else {
                        alert('서비스 오류')
                    }
                }else {
                    return;
                }

        } catch (e) {
            console.log(e);
        }
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

    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const handleDeleteGroup = async () => {
        if (selectedItems.size === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        if (window.confirm(`선택한 ${selectedItems.size}개의 항목을 삭제하시겠습니까?`)) {
            console.log('삭제할 항목 인덱스:', Array.from(selectedItems));
            let result = await deleteGroup(selectedItems);
            if(result.code === '200') {
                let reload = await getRcAccidentList(param);
                setData(reload);
                closePopup();
            }else {
                alert("서비스 오류입니다.");
            }
        }
    };

    //삭제버튼 클릭
    const handleDelete = async (rowData : rcAccidentRowType) => {
        try{
            rowData.accidentDate = dayjs(rowData.accidentDate).format('YYYY-MM-DD HH:mm:ss');
            rowData.arrivalETA = dayjs(rowData.arrivalETA).format('YYYY-MM-DD');
            rowData.job = 'DELETE';
            let result = await rcPortalRoute(rowData);
            if(result.code === '200'){
                let reload = await getRcAccidentList(param);
                setData(reload);
                closePopup();
            }else {
                alert("서비스 오류입니다.");
            }
        }catch(e){
            console.log(e);
        }
    };

    const onSearchClick = async () => {
        const result = await getRcAccidentList(param);
        setData(result || []);
        setCurrentPage(0);
    }
    useEffect(() => {
        onSearchClick();
    }, []);

    // 사고접수 리스트 컬럼
    const columns: ColumnDefinition<rcAccidentType>[] = [
        {
            key: 'rcPk',
            header: '고유키',
        },
        {
            key: 'partnerName',
            header: '제휴사명',
        },
        {
            key: 'carNum',
            header: '차량번호'
        },
        {
            key: 'carType',
            header: '차종',
        },
        {
            key: 'accidentDate',
            header: '사고일시',
            render: (item) => item.accidentDate
                ? dayjs(item.accidentDate).format('YYYY-MM-DD HH:mm')
                : '-'
        },
    ];


    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
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
                        <option value={'partherName'}>제휴사명</option>
                        <option value={'carNum'}>차량번호</option>
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
                <Button color={"green"} height={36} width={120} className={'ml-5'}>
                    <Image src={Excel.src} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-between'}>
                    <div className={'text-xl font-light mb-6'}>사고리스트</div>
                    <div className={'flex justify-end space-x-4'}>
                        <Button color={"red"} fill={false} height={36} width={120} onClick={handleDeleteGroup}>
                            삭제
                        </Button>
                    </div>
                </div>
                <SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={isNew ? "신규 등록" : "상세보기"}
                    rowData={rowData}
                    onDelete={handleDelete}
                    Content={(props) => <AccidentDetailList {...props} isNew={isNew} rowData={rowData} onSave={handleSave}/>}
                    buttons={popupButtons}
                />
                <div className={'mt-4'}>
                    <CheckboxContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.rcPk}
                        columns={columns}
                        selectedRow={selectedRow}
                        onSelectionChange={setSelectedItems}
                        onRowClick={(item) => {
                            setIsNew(false);
                            setSelectedRow(item.rcPk);
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