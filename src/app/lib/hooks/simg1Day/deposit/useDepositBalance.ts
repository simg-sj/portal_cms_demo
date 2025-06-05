import { useQuery } from '@tanstack/react-query';

export const useDepositBalance = (bpk: number, id: string) => {
    return useQuery({
        queryKey: ['depositBalance', bpk, id],
        queryFn: async () => {
            const res = await fetch('https://center-api.simg.kr/api/portal/simg1TimeDepositList', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ job: 'LIST', bpk, listType: 'depositBalances', id }),
            });
            const json = await res.json();

            return json.data?.[0]?.balance ?? 0;
        },
    });
};
