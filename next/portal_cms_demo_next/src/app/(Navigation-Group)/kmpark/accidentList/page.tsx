/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 11:05:37
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-11-22 16:06:18
 * @FilePath: portal_cms_demo_next/src/app/(Navigation-Group)/kmpark/accidentList/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
"use client"
import React, {useEffect, useState} from "react";
import DayTerm from "@/app/components/common/ui/dayTerm";
import Button from "@/app/components/common/ui/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import Plus from "@/assets/images/icon/plus-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import HiparkingList from "@/app/components/pageComponents/parking/list";
import Checkbox from "@/app/components/common/ui/checkbox";
import Pagination from "@/app/components/common/ui/pagination";
import dayjs from "dayjs";
import {getClaim} from "@/app/(Navigation-Group)/hiparking/action";
import {CheckboxContainer} from "@/app/components/common/ui/checkboxContainer";

interface ClaimType {
    irpk: number;
    index: number;
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

const itemsPerPage = 15; //페이지당 항목 수

export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    // const [data, setData] = useState<[ClaimType]>();
    const [data, setData] = useState<ClaimType[]>([]);
    const [rowData, setRowData] = useState<ClaimType>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [param, setParam] = useState<ParamType>({
        bpk : 2,
        condition: "wCell",
        endDate: "",
        startDate: "",
        text : ''
    });

    const getPaginatedData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex)
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

    const handleSave = (data: any) => {
        if (window.confirm('저장하시겠습니까?')) {
            console.log('변경된 데이터:', data);
            closePopup();
        }
    };

    const handleRowClick = (idx, index: number) => {
        setIsNew(false);
        setSelectedRow(index);
        setIsOpen(true);
        setRowData(idx);
        document.body.style.overflow = 'hidden';
    };

    const handleNewEntry = () => {
        setIsNew(true);
        setSelectedRow(null);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const popupButtons: ButtonConfig[] = isNew
        ? [
            {
                label: "저장",
                onClick: () => handleSave({}),
                color: "blue",
                fill: true,
                width: 100,
                height: 35,
            },
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


    //체크박스
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const columns = [
        "고유번호", "접수번호",	"접수일",	"사고일", "지급보험금",	"사고장소",	"피해자명",	"피해자연락처", "차량번호"
    ];

    //사용자 선택 삭제
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
        const result =  await getClaim(param);
        console.log(result);

        // setData(result);
        setData(result || []);
        setCurrentPage(0);
    }

    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 mr-2'}>기간</div>
                    <DayTerm setParam={setParam} sDay={new Date()} eDay={new Date()}/>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select className={'w-[200px]'} onChange={(e : React.ChangeEvent<HTMLSelectElement>) => {
                        setParam((prev: ParamType) => ({
                            ...prev,
                            condition: e.target.value,
                        }))}
                    }>
                        <option value={'wCell'}>피해자 연락처</option>
                        <option value={'vCarType'}>피해 차량번호</option>
                        <option value={'pklName'}>주차장명</option>
                    </select>
                    <input type={'text'} placeholder={'검색조건 설정 후 검색해주세요'}
                           className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                           onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                               setParam((prev: ParamType) => ({
                                   ...prev,
                                   text: e.target.value,
                               }))
                           }}
                    />
                    <Button color={'main'} width={100} height={35} fill
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
                <div className={'flex justify-end space-x-4'}>
                    <Button color={"red"} fill={false} height={36} width={120} onClick={handleDeleteGroup}>
                        삭제
                    </Button>
                    <Button color={"main"} fill height={36} width={120} onClick={handleNewEntry}>
                        <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                        신규등록
                    </Button>
                </div>
                <SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={isNew ? "신규 등록" : "상세보기"}
                    Content={(props) => <HiparkingList {...props} isNew={isNew} rowData={rowData} />}
                    buttons={popupButtons}
                />
                <div className={'mt-4'}>
                    <CheckboxContainer
                        items={getPaginatedData()}
                        getItemId={(item) => item.irpk}
                        columns={columns}
                        renderItem={(item, isSelected, onToggle) => (
                            <tr
                                key={item.irpk}
                                className={`cursor-pointer ${selectedRow === item.irpk ? 'bg-main-lighter' : 'hover:bg-main-lighter'}`}
                                onClick={() => handleRowClick(item)}
                            >
                                <td onClick={e => e.stopPropagation()}>
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={() => onToggle(item.irpk)}
                                    />
                                </td>
                                <td>{item.irpk}</td>
                                <td>{item.insuNum}</td>
                                <td>{dayjs(item.accidentDate).format('YYYY-MM-DD')}</td>
                                <td>{item.accidentDate}</td>
                                <td>{item.closingAmt}</td>
                                <td>{item.pklAddress}</td>
                                <td>{item.wName}</td>
                                <td>{item.wCell}</td>
                                <td>{item.vCarNum}</td>
                            </tr>
                        )}
                        onSelectionChange={setSelectedItems}
                    />
                    {totalPages > 0 && (
                        <Pagination maxNumber={totalPages} onChange={handlePageChange} />
                    )}
                </div>
            </div>
        </>
    )
}