import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from "date-fns/locale";
import styled from 'styled-components';
import SelectIcon from '@/assets/images/icon/select-icon.png';


const CustomPicker = styled.div`
    .react-datepicker__input-container > input {
        border: 0;
        font-size: large;
        font-weight: 500;
        width: 160px;
        cursor: pointer;
        background: none;
    }

    .react-datepicker__input-container > input[readonly] {
        pointer-events: visible;
    }

    .react-datepicker__input-container > input:focus {
        outline: none;
    }

    .react-datepicker__day-names{
        margin-top: 6px;
        font-size: 14px;
    }
    .react-datepicker__day--keyboard-selected{
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
    .react-datepicker__day--today{
        font-weight: normal;
        background: #eeeeee;
        color: black;
    }

    .react-datepicker-popper .react-datepicker {
        font-family: Pretendard;
        border: 0;
        box-shadow: 0 3px 7px 1px rgb(0 0 0 / 0.1);
        border-radius: 12px;
        width: 260px;
        
        .react-datepicker__month .react-datepicker__month-text {
            width: 40px;
            padding: 12px 4px;
            margin: 2px 7px;
            border-radius: 100px;
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
`;


const Date = ({maxDate, minDate, onChange, selected}: YearMonthPickerProps) => {
    return (
        <PickerWrapper>
            <CustomPicker>
                <DatePicker
                    selected={selected}
                    onChange={onChange}
                    dateFormat="yyyy년 MM월 dd일"
                    locale={ko}
                    maxDate={maxDate}
                    minDate={minDate}
                    onFocus={(e) => e.target.readOnly = true}
                />
            </CustomPicker>
            <StyledSelectIcon src={SelectIcon.src} alt="선택" width={15}/>
        </PickerWrapper>
    );
};

export default Date;

