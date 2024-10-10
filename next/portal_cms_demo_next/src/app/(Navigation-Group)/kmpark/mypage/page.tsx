"use client"

/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 11:05:37
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-08 17:35:18
 * @FilePath: portal_cms_demo_next/src/app/(Navigation-Group)/kmpark/mypage/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import {useSession} from "next-auth/react";

export default function Page() {
    const {data} = useSession();
    return (
        <div className="flex px-8 py-6">
            <div className='basis-1/3 flex flex-col'>
                <div>
                    이미지
                </div>
                <div className='flex flex-col'>
                    <div>
                        {data?.user?.name}
                    </div>
                    <div>
                        {data?.user?.name}
                    </div>
                    <div>
                        {data?.user?.name}
                    </div>
                </div>
            </div>
            <div className='basis-2/3'>
                <div>
                    <ul className=''>
                        <li>
                            s
                        </li>
                        <li>
                            s
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}