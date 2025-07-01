"use client"
import React, { useEffect, useState} from "react";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Excel from "../../../../../public/images/icon/excel-icon.png";
import Plus from "../../../../../public/images/icon/plus-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import {cargoInsuList, deleteClaimData, deleteGroup, getClaim} from "@/app/(Navigation-Group)/action";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {ButtonConfig,  UptClaim, ParamType, CargoInsuType} from "@/@types/common";
import AccidentDetailList from "@/app/components/pageComponents/cargoInsu/accidentDetail";

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
    const [data, setData] = useState<CargoInsuType[]>([]);
    const [rowData, setRowData] = useState<CargoInsuType | null>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<ParamType>({
        bpk: 6,
        condition: "wCell",
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

    const closePopup = () => {
        setIsOpen(false);
        setSelectedRow(null);
        document.body.style.removeProperty('overflow');
    };

    const handleSave = async (data: UptClaim) => {
        try {
            if (isNew) {
                window.confirm('등록하시겠습니까?')
                console.log('신규등록 데이터:', data);
            } else {
                if(window.confirm('저장하시겠습니까?')){
                    data.job = 'UPT';
                    data.requestDate = dayjs(data.requestDate).format('YYYY-MM-DD HH:mm:ss');
                    data.accidentDateTime = dayjs(data.accidentDateTime).format('YYYY-MM-DD HH:mm:ss');

                    let result = await updateClaimData(data);

                    if (result[0].code === '200') {
                        let reload = await getClaim(param);
                        setData(reload || []);
                        closePopup();
                    } else {
                        alert('서비스 오류')
                    }
                }else {
                    return;
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleNewEntry = () => {
        setIsNew(true);
        setSelectedRow(null);
        setRowData();
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
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        console.log(selectedItems);
        if (window.confirm(`선택한 ${selectedItems.length}개의 항목을 삭제하시겠습니까?`)) {
            let result = await deleteGroup(Array.from(selectedItems));
            if(result.code === '200') {
                setSelectedItems([]);
                let reload = await getClaim(param);
                setData(reload);
                closePopup();
            }else {
                alert("서비스 오류입니다.");
            }
        }
    };

    //삭제버튼 클릭
    const handleDelete = async (rowData : CargoInsuType) => {
        try{
                let result = await deleteClaimData(rowData);
                if(result.code === '200'){
                    let reload = await getClaim(param);
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
        const result = await cargoInsuList(param);
        setData(result || []);
        setCurrentPage(0);
    }
    useEffect(() => {
        onSearchClick();
    }, []);
    // 사고접수 리스트 컬럼
    const columns: ColumnDefinition<CargoInsuType>[] = [
        {
            key: 'id',
            header: '고유번호',
            defaultValue: '-'
        },
        {
            key: 'accidentDate',
            header: '사고일자',
            render: (item) => item.accidentDate
                ? dayjs(item.accidentDate).format('YYYY-MM-DD')
                : '-'
        },
        {
            key: 'riderName',
            header: '기사이름',
        },
        {
            key: 'damagedGoods',
            header: '피해물품'
        },
        {
            key: 'reportNumber',
            header: '접수번호'
        },
        {
            key: 'status',
            header: '상태'
        },
        {
            key: 'estimatedAmount',
            header: '추산금액(종결금액)',
            render: (item) => item.estimatedAmount
                ? `${item.estimatedAmount.toLocaleString()}원`
                : '-'
        }
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
                        <option value={'riderName'}>기사 이름</option>
                        <option value={'reportNumber'}>접수 번호</option>
                        <option value={'damagedGoods'}>피해 물품</option>
                        <option value={'receiverContact'}>협의 대상자 이름</option>
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
                <Button color={"green"} height={32} width={120} className={'ml-5'}>
                    <Image src={Excel} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-between'}>
                    <div className={'text-lg font-light mb-6'}>사고리스트</div>
                    <div className={'flex justify-end space-x-4'}>
                        <Button color={"red"} fill={false} height={32} width={120} onClick={handleDeleteGroup}>
                            삭제
                        </Button>
                        <Button color={"main"} fill height={32} width={120} onClick={handleNewEntry}>
                            <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                            신규등록
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
                        getItemId={(item) => item.id}
                        columns={columns}
                        selectedRow={selectedRow}
                        selectedItems={selectedItems}
                        onSelectionChange={setSelectedItems}
                        onRowClick={(item) => {
                            setIsNew(false);
                            setSelectedRow(item.id);
                            setIsOpen(true);
                            setRowData(item);
                            document.body.style.overflow = 'hidden';
                        }}
                    />
                    {totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage + 1}
                            onChange={(page) => {setCurrentPage(page);}}
                            maxNumber={totalPages}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
