"use client"; // 클라이언트 컴포넌트

import React, { createContext, useContext, useState } from "react";

// 알림 데이터 타입 정의
interface RenewalData {
    irpk: string;
    productName: string;
    expirationDate: string;
    daysRemaining: number;
}

interface NotificationContextType {
    renewals: RenewalData[]; // 알림 데이터 배열
    setRenewals: (renewals: RenewalData[]) => void; // 갱신 데이터 설정 함수
    clearNotifications: () => void; // 알림 전체 삭제 (초기화)
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                  children,
                                                                              }) => {
    const [renewals, setRenewals] = useState<RenewalData[]>([]);

    // 알림 데이터 초기화
    const clearNotifications = () => {
        setRenewals([]);
    };

    return (
        <NotificationContext.Provider
            value={{ renewals, setRenewals, clearNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotifications는 NotificationProvider 내부에서만 호출할 수 있습니다."
        );
    }
    return context;
};