import Link from "next/link";
import Image from "next/image";
import { MenuItemProps } from "@/@types/common";
import React from "react";
import { useNotifications } from "@/context/NotificationContext";

export default function MenuItem({
  icon,
  label,
  link,
  isActive,
  onClick,
}: MenuItemProps) {
  const { renewals } = useNotifications(); // 알림 데이터 가져오기

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={link}
      className={`relative my-5 flex cursor-pointer items-center rounded-md px-4 py-4 lg:flex-col lg:px-1 lg:py-2 ${isActive ? "bg-white bg-opacity-30" : "hover:bg-white hover:bg-opacity-30"}`}
      onClick={handleClick}
    >
      <Image src={icon} alt={label} width={28} />
      <div className="ml-5 mt-0 text-[16px] text-white lg:ml-0 lg:mt-2 lg:text-[12px]">
        {label}
      </div>
      {label === "보험관리" && renewals.length > 0 && (
        <div className="absolute right-1 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm text-white">
          !
        </div>
      )}
    </Link>
  );
}
