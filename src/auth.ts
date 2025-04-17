/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:13:08
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2025-03-10 13:38:23
 * @FilePath: src/auth.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import {token} from "stylis";

export const {
    handlers,
    signIn,
    signOut,
    auth,
} = NextAuth({
    providers: [
        Credentials({
            credentials : {
                userId : {label : 'userId', type : 'text'},
                password : {label : 'password', type : 'password'}
            },
            async authorize(credentials) {
                const res = await fetch('https://center-api.simg.kr/api/portal/auth', {method : 'POST', headers : {"Content-Type": "application/json"}, body : JSON.stringify(credentials)});
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "로그인에 실패했습니다.");
                }

                const user = {
                    id: data.userId,
                    platform: data.platform,
                    work : data.work,
                    bName : data.bName,
                    name: data.name,
                    email: data.mail,
                    emailVerified: null, // Add emailVerified property with a default value
                    bNo : data.bNo,
                    phone : data.phone,
                    auth : data.auth,
                    bpk : data.bpk,
                    authLevel : data.authLevel,
                    service : data.service,
                    subYn : data.subYn,
                    userId: data.userId,
                    password: "" // Add a default password field to match the User type
                };

                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
   ] ,
    secret : process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt', // JSON Web Token 사용
        maxAge: 60 * 60 // 세션 만료 시간(sec)
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
    },
    callbacks: {
        jwt: async ({ token, user  }) => {
            if (user) {
                token = {
                    ...token,
                    id: user.id,
                    platform: user.platform,
                    bName: user.bName,
                    work: user.work,
                    name: user.name,
                    auth: user.auth,
                    bpk: user.bpk,
                    bNo: user.bNo,
                    authLevel: user.authLevel,
                    phone: user.phone,
                    email: user.email,
                    subYn: user.subYn,
                    service: user.service,
                };
            }
            return token;
    },
    session: async ({ session, token }) => {
        session.user = {
            emailVerified: undefined,
            id: token.id as string,
            platform: token.platform as string,
            bName: token.bName as string,
            work: token.work as string,
            name: token.name as string,
            auth: token.auth as string,
            bpk: token.bpk as number,
            bNo: token.bNo as string,
            authLevel: token.authLevel as number,
            phone: token.phone as string,
            email: token.email as string,
            subYn: token.subYn as string,
            service: token.service as string,
            userId: token.id as string,
            password: "" // default password as required by AdapterUser
        };

        return session;
    },

    async redirect({ url, baseUrl }) {
        if (url.startsWith('/')) return `${baseUrl}${url}`;
        return baseUrl;
    },
    }
})