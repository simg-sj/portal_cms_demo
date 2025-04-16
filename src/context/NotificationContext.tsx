"use client";

import React, { createContext, useContext, useState } from "react";

// 알림 데이터 타입
interface RenewalData {
    irpk: string;
    productName: string;
    expirationDate: string;
    daysRemaining: number;
}

// 알림 팝업 UI 상태 타입
interface NotiState {
    type: string;
    isOpen: boolean;
    title: string;
    text: string;
    subText: string;
}

interface NotificationContextType {
    renewals: RenewalData[];
    setRenewals: (renewals: RenewalData[]) => void;
    clearNotifications: () => void;

    noti: NotiState;
    setNoti: React.Dispatch<React.SetStateAction<NotiState>>;
    resetNoti: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [renewals, setRenewals] = useState<RenewalData[]>([]);
    const [noti, setNoti] = useState<NotiState>({
        type: "",
        isOpen: false,
        title: "",
        text: "",
        subText: "",
    });

    const clearNotifications = () => {
        setRenewals([]);
    };

    const resetNoti = () => {
        console.log("@@@");
        setNoti({
            type: "",
            isOpen: false,
            title: "",
            text: "",
            subText: "",
        });
    };

    return (
        <NotificationContext.Provider
            value={{
                renewals,
                setRenewals,
                clearNotifications,
                noti,
                setNoti,
                resetNoti,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications는 NotificationProvider 내부에서만 호출할 수 있습니다.");
    }
    return context;
};
