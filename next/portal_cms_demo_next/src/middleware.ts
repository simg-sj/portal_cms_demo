import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

// 플랫폼별 경로 및 최소 권한 레벨 정의
const platformUrls = {
    hiparking: [
        { path: '/hiparking/*', minAuthLevel: 2 },
        { path: '/hiparking', minAuthLevel: 1 },
    ],
    simg: [
        { path: '/simg', minAuthLevel: 1 },
        { path: '/simg/*', minAuthLevel: 1 },
    ],
    kmpark: [
        { path: '/kmpark', minAuthLevel: 3 },
        { path: '/kmpark/*', minAuthLevel: 3 },
    ],
    turu: [
        { path: '/turu', minAuthLevel: 1 },
        { path: '/turu/accidentList', minAuthLevel: 4 },
    ],
};

// 예외 경로 정의 (미들웨어를 통과할 경로)
const excludeMatchers = ['/api/auth/*', '/_next/static/*'];

// 로그인 페이지 경로
const matchersForSignIn = ['/login', '/login/*'];

// 경로 매칭 함수
function isPathMatch(pathname: string, paths: string[]) {
    return paths.some((path) => {
        const regex = new RegExp('^' + path.replace('*', '.*') + '$');
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

// 미들웨어
export async function middleware(request: NextRequest) {
    const userInfo = await auth(); // 사용자 인증 정보 가져오기
    const userHomeUrl = userInfo ? `/${userInfo.user.platform}` : '/';
    const userAccessUrls =
        userInfo && platformUrls[userInfo.user.platform]
            ? platformUrls[userInfo.user.platform]
            : [];
    const paths = userAccessUrls.map((url) => url.path).filter((path): path is string => typeof path === 'string');
    const { pathname } = request.nextUrl;

    // 1. 예외 경로 처리
    if (isPathMatch(pathname, excludeMatchers)) {
        return NextResponse.next();
    }

    // 2. 루트 경로 처리
    if (pathname === '/') {
        if (userInfo) {
            return NextResponse.redirect(new URL(userHomeUrl, request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 3. 인증이 필요한 경로 접근 제어
    if (isPathMatch(pathname, paths)) {
        const userAuthLevel = userInfo?.user?.authLevel || 0;
        if (!isAuthorized(pathname, userAccessUrls, userAuthLevel)) {
            console.warn('Unauthorized access:', pathname);
            return NextResponse.redirect(new URL('/access-denied', request.url));
        }
    }

    // 4. 로그인 페이지 접근 제어
    if (isPathMatch(pathname, matchersForSignIn)) {
        if (userInfo) {
            return NextResponse.redirect(new URL(userHomeUrl, request.url));
        }
    }

    return NextResponse.next();
}
