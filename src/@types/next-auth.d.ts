import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        auth: string;
        platform: string;
        phone: string;
        bName : string;
        name: string;
        userId: string;
        email: string | null;
        work: string | null;
        bpk : number;
        bNo : string;
        authLevel : number;
        phone : string;
        subYn: string;
        subIdYn: string;
        subBpk : number;
        service : string;
        emailVerified?: Date | null;
        // 다른 필드들도 추가 가능
    }

    interface Session {
        user: User;
    }

    interface JWT {
        id: string;
        platform: string;
        bName: string;
        work: string;
        name: string;
        auth: string;
        bpk: number;
        bNo: string;
        authLevel: number;
        phone: string;
        email: string;
        subYn: string;
        subIdYn: string;
        subBpk : number;
        service: string;
    }
}
