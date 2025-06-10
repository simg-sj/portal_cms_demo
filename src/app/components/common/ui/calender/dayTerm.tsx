import React, { useEffect, useState } from "react";
import YearMonthPicker from "@/app/components/common/ui/calender/yearMonthPicker";
import CalenderPicker from "@/app/components/common/ui/calender/calenderPicker";
import dayjs from "dayjs";
import { DayRange, ExtendedParamType, ParamDashType2 } from "@/@types/common";

interface DayTermProps {
    sDay?: Date;
    eDay?: Date;
    type?: 'month' | 'day' | 'oneYear';
    condition?: string;
    setDays?: React.Dispatch<React.SetStateAction<DayRange[] | DayRange>>;
    setParam?: React.Dispatch<React.SetStateAction<ExtendedParamType>>;
    allowFutureEndDate?: boolean;
    className?: string;
}

const DayTerm = ({
                     sDay,
                     eDay,
                     type,
                     condition,
                     setDays,
                     setParam,
                     allowFutureEndDate,
                     className,
                 }: DayTermProps) => {
    const [startDate, setStartDate] = useState<Date | null>(sDay || new Date());
    const [endDate, setEndDate] = useState<Date | null>(eDay || new Date());

    useEffect(() => {
        const today = new Date();
        const nowFormatted = dayjs(today).format('YYYY-MM');

        if (type === 'month') {
            const sixMonthsAgo = new Date(dayjs().subtract(6, 'month').format('YYYY-MM'));
            setStartDate(sixMonthsAgo);
            setEndDate(today);
            setParam?.((prev: ParamDashType2) => ({
                ...prev,
                sDay: dayjs(sixMonthsAgo).format('YYYY-MM'),
                eDay: nowFormatted
            }));
        } else if (type === 'oneYear') {
            const oneYearAgo = new Date(today.getFullYear(), today.getMonth() - 11, 1);
            setStartDate(oneYearAgo);
            setEndDate(today);
            setParam?.((prev: ParamDashType2) => ({
                ...prev,
                sDay: dayjs(oneYearAgo).format('YYYY-MM'),
                eDay: nowFormatted
            }));
        } else {
            setStartDate(sDay || today);
            setEndDate(eDay || today);
            setParam?.((prev: any) => ({
                ...prev,
                startDate: dayjs(sDay || today).format('YYYY-MM-DD'),
                endDate: dayjs(eDay || today).format('YYYY-MM-DD'),
            }));
        }
    }, [type]);

    const getLastDayOfMonth = (year: number, month: number) =>
        new Date(year, month + 1, 0).getDate();

    const updateDays = (partial: Partial<DayRange>) => {
        if (!setDays) return;

        setDays((prev: any) => {
            if (Array.isArray(prev)) {
                return prev.map((d: DayRange & { type?: string }) =>
                    d.type === condition ? { ...d, ...partial } : d
                );
            } else {
                return { ...prev, ...partial };
            }
        });
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);

        if (!date) return;

        const formatted = type === 'day' ? dayjs(date).format('YYYY-MM-DD') : dayjs(date).format('YYYY-MM');

        updateDays({ sDay: formatted });

        if (type === 'month' || type === 'oneYear') {
            setParam?.((prev: ParamDashType2) => ({ ...prev, sDay: formatted }));
        } else {
            setParam?.((prev: any) => ({ ...prev, startDate: formatted }));
        }

        if (endDate && date > endDate) setEndDate(null);
    };

    const handleEndDateChange = (date: Date | null) => {
        if (!date) return;

        if (type === 'month') {
            const lastDay = getLastDayOfMonth(date.getFullYear(), date.getMonth());
            const monthEndDate = new Date(date.getFullYear(), date.getMonth(), lastDay);
            setEndDate(monthEndDate);

            const formatted = dayjs(monthEndDate).format('YYYY-MM');

            updateDays({ eDay: formatted });
            setParam?.((prev: any) => ({ ...prev, eDay: formatted }));
        } else {
            if (startDate && date < startDate) setStartDate(null);

            const formatted = dayjs(date).format('YYYY-MM-DD');
            setEndDate(date);
            updateDays({ eDay: formatted });
            setParam?.((prev: any) => ({ ...prev, endDate: formatted }));
        }
    };

    const DatePickerComponent = type === 'month' || type === 'oneYear' ? YearMonthPicker : CalenderPicker;

    return (
        <div className="flex items-center justify-start">
            <DatePickerComponent
                maxDate={endDate || new Date()}
                select={startDate}
                minDate={undefined}
                onChange={handleStartDateChange}
                className={className}
            />
            <div className="font-bold mx-2">~</div>
            <DatePickerComponent
                maxDate={allowFutureEndDate ? undefined : new Date()}
                select={endDate}
                minDate={undefined}
                allowDate={allowFutureEndDate}
                onChange={handleEndDateChange}
                className={className}
            />
        </div>
    );
};

export default DayTerm;
