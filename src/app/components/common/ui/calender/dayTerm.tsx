
import React, {useEffect, useState} from "react";
import YearMonthPicker from "@/app/components/common/ui/calender/yearMonthPicker";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";
import dayjs from "dayjs";
import {ExtendedParamType, ParamDashType2} from "@/@types/common";

interface DayTermProps {
    sDay ?: Date;
    eDay ?: Date;
    type?: 'month' | 'day' | 'oneYear';
    //setParam: (newParams: Partial<ParamDashType2>) => void;
    setParam: React.Dispatch<React.SetStateAction<ExtendedParamType>>;
    allowFutureEndDate?: boolean; // 오늘 이후 날짜 허용 여부 (true: 가능, false: 제한)
}

interface ParamType {
    sDay : string;
    eDay : string;
    bpk ?: number;
    condition ?: string;
}

const DayTerm = ({sDay, eDay, type , setParam, allowFutureEndDate}: DayTermProps) => {
    const [startDate, setStartDate] = useState<Date | null>(sDay);
    const [endDate, setEndDate] = useState<Date | null>(eDay);

    //타입 월달력, 전체달력 지정 : 월달력 3달단위 전체달력 오늘날짜 기본값
    useEffect(() => {

        console.log('sDay', sDay);
        console.log('eDay', eDay);

        // 월달력: 6개월 전부터 현재까지
        if (type === 'month') {
            const sixMonthsAgo = new Date(dayjs().subtract(6, 'month').format('YYYY-MM'));

            setParam((prev: ParamDashType2) => ({
                ...prev,
                sDay: dayjs(sDay).format('YYYY-MM'),
                eDay : dayjs().format('YYYY-MM')
            }));
            setStartDate(sDay);
            setEndDate(new Date());
        }
        // 1년달력: 12개월 전부터 현재까지
        if (type === 'oneYear') {
            const oneyearAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1);
            setParam((prev: ParamDashType2) => ({
                ...prev,
                sDay: dayjs(oneyearAgo).format('YYYY-MM'),
                eDay : dayjs().format('YYYY-MM')
            }));
            setStartDate(oneyearAgo);
            setEndDate(new Date());
        } else {
            // 일달력: 오늘 날짜
            setParam((prev:  ParamDashType2) => ({
                ...prev,
                startDate: dayjs().format('YYYY-MM-DD'),
                endDate : dayjs().format('YYYY-MM-DD')
            }));
            setStartDate(new Date());
            setEndDate(new Date());
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
        if (type === 'month' && date) {
            setParam((prev: ParamDashType2) => ({
                ...prev,
                sDay: dayjs(date).format('YYYY-MM'),
            }));
        }
        if (type === 'oneYear' && date) {
            setParam((prev: ParamDashType2) => ({
                ...prev,
                sDay: dayjs(date).format('YYYY-MM'),
            }));
        }
        else {
            setParam((prev: ParamType) => ({
                ...prev,
                startDate: dayjs(date).format('YYYY-MM-DD'),
            }));
            if (date && endDate && date > endDate) {
                setEndDate(null);
            }
        }
        if (date && endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (type === 'month' && date) {
            const lastDay = getLastDayOfMonth(date.getFullYear(), date.getMonth());
            const newEndDate = new Date(date.getFullYear(), date.getMonth(), lastDay);
            setEndDate(newEndDate);
           setParam((prev: ParamType) => ({
            ...prev,
            eDay: dayjs(newEndDate).format('YYYY-MM'),
            }));
        } else {
            setEndDate(date);
            setParam((prev: ParamType) => ({
                ...prev,
                endDate: dayjs(date).format('YYYY-MM-DD'),
            }));
            if (date && startDate && date < startDate) {
                setStartDate(null);
            }
        }
    };

    // ** 타입지정안하면 기본값(캘린더형태), type="month" 컴포넌트내 작성 시 월별달력 전환
    const DatePickerComponent = type === 'month' || type === 'oneYear' ? YearMonthPicker : CalenderPicker;

    return (
        <div className="flex items-center justify-start">
            <DatePickerComponent
                maxDate={endDate || new Date()}
                type = {'sDay'}
                sDay={sDay}
                eDay={eDay}
                minDate={undefined}
                onChange={handleStartDateChange}
            />
            <div className="font-bold mx-2">~</div>
            <DatePickerComponent
                maxDate={allowFutureEndDate ? undefined : new Date()}
                type = {'eDay'}
                eDay={eDay}
                sDay={sDay}
                minDate={undefined}
                onChange={handleEndDateChange}
            />
        </div>
    );
};

export default DayTerm;
