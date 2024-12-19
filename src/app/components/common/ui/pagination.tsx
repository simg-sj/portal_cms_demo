"use client"
import cls from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    range?: number;
    maxNumber: number;
    numberParameter?: string;
    sizeParameter?: string;
    onChange?(number: number): void;
}

function A({ children, href, isActive = false, onClick }: { children: React.ReactNode; href: string; isActive?: boolean; onClick(): void }) {
    return (
        <Link href={href} className={cls({ selected: isActive })} onClick={onClick}>
            {children}
        </Link>
    );
}

function Pagination({ range = 5, maxNumber, numberParameter = "pageNumber", onChange = () => {} }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    const params = Object.fromEntries(searchParams.entries());
    const currentNumber = Number(params[numberParameter]) || 1;
    const startNum = currentNumber - ((currentNumber - 1) % range);

    function combineUrl(num: number) {
        const newParams = new URLSearchParams(params);
        newParams.set(numberParameter, num.toString());
        return "?" + newParams.toString();
    }

    function numbers() {
        const jsx = [];

        for (let i = 0; startNum + i <= maxNumber && i < range; i++) {
            const num = startNum + i;
            jsx.push(
                <li key={num}>
                    <A href={combineUrl(num)} isActive={currentNumber === num} onClick={() => onChange(num-1)}>
                        {num}
                    </A>
                </li>
            );
        }

        return jsx;
    }

    return (
        <div className="pagenumBox">
            <ul className="page_num">
                {currentNumber !== 1 && (
                    <>
                        <li className="first">
                            <A href={combineUrl(1)} onClick={() => onChange(0)}>&lt;&lt;</A>
                        </li>
                        <li className="prev">
                            <A href={combineUrl(currentNumber - range < 1 ? 1 : currentNumber - range)}
                               onClick={() => onChange(currentNumber - range < 1 ? 0 : currentNumber - range - 1)}>
                                &lt;
                            </A>
                        </li>
                    </>
                )}
                {numbers()}
                {currentNumber !== maxNumber && (
                    <>
                        <li className="next">
                            <A href={combineUrl(currentNumber + range > maxNumber ? maxNumber : currentNumber + range)}
                               onClick={() => onChange(currentNumber + range > maxNumber ? maxNumber - 1 : currentNumber + range - 1)}>
                                &gt;
                            </A>
                        </li>
                        <li className="last">
                            <A href={combineUrl(maxNumber)} onClick={() => onChange(maxNumber - 1)}>&gt;&gt;</A>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Pagination;