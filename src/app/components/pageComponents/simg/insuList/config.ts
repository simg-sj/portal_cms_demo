// 예치금 리스트 컬럼
import {ColumnDefinition} from "@/@types/common";
import {InsuListColumnType} from "@/app/lib/simg1DayApi/insu/types";

export const InsuListColumn: ColumnDefinition<InsuListColumnType>[] = [
    {
        key: 'contractId',
        header: '접수번호',
    },
    {
        key: 'bNumber',
        header: '사업자번호',
    },
    {
        key: 'contractor',
        header: '피보험자',
    },
    {
        key: 'contractCell',
        header: '연락처',
    },
    {
        key: 'viNumber',
        header: '차대번호',
    },
    {
        key: 'carNumber',
        header: '차량번호',
    },
    {
        key: 'requestDay',
        header: '신청일자',
    },
    {
        key: 'premium',
        header: '보험료'
    },
    {
        key: 'insuTerm',
        header: '보험기간'
    },
    {
        key: 'pState',
        header: '신청 현황',
    }
];
