import DepositList from '@/app/components/pageComponents/simg/deposit/DepositList';
import {auth} from "@/auth";
import {Providers} from "@/app/Providers";

export default async function DepositPage() {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    const { bpk, id, subIdYn } = session.user as { bpk: number; id: string; subIdYn : string; };


    return (
        <Providers>
            <DepositList bpk={bpk} id={id} subIdYn = {subIdYn} />
        </Providers>
    );
}
