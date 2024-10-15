"use client"

import { useSession } from "next-auth/react";
import Image from "next/image";
import UserIcon from '@/assets/images/icon/user-icon.png';
import React, { useEffect, useState } from "react";
import MyPageTabs from "@/app/components/common/myPageTabs";
import Loading from "@/app/(Navigation-Group)/loading";

interface UserType {
    auth: string | null;
    name: string | null;
    platform: string | null;
    password?: string;
    userId: string;
    email: string | null;
    phone: string | null;
    work: string | null;
}

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
        <div className="flex px-8 py-6">
            <div className='basis-1/3 flex flex-col items-center'>
                <div className='flex flex-col'>
                    <div className={'w-[240px] h-[240px] rounded-full flex justify-center items-center bg-main-light'}>
                        <Image src={UserIcon} alt={'유저 이미지'} width={120} height={120} />
                    </div>
                    <div className="text-3xl tracking-[4px] mt-16">{userInfo.name} 님</div>
                </div>
                <div className='flex flex-col mt-32 w-[360px]'>
                    <div className='flex flex-col text-xl space-y-6'>
                        <h2 className='border-b leading-[40px] text-gray-600'>
                            업체명
                        </h2>
                        <h2>
                            {userInfo.platform}
                        </h2>
                        <h2 className='border-b leading-[40px] pt-8 text-gray-600'>
                            직책
                        </h2>
                        <h2>
                            {userInfo.work}
                        </h2>
                        <h2 className='border-b leading-[40px] pt-8 text-gray-600'>
                            성함
                        </h2>
                        <h2>
                            {userInfo.name}
                        </h2>
                    </div>
                </div>
            </div>
            <div className='basis-2/3'>
                <div className='w-[60%]'>
                    <MyPageTabs userInfo={userInfo} />
                </div>
            </div>
        </div>
    )
}
