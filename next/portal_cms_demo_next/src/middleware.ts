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
        { path: '/turu/*', minAuthLevel: 1 },
    ],
};

// 예외 경로 정의
const excludeMatchers = [
    '/api/auth/*',
    '/_next/static/*',
    '/favicon.ico',
    '.*\\.(png|jpg|jpeg|gif|ico|svg|webp)$', // 이미지 파일
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

export async function middleware(request: NextRequest) {
    const userInfo = await auth(); // 사용자 인증 정보 가져오기
    const { pathname } = request.nextUrl;

    // 사용자 플랫폼 및 허용 경로
    const userPlatform = userInfo?.user?.platform || '';
    const userAccessUrls = platformUrls[userPlatform] || [];
    const allowedPaths = userAccessUrls.map((url) => url.path).filter((path): path is string => typeof path === 'string');
    const userHomeUrl = `/${userPlatform}`; // 사용자 플랫폼 루트 경로

    console.log('User Info:', userInfo);
    console.log('Current Path:', pathname);

    // 1. 예외 경로 처리
    if (isPathMatch(pathname, excludeMatchers)) {
        return NextResponse.next();
    }
    console.log('pathname', pathname)
    // 2. 루트 경로 처리
    if (pathname === '/') {
        if (userInfo) {
            return NextResponse.redirect(new URL(userHomeUrl, request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // 3. 로그인 페이지 접근 처리
    if (pathname === '/login') {
        if (userInfo) {
            console.log('이미 로그인된 사용자입니다. 홈으로 리다이렉트:', userHomeUrl);
            return NextResponse.redirect(new URL(userHomeUrl, request.url));
        }
        return NextResponse.next(); // 비로그인 사용자는 로그인 페이지 접근 허용
    }

    // 4. 로그아웃 요청 처리
    if (pathname === '/logout') {
        console.log('로그아웃 처리 중. 추가 동작 없음.');
        return NextResponse.next(); // 로그아웃 경로는 예외 처리
    }

    // 5. 플랫폼별 경로 접근 제한
    if (!isPathMatch(pathname, allowedPaths)) {
        console.warn('Unauthorized platform access:', pathname);
        return NextResponse.redirect(new URL(userHomeUrl, request.url)); // 플랫폼 루트로 리다이렉트
    }

    // 6. 권한 검사
    const userAuthLevel = userInfo?.user?.authLevel || 0;
    if (!isAuthorized(pathname, userAccessUrls, userAuthLevel)) {
        console.warn('Unauthorized access due to insufficient privileges:', pathname);
        return NextResponse.redirect(new URL(userHomeUrl, request.url)); // 권한 부족 시에도 플랫폼 루트로 리다이렉트
    }

    return NextResponse.next();
}
