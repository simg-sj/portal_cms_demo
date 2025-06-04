'use client';

import { useQuery } from '@tanstack/react-query';
import {InsuListSuccessResponse, InsuranceListRequest} from "@/app/lib/simg1DayApi/insu/types";
import {insuApi} from "@/app/lib/simg1DayApi/insu/api";

export const useInsuList = (params: InsuranceListRequest) => {
    return useQuery<InsuListSuccessResponse, Error>({
        queryKey: ['insuList'],
        queryFn: () => insuApi(params),
    });
};

