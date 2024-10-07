/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-09-30 15:46:29
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-04 17:52:35
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
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setError(null); // 이전 에러 메시지 초기화

        const result = await signInWithCredentials(formData);
        console.log(result)
        if (!result.success) {
            // 에러 메시지 표시
            alert(result.error)
            setError(result.error || "로그인에 실패했습니다.");
            return;
        }
        console.log(result);
        // 로그인 성공 시 해당 플랫폼 페이지로 리다이렉트
        if (result.platform) {
            router.push(`/${result.platform}`);
        } else {
            router.push('/'); // 플랫폼 정보가 없는 경우 기본 페이지로
        }
    };

    return (
        <div className={'w-screen h-screen relative flex justify-center items-center bg-gray-50'}>
            <form action={handleSubmit} className={'w-[670px] px-12 py-36 bg-white flex flex-col items-center absolute shadow-md'}>
                <Image src={RoundLogo} alt={'SIMG 로고'} width={80} className={'mb-10'}/>
                <div className={'text-gray-500 text-center py-3'}>에스아이엠지 업체 관리자 페이지 입니다. <br/> 회원가입 및 아이디 비밀번호 찾기는 관리자에게 문의해주세요.</div>
                <div className={'w-[80%] my-5'}>
                    <div className={'text-lg mt-3'}>ID</div>
                    <input type={'text'} className={'px-3 w-full h-10'} placeholder={'아이디를 입력해주세요'} name='userId'/>
                    <div className={'text-lg mt-3'}>Password</div>
                    <input type={'password'} className={'px-3 w-full h-10'} placeholder={'비밀번호를 입력해주세요'}
                           name='password'/>
                </div>
                {/*<div ref={errorDiv} className={'text-red-500 mt-2 hidden'}>아이디 혹은 비밀번호가 틀립니다. 다시 입력 해주세요</div>*/}
                <button className={'text-xl text-white px-10 py-3 rounded-xl bg-[#5C7DED] mt-5 w-[80%] font-medium'}>
                    Login
                </button>
            </form>
        </div>
    );
}