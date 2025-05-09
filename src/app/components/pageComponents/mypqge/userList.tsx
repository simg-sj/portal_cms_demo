
import React, { useEffect, useRef, useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import Image from "next/image";
import Plus from "@/assets/images/icon/plus-icon.png";
import Pagination from "@/app/components/common/ui/pagination";
import CenterPopup from "@/app/components/popup/CenterPopup";
import AddUser, {AddUserRef} from "@/app/components/pageComponents/parking/addUser";
import {CheckboxContainer} from "@/app/components/common/ui/input/checkboxContainer";
import {PlatformList, SearchParams, UserCudType, UserListType, UserUpk} from "@/@types/common";
import {authText } from "@/config/data";
import {userService} from "@/app/(Navigation-Group)/action";
import {convertUserToUserUpt, getChangedFields} from "@/app/lib/common";
import {useNotifications} from "@/context/NotificationContext";
import {useSession} from "next-auth/react";


export default function UserList({ userList, onSearch, platformList }: { userList: UserListType[], onSearch : (param : SearchParams) => void, platformList : PlatformList[]}) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const {data} = useSession()
    const columns = [{header : '이름',key:"uName"}, {header : '연락처',key:"uCell"}, {header : '이메일',key:"uMail"}, {header : '아이디',key:"userId"}, {header : '권한',key:"uAuth"}];
    const addUserRef = useRef<AddUserRef>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [selectedUser, setSelectedUser] = useState<UserListType | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; //페이지당 항목수
    const totalPages = Math.ceil(userList.length / itemsPerPage);

    // 알림
    const {showAlert, resetNotiThen, showConfirm} = useNotifications();

    //조회
    const [searchParams, setSearchParams] = useState<SearchParams>({
        job : 'LIST',
        gbn : 'SEARCH',
        uAuth: 'all',
        searchCondition: 'userId',
        searchKeyword: '',
        bpk : data.user.bpk
    });
    // pagination 페이지
    const [displayedUsers, setDisplayUsers] = useState<UserListType[]>(userList.slice(0, itemsPerPage));

    // `userList`가 변경될 때 `displayedUsers`도 갱신되도록 설정
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        setDisplayUsers(userList.slice(startIndex, startIndex + itemsPerPage));
    }, [userList, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page + 1);
        setSelectedItems([]); // 페이지 변경 시 선택된 항목 초기화
    };

    useEffect(() => {
        if (isOpen && mode === 'edit' && selectedUser && addUserRef.current) {
            addUserRef.current.setFormData(selectedUser);
        }
    }, [isOpen, mode, selectedUser]);


    // 사용자 생성
    const handleAdd = async () => {
        if (!addUserRef.current) return;

        try {
            const isValid = await addUserRef.current.validateForm();
            if (!isValid) return;

            const formData = addUserRef.current.getFormData();
            const confirmMessage = `${formData.uName} ${authText[formData.uAuth]} 를 추가하시겠습니까?`;


            showConfirm(confirmMessage, async () => {
                formData.job = "CUD";
                formData.gbn = "ADD";

                console.log(formData)
                if(formData.subYn) {
                    formData.platform = platformList.find((state => state.bpk === Number(formData.subBpk))).bName;
                }else {
                    formData.platform = data.user.platform;
                }


                let result = await userService(formData);

                if("code" in result){
                    if (result.code === "200") {
                        onSearch(searchParams);
                        resetNotiThen(() => {
                            showAlert("계정이 생성되었습니다.", () => {
                                setIsOpen(false);
                            });
                        })
                    } else {
                        if("msg" in result){
                            resetNotiThen(() => {
                                showAlert(result.msg);
                            });
                        }else {
                            showAlert("서비스 오류입니다.");
                        }
                    }
                }
            })
        } catch (error) {
            showAlert("예기치 않은 오류가 발생했습니다.");
        }
    };

    // 사용자 수정
    const handleSave = async () => {
        if (addUserRef.current) {
            const isValid = await addUserRef.current.validateForm();

            if (isValid) {
                const formData : UserCudType = addUserRef.current.getFormData();
                const orginal = userList.find(user => user.irpk === formData.irpk);
                showConfirm(`${formData.uName} ${authText[formData.uAuth]} 를 수정하시겠습니까?`, async () => {
                    const changed = getChangedFields(formData, orginal);
                    const merged = {
                        ...changed,
                        bpk: orginal.bpk,
                        irpk: orginal.irpk,
                        userId : orginal.userId
                    };
                    let param = convertUserToUserUpt(merged);

                    let result = await userService(param);

                    if("code" in result){
                        if (result.code === "200") {
                            resetNotiThen(() => {
                                showAlert('수정되었습니다');
                                onSearch(searchParams);
                            })
                        }else {
                            showAlert('서비스 오류입니다.');
                        }
                    }
                    setIsOpen(false);
                })
            }
        }
    };


    //사용자 선택 삭제
    const handleDeleteGroup = async () => {
        try{

        }catch (e){

        }
        if (selectedItems.length === 0) {
            showAlert('삭제할 항목을 선택해주세요.');
            return;
        }
        showConfirm(`선택한 ${selectedItems.length}개의 항목을 삭제하시겠습니까?`, async () => {
            let param : UserUpk = {
                irpks : selectedItems.join(','),
                job : 'CUD',
                gbn : 'MDEL'
            };
            let result = await userService(param);

            if("code" in result){
                if (result.code === "200") {
                    resetNotiThen(() => {
                        showAlert('삭제되었습니다');
                        onSearch(searchParams);
                    })
                }else {
                    resetNotiThen(() => {
                        showAlert('서비스 오류입니다.');
                    })
                }
            }
        })
    };


    const handleDeleteSingle = async () => {
        if (addUserRef.current) {
            const formData = addUserRef.current.getFormData();
            showConfirm(`${formData.uName} ${authText[formData.uAuth]} 를 삭제하시겠습니까?`, async () => {
                formData.gbn = 'DEL'
                formData.job = 'CUD';

                let result = await userService(formData);

                if ("code" in result) {
                    if (result.code === "200") {
                        resetNotiThen(() => {
                            showAlert('삭제하였습니다.');
                            onSearch(searchParams);
                        })
                    } else {
                        resetNotiThen(() => {
                            showAlert('서비스 오류입니다..');
                        })
                    }
                }
                setIsOpen(false);
            })
        }
    };

    const handleClose = () => {
        if (addUserRef.current) {
            addUserRef.current.clearForm();
        }
        setSelectedUser(null);
        setIsOpen(false);
    };

    const handleRowClick = (user: UserListType) => {
        setSelectedRow(user.irpk);
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



    const handleParamChange = (key: keyof SearchParams, value: string) => {
        setSearchParams(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const onSearchClick = () => {
        /*if (!searchParams.searchKeyword || !searchParams.searchCondition) {
            alert("검색 키워드 또는 검색 조건이 비어 있습니다.");
            return;
        }*/
        onSearch(searchParams);

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
                        value={searchParams.uAuth}
                        onChange={(e) => handleParamChange('uAuth', e.target.value)}
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
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                onSearchClick(); // 엔터키를 누르면 onSearchClick 실행
                            }
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
                Content={() => <AddUser ref={addUserRef} platformList={platformList} mode={mode}/>}
                buttons={getPopupButtons()}/>
            <div className={'mt-4'}>
                <CheckboxContainer
                    items={displayedUsers}
                    getItemId={(item) => item.irpk}
                    columns={columns}
                    selectedItems={selectedItems}
                    onRowClick={handleRowClick}
                    onSelectionChange={setSelectedItems}
                    selectedRow={selectedRow}
                />
                <Pagination
                    maxNumber={totalPages}
                    currentPage={currentPage + 1}
                    onChange={(page) => {setCurrentPage(page);}}
                />
            </div>
        </>
    );
}