import React, { useState } from 'react';
import Checkbox from '@/app/components/common/ui/input/checkbox';
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";
import { UserListType } from "@/@types/common";
interface ColumType {
    key : string;
    header : string;
}
interface CheckboxContainerProps {
    items: UserListType[];
    columns: ColumType[];
    getItemId: (item: UserListType) => number;
    withCheckbox?: boolean;
    onSelectionChange?: (selectedIds: number[]) => void;
    onRowClick?: (item: UserListType) => void;
    selectedRow?: number | null;
    selectedItems: number[];
}

export function CheckboxContainer({
                                      items,
                                      columns,
                                      getItemId,
                                      withCheckbox = true,
                                      onSelectionChange,
                                      onRowClick,
                                      selectedRow,
                                      selectedItems
                                  }: CheckboxContainerProps) {
    const toggleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!withCheckbox) return;

        const checked = event.target.checked;
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

    const handleRowClick = (item: UserListType) => {
        onRowClick?.(item);
    };

    const safeRenderValue = (column: string, item: UserListType) => {
        const value = item[column];

        if (value === null || value === undefined) {
            return "-";
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
                            onChange={toggleSelectAll}
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
                            <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'} />
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
