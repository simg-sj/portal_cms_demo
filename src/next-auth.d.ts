import { type DefaultSession } from 'next-auth';

declare module "next-auth" {
    interface User {
        auth: string;
        platform: string;
        phone: string;
        // 다른 필드들도 추가 가능
    }

    interface Session {
        user: {
            auth: string | null;
            name: string | null;
            platform: string | null;
            password?: string;
            userId: string;
            email: string | null;
            phone: string | null;
            work: string | null;
        } & DefaultSession['user'];
    }

    interface JWT {
        auth: string;
        platform: string;
        phone: string;
        // 다른 필드들도 추가 가능
    }
}
