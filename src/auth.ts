import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
    handlers,
    auth,
} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                userId: { label: "아이디", type: "text" },
                password: { label: "비밀번호", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch("https://center-api.simg.kr/api/portal/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: credentials?.userId,
                        userPwd: credentials?.password,
                    }),
                });

                const data = await res.json();

                if (!res.ok) {
                    console.log("[AUTH 실패]:", data.message);
                    return null;
                }

                return {
                    id: data.userId,
                    userId: data.userId,
                    name: data.name,
                    email: data.mail,
                    platform: data.platform,
                    bpk: data.bpk,
                    bName: data.bName,
                    work: data.work,
                    bNo: data.bNo,
                    phone: data.phone,
                    auth: data.auth,
                    authLevel: data.authLevel,
                    service: data.service,
                    subYn : data.subYn,
                    subBpk : data.subBpk,
                    subIdYn: data.subIdYn,
                };
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
        error: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                Object.assign(token, user);
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                emailVerified: undefined,
                id: token.id as string,
                userId: token.userId as string,
                name: token.name as string,
                email: token.email as string,
                platform: token.platform as string,
                bpk: token.bpk as number,
                bName: token.bName as string,
                work: token.work as string,
                bNo: token.bNo as string,
                phone: token.phone as string,
                auth: token.auth as string,
                authLevel: token.authLevel as number,
                service: token.service as string,
                subIdYn: token.subIdYn as string,
                subBpk : token.subBpk as number,
                subYn: token.subYn as string
            };
            return session;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith("/") ? `${baseUrl}${url}` : baseUrl;
        },
    },
});
