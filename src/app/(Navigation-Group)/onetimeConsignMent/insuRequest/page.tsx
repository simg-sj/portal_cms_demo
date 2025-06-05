import InsuRequestPage from "@/app/components/pageComponents/simg/insuRequest/insuRequestPage";
import {Providers} from "@/app/Providers";
import {auth} from "@/auth";


export default async function Page() {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    const { bpk, id } = session.user as { bpk: number; id: string, subIdYn : string };

    return(
        <Providers>
            <InsuRequestPage bpk={bpk} id={id}/>
        </Providers>
    )
}