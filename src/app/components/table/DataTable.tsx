"use client"

import React,{ useState } from "react";

type ColumnRender<T> = {
  [K in keyof T]?: (value: T[K], row: T) => React.ReactNode;
};

interface DataTableProps<T extends object> {
  data: T[];
  labelMap?: Partial<Record<keyof T, string>>;
  render?: ColumnRender<T>;
  selectable?: boolean;
  rowKey?: keyof T; // 기본은 index지만, id로 key 지정 가능
  onSelectChange?: (selected: T[]) => void;
}

export default function DataTable<T extends object>({
                                                       data,
                                                       labelMap = {},
                                                       render = {},
                                                       selectable = false,
                                                       rowKey,
                                                       onSelectChange,
                                                     }: DataTableProps<T>) {
  const [selectedKeys, setSelectedKeys] = useState<Set<any>>(new Set());

  if (data.length === 0) return <p>데이터가 없습니다.</p>;

  const columns = Object.keys(data[0]) as (keyof T)[];

  const toggle = (key: any) => {
    const next = new Set(selectedKeys);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelectedKeys(next);
    onSelectChange?.(data.filter((row) =>
      next.has(rowKey ? row[rowKey] : data.indexOf(row))
    ));
  };

  const isSelected = (key: any) => selectedKeys.has(key);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max">
      <thead>
      <tr>
        {selectable && <th />}
        {columns.map((key) => (
          <th className="whitespace-nowrap px-4 py-3 text-center" key={String(key)}>{labelMap[key] ?? String(key)}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((row, i) => {
        const key = rowKey ? row[rowKey] : i;
        return (
          <tr key={String(key)}>
            {selectable && (
              <td className="px-2 py-3">
                <input
                  type="checkbox"
                  checked={isSelected(key)}
                  onChange={() => toggle(key)}
                />
              </td>
            )}
            {columns.map((colKey) => (
              <td key={String(colKey)} className="whitespace-nowrap px-4 py-3">
                {render[colKey]
                  ? render[colKey]?.(row[colKey], row)
                  : String(row[colKey])}
              </td>
            ))}
          </tr>
        );
      })}
      </tbody>
    </table>
    </div>
  );
}
