import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CountUp from "@/app/components/common/ui/countUp";

interface CountdCardProps {
    icon: string | StaticImageData;
    title: string;
    value: number | string;
    unit: string;
    percentChange?: number | string;
}
const CountCard = ({icon, title, value, unit, percentChange}: CountdCardProps) => {

    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    const numericPercentChange = typeof percentChange === 'string'
        ? parseFloat(percentChange.replace('%', ''))
        : percentChange;

    const percentChangeColor = numericPercentChange && numericPercentChange > 0
        ? 'text-blue-500'
        : numericPercentChange && numericPercentChange < 0
            ? 'text-red-500'
            : '';

    const percentChangeDisplay = numericPercentChange !== undefined
        ? `${numericPercentChange > 0 ? '+' : ''}${numericPercentChange}%`
        : null;

    return (
        <div className={'my-5 bg-white shadow-lg px-5 py-5 rounded-xl w-full'}>
            <div className={'w-full'}>
                <Image
                    src={icon}
                    alt={`${title} 아이콘`}
                    width={30}
                    height={30}
                    className={'my-4'}
                />
                <div className={'text-gray-700 mb-2'}>{title}</div>

                {percentChangeDisplay && (
                    <div className={'flex justify-end'}>
                        <div className={`${percentChangeColor} font-medium`}>
                            {percentChangeDisplay}
                        </div>
                    </div>
                )}

                <div className={'flex justify-between items-end'}>
                    <CountUp
                        end={numericValue}
                        duration={2}
                        className={'text-3xl font-semibold'}
                    />
                    <span className={'text-xl font-semibold ml-5'}>{unit}</span>
                </div>
            </div>
        </div>
    );
};

export default CountCard;