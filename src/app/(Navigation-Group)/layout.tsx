"use client"

import Navigation from "@/app/components/common/nav/Navigation";
import CenterPopup from "@/app/components/popup/CenterPopup";
import {useNotifications} from "@/context/NotificationContext";
import {ReactNode} from "react";
    
export default function Layout({children}: {children: ReactNode}) {
    const {noti, resetNoti} = useNotifications();
    return (
        <div className="flex h-full min-h-screen min-w-[1500px]">
            <div className="flex-none">
                <Navigation/>
            </div>
                <div className="flex-grow p-5 bg-gray-50 ml-[90px]">{children}</div>
            <CenterPopup
                isOpen={noti && noti.isOpen}
                onClose={() => resetNoti()}
                title={noti.title}
                noti={noti}
                buttons={[
                    {
                        label: "확인",
                        onClick: () => resetNoti(),
                        color: "main",
                        fill : true,
                        width: 130,
                        height: 40
                    },
                ]}
            />
        </div>
    );
}