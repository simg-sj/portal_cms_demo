/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:13:08
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-04 17:53:14
 * @FilePath: portal_cms_demo_next/src/auth.ts
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
                try{
                    const res = await fetch('https://center-api.simg.kr/api/portal/auth', {method : 'POST', headers : {"Content-Type": "application/json"}, body : JSON.stringify(credentials)});
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || "로그인에 실패했습니다.");
                    }
                    const user = {
                        id: data.userId,
                        platform: data.platform,
                        name: data.name,
                        cell: data.cell
                    };

                    console.log("user" ,user);
                    return user;
                }catch(error){
                    console.error("로그인 오류 ::", error);
                    throw error;
                }
            }
        }),
   ] ,
    secret : process.env.AUTH_SECRET,
    session: {
        strategy: 'jwt', // JSON Web Token 사용
        maxAge: 60 * 60 * 24 // 세션 만료 시간(sec)
    },
    pages: {
        signIn: '/login', // Default: '/auth/signin'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user){
                return {
                    ...token,
                    id: user.id,
                    platform: user.platform,
                    name: user.name,
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            if(token){
                session.user.platform = token.platform;
            }
            return session
        },
        redirect: async ({ url, baseUrl }) => {
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            if (url) {
                const { search, origin } = new URL(url);
                const callbackUrl = new URLSearchParams(search).get('callbackUrl');
                if (callbackUrl) {
                    return callbackUrl.startsWith('/')
                        ? `${baseUrl}${callbackUrl}`
                        : callbackUrl;
                }
                if (origin === baseUrl) return url;
            }
            return baseUrl;
        }
    }
})