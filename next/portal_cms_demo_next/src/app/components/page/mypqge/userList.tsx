'use client'
import React, {useRef, useState} from "react";
import Button from "@/app/components/common/ui/button";
import Image from "next/image";
import Plus from "@/assets/images/icon/plus-icon.png";
import Checkbox from "@/app/components/common/ui/checkbox";
import {listData, UserSet} from "@/config/data";
import Pagination from "@/app/components/common/ui/pagination";
import CenterPopup from "@/app/components/popup/CenterPopup";
import UserAdd, {AddUserRef} from "@/app/components/page/hiparking/user-add";
import AddBusiness from "@/app/components/page/hiparking/add-business";
import AddUser from "@/app/components/page/hiparking/user-add";



export default function UserList() {

    //Todo. 체크박스 전체선택 공통 컴포넌트 분리하기 - yr
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
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

    const columns = [
        "이름", "연락처",	"이메일", "아이디", "권한"
    ];

    //사용자추가팝업
    const [isOpen, setIsOpen] = useState(false);
    const addUserRef = useRef<AddUserRef>(null);

/*    const handleConfirm = async () => {
        if (window.confirm('저장하시겠습니까?')) {
            console.log('나중에 데이터를 넣을것임');
            setIsOpen(false);
        }else {
            setIsOpen(true);
            console.log('저장취소');
        }
    };*/

    const handleConfirm = async () => {
        if (addUserRef.current) {
            const isValid = await addUserRef.current.validateForm();

            if (isValid) {
                const formData = addUserRef.current.getFormData();
                if (window.confirm(`${formData.name}사용자를 추가하시겠습니까?`)) {
                    const param = {
                        '성함': formData.name,
                        '연락처:': formData.phone,
                        '이메일:': formData.email,
                        '아이디:': formData.userId,
                        '비밀번호:': formData.password,
                        '권한:': formData.auth,
                    };
                    console.log(param);
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                    console.log('저장취소');
                }
            }
        }
    };

    const handleClose = () => {
        if (addUserRef.current) {
            addUserRef.current.clearForm();
        }
        setIsOpen(false);
    };

    const popupButton = [
        {
            label: "확인",
            onClick: handleConfirm,
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

    return (
        <>
            <div className={'flex justify-end space-x-4'}>
                <Button color={"red"} fill={false} height={36} width={120}>
                    삭제
                </Button>
                <Button color={"main"} fill height={36} width={120} onClick={() => setIsOpen(true)}>
                    <Image src={Plus.src} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                    사용자추가
                </Button>
            </div>
            <CenterPopup
                isOpen={isOpen}
                onClose={handleClose}
                title="사용자 추가"
                Content={() => <AddUser ref={addUserRef} />}
                buttons={popupButton}
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
                    {UserSet.map((item, index) => (
                        <tr key={index}
                            className={'cursor-pointer'}>
                            <td onClick={event => event.stopPropagation()}>
                                <Checkbox
                                    checked={selectedItems.has(index)}
                                    onChange={() => toggleSelectItem(index)}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.userId}</td>
                            <td>{item.auth}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination maxNumber={10} onChange={(page) => console.log(`Page changed to ${page + 1}`)}/>
            </div>
        </>
    );
}
