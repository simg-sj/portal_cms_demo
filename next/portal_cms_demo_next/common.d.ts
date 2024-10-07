/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 15:41:12
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-04 15:31:22
 * @FilePath: portal_cms_demo_next/common.d.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
interface UserInfo {
    userId: string;
    password: string;
}

interface UserData {
    userId: string;
    password: string;
    affiliation: string;
}

interface MenuItemType {
    icon: string,
    label: string,
    link: string,
}

interface MenuItemProps extends MenuItemType {
    isActive: boolean;
}

interface ThemeConfigs {
    [key: string]: ThemeConfig;
}


interface ThemeConfig {
    logoSrc: string;
    menuItems: {
        dashboard?: string;
        list?: string;
        mypage: string;
    };
}

declare module "next-auth" {
    import {DefaultSession} from "@auth/core/types";
    import { JWT } from "next-auth/jwt"
    interface Session {
        user: {
            id: string
            name: string
            email : string
            platform: string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        platform : string;
        id: string
        role: string
        name : string
        email : string
    }
}
