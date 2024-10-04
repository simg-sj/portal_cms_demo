/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:13:08
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-04 11:27:39
 * @FilePath: portal_cms_demo_next/src/auth.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import {getSession} from "next-auth/react";
import {NextApiRequest} from "next";
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
                const user = { id : 'test',  password : '1234', platform : 'hiparking', name : '홍길동', email : '이메일'}
                if(user){
                    return user;
                }else {
                    return null;
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
        signIn: '/login' // Default: '/auth/signin'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user){
                token.name = user.name
                token.email = user.email
                token.id = user.id
                token.platform = user.platform
            }
            return token
        },
        session: async ({ session, token }) => {
            if(token){
                session.user.platform = token.platform;
            }
            return session
        },
        redirect: async ({ url, baseUrl, token }) => {
            console.log('url ::' , url);
            console.log('baseUrl::' , baseUrl);
            console.log('token', token)
            if (url.startsWith('/')) return `${baseUrl}${url}`
            if (url) {
                console.log("@@")
                const { search, origin } = new URL(url)
                console.log(search)
                console.log("origin",origin)
                const callbackUrl = new URLSearchParams(search).get('callbackUrl')
                console.log("callbackUrl",callbackUrl)
                if (callbackUrl)
                    return callbackUrl.startsWith('/')
                        ? `${baseUrl}${callbackUrl}`
                        : callbackUrl
                if (origin === baseUrl) return url
            }
            return baseUrl
        }
    }
})