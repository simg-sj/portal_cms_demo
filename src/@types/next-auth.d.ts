import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        auth: string;
        platform: string;
        phone: string;
        bName : string;
        name: string;
        password : string;
        userId: string;
        email: string | null;
        work: string | null;
        bpk : string;
        bNo : string;
        authLevel : number;
        phone : string;
        subYn : string;
        service : string;
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
        bpk: string;
        bNo: string;
        authLevel: number;
        phone: string;
        email: string;
        subYn: string;
        service: string;
    }
}
