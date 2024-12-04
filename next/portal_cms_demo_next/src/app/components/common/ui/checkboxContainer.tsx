import React, { useState } from 'react';
import Checkbox from '@/app/components/common/ui/checkbox';
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
    onSelectionChange?: (selectedIds: Set<number>) => void;
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
                                         selectedRow
                                     }: CheckboxContainerProps<T>) {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const toggleSelectAll = (checked: boolean) => {
        if (!withCheckbox) return;

        const allIds = new Set(items.map(item => getItemId(item)));
        const newSelectedItems = checked ? allIds : new Set<number>();

        setSelectedItems(newSelectedItems);
        onSelectionChange?.(newSelectedItems);
    };

    const toggleSelectItem = (id: number) => {
        if (!withCheckbox) return;

        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }

        setSelectedItems(newSelectedItems);
        onSelectionChange?.(newSelectedItems);
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

    const isAllSelected = selectedItems.size === items.length;
    const isSomeSelected = selectedItems.size > 0 && selectedItems.size < items.length;

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
                            <div className={'text-gray-700 text-lg'}>데이터를 불러올 수 없습니다.</div>
                        </div>
                    </td>
                </tr>
            ) : (
                items.map((item) => {
                    const id = getItemId(item);
                    const isSelected = selectedRow === id || selectedItems.has(id);

                    return (
                        <tr
                            key={id}
                            className={`
                                ${onRowClick ? 'cursor-pointer' : ''}
                                ${isSelected ? 'bg-main-lighter' : 'hover:bg-main-lighter'}
                            `}
                            onClick={() => handleRowClick(item)}
                        >
                            {withCheckbox && (
                                <td onClick={(e) => e.stopPropagation()}>
                                    <Checkbox
                                        checked={selectedItems.has(id)}
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