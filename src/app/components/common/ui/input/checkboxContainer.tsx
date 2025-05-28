import React, { useState } from 'react';
import Checkbox from '@/app/components/common/ui/input/checkbox';
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";
import {ClaimRowType, ExtendedClaimRowType, UserListType, UserType} from "@/@types/common";
import {authText, SimgDeposit} from "@/config/data";
import dayjs from "dayjs";
interface ColumType {
    key : string;
    header : string;
}
interface CheckboxContainerProps<T> {
    items: T[];
    columns: ColumType[];
    getItemId: (item: T) => number;
    withCheckbox?: boolean;
    onSelectionChange?: (selectedIds: number[]) => void;
    onRowClick?: (item: T) => void;
    selectedRow?: number | null;
    selectedItems: number[];
}

export function CheckboxContainer<T>({
                                      items,
                                      columns,
                                      getItemId,
                                      withCheckbox = true,
                                      onSelectionChange,
                                      onRowClick,
                                      selectedRow,
                                      selectedItems
                                  }: CheckboxContainerProps<T>) {
    const toggleSelectAll = (event : boolean) => {
        if (!withCheckbox) return;

        const checked = event;
        const allIds = items.map(item => getItemId(item));
        const newSelectedItems = checked ? allIds : [];
        onSelectionChange?.(newSelectedItems); // 부모 상태를 업데이트

    };


    const toggleSelectItem = (id: number) => {
        if (!withCheckbox) return;
        const newSelectedItems = selectedItems.includes(id)
            ? selectedItems.filter(item => item !== id) // 제거
            : [...selectedItems, id]; // 추가
        onSelectionChange?.(newSelectedItems); // 부모 상태를 업데이트
    };

    const handleRowClick = (item: T) => {
        onRowClick?.(item);
    };

    const safeRenderValue = (column: string, item: T) => {
        let value = item[column];
        if(column === 'total') {
            if(item[column]) {
                return Number(value).toLocaleString() + '원'
            }
        }
        if(column === 'reqDeposit') {
            if(item[column]) {
                return Number(value).toLocaleString() + '원'
            }
        }
        if(column === 'requestDate') {
            if(item[column]) {
                return dayjs(value).format('YYYY-MM-DD')
            }
        }
        if(column === 'accidentDate' ) {
            if(item[column]) {
                return dayjs(value).format('YYYY-MM-DD hh:mm')
            }
        }
        if(column === 'createdYMD' ) {
            if(item[column]) {
                return dayjs(value).format('YYYY-MM-DD hh:mm')
            }
        }
        if(column === 'status' ) {
            if(item[column]) {
                return SimgDeposit[value]
            }
        }
        if(column === 'isConfirmed') {
            if(item[column]) {
                return value === 'Y' ? '승인' : '미승인';
            }
        }

        if(column === 'isConfirmed') {
            if(item[column]) {
                return value === 'Y' ? '승인' : '미승인';
            }
        }
        if (value === null || value === undefined) {
            return "-";
        }

        if(column === 'uAuth') {
            value = authText[item[column]];
        }

        return String(value);
    };

    const isAllSelected = selectedItems.length === items.length;
    const isSomeSelected = selectedItems.length > 0 && selectedItems.length < items.length;

    return (
        <table className="w-full">
            <thead>
            <tr>
                {withCheckbox && (
                    <th className="w-10">
                        <Checkbox
                            checked={isAllSelected}
                            indeterminate={isSomeSelected}
                            onChange={(event)=>toggleSelectAll(event)}
                        />
                    </th>
                )}
                {columns.map((column, index) => (
                    <th key={index}>{column.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {items.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + (withCheckbox ? 1 : 0)}>
                        <div className={'flex items-center justify-center my-[150px]'}>
                            <Image src={Error} alt={'에러'} width={30} height={30} className={'mr-5'} />
                            <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
                        </div>
                    </td>
                </tr>
            ) : (
                items.map((item, index) => {
                    const id = getItemId(item);
                    const isSelected = selectedRow === id || selectedItems.includes(id);

                    return (
                        <tr
                            key={`${id}-${index}`}
                            className={`
                                    ${onRowClick ? 'cursor-pointer' : ''}
                                    ${isSelected ? 'bg-main-lighter' : 'hover:bg-main-lighter'}
                                `}
                            onClick={() => handleRowClick(item)}
                        >
                            {withCheckbox && (
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={selectedItems.includes(id)}
                                        onChange={() => toggleSelectItem(id)}
                                    />
                                </td>
                            )}
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>{safeRenderValue(column.key, item)}</td>
                            ))}
                        </tr>
                    );
                })
            )}
            </tbody>
        </table>
    );
}
