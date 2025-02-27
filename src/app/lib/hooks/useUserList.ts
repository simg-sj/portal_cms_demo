/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2025-02-27 15:31:18
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2025-02-27 16:42:09
 * @FilePath: src/app/lib/hooks/useUserList.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


import { useEffect, useState } from "react";
import {UserListType, UserType} from "@/@types/common";
import { getUserData } from "@/app/(Navigation-Group)/action";
import { tabs } from "@/config/data";


export default function useUserList(userInfo: UserType) {
    const [userList, setUserList] = useState<UserListType[] | null>(null);

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const listType = tabs[userInfo.auth]?.[2]?.listType;
                if (!listType) {
                    console.error("오류가 발생하였습니다.");
                    return;
                }
                const data = await getUserData(userInfo.platform, listType);
                setUserList(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserList();
    }, [userInfo]);

    return userList;
}
