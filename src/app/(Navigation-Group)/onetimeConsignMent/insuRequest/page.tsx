import InsuRequestPage from "@/app/components/pageComponents/simg/insuRequest/insuRequestPage";
import {Providers} from "@/app/Providers";
import {auth} from "@/auth";


export default async function Page() {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    const { bpk, id } = session.user as { bpk: number; id: string, subIdYn : string };

    const res = await fetch('https://center-api.simg.kr/api/portal/simg1TimeDepositList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "job": "LIST", "bpk": 3, "listType" : "depositBalances", "id" : id }),
        cache: 'no-store', // ✅ SSR 강제 (fetch 캐싱 방지)
    });

    const {data} = await res.json();

    return(
        <Providers>
            <InsuRequestPage bpk={bpk} id={id} balance={data[0].balance}/>
        </Providers>
    )
}