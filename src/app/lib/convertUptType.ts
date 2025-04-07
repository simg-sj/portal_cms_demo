// ClaimRowType 데이터를 UptClaim으로 변환
import {ClaimRowType, ParkingRowType, UptClaim, UptParking} from "@/@types/common";

export const convertClaimToUptClaim = (rowData: ClaimRowType): UptClaim => {
    return {
        job: "UPT", // UptClaim에 필요한 추가 필드 설정
        // 추가적으로 UptClaim 유형에서 필요한 필드가 있다면 여기에 추가
        bpk: rowData.bpk || 0,
        irpk: rowData.irpk || 0,
        table : 'claimRequest'
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
