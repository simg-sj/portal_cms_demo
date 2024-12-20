/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-11-05 16:27:57
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2024-12-20 13:17:46
 * @FilePath: src/app/(Navigation-Group)/action.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


'use server';

import {
    ClaimRowType,
    DashBoardType, FormData,
    ParamDashType2,
    ParamType,
    ParkingParamType,
    ParkingType, rcAccidentType,
    UptClaim
} from "@/@types/common";
import dayjs from "dayjs";

// 주차장 업체용
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
        throw new Error(`Failed to fetch Images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}



export async function getClaim(param: ParamType): Promise<ClaimRowType[]> {
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


export async function getDashBoard(param: ParamDashType2): Promise<DashBoardType[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getDashBoard`, {
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
        console.error('Failed to fetch dashboard:', error);
        throw new Error(`Failed to fetch dashboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}



interface resultCode {
    code : string;
    msg : string;
}
export async function updateClaimData(param: ClaimRowType| UptClaim): Promise<resultCode> {
    try {
        
        const response = await fetch(`https://center-api.simg.kr/api/portal/updateClaimData`, {
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
        console.error('Failed to update:', error);
        throw new Error(`Failed to update: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function deleteClaimData(param: ClaimRowType): Promise<resultCode> {
    try {
        let deleteParam = {
            bpk : param.bpk,
            irpk : param.irpk,
            job : 'DELETE',
        }
        const response = await fetch(`https://center-api.simg.kr/api/portal/deleteClaimData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteParam)
        });

        if (!response.ok) {
            // 에러 핸들링: 상태 코드와 메시지를 포함한 에러
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to delete:', error);
        throw new Error(`Failed to delete: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function deleteGroupClaimData(param: ClaimRowType): Promise<resultCode> {
    try {
        let deleteParam = {
            bpk : param.bpk,
            irpk : param.irpk,
            job : 'DELETE',
        }
        const response = await fetch(`https://center-api.simg.kr/api/portal/deleteClaimData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteParam)
        });

        if (!response.ok) {
            // 에러 핸들링: 상태 코드와 메시지를 포함한 에러
            const errorDetails = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch dashboard:', error);
        throw new Error(`Failed to fetch dashboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function getParking(param: ParkingParamType): Promise<ParkingType[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getParkingList`, {
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
        console.error('Failed to fetch parkingList:', error);
        throw new Error(`Failed to fetch parkingList: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

type UploadExcelRes = {
    status : string;
    data ?: any
    msg ?: string;
}
export async function uploadExcel(param: FormData) : Promise<UploadExcelRes> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/excelRoute/upload`, {
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
        console.error('Failed to Upload Excel:', error);
        throw new Error(`Failed to Upload Excel: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}


export async function addExcelParking(param: ParkingType[]) : Promise<UploadExcelRes> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/excelRoute/addParkingList`, {
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
        console.error('Failed to fetch dashboard:', error);
        throw new Error(`Failed to fetch Excel: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}


// 렌터카 업체용
export async function getRcAccidentList(param: ParamType) : Promise<rcAccidentType[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getRcAccidentList`, {
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
        console.error('Failed to fetch getRcAccidentList:', error);
        throw new Error(`Failed to fetch getRcAccidentList: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function insertRcAccident(param: FormData) : Promise<resultCode> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/insertRcAccident`, {
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
        console.error('Failed to rcAccident:', error);
        throw new Error(`Failed to rcAccident: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}




