"use client"
import React, { useState } from 'react';
import Checkbox from '@/app/components/common/ui/checkbox';

interface CheckboxContainerProps<T> {
    items: T[]; // 표시할 데이터 배열
    getItemId: (item: T) => number; // 각 항목 id
    columns: string[];  // 테이블 컬럼 헤더
    renderItem: ( // 각 행 렌더링 함수
        item: T,
        isSelected: boolean,
        onToggle: (id: number) => void
    ) => React.ReactNode;
    onSelectionChange?: (selectedIds: Set<number>) => void; //선택 변경시
}

export function CheckboxContainer<T>({
                                         items,
                                         getItemId,
                                         columns,
                                         renderItem,
                                         onSelectionChange
                                     }: CheckboxContainerProps<T>) {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = new Set(items.map(item => getItemId(item)));
            setSelectedItems(allIds);
            onSelectionChange?.(allIds);
        } else {
            setSelectedItems(new Set());
            onSelectionChange?.(new Set());
        }
    };

    const toggleSelectItem = (id: number) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }
        setSelectedItems(newSelectedItems);
        onSelectionChange?.(newSelectedItems);
    };

    const isAllSelected = selectedItems.size === items.length;
    const isSomeSelected = selectedItems.size > 0 && selectedItems.size < items.length;

    return (
        <table className="w-full">
            <thead>
            <tr>
                <th>
                    <Checkbox
                        checked={isAllSelected}
                        indeterminate={isSomeSelected}
                        onChange={toggleSelectAll}
                    />
                </th>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {items.map((item) => {
                const id = getItemId(item);
                return renderItem(
                    item,
                    selectedItems.has(id),
                    () => toggleSelectItem(id)
                );
            })}
            </tbody>
        </table>
    );
}