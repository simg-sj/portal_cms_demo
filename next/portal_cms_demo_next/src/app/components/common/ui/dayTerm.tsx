import React, {SetStateAction, useEffect, useState} from "react";
import YearMonthPicker from "@/app/components/common/ui/yearMonthPicker";
import CalenderPicker from "@/app/components/common/ui/calenderPicker";
import dayjs from "dayjs";

interface DayTermProps {
    sDay ?: Date;
    eDay ?: Date;
    type?: 'month' | 'day';
    setParam ?: React.Dispatch<SetStateAction<ParamType>>

}

interface ParamType {
    startDate : string;
    endDate : string;
    bpk ?: number;
    condition ?: string;
}

const DayTerm = ({sDay, eDay, type = 'day', setParam }: DayTermProps) => {
    const [startDate, setStartDate] = useState<Date | null>(sDay);
    const [endDate, setEndDate] = useState<Date | null>(eDay);

    //타입 월달력, 전체달력 지정 : 월달력 3달단위 전체달력 오늘날짜 기본값
    useEffect(() => {
        // 월달력: 3개월 전부터 현재까지
        if (type === 'month') {
            const threeMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
            setParam((prev: ParamType) => ({
                ...prev,
                startDate: dayjs(threeMonthsAgo).format('YYYY-MM-DD'),
                endDate : dayjs().format('YYYY-MM-DD')
            }));
            setStartDate(threeMonthsAgo);
            setEndDate(new Date());
        } // 일달력: 오늘 날짜
        else {
            const today = new Date();
            setParam((prev: ParamType) => ({
                ...prev,
                startDate: dayjs().format('YYYY-MM-DD'),
                endDate : dayjs().format('YYYY-MM-DD')
            }));
        }
    }, [type]);

    const getLastDayOfMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const formatDate = (date: Date | null) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        setParam((prev: ParamType) => ({
            ...prev,
            startDate: dayjs(date).format('YYYY-MM-DD'),
        }));
        if (date && endDate && date > endDate) {
            setEndDate(null);
        }
        console.log("시작 날짜:", formatDate(date));
    };

    const handleEndDateChange = (date: Date | null) => {
        if (type === 'month' && date) {
            const lastDay = getLastDayOfMonth(date.getFullYear(), date.getMonth());
            const newEndDate = new Date(date.getFullYear(), date.getMonth(), lastDay);
            setEndDate(newEndDate);
           setParam((prev: ParamType) => ({
            ...prev,
            endDate: dayjs(newEndDate).format('YYYY-MM-DD'),
        }));
            console.log("종료 날짜:", formatDate(newEndDate));
        } else {
            setEndDate(date);
            setParam((prev: ParamType) => ({
                ...prev,
                endDate: dayjs(date).format('YYYY-MM-DD'),
            }));
            if (date && startDate && date < startDate) {
                setStartDate(null);
            }
            console.log("종료 날짜:", formatDate(date));
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
