import InsuList from '@/app/components/pageComponents/simg/insuList/insuList';
import {auth} from "@/auth";
import {Providers} from "@/app/Providers";

export default async function DepositPage() {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    const { bpk, id, subIdYn } = session.user as { bpk: number; id: string; subIdYn : string; };


    return (
        <Providers>
            <InsuList bpk={bpk} id={id} subIdYn={subIdYn} />
        </Providers>
    );
}
