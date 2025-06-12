"use client"
import React, {useCallback, useEffect, useState} from "react";
import ImageUploader from "@/app/components/common/ui/input/fileUpload";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";
import dayjs from "dayjs";
import {
    ACCIDENT_DETAIL_TYPE_OPTIONS,
    ACCIDENT_TYPE_OPTIONS,
    APPROVAL_OPTIONS,
    ClosingCode,
    STATE_OPTIONS
} from "@/config/data";

import {
    CargoInsuType,
    ClaimRowType,
    ImageType,
    InsuranceItem,
    ParkingRowType,
    UptClaim,
    UptParking
} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import {getImage, getPolicyList} from "@/app/(Navigation-Group)/action";
import cn from 'classnames';
import {convertClaimToUptClaim, getChangedFields} from "@/app/lib/common";
import {useNotifications} from "@/context/NotificationContext";
import {DepositListRequest, DepositListResponseItem} from "@/app/lib/simg1DayApi/deposit/types";
import {useForm} from "react-hook-form";
import {useConfirmAction} from "@/app/lib/hooks/simg1Day/deposit/useConfirmAction";

interface ListProps {
    isEditing : boolean
    onClose: () => void;
    handleConfirm: (rowData : DepositListResponseItem) => void;
    rowData : DepositListResponseItem;
    onSave?: (data: UptClaim) => void;
}



const DepositListDetail = ({isEditing, rowData, handleConfirm, onSave, onClose }: ListProps) => {
    const {register} = useForm({
        defaultValues : {
            'job': 'DEPOSIT',
            'gbn': 'D_MODIFY',
            'bpk': rowData.bpk,
            'pspk': rowData.pspk,
            'amount': rowData.reqDeposit
        }
    });

    const handleSave = () => {


    }

    const handleDepositConfirm = () => {
        handleConfirm(rowData)
        onClose();
    }


    return(
        <>
            <div>
                        {
                            (isEditing)  &&
                            <div className={cn("z-10", isEditing ? "absolute top-[32px] right-[153px]" : "absolute top-[32px] right-[160px]")}>
                                <Button color={"blue"} fill={true} height={35} width={100}>
                                    저장
                                </Button>
                            </div>
                        }
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    접수현황
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>접수번호</th>
                        <td>{rowData.pspk}</td>
                        <th>상태</th>
                        <td>{rowData.status ? rowData.status : '-'}</td>
                    </tr>
                    <tr>
                        <th>잔액</th>
                        <td>{rowData.repairAmt ? FormatNumber(Number(rowData.repairAmt))+'원' : '-'}</td>
                        <th>신청 금액</th>
                        <td>{
                            isEditing ?
                                <input type={'number'} name={'amount'} {...register('amount')}/>
                                :
                            FormatNumber(Number(rowData.reqDeposit))+'원'
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>신청일</th>
                        <td>{dayjs(rowData.requestDate).format('YYYY-MM-DD')}</td>
                        <th>승인</th>
                        {
                            rowData.status === 'READY' ?
                                <td>
                                    <Button fill={true} color={'main'} width={80} onClick={() => handleDepositConfirm()}>승인</Button>
                                </td>
                                :
                                <td>{rowData.status}</td>
                        }
                    </tr>
                    </tbody>
                </table>
                <div className={'w-full font-semibold text-[17px] mx-2 py-3 flex items-center mt-8'}>
                    <div className={'bg-main w-1.5 h-4 mr-2'}></div>
                    접수 정보
                </div>
                <table className={'colTable text-[15px]'}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "250px"}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <th>업체명</th>
                        <td>{rowData.bName}</td>
                        <th>사업자번호</th>
                        <td>{rowData.bNumber}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
        ;
};

export default DepositListDetail;
