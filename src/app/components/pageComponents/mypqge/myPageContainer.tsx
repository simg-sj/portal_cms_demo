import React, { useState, useEffect } from "react";
import Image from "next/image";
import UserIcon from "@/assets/images/icon/user-icon.png";
import MyPageTabs from "@/app/components/common/MyPageTabs";
import {PlatformList, resultCode, SearchParams, UserListType, UserType} from "@/@types/common";
import { authText, tabs } from "@/config/data";
import {getUserData, userService} from "@/app/(Navigation-Group)/action";
import {useNotifications} from "@/context/NotificationContext";
import {getPlatform} from "@/app/(Navigation-Group)/turu/action";

export default function MyPageContainer({ userInfo, setUserInfo, fetchUser }: { userInfo: UserType, setUserInfo: React.Dispatch<React.SetStateAction<UserType>>, fetchUser: (pk : number, infoId : string) => Promise<void> }) {
    const [userList, setUserList] = useState<UserListType[]>([]);
    const {showAlert} = useNotifications();
    const [platformList, setPlatformList] = useState<PlatformList[]>([])

    const onReload = async () => {
        const result = await getUserData(userInfo.bpk, tabs[userInfo.auth]?.[2]?.listType, 'LIST');

        setUserList(result || []);
    }

    const onSearchClick = async (param : SearchParams) => {
        const result : resultCode | UserListType[] = await userService(param);
        if (Array.isArray(result) && result.length > 0 && "code" in result[0] && result[0].code === '200') {
            setUserList(result);
        }else{
            setUserList([]);
            showAlert('조회된 정보가 없습니다.');
        }
    }


    useEffect(() => {
        onReload();
    }, []);

    const fetchPlatform = async (bpk  : number) => {
        try {
            const result: PlatformList[] = await getPlatform(bpk);
            console.log(result);
            setPlatformList(result);
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (userInfo.bpk) {
            if(userInfo.subYn === 'Y'){
                fetchPlatform(userInfo.bpk);
            }
        }
    }, [userInfo]);


    return (
        <div className="flex justify-between w-full h-full">
            <div className="basis-1/3 flex flex-col items-center bg-white p-16 mr-10 shadow-sm rounded-lg">
                <div className="flex flex-col items-center">
                    <div className="w-[240px] h-[240px] rounded-full flex justify-center items-center bg-main-light">
                        <Image src={UserIcon} alt={"유저 이미지"} width={120} height={120} />
                    </div>
                    <div className="text-3xl tracking-[4px] mt-20 mb-3">{userInfo.name} 님</div>
                    <div className={"text-gray-500 tracking-widest"}>
                        {userInfo.bName} {userInfo.auth === "admin" ? "관리자" : ""}
                    </div>
                </div>
                <div className="flex flex-col mt-32 w-[360px]">
                    <div className="flex flex-col text-xl">
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2">업체명</h2>
                        <h2 className={"text-xl"}>{userInfo.platform}</h2>
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14">권한</h2>
                        <h2 className={"text-xl"}>{authText[userInfo.auth]}</h2>
                        <h2 className="leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14">성함</h2>
                        <h2 className={"text-xl"}>{userInfo.name}</h2>
                    </div>
                </div>
            </div>
            <div className="basis-2/3 bg-white p-16 shadow-sm rounded-lg">
                <MyPageTabs
                    userInfo={userInfo}
                    userList={userList}
                    platformList={platformList}
                    setUserInfo={setUserInfo}
                    onReload={fetchUser}
                    onSearchClick={onSearchClick}
                />
            </div>
        </div>
    );
}
