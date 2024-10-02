/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-09-30 15:55:24
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-09-30 16:26:52
 * @FilePath: portal_cms_demo_next/src/app/hiparking/layout.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
 "use client"
import {ReactNode} from "react";
import Navigation from "@/app/components/common/Navigation";

    
export default function Layout({children}: {children: ReactNode}) {
        
    return (
        <Navigation>
            {children}
        </Navigation>
    );
}