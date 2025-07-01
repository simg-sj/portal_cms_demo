'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";
import Search from "../../../../../public/images/icon/detail-icon.png";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import Error from "../../../../../public/images/icon/error-icon.png";
import {kakaoPayType, ParamType} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import Plus from "../../../../../public/images/icon/plus-icon.png";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import dayjs from "dayjs";
import Pagination from "@/app/components/common/ui/pagination";

export default function Page() {
    const [param, setParam] = useState<ParamType>({
        bpk: 4,
        condition: "partnerName",
        endDate: dayjs().format('YYYY-MM'),
        startDate: dayjs().format('YYYY-MM'),
        text: ''
    });

    // Full sample data
    const fullKakaoPay: kakaoPayType[] = [
        {
            year: '2025',
            month: '03',
            twoPay: 27,
            twoCount: 109284,
            fourPay: 36,
            fourCount: 230430
        },
        {
            year: '2025',
            month: '02',
            twoPay: 27,
            twoCount: 113360,
            fourPay: 36,
            fourCount: 231816
        },
        {
            year: '2025',
            month: '01',
            twoPay: 26,
            twoCount: 105123,
            fourPay: 35,
            fourCount: 225678
        },
        {
            year: '2024',
            month: '12',
            twoPay: 26,
            twoCount: 98765,
            fourPay: 35,
            fourCount: 220987
        },
        {
            year: '2024',
            month: '11',
            twoPay: 25,
            twoCount: 95432,
            fourPay: 34,
            fourCount: 215654
        },
        {
            year: '2024',
            month: '10',
            twoPay: 25,
            twoCount: 92345,
            fourPay: 34,
            fourCount: 210876
        },
        {
            year: '2024',
            month: '09',
            twoPay: 24,
            twoCount: 89876,
            fourPay: 33,
            fourCount: 205432
        }
    ];

    const fullTodayPickupPay: kakaoPayType[] = [
        {
            year: '2025',
            month: '03',
            twoPay: 30,
            twoCount: 15404,
            fourPay: 33,
            fourCount: 84749
        },
        {
            year: '2025',
            month: '02',
            twoPay: 30,
            twoCount: 15395,
            fourPay: 33,
            fourCount: 77191
        },
        {
            year: '2025',
            month: '01',
            twoPay: 29,
            twoCount: 14876,
            fourPay: 32,
            fourCount: 80123
        },
        {
            year: '2024',
            month: '12',
            twoPay: 29,
            twoCount: 14567,
            fourPay: 32,
            fourCount: 76543
        },
        {
            year: '2024',
            month: '11',
            twoPay: 28,
            twoCount: 14210,
            fourPay: 31,
            fourCount: 72987
        },
        {
            year: '2024',
            month: '10',
            twoPay: 28,
            twoCount: 13987,
            fourPay: 31,
            fourCount: 70654
        },
        {
            year: '2024',
            month: '09',
            twoPay: 27,
            twoCount: 13654,
            fourPay: 30,
            fourCount: 68321
        }
    ];

    // State for current page
    const [kakaoPayCurrentPage, setKakaoPayCurrentPage] = useState(0);
    const [todayPickupCurrentPage, setTodayPickupCurrentPage] = useState(0);

    // Items per page
    const itemsPerPage = 15;

    // Pagination logic
    const getPaginatedData = (data: kakaoPayType[], currentPage: number) => {
        const startIndex = currentPage * itemsPerPage;
        return data.slice(startIndex, startIndex + itemsPerPage);
    };

    // Render pagination component for each table
    const renderPagination = (
        data: kakaoPayType[],
        currentPage: number,
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const totalPages = Math.ceil(data.length / itemsPerPage);

        return totalPages > 1 ? (
            <div className="flex justify-center mt-4">
                <Pagination
                    maxNumber={totalPages}
                    currentPage={currentPage + 1}
                    onChange={(page) => {setCurrentPage(page);}}
                />
            </div>
        ) : null;
    };

    return(
        <div className={'space-y-5'}>
            <div className={'flex space-x-5'}>
                <div className={'px-8 py-6 bg-white rounded-xl w-1/2 min-h-[800px]'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>카카오 보험료</div>
                    </div>
                    <div className={"flex justify-between items-center mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <DayTerm setParam={setParam} type={"oneYear"}></DayTerm>
                            <Image src={Search} alt={"검색"} width={22} height={20}
                                   className={'cursor-pointer ml-3'}></Image>
                        </div>
                        <Button color={"main"} fill height={35} width={120}>
                            <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                            신규등록
                        </Button>
                    </div>
                    <div className={'overflow-y-auto'}>
                        <table className={'w-full relative'}>
                            <colgroup>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                            </colgroup>
                            <thead className={'sticky left-0 top-0'}>
                            <tr>
                                <th rowSpan={2}>날짜</th>
                                <th colSpan={2}>2륜이하</th>
                                <th colSpan={2}>4륜</th>
                            </tr>
                            <tr>
                                <th>운행당 보험료</th>
                                <th>운행건</th>
                                <th>운행당 보험료</th>
                                <th>운행건</th>
                            </tr>
                            </thead>
                            <tbody>
                            {fullKakaoPay.length ? (
                                getPaginatedData(fullKakaoPay, kakaoPayCurrentPage).map((kakao, index) => (
                                    <tr key={index}>
                                        <td>{kakao.year + '-' + kakao.month}</td>
                                        <td>{FormatNumber(Number(kakao.twoPay))}</td>
                                        <td>{FormatNumber(Number(kakao.twoCount))}</td>
                                        <td>{FormatNumber(Number(kakao.fourPay))}</td>
                                        <td>{FormatNumber(Number(kakao.fourCount))}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        <div className={'flex items-centers justify-center my-[30px]'}>
                                            <Image src={Error.src} alt={'에러'} width={30} height={30}
                                                   className={'mr-5'}/>
                                            <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    {renderPagination(fullKakaoPay, kakaoPayCurrentPage, setKakaoPayCurrentPage)}
                </div>
                <div className={'px-8 py-6 bg-white rounded-xl w-1/2'}>
                    <div className={'flex justify-between items-start'}>
                        <div className={'text-lg font-light mb-6'}>오늘의 픽업 보험료</div>
                    </div>
                    <div className={"flex justify-between items-center mb-4 text-lg"}>
                        <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                            <DayTerm setParam={setParam} type={"oneYear"}></DayTerm>
                            <Image src={Search} alt={"검색"} width={22} height={20}
                                   className={'cursor-pointer ml-3'}></Image>
                        </div>
                        <Button color={"main"} fill height={35} width={120}>
                            <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                            신규등록
                        </Button>
                    </div>
                    <div className={'overflow-y-auto'}>
                        <table className={'w-full relative'}>
                            <colgroup>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                                <col style={{width: ""}}/>
                            </colgroup>
                            <thead className={'sticky left-0 top-0'}>
                            <tr>
                                <th rowSpan={2}>날짜</th>
                                <th colSpan={2}>2륜이하</th>
                                <th colSpan={2}>4륜</th>
                            </tr>
                            <tr>
                                <th>운행당 보험료</th>
                                <th>운행건</th>
                                <th>운행당 보험료</th>
                                <th>운행건</th>
                            </tr>
                            </thead>
                            <tbody>
                            {fullTodayPickupPay.length ? (
                                getPaginatedData(fullTodayPickupPay, todayPickupCurrentPage).map((today, index) => (
                                    <tr key={index}>
                                        <td>{today.year + '-' + today.month}</td>
                                        <td>{FormatNumber(Number(today.twoPay))}</td>
                                        <td>{FormatNumber(Number(today.twoCount))}</td>
                                        <td>{FormatNumber(Number(today.fourPay))}</td>
                                        <td>{FormatNumber(Number(today.fourCount))}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        <div className={'flex items-centers justify-center my-[30px]'}>
                                            <Image src={Error.src} alt={'에러'} width={30} height={30}
                                                   className={'mr-5'}/>
                                            <div className={'text-gray-700 text-lg'}>데이터가 없습니다.</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    {renderPagination(fullTodayPickupPay, todayPickupCurrentPage, setTodayPickupCurrentPage)}
                </div>
            </div>
        </div>
    )
}