/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-11-05 16:27:57
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-11-06 09:24:16
 * @FilePath: portal_cms_demo_next/src/app/(Navigation-Group)/hiparking/action.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


'use server';

interface ImageType {
    location : string;
}

export async function getImage(irpk : number): Promise<ImageType[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getImage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({irpk})
        });

        if (!response.ok) {
            // 에러 핸들링: 상태 코드와 메시지를 포함한 에러
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch Images:', error);
        throw new Error(`Failed to fetch claims: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}



export async function getClaim(param: ParamType): Promise<ClaimType[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getList`, {
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
        console.error('Failed to fetch claims:', error);
        throw new Error(`Failed to fetch claims: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
