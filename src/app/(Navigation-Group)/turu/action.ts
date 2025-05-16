'use server';

import {ParamType, PlatformList, RcParamType} from "@/@types/common";

export async function getPlatform(bpk: number): Promise<PlatformList[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getPlatform`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bpk : bpk})
        });

        if (!response.ok) {
            // 에러 핸들링: 상태 코드와 메시지를 포함한 에러
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }

        return await response.json();


    } catch (error) {
        console.error('Failed to getUserList:', error);
        throw new Error(`Failed to rcAccident: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function turuApi1001(param : any){
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/turuApi1001`, {
            method: 'POST',
            body: param
        });

        if (!response.ok) {
            // 에러 핸들링: 상태 코드와 메시지를 포함한 에러
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }

        return await response.json();


    } catch (error) {
        console.error('Failed to getUserList:', error);
        throw new Error(`Failed to rcAccident: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// 사고리스트 조회
export async function turuApi1002(param : RcParamType){
    try {
        console.log(param);
        const response = await fetch(`https://center-api.simg.kr/api/portal/turuApi1002`, {
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
        console.error('Failed to getUserList:', error);
        throw new Error(`Failed to rcAccident: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}