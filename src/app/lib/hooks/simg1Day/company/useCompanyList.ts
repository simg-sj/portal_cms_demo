'use client';

import { useQuery } from '@tanstack/react-query';
import {CompanyListRequest, CompanyListSuccessResponse} from "@/app/lib/simg1DayApi/company/types";
import {companyApi} from "@/app/lib/simg1DayApi/company/api";

export const useCompanyList = (params: CompanyListRequest) => {
    return useQuery<CompanyListSuccessResponse, Error>({
        queryKey: ['companyList'],
        queryFn: () => companyApi(params),
    });
};

