import React, { useState, useEffect } from "react";
import Image from "next/image";
import UserIcon from "@/assets/images/icon/user-icon.png";
import MyPageTabs from "@/app/components/common/MyPageTabs";
import {resultCode, SearchParams, UserListType, UserType} from "@/@types/common";
import { authText, tabs } from "@/config/data";
import {getUserData, userService} from "@/app/(Navigation-Group)/action";

export default function MyPageContainer({ userInfo }: { userInfo: UserType }) {
    const [userData, setUserData] = useState<UserType>(userInfo);
    const [userList, setUserList] = useState<UserListType[]>([]);

    const onReload = async () => {
        const result = await getUserData(userInfo.bpk, tabs[userInfo.auth]?.[2]?.listType, 'LIST');
        setUserList(result || []);
    }

    const onSearchClick = async (param : SearchParams) => {

        const result : resultCode | UserListType[] = await userService(param);
        console.log(result);
        if (Array.isArray(result) && result.length > 0 && "code" in result[0] && result[0].code === '200') {
            setUserList(result);
        }else{
            setUserList([]);
            alert('조회된 정보가 없습니다.');
        }
    }
    useEffect(() => {
        onReload();
    }, []);
    return (
        <div className="flex justify-between w-full h-full">
            <div className="basis-1/3 flex flex-col items-center bg-white p-16 mr-10 shadow-sm rounded-lg">
                <div className="flex flex-col items-center">
                    <div className="w-[240px] h-[240px] rounded-full flex justify-center items-center bg-main-light">
                        <Image src={UserIcon} alt={"유저 이미지"} width={120} height={120} />
                    </div>
                    <div className="text-3xl tracking-[4px] mt-20 mb-3">{userData.name} 님</div>
                    <div className={"text-gray-500 tracking-widest"}>
                        {userData.bName} {userData.auth === "admin" ? "관리자" : ""}
                    </div>
                </div>
                <div className="flex flex-col mt-32 w-[360px]">
                    <div className="flex flex-col text-xl">
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2">업체명</h2>
                        <h2 className={"text-xl"}>{userData.bName}</h2>
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14">권한</h2>
                        <h2 className={"text-xl"}>{authText[userInfo.auth]}</h2>
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14">성함</h2>
                        <h2 className={"text-xl"}>{userData.name}</h2>
                    </div>
                </div>
            </div>
            <div className="basis-2/3 bg-white p-16 shadow-sm rounded-lg">
                <MyPageTabs
                    userInfo={userData}
                    userList={userList}
                    reloadUserList={onReload} // 자식에게 reloadUserList 함수 전달
                    onSearchClick={onSearchClick}
                />
            </div>
        </div>
    );
}
