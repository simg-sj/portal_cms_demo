import {auth} from "@/auth";
import {Providers} from "@/app/Providers";
import CompanyList from "@/app/components/pageComponents/simg/company/CompanyList";

export default async function CompanyPage() {
    const session = await auth();
    if (!session) throw new Error('Unauthorized');

    const { bpk, id, subIdYn } = session.user as { bpk: number; id: string; subIdYn : string; };


    return (
        <Providers>
            <CompanyList bpk={bpk} id={id} subIdYn={subIdYn} />
        </Providers>
    );
}
