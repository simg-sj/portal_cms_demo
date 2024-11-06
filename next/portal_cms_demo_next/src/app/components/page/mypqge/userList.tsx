'use client'
import React, {useRef, useState} from "react";
import Button from "@/app/components/common/ui/button";
import Image from "next/image";
import Plus from "@/assets/images/icon/plus-icon.png";
import Checkbox from "@/app/components/common/ui/checkbox";
import {UserSet} from "@/config/data";
import Pagination from "@/app/components/common/ui/pagination";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddUser, {AddUserRef} from "@/app/components/page/hiparking/user-add";
import {CheckboxContainer} from "@/app/components/common/ui/checkboxContainer";
import DayTerm from "@/app/components/common/ui/dayTerm";
import Excel from "@/assets/images/icon/excel-icon.png";



export default function UserList() {
    //체크박스
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const columns = ["이름", "연락처", "이메일", "아이디", "권한"];

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
    //팝업
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit' >('add');
    const addUserRef = useRef<AddUserRef>(null);

    const handleAdd = async () => {
        if (addUserRef.current) {
            const isValid = await addUserRef.current.validateForm();

            if (isValid) {
                const formData = addUserRef.current.getFormData();
                if (window.confirm(`${formData.name} ${formData.auth} 를 추가하시겠습니까?`)) {
                    console.log('추가된 데이터:', formData);
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                    console.log('저장취소');
                }
            }
        }
    };

    const handleSave = async () => {
        if (addUserRef.current) {
            const isValid = await addUserRef.current.validateForm();
            if (isValid) {
                const formData = addUserRef.current.getFormData();
                if (window.confirm(`${formData.name} ${formData.auth} 를 수정하시겠습니까?`)) {
                    console.log('수정된 데이터:', formData);
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                    console.log('저장취소');
                }
            }
        }
    };

    const handleDeleteSingle = () => {
        const formData = addUserRef.current.getFormData();
        if (window.confirm(`${formData.name} ${formData.auth} 를 삭제하시겠습니까?`)) {
            alert('삭제하였습니다');
            setIsOpen(false);
        }
    };

    const handleClose = () => {
        if (addUserRef.current) {
            addUserRef.current.clearForm();
        }
        setIsOpen(false);
    };

    const handleRowClick = () => {
        setMode('edit');
        setIsOpen(true);
        if (addUserRef.current) {
            //테이블 데이터 불러오기
        }
    }

    const handleAddClick = () => {
        setMode('add');
        setIsOpen(true);
        if (addUserRef.current) {
            addUserRef.current.clearForm();
        }
    };

    const getPopupButtons = () => {
        if (mode === 'add') {
            return [
                {
                    label: "확인",
                    onClick: handleAdd,
                    color: "main" as const,
                    fill: true,
                    width: 130,
                    height: 40
                },
                {
                    label: "취소",
                    onClick: handleClose,
                    color: "gray" as const,
                    width: 130,
                    height: 40
                }
            ];
        }
        return [
            {
                label: "삭제",
                onClick: handleDeleteSingle,
                color: "red" as const,
                width: 130,
                height: 40
            },
            {
                label: "저장",
                onClick: handleSave,
                color: "main" as const,
                fill: true,
                width: 130,
                height: 40
            },
            {
                label: "취소",
                onClick: handleClose,
                color: "gray" as const,
                width: 130,
                height: 40
            }
        ];
    };

    return (
        <>
            <div className={'border border-gray-100 p-6 rounded-lg bg-white flex items-center justify-between'}>
                <div className={'flex items-center'}>
                    <div className={'text-gray-700 font-medium pt-1 ml-7 mr-5'}>권한</div>
                    <select className={'w-[200px]'}>
                        <option>전체</option>
                        <option>관리자</option>
                        <option>사용자</option>
                    </select>
                    <div className={'text-gray-700 font-medium pt-1 ml-2 mr-5'}>검색조건</div>
                    <select className={'w-[200px]'}>
                        <option>아이디</option>
                        <option>이름</option>
                        <option>연락처</option>
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
            <div className={'flex justify-end space-x-4'}>
                <Button color={"red"} fill={false} height={36} width={120} onClick={handleDeleteGroup}>
                    삭제
                </Button>
                <Button color={"main"} fill height={36} width={120} onClick={handleAddClick}>
                    <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                    사용자추가
                </Button>
            </div>
            <CenterPopup
                isOpen={isOpen}
                onClose={handleClose}
                title={mode === 'add' ? "사용자 추가" : "사용자 수정"}
                Content={() => <AddUser ref={addUserRef}/>}
                buttons={getPopupButtons()}
            />
            <div className={'mt-4'}>
                <CheckboxContainer<UserType>
                    items={UserSet}
                    getItemId={(item) => item.index}
                    columns={columns}
                    renderItem={(item, isSelected, onToggle) => (
                        <tr className={'cursor-pointer hover:bg-main-lighter'}
                            onClick={() => handleRowClick()}>
                            <td onClick={event => event.stopPropagation()}>
                                <Checkbox
                                    checked={isSelected}
                                    onChange={() => onToggle(item.index)}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.userId}</td>
                            <td>{item.auth}</td>
                        </tr>
                    )}
                    onSelectionChange={setSelectedItems}
                />
                <Pagination maxNumber={10} onChange={(page) => console.log(`Page changed to ${page + 1}`)}/>
            </div>
        </>
    );
}
