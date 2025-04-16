import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/common.css";
import React, { Suspense } from "react";
import AuthWrapper from "@/app/auth_wrapper";
import Loading from "@/app/(Navigation-Group)/loading";
import { NotificationProvider } from "@/context/NotificationContext"; // 알림 Context 추가

const pretendard = localFont({
    src: "./fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
    variable: "--font-pretendard",
});

export const metadata: Metadata = {
    title: "SIMG PORTAL CMS",
    description: "SIMG 통합 CMS",
    icons: {
        icon: "/simg-favicon.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="kr" className={`${pretendard.variable}`}>
        <head>
            <title>SIMG PORTAL CMS</title>
        </head>
        <body className={pretendard.className}>
        <NotificationProvider> {/* NotificationProvider를 여기에 추가 */}
            <AuthWrapper>
                <Suspense fallback={<Loading />} />
                {children}
            </AuthWrapper>
        </NotificationProvider>
        </body>
        </html>
    );
}