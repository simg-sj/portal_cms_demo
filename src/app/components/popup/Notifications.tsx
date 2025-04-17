import { useNotifications } from "@/context/NotificationContext";
import WarningIcon from "@/assets/images/icon/warning-icon.png";
import Image from "next/image";
import React from "react";
import Button from "@/app/components/common/ui/button/button";
import {useRouter} from "next/navigation";

export default function Notifications() {
    const { renewals, clearNotifications } = useNotifications();
    const currentUrl = window.location.href;
    const router = useRouter();

    const linkClick = () => {
        router.push( currentUrl + "/insuManager");
    }

    if (renewals.length === 0) return null; // 알림이 없으면 렌더링 안함

    return (
        <>
        <div className={'bg-black fixed left-0 top-0 w-dvw h-dvh opacity-50 z-50'}></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right-4 w-[360px] bg-white shadow-lg rounded-lg px-8 py-8 z-50 opacity-95">
            <div className={'flex flex-col items-center justify-center mb-3'}>
                <Image
                    src={WarningIcon.src}
                    alt={'경고'}
                    width={30}
                    height={30}
                    className={'cursor-pointer mb-5'}
                />
                <div className={'text-gray-800 text-lg'}>증권 갱신일이 얼마남지 않았어요!</div>
            </div>
                {renewals.map((item, index) => (
                    <div key={item.irpk} className="mt-1 text-md text-center">
                        <strong>{item.productName}</strong> 증권 갱신일이 <b className={'text-red-500'}>{item.daysRemaining}</b>일 남았습니다.
                    </div>
                ))}
            <div className={'flex justify-center space-x-2 mt-6'}>
                <Button color={'blue'} width={120} height={35} textSize={16} fill={true}onClick={linkClick}>갱신바로가기</Button>
                <Button color={'dark-gray'} width={120} height={35} textSize={16} onClick={clearNotifications}>닫기</Button>
            </div>
        </div>
        </>
    );
}
