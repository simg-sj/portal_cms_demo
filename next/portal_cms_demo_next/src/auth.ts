/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:13:08
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 16:56:35
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
                const user = { id : 'test',  password : '1234', platform : 'hiparking'}
                if(user){
                    console.log("user",user)
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
        signIn: async () => {
            return true
        },
        jwt: async ({ token, user }) => {
            if(user){
                token.platform = user.platform
            }
            return token
        },
        session: async ({ session, token }) => {
            if(token){
                session.user.platform
            }
            return session
        },
        redirect : async ({url, baseUrl}) => {
            console.log(url)
            console.log(baseUrl)
            if (url.startsWith('/')) return console.log("@@")
            if (url) {
                const { search, origin } = new URL(url)
                const callbackUrl = new URLSearchParams(search).get('callbackUrl')
                console.log("@@2")
                if (callbackUrl){
                    console.log("@@3", callbackUrl)
                    return callbackUrl.startsWith('/')
                        ? `${baseUrl}${callbackUrl}`
                        : callbackUrl
                    if (origin === baseUrl) return url
                }
            }
            console.log("@@4")
            return baseUrl
        }
    }
})