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
        <div className="fixed top-4 right-4 w-[350px] bg-white shadow-lg rounded-lg px-8 py-6 z-50 opacity-95">
            <div className={'flex items-center mb-3'}>
                <Image
                    src={WarningIcon.src}
                    alt={'경고'}
                    width={18}
                    height={18}
                    className={'cursor-pointer mr-2'}
                />
                <div className={'text-gray-800'}>증권 갱신일이 얼마남지 않았어요!</div>
            </div>
                {renewals.map((item, index) => (
                    <div key={item.irpk} className="mt-1 text-sm">
                        <strong>{item.productName}</strong> 증권 갱신일이 <b className={'text-red-500'}>{item.daysRemaining}</b>일 남았습니다.
                    </div>
                ))}
            <div className={'flex justify-end space-x-2 mt-3'}>
                <Button color={'red'} width={100} height={26} textSize={14} fill={true}onClick={linkClick}>갱신바로가기</Button>
                <Button color={'dark-gray'} width={65} height={26} textSize={14} onClick={clearNotifications}>닫기</Button>
            </div>
        </div>
    );
}
