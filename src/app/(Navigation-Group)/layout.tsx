"use client"

import Navigation from "@/app/components/common/nav/Navigation";
import {useNotifications} from "@/context/NotificationContext";
import {ReactNode} from "react";
import NotiPopup from "@/app/components/popup/NotiPopup";
    
export default function Layout({children}: {children: ReactNode}) {
    const {noti, resetNoti} = useNotifications();
    return (
        <div className="flex h-full min-h-screen min-w-[1500px]">
            <div className="flex-none">
                <Navigation/>
            </div>
                <div className="flex-grow p-5 bg-gray-50 ml-[90px]">{children}</div>
            <NotiPopup
                isOpen={noti && noti.isOpen}
                title={noti.title}
                noti={noti}
            />
        </div>
    );
}