import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from "date-fns/locale";
import styled from 'styled-components';
import SelectIcon from '@/assets/images/icon/select-icon.png';


const CustomPicker = styled.div`
    .react-datepicker__input-container > input {
        border: 0;
        font-size: medium;
        font-weight: 500;
        width: 160px;
        cursor: pointer;
        background: none;
        @media (max-width: 768px) {
            width: 100px;
            font-size: 14px;
            padding: 0 3px;
        }
    }

    .react-datepicker__input-container > input[readonly] {
        pointer-events: visible;
    }

    .react-datepicker__input-container > input:focus {
        outline: 1px solid #eeeeee;
    }

    .react-datepicker-popper .react-datepicker {
        font-family: Pretendard;
        border: 0;
        box-shadow: 0 3px 7px 1px rgb(0 0 0 / 0.1);
        border-radius: 12px;
        width: 180px;

        .react-datepicker__header {
            background: none;
            border: 0;
            padding: 14px;
            color: var(--color-main);
            font-size: medium;
        }

        .react-datepicker__navigation {
            top: 9px;
        }

        .react-datepicker__month .react-datepicker__month-text {
            width: 40px;
            padding: 12px 4px;
            margin: 2px 7px;
            border-radius: 100px;
        }

        .react-datepicker__month-text:hover,
        .react-datepicker__month-text--keyboard-selected:hover {
            background: var(--color-main-lighter);
        }

        .react-datepicker__month-text--keyboard-selected {
            background: var(--color-main-lighter);
            font-weight: bold;
        }

        .react-datepicker__month-text--today {
            font-weight: normal;
            background: #eeeeee;
        }
        
    }
    svg {
        display: none;
    }
`;

const PickerWrapper = styled.div`
    position: relative;
`;

const StyledSelectIcon = styled.img`
    position: absolute;
    right: 20px;
    top: 12px;
    z-index: 1;
    @media (max-width: 768px) {
        right: 4px;
        top: 14px;
    }
`;

interface YearMonthPickerProps {
    maxDate?: Date;
    minDate?: Date;
    select: Date | null;
    onChange: (date: Date | null) => void;
    disabled ?: boolean;
}

const YearMonthPicker = ({maxDate, minDate, onChange, select, disabled}: YearMonthPickerProps) => {
    return (
        <PickerWrapper>
            <CustomPicker>
                <DatePicker
                    selected={select}
                    onChange={onChange}
                    dateFormat="yyyy년 MM월"
                    showMonthYearPicker
                    yearDropdownItemNumber={15}
                    scrollableYearDropdown
                    locale={ko}
                    maxDate={maxDate}
                    minDate={minDate}
                    onFocus={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.readOnly = true;
                    }}
                />
            </CustomPicker>
            <StyledSelectIcon src={SelectIcon.src} alt="선택" width={12} height={12}/>
        </PickerWrapper>
    );
};

export default YearMonthPicker;

