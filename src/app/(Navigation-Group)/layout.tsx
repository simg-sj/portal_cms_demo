"use client";

import Navigation from "@/app/components/common/nav/Navigation";
import { useNotifications } from "@/context/NotificationContext";
import { ReactNode } from "react";
import NotiPopup from "@/app/components/popup/NotiPopup";

export default function Layout({ children }: { children: ReactNode }) {
  const { noti } = useNotifications();
  return (
    <div className="flex h-full min-h-screen">
      <div className="flex-none">
        <Navigation />
      </div>
      <div className="flex-grow bg-gray-50 px-2 pt-[80px] lg:pt-4 pb-4 sm:px-5 lg:ml-[90px]">
        {children}
      </div>
      <NotiPopup isOpen={noti && noti.isOpen} title={noti.title} noti={noti} />
    </div>
  );
}
