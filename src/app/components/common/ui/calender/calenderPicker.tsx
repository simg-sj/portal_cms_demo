"use client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import { getYear, getMonth } from "date-fns";
import Image from "next/image";
import Calender from "../../../../../../public/images/icon/calender-icon.png";
import { useEffect } from "react";
import dayjs from "dayjs";

interface CalenderPickerProps {
  maxDate?: Date;
  minDate?: Date;
  select: Date | null;
  allowDate?: boolean;
  onChange: (date: Date | null) => void;
  className?: string;
}

const Range = (start: number, end: number, step: number): number[] => {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
};

const CustomPicker = styled.div`
  position: relative;

  .calender-icon {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }

  .react-datepicker__input-container,
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker-popper .react-datepicker {
    font-family: Pretendard;
    border: 0;
    box-shadow: 0 3px 7px 1px rgb(0 0 0 / 0.1);
    width: 255px;

    .react-datepicker__header {
      border: 0;
      padding: 14px;
      font-size: medium;
    }
  }

  border-radius: 12px;

  .react-datepicker__input-container > input {
    border: 0;
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    cursor: pointer;
    background: none;
    text-align: center;
    padding: 0 0px 0 25px;
    outline: 1px solid #d0d0d0;
    border-radius: 8px;
  }

  .react-datepicker__input-container > input[readonly] {
    pointer-events: visible;
  }

  .react-datepicker__day-names {
    font-size: 14px;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: var(--color-main);
    border-radius: 100px;
    color: white;
  }

  .react-datepicker__day--keyboard-selected:hover,
  .react-datepicker__day:hover {
    background-color: var(--color-main-lighter);
    border-radius: 100px;
    color: black;
  }

  .react-datepicker__day--selected {
    color: white;
    background-color: var(--color-main);
    border-radius: 100px;
  }

  .react-datepicker__day--today {
    font-weight: normal;
    background: #eeeeee;
    color: black;
    border-radius: 100px;
  }

  .react-datepicker__header select {
    border: 0;
    padding: 0 6px;
  }

  .react-datepicker__header select:focus {
    border: 0;
  }

  svg {
    display: none;
  }
`;

const PickerWrapper = styled.div.attrs<{ className?: string }>((props) => ({
  className: props.className,
}))<{ className?: string }>`
  position: relative;
`;

const CalenderPicker = ({
  maxDate,
  allowDate,
  minDate,
  select,
  onChange,
  className,
}: CalenderPickerProps) => {
  const years = Range(2000, getYear(new Date()) + 20, 1);
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <PickerWrapper className={className}>
      <CustomPicker>
        <Image
          src={Calender}
          alt={"달력"}
          width={15}
          height={15}
          className={"calender-icon"}
        />
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={"flex justify-between"}>
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(Number(value))}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
          dateFormat="yyyy. MM. dd"
          locale={ko}
          shouldCloseOnSelect
          maxDate={allowDate ? maxDate : new Date()}
          minDate={minDate}
          selected={select}
          onChange={onChange}
          onFocus={(e) => {
            const target = e.target as HTMLInputElement;
            target.readOnly = true;
          }}
        />
      </CustomPicker>
    </PickerWrapper>
  );
};

export default CalenderPicker;
