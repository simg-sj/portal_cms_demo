/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-12-30 14:25:26
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2025-03-04 10:54:11
 * @FilePath: src/app/components/pageComponents/mypqge/myPageContainer.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import Image from "next/image";
import UserIcon from "@/assets/images/icon/user-icon.png";
import MyPageTabs from "@/app/components/common/MyPageTabs";
import React, { useState} from "react";
import {UserType} from "@/@types/common";
import useUserList from "@/app/lib/hooks/useUserList";
import {authText} from "@/config/data";



export default function MyPageContainer({userInfo} : UserType) {
    const [userData, setUserData] = useState<UserType>(userInfo);
    const userList = useUserList(userData);
    return (
        <div className="flex justify-between w-full h-full">
            <div className='basis-1/3 flex flex-col items-center bg-white p-16 mr-10 shadow-sm rounded-lg'>
                <div className='flex flex-col items-center'>
                    <div className={'w-[240px] h-[240px] rounded-full flex justify-center items-center bg-main-light'}>
                        <Image src={UserIcon.src} alt={'유저 이미지'} width={120} height={120}/>
                    </div>
                    <div className="text-3xl tracking-[4px] mt-20 mb-3">{userData.name} 님</div>
                    <div className={'text-gray-500 tracking-widest'}>{userData.bName} {userData.auth === 'admin' ? "관리자" : ''}</div>
                </div>
                <div className='flex flex-col mt-32 w-[360px]'>
                    <div className='flex flex-col text-xl'>
                        <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>
                            업체명
                        </h2>
                        <h2 className={'text-xl'}>
                            {userData.bName}
                        </h2>
                        <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14'>
                            권한
                        </h2>
                        <h2 className={'text-xl'}>
                            {authText[userInfo.auth]}
                        </h2>
                        <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14'>
                            성함
                        </h2>
                        <h2 className={'text-xl'}>
                            {userData.name}
                        </h2>
                    </div>
                </div>
            </div>
            <div className='basis-2/3 bg-white p-16 shadow-sm rounded-lg'>
                <div>
                    <MyPageTabs userInfo={userData} userList={userList} />
                </div>
            </div>
        </div>
    )
}