// 예치금 리스트 컬럼
import {ColumnDefinition} from "@/@types/common";
import {Simg1DayDeposit} from "@/app/lib/simg1DayApi/deposit/types";

export const AdminColumns: ColumnDefinition<Simg1DayDeposit>[] = [
    {
        key: 'pspk',
        header: '접수번호',
    },
    {
        key: 'uName',
        header: '성명',
    },
    {
        key: 'uCell',
        header: '연락처',
    },
    {
        key: 'createdYMD',
        header: '신청일자',
    },
    {
        key: 'reqDeposit',
        header: '신청 금액'
    },
    {
        key: 'status',
        header: '신청 현황',
    },
    {
        key: 'statusYn',
        header: '예치금 승인',
    }
];

export const UserColumns: ColumnDefinition<Simg1DayDeposit>[] = [
    {
        key: 'pspk',
        header: '접수번호',
    },
    {
        key: 'uName',
        header: '성명',
    },
    {
        key: 'uCell',
        header: '연락처',
    },
    {
        key: 'createdYMD',
        header: '신청일자',
    },
    {
        key: 'reqDeposit',
        header: '신청 금액'
    },
    {
        key: 'status',
        header: '신청 현황',
    }
];