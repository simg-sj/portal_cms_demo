import React, { useState, useEffect } from 'react';

interface TimePickerProps {
    initialTime?: string; // HH:mm 형식 초기값
    onChange: (timeString: string) => void; // HH:mm 형식 반환
}

const TimePicker = ({initialTime,
                        onChange}: TimePickerProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('오전');
    const [selectedHour, setSelectedHour] = useState<string>('12');
    const [selectedMinute, setSelectedMinute] = useState<string>('00');

    // 초기값이 있는 경우 시간 설정
    useEffect(() => {
        if (initialTime) {
            const [hours, minutes] = initialTime.split(':');
            const hour = parseInt(hours);

            if (hour >= 12) {
                setSelectedPeriod('오후');
                setSelectedHour(hour === 12 ? '12' : (hour - 12).toString().padStart(2, '0'));
            } else {
                setSelectedPeriod('오전');
                setSelectedHour(hour === 0 ? '12' : hour.toString().padStart(2, '0'));
            }

            setSelectedMinute(minutes);
        }
    }, [initialTime]);

    // 시간 변환 및 부모 컴포넌트 전달
    const handleTimeChange = (
        period: string,
        hour: string,
        minute: string
    ) => {
        let hours = parseInt(hour);
        if (period === '오후' && hours !== 12) hours += 12;
        if (period === '오전' && hours === 12) hours = 0;

        const timeString = `${hours.toString().padStart(2, '0')}:${minute}`;
        onChange(timeString);
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPeriod = e.target.value;
        setSelectedPeriod(newPeriod);
        handleTimeChange(newPeriod, selectedHour, selectedMinute);
    };

    const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newHour = e.target.value;
        setSelectedHour(newHour);
        handleTimeChange(selectedPeriod, newHour, selectedMinute);
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMinute = e.target.value;
        setSelectedMinute(newMinute);
        handleTimeChange(selectedPeriod, selectedHour, newMinute);
    };

    return (
        <div className="flex gap-2 w-[800px]">
            <select
                value={selectedPeriod}
                onChange={handlePeriodChange}
                className="w-1/3 border border-gray-300 rounded-lg px-2"
            >
                <option value="오전">오전</option>
                <option value="오후">오후</option>
            </select>

            <select
                value={selectedHour}
                onChange={handleHourChange}
                className="w-1/3 border border-gray-300 rounded-lg px-2"
            >
                {Array.from({length: 12}, (_, i) => i + 1).map((hour) => (
                    <option key={hour} value={hour.toString().padStart(2, '0')}>
                        {hour}시
                    </option>
                ))}
            </select>

            <select
                value={selectedMinute}
                onChange={handleMinuteChange}
                className="w-1/3 border border-gray-300 rounded-lg px-2"
            >
                {Array.from({length: 60}, (_, i) => i).map((minute) => (
                    <option key={minute} value={minute.toString().padStart(2, '0')}>
                        {minute.toString().padStart(2, '0')}분
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimePicker;