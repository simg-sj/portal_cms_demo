"use client"
import YearMonthPicker from "@/app/components/common/ui/yearMonthPicker";
import React, {useEffect, useState} from "react";



export default function DayTerm(){

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);


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

    useEffect(() => {
        const threeMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 2, 1);
        setStartDate(threeMonthsAgo);
        setEndDate(new Date());
    }, []);

    return (
        <>
            <YearMonthPicker
                maxDate={endDate || new Date()}
                minDate={undefined}
                selected={startDate}
                onChange={handleStartDateChange}
            />
            <div className={'font-bold'}>~</div>
            <YearMonthPicker
                maxDate={new Date()}
                minDate={startDate || undefined}
                selected={endDate}
                onChange={handleEndDateChange}
            />
        </>
)
    ;
};
