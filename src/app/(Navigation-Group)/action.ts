/**
 * @Author: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @Date: 2024-11-05 16:27:57
 * @LastEditors: rlarlejrwl56 63471869+rlarlejrwl56@users.noreply.github.com
 * @LastEditTime: 2025-03-28 11:00:16
 * @FilePath: src/app/(Navigation-Group)/action.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */


'use server';

import {
    CargoInsuType,
    ClaimRowType,
    DashboardData, DeleteType,
    dutyType, ErrorType, InsuFormData,
    InsuranceItem,
    ParamDashType2,
    ParamType,
    ParkingParamType,
    ParkingRowType,
    ParkingType,
    rcAccidentRowType,
    rcAccidentType,
    resultCode,
    SearchParams,
    UptClaim,
    UptParking,
    UserCudType,
    UserListType,
    UserUpk
} from "@/@types/common";
import {isResultCode, isUserListArray} from "@/app/lib/common";

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



export async function getError(param: ParamType): Promise<ErrorType[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getError`, {
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
        console.error('Failed to fetch error:', error);
        throw new Error(`Failed to fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}


export async function getDashBoard(param: ParamDashType2): Promise<DashboardData> {
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



export async function updateCommon(param: ClaimRowType| UptClaim | UptParking | InsuFormData | DeleteType ): Promise<resultCode> {
    try {
        
        const response = await fetch(`https://center-api.simg.kr/api/portal/claimCommon`, {
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

export async function deleteClaimData(param: UptClaim | UptParking): Promise<resultCode> {
    try {
        let deleteParam = {
            bpk : param.bpk,
            irpk : param.irpk,
            job : 'DELETE',
            table : param.table
        }
        const response = await fetch(`https://center-api.simg.kr/api/portal/claimCommon`, {
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


export async function deleteGroup(param: any): Promise<resultCode> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/deleteGroup`, {
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

export async function getParking(param: ParkingParamType): Promise<ParkingRowType[]> {
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

export async function rcPortalRoute(param: rcAccidentRowType) : Promise<resultCode> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/rcPortalRoute`, {
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

export async function rentBikeUnderWrite(param : ParamType) {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/rentBikeUnderWrite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-SECRET': '9E5B88A0-E902-11EF-BCF2-D938A5A3430D'
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

export async function dutyApi1001(param: dutyType) : Promise<resultCode> {
    try {
        const response = await fetch(`https://rider-link-test.simg.kr/api/v1/dPolicy/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-SECRET': '9E5B88A0-E902-11EF-BCF2-D938A5A3430D'
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

export async function getUserData(bpk : number, listType : string, job : string, userId ?: string) : Promise<UserListType[] | null> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bpk, listType, job, userId})
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


export async function userService(param : UserCudType | UserUpk | SearchParams) : Promise<resultCode | UserListType[]> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/userService`, {
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
        
        const data = await response.json();

        // 타입 가드 로직: 결과가 `resultCode`인지, `UserListType[]`인지 판별
        if (isResultCode(data)) {
            return data; // resultCode 타입 반환
        }

        if (Array.isArray(data) && isUserListArray(data)) {
            return data; // UserListType[] 타입 반환
        }


    } catch (error) {
        console.error('Failed to getUserList:', error);
        throw new Error(`Failed to rcAccident: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// 적하 보험

export async function cargoInsuList(param :  ParamType) : Promise<CargoInsuType[] | []> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getCargoInsuList`, {
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


// 증권 정보
export async function getPolicyList(bpk :  number) : Promise<InsuranceItem[] | []> {
    try {
        const response = await fetch(`https://center-api.simg.kr/api/portal/getPolicyList`, {
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



