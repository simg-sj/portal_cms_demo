/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-10-02 14:13:16
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-10-04 11:24:18
 * @FilePath: portal_cms_demo_next/src/middleware.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

const matchersForAuth = [
    
            '/hiparking/*',
            '/hiparking',
            '/',
            '/simg',
            '/simg/*',
]

const platformUrls = {
    'hiparking': [
        '/hiparking/*',
        '/hiparking',
    ],
    'simg': [
        '/simg',
        '/simg/*',
    ],

}
const matchersForSignIn = [
    '/login/*',
    '/login'
]

// 인증을 제외할 경로
const excludeMatchers = [
    '/api/auth/*' // 예외 처리할 API 경로 추가
];


export async function middleware(request: NextRequest) {
    const userInfo = await auth();
    const platFormUrl = userInfo ? `/${userInfo.user.platform}` : null;
    let accessUrls = userInfo ? platformUrls[userInfo.user.platform] : '/';
    

    // 인증이 필요한 페이지 접근 제어
    if (isPathMatch(request.nextUrl.pathname, matchersForAuth)) {
        if (!userInfo) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // 현재 경로가 이미 platFormUrl인 경우 리다이렉트하지 않음
        if (!isPathMatch(request.nextUrl.pathname, accessUrls)) {
            return NextResponse.redirect(new URL(platFormUrl, request.url));
        }
    }

    // 인증 후 로그인 페이지 접근 제어
    if (isPathMatch(request.nextUrl.pathname, matchersForSignIn)) {
        if (userInfo && !isPathMatch(request.nextUrl.pathname, accessUrls)) {
            return NextResponse.redirect(new URL(platFormUrl, request.url));
        }
    }

    return NextResponse.next();
}

function isPathMatch(pathname: string, urls: string[]) {
    return urls.some(url => {
        const regex = new RegExp('^' + url.replace('*', '.*') + '$');
        return regex.test(pathname);
    });
}