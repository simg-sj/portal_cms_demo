import {DepositListRequest, DepositListSuccessResponse} from "@/app/lib/simg1DayApi/deposit/types";

// 서비스 함수: fetchDepositList.ts
export async function depositApi(param: DepositListRequest ): Promise<DepositListSuccessResponse> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/simg1TimeDepositList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`Fetch 실패! Status: ${response.status}, Body:\n${text}`);
            throw new Error(`API 요청 실패: ${response.status}`);
        }


        return await response.json();
    } catch (error) {
        console.error('Failed to simg1TimeDeposit:', error, 'Param:', param);
        throw new Error(`Failed to simg1TimeDeposit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

