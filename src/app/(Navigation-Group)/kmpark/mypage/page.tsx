"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import UserIcon from '@/assets/images/icon/user-icon.png';
import React, { useEffect, useState } from "react";
import MyPageTabs from "@/app/components/common/myPageTabs";
import Loading from "@/app/(Navigation-Group)/loading";
import {UserType} from "@/@types/common";


export default function Page() {
    const { data, status } = useSession();
    const [userInfo, setUserInfo] = useState<UserType | null>(null);  // 초기값을 null로 설정

    useEffect(() => {
        if (data && data.user) {
            setUserInfo({
                name: data.user.name || null,
                email: data.user.email || null,
                auth: data.user.auth || null,
                platform: data.user.platform || null,
                userId: data.user.id || '',
                phone: data.user.phone || null,
                work: data.user.work || null
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
                        <h2 className={'text-2xl'}>
                            {userInfo.platform}
                        </h2>
                        <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14'>
                            권한
                        </h2>
                        <h2 className={'text-2xl'}>
                            {userInfo.auth}
                        </h2>
                        <h2 className='leading-[40px] text-gray-500 text-lg border-b mb-2 mt-14'>
                            성함
                        </h2>
                        <h2 className={'text-2xl'}>
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
