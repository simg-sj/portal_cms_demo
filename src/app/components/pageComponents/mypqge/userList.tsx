'use client'
import React, {useEffect, useRef, useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Plus from "@/assets/images/icon/plus-icon.png";
import Pagination from "@/app/components/common/ui/pagination";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddUser, {AddUserRef} from "@/app/components/pageComponents/parking/addUser";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {UserListType, UserType} from "@/@types/common";

interface SearchParams {
    authority: string;
    searchCondition: string;
    searchKeyword: string;
}

export default function UserList({ userList }: { userList: UserListType[] }) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const columns = [{header : '이름',key:"uName"}, {header : '연락처',key:"uCell"}, {header : '이메일',key:"uEmail"}, {header : '아이디',key:"userId"}, {header : '권한',key:"uAuth"}];
    const addUserRef = useRef<AddUserRef>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; //페이지당 항목수
    const totalItems = userList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // pagination 페이지
    const startIndex = (currentPage - 1) * itemsPerPage;
    const [displayedUsers, setDisplayUsers] = useState(userList.slice(startIndex, startIndex + itemsPerPage));
    const handlePageChange = (page: number) => {
        setCurrentPage(page + 1);
        setSelectedItems([]); // 페이지 변경 시 선택된 항목 초기화
    };

    useEffect(() => {
        if (isOpen && mode === 'edit' && selectedUser && addUserRef.current) {
            addUserRef.current.setFormData(selectedUser);
        }
    }, [isOpen, mode, selectedUser]);

    //사용자 선택 삭제
    const handleDeleteGroup = () => {
        if (selectedItems.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }
        const selectedUsers = userList.filter(item => selectedItems.includes(item.upk));
        if (window.confirm(`선택한 ${selectedItems.length}개의 항목을 삭제하시겠습니까?`)) {
            console.log('삭제할 항목:', selectedUsers.map(user => ({ id: user.userId, name: user.uName  })));
            return;
        }
    };

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
        if (addUserRef.current) {
            const formData = addUserRef.current.getFormData();
            if (window.confirm(`${formData.name} ${formData.auth} 를 삭제하시겠습니까?`)) {
                alert('삭제하였습니다');
                setIsOpen(false);
            }
        }
    };

    const handleClose = () => {
        if (addUserRef.current) {
            addUserRef.current.clearForm();
        }
        setSelectedUser(null);
        setIsOpen(false);
    };

    const handleRowClick = (user: UserType) => {
        setSelectedUser(user);
        setMode('edit');
        setIsOpen(true);
    }

    const handleAddClick = () => {
        setMode('add');
        setSelectedUser(null);
        setIsOpen(true);
        if (addUserRef.current) {
            addUserRef.current.clearForm();
        }
    };

    //조회
    const [searchParams, setSearchParams] = useState<SearchParams>({
        authority: 'all',
        searchCondition: 'userId',
        searchKeyword: ''
    });

    const handleParamChange = (key: keyof SearchParams, value: string) => {
        setSearchParams(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const onSearchClick = () => {
        if (!searchParams.searchKeyword || !searchParams.searchCondition) {
            alert("검색 키워드 또는 검색 조건이 비어 있습니다.");
            return;
        }

        const keyword = searchParams.searchKeyword.toLowerCase(); // 소문자로 변환
        const condition = searchParams.searchCondition;

        let filteredUsers = userList.filter(item =>
            item[condition]?.toLowerCase().includes(keyword) // 대소문자 구분 없이 검색
        );

        if (searchParams.authority !== 'all') {
            console.log(filteredUsers);
            filteredUsers = filteredUsers.filter(item =>
                searchParams.authority.includes(item.uAuth)
            );
        }
        setDisplayUsers(filteredUsers);
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
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
                    <div className={'text-gray-700 font-medium pt-1 mr-5'}>권한</div>
                    <select
                        className={'w-[200px]'}
                        value={searchParams.authority}
                        onChange={(e) => handleParamChange('authority', e.target.value)}
                    >
                        <option value={'all'}>전체</option>
                        <option value={'admin'}>관리자</option>
                        <option value={'user'}>사용자</option>
                    </select>
                    <div className={'text-gray-700 font-medium pt-1 ml-7 mr-5'}>검색조건</div>
                    <select
                        className={'w-[200px]'}
                        value={searchParams.searchCondition}
                        onChange={(e) => handleParamChange('searchCondition', e.target.value)}
                    >
                        <option value={'userId'}>아이디</option>
                        <option value={'uName'}>이름</option>
                        <option value={'uCell'}>연락처</option>
                    </select>
                    <input
                        type={'text'}
                        placeholder={'검색조건 설정 후 검색해주세요'}
                        className={'w-[300px] h-[35px] rounded-tr-none rounded-br-none ml-5'}
                        value={searchParams.searchKeyword}
                        onChange={(e) => handleParamChange('searchKeyword', e.target.value)}
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
            </div>
            <div className={'flex justify-end space-x-4 mt-4'}>
                <Button color={"red"} fill={false} height={32} width={120} onClick={handleDeleteGroup}>
                    삭제
                </Button>
                <Button color={"main"} fill height={32} width={120} onClick={handleAddClick}>
                    <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
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
                <CheckboxContainer<UserListType[]>
                    items={displayedUsers}
                    getItemId={({upk}) => upk}
                    columns={columns}
                    selectedItems={selectedItems}
                    onRowClick={handleRowClick}
                    onSelectionChange={setSelectedItems}
                />
                <Pagination
                    maxNumber={totalPages}
                    onChange={handlePageChange}
                />
            </div>
        </>
    );
}