/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 17:12:04
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 17:12:11
 * @FilePath: portal_cms_demo_next/src/app/auth_wrapper.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { SessionProvider } from "next-auth/react";

type Props = {
    children:React.ReactNode;
}

export default function AuthWrapper({ children }: Props) {
    return <SessionProvider>{children}</SessionProvider>;
}