/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-09-30 15:46:29
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-07 17:46:47
 * @FilePath: portal_cms_demo_next/src/app/login/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
"use client"

import React, {useState, useRef, useEffect} from 'react';
import RoundLogo from "@/assets/images/logo/simg-round-logo.png";
import Image from "next/image";
import {signInWithCredentials} from "@/app/serverActions/auth";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


export default function Page() {
    const errorDiv = useRef<HTMLDivElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const {data} = useSession();
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            let formData = new FormData(e.currentTarget);
            const response = await signInWithCredentials(formData);
            
            if(!response.success){
                setError(response.message);
                if(errorDiv.current){
                    errorDiv.current.style.display="block";
                }
            }else {
                window.location.reload();
                if(data){
                    router.push(`/${data.user.platform}`);
                }
            }
        }catch(error){
            console.log(error);
        }
        
    };

    return (
        <div className={'w-screen h-screen relative flex justify-center items-center bg-gray-50'}>
            <form onSubmit={handleSubmit} className={'w-[670px] px-12 py-36 bg-white flex flex-col items-center absolute shadow-md'}>
                <Image src={RoundLogo} alt={'SIMG 로고'} width={80} className={'mb-10'}/>
                <div className={'text-gray-500 text-center py-3'}>에스아이엠지 업체 관리자 페이지 입니다. <br/> 회원가입 및 아이디 비밀번호 찾기는 관리자에게 문의해주세요.</div>
                <div className={'w-[80%] my-5'}>
                    <div className={'text-lg mt-3'}>ID</div>
                    <input type={'text'} className={'px-3 w-full h-10'} placeholder={'아이디를 입력해주세요'} name='userId'/>
                    <div className={'text-lg mt-3'}>Password</div>
                    <input type={'password'} className={'px-3 w-full h-10'} placeholder={'비밀번호를 입력해주세요'}
                           name='password'/>
                </div>
                <div ref={errorDiv} className={'text-red-500 mt-2 hidden'}>아이디 혹은 비밀번호가 틀립니다. 다시 입력 해주세요</div>
                <button className={'text-xl text-white px-10 py-3 rounded-xl bg-[#5C7DED] mt-5 w-[80%] font-medium'}>
                    Login
                </button>
            </form>
        </div>
    );
}

