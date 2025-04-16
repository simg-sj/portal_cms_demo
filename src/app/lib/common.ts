// ClaimRowType 데이터를 UptClaim으로 변환
import {
    ClaimRowType,
    ParkingRowType,
    resultCode,
    UptClaim,
    UptParking,
    UserCudType,
    UserListType,
    UserType
} from "@/@types/common";
import React from "react";

export const convertClaimToUptClaim = (
    data: Partial<ClaimRowType> & { bpk: number; irpk: number }
): UptClaim => {
    return {
        ...data, // ✅ changed된 필드 + bpk, irpk 포함
        job: "UPT",
        table: "claimRequest",
    };
};


export const convertClaimToUptParking = (rowData: ParkingRowType): UptParking => {
    return {
        job: "UPT", // UptClaim에 필요한 추가 필드 설정
        // 추가적으로 UptClaim 유형에서 필요한 필드가 있다면 여기에 추가
        bpk: rowData.bpk || 0,
        irpk: rowData.irpk || 0,
        gbn : '',
        table : 'parkinglot'
    };
};

export const convertUser = (rowData: UserType): UserCudType => {
    return {
        job: "CUD", // UptClaim에 필요한 추가 필드 설정
        gbn : 'UPT',
        // 추가적으로 UptClaim 유형에서 필요한 필드가 있다면 여기에 추가
        bpk: rowData.bpk || 0,
        irpk: rowData.irpk || 0,
        userId : rowData.userId,
        uName : rowData.name,
        uCell : rowData.phone,
        uMail : rowData.email,
        uAuth : rowData.auth,
        work : rowData.work,
        table : 'userMaster'
    };
};


export const closePopup = (
    ref: React.RefObject<any>,
    setState: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (ref.current) {
        ref.current.clearForm();
    }
    setState(false);
};

export const getPaginatedData = (data, currentPage) => {
    let itemsPerPage = 15;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
}

// 타입 가드 함수 추가
export function isResultCode(data: any): data is resultCode {
    return (
        typeof data === 'object' &&
        typeof data.code === 'string' &&
        typeof data.msg === 'string'
    );
}

export function isUserListArray(data: any): data is UserListType[] {
    return (
        Array.isArray(data) &&
        data.every(item =>
            typeof item === 'object' &&
            'uName' in item &&
            'uCell' in item &&
            'uMail' in item &&
            'userId' in item &&
            'uAuth' in item
        )
    );
}


export const getChangedFields = (
    current: Record<string, any>,
    original: Record<string, any>
): Record<string, any> => {
    const changed: Record<string, any> = {};

    if (!current || !original) return changed;

    const keys: string[] = Array.from(new Set([...Object.keys(current), ...Object.keys(original)]));

    for (const key of keys) {
        const valA = current[key];
        const valB = original[key];

        // bpk, irpk는 무조건 포함
        if (key === "bpk" || key === "irpk") {
            changed[key] = valA;
            continue;
        }

        // 날짜 비교
        const isDate =
            typeof valA === "string" &&
            typeof valB === "string" &&
            /^\d{4}-\d{2}-\d{2}/.test(valA) &&
            /^\d{4}-\d{2}-\d{2}/.test(valB);

        if (isDate) {
            if (new Date(valA).getTime() !== new Date(valB).getTime()) {
                changed[key] = valA;
            }
            continue;
        }

        // 일반 비교
        if (valA !== valB) {
            changed[key] = valA;
        }
    }

    return changed;
};

