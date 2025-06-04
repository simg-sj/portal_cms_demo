'use client';

import { useQuery } from '@tanstack/react-query';
import {depositApi} from "@/app/lib/simg1DayApi/deposit/api";
import {DepositListRequest, DepositListSuccessResponse} from "@/app/lib/simg1DayApi/deposit/types";

export const useDepositList = (params: DepositListRequest) => {
    return useQuery<DepositListSuccessResponse, Error>({
        queryKey: ['depositList'],
        queryFn: () => depositApi(params),
    });
};

