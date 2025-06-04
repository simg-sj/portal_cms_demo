import DepositList from '@/app/components/pageComponents/simg/deposit/DepositList';
import {auth} from "@/auth";
import {Providers} from "@/app/Providers";

export default async function DepositPage() {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    const { bpk, id, subIdYn } = session.user as { bpk: number; id: string; subIdYn : string; };

    const res = await fetch('https://center-api.simg.kr/api/portal/simg1TimeDepositList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "job": "LIST", "bpk": 3, "listType" : "depositBalances", "id" : id }),
        cache: 'no-store', // ✅ SSR 강제 (fetch 캐싱 방지)
    });

    const {data} = await res.json();

    return (
        <Providers>
            <DepositList bpk={bpk} id={id} subIdYn = {subIdYn} balance={data[0] ? data[0].balance : 0}/>
        </Providers>
    );
}
