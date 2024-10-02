/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:13:16
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-02 16:55:09
 * @FilePath: portal_cms_demo_next/src/middleware.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from 'path-to-regexp'
import { auth } from '@/auth'

const matchersForAuth = [
    '/hiparking/*',
    '/simg/*',
    '/'
]
const matchersForSignIn = [
    '/login/*'
]
export async function middleware(request: NextRequest) {
    // 인증이 필요한 페이지 접근 제어!
    if (isPathMatch(request.nextUrl.pathname, matchersForAuth)) {
        return (await auth()) // 세션 정보 확인
            ? NextResponse.next()
            : NextResponse.redirect(new URL('/login', request.url))
    }
    // 인증 후 회원가입 및 로그인 접근 제어!
    if (isPathMatch(request.nextUrl.pathname, matchersForSignIn)) {
        return (await auth())
            ? NextResponse.redirect(new URL('/', request.url))
            : NextResponse.next()
    }
    return NextResponse.next()
}

function isPathMatch(pathname: string, urls: string[]) {
    return urls.some(url => {
        const regex = new RegExp('^' + url.replace('*', '.*') + '$');
        return regex.test(pathname);
    });
}