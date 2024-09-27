import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getThemeConfig, ThemeConfig } from '../../config/themeConfig.ts';
import DashboardIcon from '../../assets/images/icon/dashboard-icon.png';
import ListIcon from '../../assets/images/icon/list-icon.png';
import UserIcon from '../../assets/images/icon/user-icon.png';
import LogoutIcon from '../../assets/images/icon/logout-icon.png';
import SimgLogo from '../../assets/images/logo/simg-white-logo.png';

const MenuItem = ({icon, label, link, isActive}: MenuItemProps) => (
    <Link
        to={link}
        className={`px-1 py-2 flex flex-col items-center my-5 cursor-pointer rounded-md 
                ${isActive
            ? 'bg-white bg-opacity-30'
            : 'hover:bg-white hover:bg-opacity-30'}`}
    >
        <img src={icon} alt={label} width={35} />
        <div className="text-white text-sm mt-2">{label}</div>
    </Link>
);

const Navigation = () => {
    const location = useLocation();
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>(getThemeConfig('simg'));

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            const config = getThemeConfig(savedTheme);
            setThemeConfig(config);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const getMenuItems = (config: ThemeConfig): MenuItemType[] => {
        const baseItems = [
            { icon: DashboardIcon, label: "대시보드", link: config.menuItems.dashboard || "" },
            { icon: ListIcon, label: "리스트", link: config.menuItems.list },
            { icon: UserIcon, label: "마이페이지", link: config.menuItems.mypage },
        ];

        return baseItems.filter(item => item.link !== "");
    };

    const menuItems = getMenuItems(themeConfig);

    const navigate = useNavigate();
    const logoutClick = () => {
        if(window.confirm('로그아웃 하시겠습니까?')) {
            navigate('/');
        }
    };

    return (
        <div className="bg-main h-screen w-[100px] p-3 flex flex-col justify-between">
            <div>
                <img src={themeConfig.logoSrc} alt="업체로고" className="mt-5 mb-14" />
                {menuItems.slice(0, -1).map((item, index) => (
                    <MenuItem
                        key={index}
                        {...item}
                        isActive={location.pathname === item.link}
                    />
                ))}
            </div>
            <div>
                {menuItems.slice(-1).map((item, index) => (
                    <MenuItem
                        key={index}
                        {...item}
                        isActive={location.pathname === item.link}
                    />
                ))}
                <Link
                    to={'/'}
                    onClick={logoutClick}
                    className={'px-1 py-2 flex flex-col items-center my-5 cursor-pointer rounded-md hover:bg-white hover:bg-opacity-30'}>
                    <img src={LogoutIcon} alt={"로그아웃"} width={35} />
                    <div className="text-white text-sm mt-2">로그아웃</div>
                </Link>
                <img src={SimgLogo} alt="SIMG로고" className="mb-5 mt-14" />
            </div>
        </div>
    );
};

export default Navigation;