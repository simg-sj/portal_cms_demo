"use client"

/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 11:05:37
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-10 15:44:29
 * @FilePath: portal_cms_demo_next/src/app/(Navigation-Group)/kmpark/mypage/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import {useSession} from "next-auth/react";
import Image from "next/image";
import UserIcon from '@/assets/images/icon/user-icon.png';
import Tab from "@/app/components/common/tab";
import React, {useEffect, useState} from "react";
import MyPageTabs from "@/app/components/common/myPageTabs";
import Loading from "@/app/(Navigation-Group)/loading";

export default function Page() {
    const {data} = useSession();
    const [tab, setTab] = useState();
    useEffect(() => {
        if(data?.user){
            setTab(MyPageTabs(data.user));
        }
    }, [data]);
    return (
        <div className="flex px-8 py-6">
            <div className='basis-1/3 flex flex-col items-center'>
                <div className='flex flex-col'>
                    <div className={'w-[240px] h-[240px] rounded-full flex justify-center items-center bg-main-light'}>
                        <Image src={UserIcon} alt={'유저 이미지'} width={120} height={120}/>
                    </div>
                    <div className="text-3xl tracking-[4px] mt-16">{data?.user?.name} 님</div>
                </div>
                <div className='flex flex-col mt-32 w-[360px]'>
                    <div className='flex flex-col text-xl space-y-6'>
                        <h2 className='border-b leading-[40px] text-gray-600'>
                            업체명
                        </h2>
                        <h2>
                            {data?.user?.platform}
                        </h2>
                        <h2 className='border-b leading-[40px] pt-8 text-gray-600'>
                            직책
                        </h2>
                        <h2>
                            {data?.user?.work}
                        </h2>
                        <h2 className='border-b leading-[40px] pt-8 text-gray-600'>
                            성함
                        </h2>
                        <h2>
                            {data?.user?.name}
                        </h2>
                    </div>
                </div>
            </div>
            <div className='basis-2/3'>
                <div className='w-[60%]'>
                    {
                        tab ?
                            <Tab tabs={tab}/>
                            :
                            <Loading/>
                    }
                </div>
            </div>
        </div>
    )
}