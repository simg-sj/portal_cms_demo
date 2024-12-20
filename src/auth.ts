/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:13:08
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-12-20 09:11:23
 * @FilePath: src/auth.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';

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
                    phone : data.phone,
                    auth : data.auth,
                    authLevel : data.authLevel,
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
            if(user){
                return {
                    ...token,
                    id: user.id,
                    platform: user.platform,
                    bName : user.bName,
                    work : user.work,
                    name: user.name,
                    auth : user.auth,
                    authLevel : user.authLevel,
                    phone : user.phone,
                    email : user.email
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            if(token){
                session.user.platform = token.platform;
                session.user.work = token.work;
                session.user.bName = token.bName;
                session.user.email = token.email;
                session.user.phone = token.phone;
                session.user.id = token.id;
                session.user.auth = token.auth;
                session.user.authLevel = token.authLevel;
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            return baseUrl;
        },
    }
})