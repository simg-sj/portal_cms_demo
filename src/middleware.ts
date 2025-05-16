import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';
import { signOut } from 'next-auth/react';

// 플랫폼별 경로 및 최소 권한 레벨 정의
const platformUrls = {
    hiparking: [
        { path: '/hiparking/*', minAuthLevel: 1 },
        { path: '/hiparking', minAuthLevel: 1 },
    ],
    simg: [
        { path: '/simg', minAuthLevel: 1 },
        { path: '/simg/*', minAuthLevel: 1 },
    ],
    kmpark: [
        { path: '/kmpark', minAuthLevel: 1 },
        { path: '/kmpark/*', minAuthLevel: 1 },
    ],
    turu: [
        { path: '/turu', minAuthLevel: 4 },
        { path: '/turu/*', minAuthLevel: 1 },
    ],
    starpickers: [
        { path: '/starpickers', minAuthLevel: 1 },
        { path: '/starpickers/*', minAuthLevel: 1 },
    ],
    kakao: [
        { path: '/kakao', minAuthLevel: 1 },
        { path: '/kakao/*', minAuthLevel: 1 },
    ],
};

// 예외 경로 정의
const excludeMatchers = [
    '/api/auth/*',
    '/_next/static/*',
    '/favicon.ico',
    '.*\\.(png|jpg|jpeg|gif|ico|svg|webp)$',
];

// 경로 매칭 함수
function isPathMatch(pathname: string, patterns: string[]) {
    return patterns.some((pattern) => {
        const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
        return regex.test(pathname);
    });
}

// 권한 검사 함수
function isAuthorized(pathname: string, urls: { path: string; minAuthLevel: number }[], authLevel: number) {
    return urls.some(({ path, minAuthLevel }) => {
        const regex = new RegExp('^' + path.replace('*', '.*') + '$');
        return regex.test(pathname) && authLevel >= minAuthLevel;
    });
}

// 로그아웃 처리 함수
export const signOutWithForm = async () => {
    try {
        await signOut({
            redirectTo: '/login',
            redirect: true,
        });
    } catch (error) {
        console.error('로그아웃 중 에러 발생:', error);
    }
};

// 미들웨어
export async function middleware(request: NextRequest) {
    const userInfo = await auth();
    const { pathname } = request.nextUrl;

    const userPlatform = userInfo?.user?.service || '';
    const userAccessUrls = platformUrls[userPlatform] || [];
    const allowedPaths = userAccessUrls.map((url) => url.path).filter((path): path is string => typeof path === 'string');

    const userAuthLevel = userInfo?.user?.authLevel || 0;

    // ✅ 권한에 따라 루트 경로 분기
    let userHomeUrl = `/${userPlatform}`;

    if (userAuthLevel <= 4) {
        switch (userPlatform) {
            case 'turu':
                userHomeUrl = '/turu/insuRequest';
                break;
            default:
                userHomeUrl = `/${userPlatform}`;
        }
    }

    // 1. 예외 경로
    if (isPathMatch(pathname, excludeMatchers)) {
        return NextResponse.next();
    }

    // 2. 루트 ('/')
    if (pathname === '/') {
        if (userInfo) {
            return NextResponse.redirect(new URL(userHomeUrl, request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 3. 로그인 페이지
    if (pathname === '/login') {
        if (userInfo) {
            return NextResponse.redirect(new URL(userHomeUrl, request.url));
        }
        return NextResponse.next();
    }

    // 4. 로그아웃 요청은 통과
    if (pathname === '/logout') {
        return NextResponse.next();
    }

    // 5. 플랫폼 경로 접근 제한
    if (!isPathMatch(pathname, allowedPaths)) {
        return NextResponse.redirect(new URL(userHomeUrl, request.url));
    }

    // 6. 권한 검사
    if (!isAuthorized(pathname, userAccessUrls, userAuthLevel)) {
        return NextResponse.redirect(new URL(userHomeUrl, request.url));
    }

    return NextResponse.next();
}
