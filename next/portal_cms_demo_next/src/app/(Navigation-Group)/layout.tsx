/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-09-30 15:55:24
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 11:20:03
 * @FilePath: portal_cms_demo_next/src/app/(Navigation-Group)/layout.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import {ReactNode} from "react";
import Navigation from "@/app/components/common/Navigation";

    
export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <Navigation/>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}