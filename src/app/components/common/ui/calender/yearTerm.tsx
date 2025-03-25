import React, { useState } from "react";
import SelectDropdown from "@/app/components/common/ui/input/selectDropDown";

interface YearRangePickerProps {
    onSelect: (range: { startYear: number; endYear: number }) => void;
    minYear?: number;
}

const YearRangePicker: React.FC<YearRangePickerProps> = ({ onSelect, minYear = 2020 }) => {
    const currentYear = new Date().getFullYear(); // 올해
    const minSelectableYear = minYear; // 최소 선택 가능 연도 (현재 기준 minYear 년 전)
    const defaultStartYear = currentYear - 4; // 기본 시작 연도 (5년 전)
    const defaultEndYear = currentYear; // 기본 종료 연도 (현재 연도)

    // 선택된 년도 상태
    const [startYear, setStartYear] = useState<number>(defaultStartYear);
    const [endYear, setEndYear] = useState<number>(defaultEndYear);

    // 선택 가능한 년도 목록 생성
    const optionsYear: string[] = Array.from(
        { length: currentYear - minSelectableYear + 1 },
        (_, i) => (minSelectableYear + i).toString()
    );

    // 시작 연도 선택
    const handleStartYearSelect = (year: string) => {
        const selectedYear = parseInt(year, 10);
        setStartYear(selectedYear);

        // 종료 연도가 시작 연도보다 이전이면 자동 조정
        if (selectedYear > endYear) {
            setEndYear(selectedYear);
        }

        onSelect({ startYear: selectedYear, endYear });
    };

    // 종료 연도 선택
    const handleEndYearSelect = (year: string) => {
        const selectedYear = parseInt(year, 10);
        setEndYear(selectedYear);

        // 시작 연도가 종료 연도보다 미래면 자동 조정
        if (startYear > selectedYear) {
            setStartYear(selectedYear);
        }

        onSelect({ startYear, endYear: selectedYear });
    };

    return (
        <div className="flex justify-end text-lg">
            <SelectDropdown
                options={optionsYear.filter(year => parseInt(year, 10) <= endYear)}
                defaultLabel={startYear.toString()}
                selectedValue={startYear.toString()}
                onSelect={handleStartYearSelect}
            />
            <div className="font-bold mx-2">~</div>
            <SelectDropdown
                options={optionsYear.filter(year => parseInt(year, 10) >= startYear)}
                defaultLabel={endYear.toString()}
                selectedValue={endYear.toString()}
                onSelect={handleEndYearSelect}
            />
        </div>
    );
};

export default YearRangePicker;
