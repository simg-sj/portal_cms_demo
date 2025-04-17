"use client";

import React from "react";
import { NotiState, useNotifications } from "@/context/NotificationContext";
import Image from "next/image";
import Close from '@/assets/images/icon/close-icon.png';
import Button from "@/app/components/common/ui/button/button";

interface Props {
    isOpen: boolean;
    title: string;
    noti: NotiState;
}

export default function NotiPopup({ isOpen, title, noti }: Props) {
    if (!isOpen) return null;

    const { resetNoti,showAlert } = useNotifications();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg min-w-[500px] max-w-[800px]">
                <div className="flex justify-between items-center px-8 py-6">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Image
                        src={Close}
                        alt={'닫기'}
                        width={16}
                        height={16}
                        className={'mr-1 cursor-pointer'}
                        onClick={resetNoti}
                    />
                </div>
                <div className="px-8 py-3">
                    <div className="text-center mb-5">
                        <p className="text-lg">{noti.text}</p>
                        <p className="text-gray-500 text-sm mt-2">{noti.subText}</p>
                    </div>
                </div>
                <div className="flex justify-center px-8 py-5 space-x-10">
                    {noti.buttons?.map((button, index) => (
                        <div key={index}>
                            <Button
                                onClick={async () => {
                                    try {
                                        await button.onClick(); // ✅ 여기가 핵심
                                    } catch (e) {
                                        showAlert('서비스 오류입니다.');
                                    }
                                }}
                                color={button.color}
                                fill={button.fill}
                                width={130}
                                height={40}
                            >
                                {button.label}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
