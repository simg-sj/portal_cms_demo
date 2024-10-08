import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/common.css";
import React from "react";
import AuthWrapper from "@/app/auth_wrapper";

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "SIMG PORTAL CMS",
  description: "SIMG 통합 CMS",
  icons : {
      icon : '/simg-favicon.png',
  }
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
      <AuthWrapper>
          {children}
      </AuthWrapper>
      </body>
      </html>
  );
}

