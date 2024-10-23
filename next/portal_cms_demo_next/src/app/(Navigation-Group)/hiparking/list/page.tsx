/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 11:05:37
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 11:07:08
 * @FilePath: portal_cms_demo_next/src/app/(Navigation-Group)/hiparking/list/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
"use client"
import React, {useState} from "react";
import DayTerm from "@/app/components/common/ui/dayTerm";
import Button from "@/app/components/common/ui/button";
import Image from "next/image";
import Excel from "@/assets/images/icon/excel-icon.png";
import {listData} from "@/config/data";
import Plus from "@/assets/images/icon/plus-icon.png";
import SlidePopup from "@/app/components/popup/SlidePopup";
import HiparkingList from "@/app/components/page/hiparking/list";
import Checkbox from "@/app/components/common/ui/checkbox";
import Pagination from "@/app/components/common/ui/pagination";

interface ButtonConfig {
    label: string;
    onClick: () => void;
    color: "main" | "sub" | "blue" | "green" | "red" | "gray" | "dark-gray";
    fill?: boolean;
    rounded?: boolean;
    textSize?: number;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
}


export default function Page() {
    const [isOpen, setIsOpen] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

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

    const handleRowClick = (index: number) => {
        setIsNew(false);
        setSelectedRow(index);
        setIsOpen(true);
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

    const columns = [
        "고유번호", "접수번호",	"접수일",	"사고일", "지급보험금",	"사고장소",	"피해자명",	"피해자연락처", "차량번호"
    ];

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = new Set(listData.map(item => item.ppk));
            setSelectedItems(allIds);
        } else {
            setSelectedItems(new Set());
        }
    };

    const toggleSelectItem = (id: number) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }
        setSelectedItems(newSelectedItems);
    };

    const isAllSelected = selectedItems.size === listData.length;
    const isSomeSelected = selectedItems.size > 0 && selectedItems.size < listData.length;

    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 mr-2'}>기간</div>
                    <DayTerm/>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select className={'w-[200px]'}>
                        <option>피해자 연락처</option>
                        <option>피해 차량번호</option>
                        <option>주차장명</option>
                    </select>
                    <input type={'text'} placeholder={'검색조건 설정 후 검색해주세요'}
                           className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}/>
                    <Button color={'main'} width={100} height={35} fill
                            className={'rounded-tl-none rounded-bl-none'}>조회</Button>
                </div>
                <Button color={"green"} height={36} width={120} className={'ml-5'}>
                    <Image src={Excel.src} alt={'다운로드'} width={17} height={17} className={'mr-2'}/>
                    엑셀다운
                </Button>
            </div>

            <div className={'border border-gray-100 p-6 rounded-lg bg-white mt-5'}>
                <div className={'flex justify-between'}>
                    <Button color={"main"} fill height={36} width={120} onClick={handleNewEntry}>
                        <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                        신규등록
                    </Button>
                    <Button color={"red"} fill={false} height={36} width={120}>
                        삭제
                    </Button>
                </div>
                <SlidePopup
                    isOpen={isOpen}
                    onClose={closePopup}
                    title={isNew ? "신규 등록" : "상세보기"}
                    Content={(props) => <HiparkingList {...props} isNew={isNew} />}
                    buttons={popupButtons}
                />
                <div className={'mt-4'}>
                        <table className="w-full">
                        <thead>
                        <tr>
                            <th>
                                <Checkbox
                                    checked={isAllSelected}
                                    indeterminate={isSomeSelected}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            {columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {listData.map(item => (
                            <tr key={item.ppk} className={`cursor-pointer ${selectedRow === item.ppk ? 'bg-main-lighter' : 'hover:bg-main-lighter'}`} onClick={() => handleRowClick(item.ppk)}>
                                <td onClick={event => event.stopPropagation()}>
                                    <Checkbox
                                        checked={selectedItems.has(item.ppk)}
                                        onChange={() => toggleSelectItem(item.ppk)}
                                    />
                                </td>
                                <td>{item.ppk}</td>
                                <td>{item.irpk}</td>
                                <td>{item.createdYMD}</td>
                                <td>{item.accidentDate}</td>
                                <td>{item.closingAmt}</td>
                                <td>{item.accidentLocation}</td>
                                <td>{item.wName}</td>
                                <td>{item.wCell}</td>
                                <td>{item.vCarNum}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination maxNumber={10} onChange={(page) => console.log(`Page changed to ${page + 1}`)} />
                </div>
            </div>
        </>
)
}