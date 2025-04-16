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
import React, {useEffect} from "react";
import Tooltip from "@/app/components/common/ui/tooltip";
import {useNotifications} from "@/context/NotificationContext";


export default function MenuItem({icon, label, link, isActive, onClick}: MenuItemProps){
    const { renewals } = useNotifications(); // 알림 데이터 가져오기

    const NotiRenew = () => {
        return (
            <div>
                <div className={'font-bold mb-3'}>갱신 알림</div>
                {
                    renewals.map((item, index) => (
                        <div key={index} className={'text-sm font-semibold my-3 text-gray-800'}>
                            {`${index + 1}. ${item.productName}`}
                        </div>
                    ))
                }
            </div>
        );
    };

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
                <div className='absolute right-1 top-0.5'>
                    <Tooltip content={<NotiRenew/>} width={300}/>
                </div>
            }
        </Link>
    )
}