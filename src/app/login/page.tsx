"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import RoundLogo from "@/assets/images/logo/simg-round-logo.png";

export default function LoginPage() {
    const errorDiv = useRef<HTMLDivElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userId = formData.get("userId") as string;
        const password = formData.get("password") as string;

        if (!userId || !password) {
            setError("아이디와 비밀번호를 모두 입력해주세요.");
            if (errorDiv.current) errorDiv.current.style.display = "block";
            return;
        }

        try {
            const res = await signIn("credentials", {
                redirect: false,
                userId,
                password,
            });


            if (res?.ok) {
                const msg =
                    res.error === "CredentialsSignin" && "아이디 또는 비밀번호가 잘못되었습니다."
                setError(msg);
                if (errorDiv.current) errorDiv.current.style.display = "block";
            }

        } catch (err) {
            console.error("로그인 처리 중 오류:", err);
            setError("시스템 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const { service } = session.user as any;
            if (service) {
                router.push(`/${service}`);
            } else {
                setError("플랫폼 정보가 없습니다.");
            }
        }
    }, [session, status, router]);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-[670px] px-5 md:px-12 py-36 bg-white flex flex-col items-center shadow-md"
            >
                <Image src={RoundLogo} alt={"SIMG 로고"} width={80} height={80} className="mb-10" />
                <div className="text-gray-500 text-center py-3 break-keep">
                    에스아이엠지 업체 관리자 페이지입니다. <br /> 회원가입 및 아이디 비밀번호 찾기는 관리자에게 문의해주세요.
                </div>
                <div className="md:w-[80%] w-full my-5">
                    <label className="text-lg mt-3 block">ID</label>
                    <input
                        type="text"
                        className="px-3 w-full h-10 border"
                        placeholder="아이디를 입력해주세요"
                        name="userId"
                    />
                    <label className="text-lg mt-3 block">Password</label>
                    <input
                        type="password"
                        className="px-3 w-full h-10 border"
                        placeholder="비밀번호를 입력해주세요"
                        name="password"
                    />
                </div>
                {error && (
                    <div ref={errorDiv} className="text-red-500 mt-2">
                        {error}
                    </div>
                )}
                <button className="text-lg md:text-xl text-white px-10 py-3 rounded-xl bg-blue-500 mt-5 w-full md:w-[80%] font-medium">
                    로그인
                </button>
            </form>
        </div>
    );
}
