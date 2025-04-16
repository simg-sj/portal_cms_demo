"use client";

import React, {createContext, useContext, useEffect, useState} from "react";

// 알림 타입 정의
export interface RenewalData {
    irpk: string;
    productName: string;
    expirationDate: string;
    daysRemaining: number;
}

export interface NotiButton {
    label: string;
    onClick: () => void | Promise<void>;
    color?: string;
    fill?: boolean;
    width?: number;
    height?: number;
}

export interface NotiState {
    type: string;
    isOpen: boolean;
    title: string;
    text: string;
    subText: string;
    buttons?: NotiButton[];
}

interface NotificationContextType {
    renewals: RenewalData[];
    setRenewals: (renewals: RenewalData[]) => void;
    clearNotifications: () => void;
    resetNotiThen: (callback: () => void) => void;

    noti: NotiState;
    setNoti: React.Dispatch<React.SetStateAction<NotiState>>;
    resetNoti: () => void;

    showAlert: (text: string, onClose?: () => void) => void;
    showConfirm: (text: string, onConfirm: () => Promise<void>, onCancel?: () => void) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [afterResetCallback, setAfterResetCallback] = useState<(() => void) | null>(null);
    const [renewals, setRenewals] = useState<RenewalData[]>([]);
    const [noti, setNoti] = useState<NotiState>({
        type: "",
        isOpen: false,
        title: "",
        text: "",
        subText: "",
    });

    const clearNotifications = () => setRenewals([]);
    const resetNoti = () => setNoti({ type: "", isOpen: false, title: "", text: "", subText: "" });
    const resetNotiThen = (callback: () => void) => {
        resetNoti();
        setAfterResetCallback(() => callback);
    };

    const showAlert = (text: string, onClose?: () => void) => {
        setNoti({
            type: "alert",
            isOpen: true,
            title: "알림",
            text,
            subText: "",
            buttons: [
                {
                    label: "확인",
                    onClick: () => {
                        resetNoti();
                        onClose?.();
                    },
                    color: "main",
                    fill: true,
                },
            ],
        });
    };

    const showConfirm = (
        text: string,
        onConfirm: () => Promise<void>,
        onCancel?: () => void
    ) => {
        setNoti({
            type: "confirm",
            isOpen: true,
            title: "알림",
            text,
            subText: "",
            buttons: [
                {
                    label: "취소",
                    onClick: () => {
                        resetNoti();
                        onCancel?.();
                    },
                    color: "gray",
                },
                {
                    label: "확인",
                    onClick: async () => {
                        await onConfirm();
                        resetNoti();
                    },
                    color: "main",
                    fill: true,
                },
            ],
        });
    };

    useEffect(() => {
        if (!noti.isOpen && afterResetCallback) {
            afterResetCallback();
            setAfterResetCallback(null); // 콜백 한 번만 실행되도록 초기화
        }
    }, [noti.isOpen, afterResetCallback]);


    return (
        <NotificationContext.Provider
            value={{
                renewals,
                setRenewals,
                clearNotifications,
                noti,
                setNoti,
                resetNoti,
                resetNotiThen,
                showAlert,
                showConfirm,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotifications는 NotificationProvider 내부에서만 호출해야 합니다.");
    }
    return context;
};
