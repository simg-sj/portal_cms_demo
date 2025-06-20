"use client"

import Navigation from "@/app/components/common/nav/Navigation";
import {useNotifications} from "@/context/NotificationContext";
import {ReactNode} from "react";
import NotiPopup from "@/app/components/popup/NotiPopup";
    
export default function Layout({children}: {children: ReactNode}) {
    const {noti} = useNotifications();
    return (
        <div className="flex h-full min-h-screen">
            <div className="flex-none">
                <Navigation/>
            </div>
                <div className="flex-grow p-5 bg-gray-50 pt-[80px] lg:ml-[90px] lg:pt-5">{children}</div>
            <NotiPopup
                isOpen={noti && noti.isOpen}
                title={noti.title}
                noti={noti}
            />
        </div>
    );
}