import {ColumnDefinition} from "@/@types/common";
import {CompanyColumnType, CompanyListResponseItem} from "@/app/lib/simg1DayApi/company/types";

export const CompanyColumn: ColumnDefinition<CompanyColumnType>[] = [
    {
        key: 'bName',
        header: '업체명',
    },
    {
        key: 'bNumber',
        header: '사업자 번호'
    },
    {
        key: 'uName',
        header: '대표자 이름'
    },
    {
        key: 'uCell',
        header: '대표자 전화번호'
    },
    {
        key: 'balance',
        header: '예치금 잔액',
    },
    {
        key: 'userId',
        header: '아이디',
    }
];