import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/locale";
import SelectIcon from '@/assets/images/icon/select-icon.png'

const YearMonthPicker = () => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date: Date | null) => {
        if (date) {
            setStartDate(date);
        }
    };

    return (
        <div className={'relative'}>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                dateFormat="yyyy년 MM월"
                showMonthYearPicker
                yearDropdownItemNumber={15}
                scrollableYearDropdown
                locale={ko}
                className={'relative z-10'}
            />
            <img src={SelectIcon.src} alt={'선택'} width={15} className={'absolute right-5 top-3'}/>
        </div>
    );
};

export default YearMonthPicker;
