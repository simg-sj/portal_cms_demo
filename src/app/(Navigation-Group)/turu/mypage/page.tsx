"use client"

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "@/app/(Navigation-Group)/loading";
import type {UserType} from "@/@types/common";
import MyPageContainer from "@/app/components/pageComponents/mypqge/myPageContainer";


export default function Page() {
    const { data, status } = useSession();
    const [userInfo, setUserInfo] = useState<UserType>();  // 초기값을 null로 설정

    useEffect(() => {
        if (data && data.user) {
            setUserInfo({
                index: 0,
                name: data.user.name ,
                bpk : data.user.bpk,
                email: data.user.email,
                auth: data.user.auth ,
                bName: data.user.bName,
                platform : data.user.platform,
                userId: data.user.id ,
                password: data.user.password,
                phone: data.user.phone,
                authLevel: data.user.authLevel,
                work: data.user.work
            });
        }
    }, [data]);

    return (
        <>
            {
                status === "loading" || !userInfo ?
                    <Loading/>
                    :
                    <MyPageContainer userInfo={userInfo} />
            }
        </>
    )
}
