import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

const matchersForAuth = [
    '/hiparking/*',
    '/hiparking',
    '/',
    '/simg',
    '/simg/*',
    '/kmpark/*',
    '/kmpark'
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
    'kmpark' : [
        '/kmpark',
        '/kmpark/*'
    ]
}

const matchersForSignIn = [
    '/login/*',
    '/login'
]

// 인증을 제외할 경로
const excludeMatchers = [
    '/api/auth/*', // 예외 처리할 API 경로 추가
    '/_next/static/*', // 정적 파일도 제외
];

export async function middleware(request: NextRequest) {
    const userInfo = await auth();
    const platFormUrl = userInfo ? `/${userInfo.user.platform}` : '/';
    const accessUrls = userInfo ? platformUrls[userInfo.user.platform] : '/';
    // 예외 경로는 미들웨어에서 처리하지 않음
    if (isPathMatch(request.nextUrl.pathname, excludeMatchers)) {
        return NextResponse.next();
    }

    // 인증이 필요한 페이지 접근 제어
    if (isPathMatch(request.nextUrl.pathname, matchersForAuth)) {
        if (!userInfo) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // 현재 경로가 이미 platFormUrl인 경우 리다이렉트하지 않음
        if (!isPathMatch(request.nextUrl.pathname, accessUrls) && request.nextUrl.pathname !== platFormUrl) {
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
