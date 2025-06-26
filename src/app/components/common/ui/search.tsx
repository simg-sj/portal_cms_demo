'use client';

import React, { useState } from "react";
import RefreshButton from '@/app/components/common/ui/refresh';
import DayTerm from '@/app/components/common/ui/calender/dayTerm';
import Button from '@/app/components/common/ui/button/button';

export type SearchField =
  | { type: "text"; name: string; label: string }
  | { type: "select"; name: string; label: string; options: { value: string; label: string }[] }
  | { type: "date"; name: string; label: string };

interface Props {
  fields: SearchField[];
  initialValues?: Record<string, string>;
  onSearch?: (values: Record<string, string>) => void;
}

export default function SearchForm({ fields, initialValues = {}, onSearch }: Props) {
  const [values, setValues] = useState<Record<string, string>>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(values);
  };

  return (
    <div className={"space-y-3"}>
    <div className="rounded-lg border border-gray-100 bg-white px-6 py-4">
      <div className="mb-4 flex items-center space-x-3">
        <div className="font-medium">검색조건</div>
        <RefreshButton onClick={() => alert("@")} />
      </div>
      {/* 반응형 검색 폼 */}
      <div className="space-y-4 lg:space-y-0">
        {/* 상태, 기간 */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-5">
          <div className="space-y-1">
            <div className="text-sm">상태</div>
            <select
              className="h-[35px] w-full rounded border border-gray-300 px-3 lg:w-[200px]"
            >
              <option value="all">전체</option>
              <option value="READY">대기</option>
              <option value="UNDERWRITE">심사중</option>
              <option value="ACCEPTED">통과</option>
              <option value="REJECTED">거절</option>
              <option value="ERROR">에러</option>
            </select>
          </div>

          <div className="space-y-1">
            <div className="text-sm">기간</div>
            <DayTerm
              type={"day"}
              sDay={new Date()}
              eDay={new Date()}
              className={"w-full lg:w-[200px]"}
            />
          </div>


          {/* subIdYn이 "Y" 조회 버튼만 */}
          {/*{subIdYn === "Y" && (
            <div className="flex justify-end">
              <Button
                color="main"
                width={100}
                height={35}
                fill
                className={'!w-full lg:!w-[100px]'}
              >
                조회
              </Button>
            </div>
          )}*/}
        </div>
      </div>
    </div>
    </div>
  );
}
