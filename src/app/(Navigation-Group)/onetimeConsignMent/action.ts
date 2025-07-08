// 사고리스트 조회
import { Simg1DaySearch, SimgDayCorp, SimgDepositType } from '@/@types/common';

export async function simg1TimeDeposit(param : Simg1DaySearch | SimgDepositType){
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/simg1TimeDepositList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });

        if (!response.ok) {
            // 에러 핸들링: 상태 코드와 메시지를 포함한 에러
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }

        return await response.json();


    } catch (error) {
        console.error('Failed to simg1TimeDeposit:', error);
        throw new Error(`Failed to simg1TimeDeposit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function simg1TimeCorp(param : SimgDayCorp){
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/simg1TimeCorp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        });

        if (!response.ok) {
            // 에러 핸들링: 상태 코드와 메시지를 포함한 에러
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }

        return await response.json();


    } catch (error) {
        console.error('Failed to simg1TimeDeposit:', error);
        throw new Error(`Failed to simg1TimeDeposit: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}