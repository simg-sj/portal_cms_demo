/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-09-30 15:58:57
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-12-18 14:08:09
 * @FilePath: portal_cms_demo_next/src/app/components/common/MenuItem.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import Link from "next/link";
import Image from 'next/image';
import {MenuItemProps} from "@/@types/common";
import React from "react";
import {useNotifications} from "@/context/NotificationContext";


export default function MenuItem({icon, label, link, isActive, onClick}: MenuItemProps){
    const { renewals } = useNotifications(); // 알림 데이터 가져오기

    return (
        <Link
            href={link}
            className={`px-1 py-2 flex flex-col items-center my-5 cursor-pointer rounded-md relative
            ${isActive ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-30'}`}
            onClick={onClick}
        >
            <Image src={icon} alt={label} width={28} />
            <div className="text-white text-[12px] mt-2">{label}</div>
            {
                (label === '보험관리' && renewals.length > 0) &&
                <div className='absolute right-1 top-1.5 w-5 h-5 text-white text-sm rounded-full bg-red-500 flex justify-center items-center'>
                    !
                </div>
            }
        </Link>
    )
}