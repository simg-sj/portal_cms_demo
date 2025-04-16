"use client"

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "@/app/(Navigation-Group)/loading";
import type { UserType} from "@/@types/common";
import MyPageContainer from "@/app/components/pageComponents/mypqge/myPageContainer";
import {getUserData} from "@/app/(Navigation-Group)/action";


export default function Page() {
    const { data, status } = useSession();

    const fetchUser = async (pk : number, infoId : string) => {
        try{
            const result = await getUserData(pk, '', 'SELECT', infoId);
            const {bpk,userId, uCell, bName, uAuth, authLevel, platform, uMail, uName, work} = result[0];

            console.log(result);
            setUserInfo({
                upk: 0,
                bpk : bpk,
                irpk : 1,
                auth: uAuth ,
                name:  uName,
                bName : bName,
                userId: userId,
                email: uMail,
                phone : uCell,
                platform: platform,
                work : work,
                authLevel: authLevel,
            })
        }catch(e){

        }
    }
    const [userInfo, setUserInfo] = useState<UserType>();  // 초기값을 null로 설정
    useEffect(() => {
        if (data && data.user) {
            const {bpk, userId} = data.user;
            fetchUser(bpk, userId);
        }
    }, [data]);
    return (
        <>
            {
                status === "loading" || !userInfo ?
                    <Loading/>
                    :
                    <MyPageContainer userInfo={userInfo} setUserInfo={setUserInfo} />
            }
        </>
    )
}
