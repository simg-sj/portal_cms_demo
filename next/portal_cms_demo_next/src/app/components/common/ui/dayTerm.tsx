import React, { useEffect, useState } from "react";
import YearMonthPicker from "@/app/components/common/ui/yearMonthPicker";
import CalenderPicker from "@/app/components/common/ui/calenderPicker";

interface DayTermProps {
    type?: 'month' | 'day';
}

const DayTerm = ({ type = 'day' }: DayTermProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    //타입 월달력, 전체달력 지정 : 월달력 3달단위 전체달력 오늘날짜 기본값
    useEffect(() => {
        if (type === 'month') {
            // 월별 선택시: 3개월 전부터 현재까지
            const threeMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
            setStartDate(threeMonthsAgo);
            setEndDate(new Date());
        } else {
            // 일별 선택시: 오늘 날짜
            const today = new Date();
            setStartDate(today);
            setEndDate(today);
        }
    }, [type]);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date && endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
        if (date && startDate && date < startDate) {
            setStartDate(null);
        }
    };

    // ** 타입지정안하면 기본값(캘린더형태), type="month" 컴포넌트내 작성 시 월별달력 전환
    const DatePickerComponent = type === 'month' ? YearMonthPicker : CalenderPicker;


    return (
        <div className="flex items-center justify-start">
            <DatePickerComponent
                maxDate={endDate || new Date()}
                minDate={undefined}
                selected={startDate}
                onChange={handleStartDateChange}
            />
            <div className="font-bold mx-2">~</div>
            <DatePickerComponent
                maxDate={new Date()}
                minDate={startDate || undefined}
                selected={endDate}
                onChange={handleEndDateChange}
            />
        </div>
    );
};

export default DayTerm;
