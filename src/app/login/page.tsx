"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useNotifications } from "@/context/NotificationContext";
import Image from "next/image";
import RoundLogo from "@/assets/images/logo/simg-round-logo.png";

export default function LoginPage() {
    const errorDiv = useRef<HTMLDivElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { data: session, status } = useSession(); // 현재 세션 상태


    // 로그인 폼 제출
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userId = formData.get("userId") as string;
        const password = formData.get("password") as string;

        if (!userId || !password) {
            setError("아이디와 비밀번호를 모두 입력해주세요.");
            if (errorDiv.current) {
                errorDiv.current.style.display = "block";
            }
            return;
        }

        try {
            const res = await signIn("credentials", {
                redirect: false, // 리디렉션 방지
                userId: userId,
                userPwd: password,
            });

            console.log(res);



            if (!res?.ok) {
                setError(res?.error || "로그인 실패. 다시 시도해주세요.");
                if (errorDiv.current) errorDiv.current.style.display = "block";
                return;
            }

            // 로그인 성공 → 세션 업데이트 대기
            console.log("로그인 성공! 세션이 업데이트될 때까지 대기 중...");
        } catch (err) {
            console.error("로그인 처리 중 오류:", err);
            setError("시스템 오류가 발생했습니다. 나중에 다시 시도해주세요.");
        }
    };

    // 세션 상태 확인 및 플랫폼 이동 처리
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            // 세션에서 platform과 bpk를 가져옴
            console.log("세션에서 user 정보 가져오기:", session.user);

            const { platform, bpk } = session.user;

            // 플랫폼 페이지로 이동
            if (platform) {
                router.push(`/${platform}`);
            } else {
                console.error("플랫폼 정보가 없습니다.");
            }

        }
    }, [session, status, router]);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-[670px] px-12 py-36 bg-white flex flex-col items-center shadow-md"
            >
                <Image src={RoundLogo} alt={"SIMG 로고"} width={80} height={80} className="mb-10" />
                <div className="text-gray-500 text-center py-3">
                    에스아이엠지 업체 관리자 페이지입니다. <br /> 회원가입 및 아이디 비밀번호 찾기는 관리자에게 문의해주세요.
                </div>
                <div className="w-[80%] my-5">
                    <label className="text-lg mt-3 block">ID</label>
                    <input
                        type="text"
                        className="px-3 w-full h-10"
                        placeholder="아이디를 입력해주세요"
                        name="userId"
                    />
                    <label className="text-lg mt-3 block">Password</label>
                    <input
                        type="password"
                        className="px-3 w-full h-10"
                        placeholder="비밀번호를 입력해주세요"
                        name="password"
                    />
                </div>
                {error && <div ref={errorDiv} className="text-red-500 mt-2">{error}</div>}
                <button className="text-xl text-white px-10 py-3 rounded-xl bg-blue-500 mt-5 w-[80%] font-medium">
                    로그인
                </button>
            </form>
        </div>
    );
}