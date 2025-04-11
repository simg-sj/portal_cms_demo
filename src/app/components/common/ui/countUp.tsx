'use client'
import { useEffect, useState } from 'react';

interface CountUpProps {
    end: number | string;
    duration?: number;
    className?: string;
    suffix?: string;
}

const CountUp = ({end, duration = 2, className, suffix = ''}: CountUpProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const targetEnd = typeof end === 'string' ? Number(end.replace(/,/g, '')) : end; // 문자열 처리
        let start = 0;
        const increment = Math.ceil(targetEnd / (duration * 60));
        const timer = setInterval(() => {
            start += increment;
            if (start >= targetEnd) {
                clearInterval(timer);
                setCount(targetEnd);
            } else {
                setCount(start);
            }
        }, 1000 / 60); // 60fps

        return () => clearInterval(timer);
    }, [end, duration]);

    return <span className={className}>{count.toLocaleString()}{suffix}</span>;
};

export default CountUp;