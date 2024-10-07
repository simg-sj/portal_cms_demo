/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-09-30 15:58:57
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 11:07:37
 * @FilePath: portal_cms_demo_next/src/app/components/common/MenuItem.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import Link from "next/link";
import Image from 'next/image';


export default function MenuItem({icon, label, link, isActive, onClick}: MenuItemProps){
    return (
        <Link
            href={link}
            className={`px-1 py-2 flex flex-col items-center my-5 cursor-pointer rounded-md 
            ${isActive ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-30'}`}
            onClick={onClick}
        >
            <Image src={icon} alt={label} width={35} />
            <div className="text-white text-sm mt-2">{label}</div>
        </Link>
    )
}