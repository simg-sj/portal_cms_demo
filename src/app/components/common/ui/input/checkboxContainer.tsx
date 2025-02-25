import React, { useState } from 'react';
import Checkbox from '@/app/components/common/ui/input/checkbox';
import Image from "next/image";
import Error from "@/assets/images/icon/error-icon.png";

interface ColumnDefinition<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => React.ReactNode;
    defaultValue?: string | number;
}

interface CheckboxContainerProps<T> {
    items: T[];
    columns: ColumnDefinition<T>[];
    getItemId: (item: T) => number;
    withCheckbox?: boolean;
    onSelectionChange?: (selectedIds: number[]) => void;
    onRowClick?: (item: T) => void;
    selectedRow?: number | null;
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
                                     }: CheckboxContainerProps<T> & {selectedItems : number []}) {
    const toggleSelectAll = (checked: boolean) => {
        if (!withCheckbox) return;

        const allIds = items.map(item => getItemId(item));
        const newSelectedItems = checked ? allIds : [];

        onSelectionChange?.(newSelectedItems); // 부모 상태를 업데이트
    };

    const toggleSelectItem = (id: number) => {
        if (!withCheckbox) return;

        const newSelectedItems = [...selectedItems];

        if (newSelectedItems.includes(id)) {
            // id가 이미 선택된 경우 삭제
            const index = newSelectedItems.indexOf(id);
            if (index > -1) newSelectedItems.splice(index, 1);
        } else {
            // id가 선택되지 않은 경우 추가
            newSelectedItems.push(id);
        }

        onSelectionChange?.(newSelectedItems); // 부모 상태를 업데이트
    };


    const handleRowClick = (item: T) => {
        onRowClick?.(item);
    };

    const safeRenderValue = (column: ColumnDefinition<T>, item: T) => {
        // If render function exists, use it
        if (column.render) {
            return column.render(item);
        }

        // Get the value from the item
        const value = item[column.key];

        // Handle null/undefined cases
        if (value === null || value === undefined) {
            return column.defaultValue ?? '-';
        }

        // Default to string conversion
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
                {columns.map((column) => (
                    <th key={String(column.key)}>{column.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {items.length === 0 ? (
                <tr>
                    <td colSpan={columns.length}>
                        <div className={'flex items-centers justify-center my-[150px]'}>
                            <Image src={Error.src} alt={'에러'} width={30} height={30} className={'mr-5'}/>
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
                            {columns.map((column) => (
                                <td key={String(column.key)}>
                                    {safeRenderValue(column, item)}
                                </td>
                            ))}
                        </tr>
                    );
                })
            )}
            </tbody>
        </table>
    );
}