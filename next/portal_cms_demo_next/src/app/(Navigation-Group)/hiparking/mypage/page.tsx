"use client"

/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 11:05:37
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-10 10:26:55
 * @FilePath: portal_cms_demo_next/src/app/(Navigation-Group)/hiparking/mypage/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import {useSession} from "next-auth/react";
import Image from "next/image";
import UserIcon from '@/assets/images/icon/user-icon.png';

export default function Page() {
    const {data} = useSession();
    return (
        <div className="flex px-8 py-6">
            <div className='basis-1/3 flex flex-col items-center'>
                <div className='flex flex-col'>
                    <div className={'w-[240px] h-[240px] rounded-full flex justify-center items-center bg-main-light'}>
                        <Image src={UserIcon} alt={'유저 이미지'} width={120} height={120}/>
                    </div>
                    <div className="text-3xl tracking-[4px] mt-16">{data?.user?.name} 님</div>
                </div>
                <div className='flex flex-col mt-32 w-[240px]'>
                    <div>
                    업체명 : {data?.user?.platform}
                    </div>
                    <div>
                        직책 : {data?.user?.work}
                    </div>
                    <div>
                        성함 : {data?.user?.name}
                    </div>
                </div>
            </div>
            <div className='basis-2/3'>
                <div>
                    <ul className=''>
                        <li>
                            s
                        </li>
                        <li>
                            s
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}