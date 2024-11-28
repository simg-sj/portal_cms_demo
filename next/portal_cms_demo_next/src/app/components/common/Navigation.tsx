"use client"

import {usePathname} from 'next/navigation';
import LogoutIcon from "@/assets/images/icon/logout-icon.png";
import SimgLogo from "@/assets/images/logo/simg-white-logo.png";
import { useEffect, useState } from "react";
import { getThemeConfig } from "@/config/themeConfig";
import DashboardIcon from "@/assets/images/icon/dashboard-icon.png";
import ListIcon from "@/assets/images/icon/list-icon.png";
import UserIcon from "@/assets/images/icon/user-icon.png";
import CarIcon from "@/assets/images/icon/parking-icon.png";
import MenuItem from "@/app/components/common/MenuItem";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {signOutWithForm} from "@/app/lib/action/auth";
import Loading from "@/app/(Navigation-Group)/loading";
import {MenuItemType, Theme} from "@/@types/common";


export default function Navigation() {
    const pathname = usePathname();
    const {data } = useSession();
    const [themeConfig, setThemeConfig] = useState<Theme | null>(null);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    useEffect(() => {
        if (data && data.user) {
            const { platform } = data.user; // data.user가 존재하는지 확인
            const config = getThemeConfig(platform);
            setThemeConfig(config);
            document.documentElement.setAttribute('data-theme', platform);
        }
    }, [data]);

    useEffect(() => {
        const segments = pathname.split('/').filter(Boolean); // 빈 문자열 제거
        if (segments.length > 0) {
            setActiveLink(`/${segments.join('/')}`);
        }
    }, [pathname]);

    const getMenuItems = (config: Theme): MenuItemType[] => {
        const baseItems = [
            { icon: DashboardIcon, label: "대시보드", link: config.menuItems.dashboard || "" },
            { icon: ListIcon, label: "사고리스트", link: config.menuItems.accidentList },
            { icon: CarIcon, label: "사업장관리", link: config.menuItems.parkingList },
            { icon: UserIcon, label: `${data?.user?.name}님`, link: config.menuItems.mypage },
        ];
        return baseItems.filter(item => item.link !== "");
    };

    const menuItems = themeConfig ? getMenuItems(themeConfig) : [];

    if (!themeConfig) {
        return <Loading/>;
    }

    const logoutSubmit = async () => {
        if (window.confirm('로그아웃하시겠습니까?')) {
            await signOutWithForm();
        }
    };

    return (
        <div className="bg-main h-screen fixed w-[100px] p-3 flex flex-col justify-between z-50">
            <div>
                <Image src={themeConfig.logoSrc} alt="업체로고" height={50} className="mt-5 mb-14" priority={true} />
                {menuItems.slice(0, -1).map((item, index) => (
                    <div key={index}>
                        <MenuItem
                            {...item}
                            isActive={activeLink === item.link}
                            onClick={() => setActiveLink(item.link)}
                        />
                    </div>
                ))}
            </div>
            <div>
                {menuItems.slice(-1).map((item, index) => (
                    <div key={index}>
                        <MenuItem
                            {...item}
                            isActive={activeLink === item.link}
                            onClick={() => setActiveLink(item.link)}
                        />
                    </div>
                ))}
                <form
                    action={logoutSubmit}
                    className={'px-1 py-2 flex  flex-col items-center my-5 cursor-pointer rounded-md hover:bg-white hover:bg-opacity-30'}>
                    <button className={'flex flex-col items-center'}>
                        <Image src={LogoutIcon} alt={"로그아웃"} height={35} width={35}/>
                        <div className="text-white text-sm mt-2">로그아웃</div>
                    </button>
                </form>
                <Image src={SimgLogo} alt="SIMG로고" height={70} className="mb-5 mt-14" priority={true}/>
            </div>
        </div>
    );
}