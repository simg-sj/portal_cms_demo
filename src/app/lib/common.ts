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

export const convertClaimToUptClaim = (rowData: ClaimRowType): UptClaim => {
    return {
        job: "UPT", // UptClaim에 필요한 추가 필드 설정
        // 추가적으로 UptClaim 유형에서 필요한 필드가 있다면 여기에 추가
        bpk: rowData.bpk || 0,
        irpk: rowData.irpk || 0,
        table : 'claimRequest',
        requestDate : rowData.requestDate,
        accidentDate : rowData.accidentDate
    };
};

export const convertClaimToUptParking = (rowData: ParkingRowType): UptParking => {
    return {
        job: "UPT", // UptClaim에 필요한 추가 필드 설정
        // 추가적으로 UptClaim 유형에서 필요한 필드가 있다면 여기에 추가
        bpk: rowData.bpk || 0,
        irpk: rowData.irpk || 0,
        table : 'parkinglot'
    };
};

export const convertUser = (rowData: UserType): UserCudType => {
    return {
        upk: 0,
        job: "UPT", // UptClaim에 필요한 추가 필드 설정
        gbn : 'CUD',
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
