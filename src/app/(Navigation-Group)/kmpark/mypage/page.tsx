"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import UserIcon from '@/assets/images/icon/user-icon.png';
import React, { useEffect, useState } from "react";
import MyPageTabs from "@/app/components/common/MyPageTabs";
import Loading from "@/app/(Navigation-Group)/loading";
import {UserType} from "@/@types/common";
import {authText} from "@/config/data";


export default function Page() {
    const { data, status } = useSession();
    const [userInfo, setUserInfo] = useState<UserType | null>(null);  // 초기값을 null로 설정

    useEffect(() => {
        if (data && data.user) {
            setUserInfo({
                index: 0,
                name: data.user.name ,
                email: data.user.email,
                auth: data.user.auth ,
                bName: data.user.bName,
                platform : data.user.platform,
                userId: data.user.id ,
                password: data.user.password,
                phone: data.user.phone,
                authLevel: data.user.authLevel,
                work: data.user.work
            });
        }
    }, [data]);

    if (status === "loading" || !userInfo) {
        return <Loading />;
    }

    return (
        <div className="flex justify-between w-full h-full">
            <div className='basis-1/3 flex flex-col items-center bg-white p-16 mr-10 shadow-sm rounded-lg'>
                <div className='flex flex-col items-center'>
                    <div className={'w-[240px] h-[240px] rounded-full flex justify-center items-center bg-main-light'}>
                        <Image src={UserIcon.src} alt={'유저 이미지'} width={120} height={120}/>
                    </div>
                    <div className="text-3xl tracking-[4px] mt-20 mb-3">{userInfo.name} 님</div>
                    <div className={'text-gray-500 tracking-widest'}>{userInfo.platform} {userInfo.auth}</div>
                </div>
                <div className='flex flex-col mt-32 w-[360px]'>
                    <div className='flex flex-col text-xl'>
                        <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2'>
                            업체명
                        </h2>
                        <h2 className={'text-xl'}>
                            {userInfo.platform}
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
                            {userInfo.name}
                        </h2>
                    </div>
                </div>
            </div>
            <div className='basis-2/3 bg-white p-16 shadow-sm rounded-lg'>
                <div>
                    <MyPageTabs userInfo={userInfo} />
                </div>
            </div>
        </div>
    )
}
