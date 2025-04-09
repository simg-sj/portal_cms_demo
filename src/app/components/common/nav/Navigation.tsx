"use client"

import {usePathname} from 'next/navigation';
import LogoutIcon from "@/assets/images/icon/logout-icon.png";
import SimgLogo from "@/assets/images/logo/simg-white-logo.png";
import { useEffect, useState } from "react";
import {getMenuItems, getThemeConfig} from "@/config/themeConfig";
import MenuItem from "@/app/components/common/nav/MenuItem";
import Image from "next/image";
import {useSession} from "next-auth/react";
import {signOutWithForm} from "@/middleware";
import Loading from "@/app/(Navigation-Group)/loading";
import {Theme} from "@/@types/common";


export default function Navigation() {
    const pathname = usePathname();
    const {data } = useSession();
    const [themeConfig, setThemeConfig] = useState<Theme | undefined>( undefined);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    useEffect(() => {
        if (data && data.user) {
            const { service, authLevel } = data.user; // data.user가 존재하는지 확인
            const config = getThemeConfig(service);
            let authPage = [];

            // 마이페이지 이름 추가, 권한 별 보이기
            if(Array.isArray(config.menuItems)){
                authPage = config.menuItems.map((item) =>
                    item.title === "mypage"
                        ? { ...item, label: `${data.user.name}님` }
                        : item);
            }
            authPage = authPage.filter((item) => item.authLevel <= authLevel);

            setThemeConfig({
                ...config,
                menuItems: authPage,
            });
            document.documentElement.setAttribute('data-theme', service);
        }
    }, [data]);

    useEffect(() => {
        const segments = pathname.split('/').filter(Boolean); // 빈 문자열 제거
        if (segments.length > 0) {
            setActiveLink(`/${segments.join('/')}`);
        }
    }, [pathname]);


    if (!themeConfig) {
        return <Loading/>;
    }

    const logoutSubmit = async () => {
        if (window.confirm('로그아웃하시겠습니까?')) {
            await signOutWithForm();
        }
    };

    return (
        <div className="bg-main h-screen fixed w-[90px] p-3 flex flex-col justify-between z-50">
            <div>
                <Image src={themeConfig.logoSrc} alt="업체로고" height={35} className="mt-5 mb-14" priority={true} />
                {themeConfig.menuItems.slice(0, -1).map((item, index) => (
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
                {themeConfig.menuItems.slice(-1).map((item, index) => (
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
                        <Image src={LogoutIcon} alt={"로그아웃"} height={28} width={28}/>
                        <div className="text-white text-xs mt-2">로그아웃</div>
                    </button>
                </form>
                <Image src={SimgLogo} alt="SIMG로고" height={55} className="mb-5 mt-14 ml-1" priority={true}/>
            </div>
        </div>
    );
}