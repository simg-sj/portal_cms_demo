'use client'
import React, {useState} from "react";
import Image from "next/image";
import Search from "@/assets/images/icon/detail-icon.png";
import FormatNumber from "@/app/components/common/ui/formatNumber";
import Error from "@/assets/images/icon/error-icon.png";
import {kakaoPayType, ParamType} from "@/@types/common";
import Button from "@/app/components/common/ui/button/button";
import Plus from "@/assets/images/icon/plus-icon.png";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";
import dayjs from "dayjs";

export default function Page() {
    const [param, setParam] = useState<ParamType>({
        bpk: 4,
        condition: "partnerName",
        endDate: dayjs().format('YYYY-MM'),
        startDate: dayjs().format('YYYY-MM'),
        text: ''
    });
    //임의 데이터
    const kakaoPay: kakaoPayType[] = [
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
    ]

    const todayPickupPay: kakaoPayType[] = [
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
    ]


    return(
            <div className={'space-y-5'}>
                <div className={'flex space-x-5'}>
                    <div className={'px-8 py-6 bg-white rounded-xl w-1/2'}>
                        <div className={'flex justify-between items-start'}>
                            <div className={'text-lg font-light mb-6'}>카카오 보험료</div>
                        </div>
                        <div className={"flex justify-between items-center mb-4 text-lg"}>
                            <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                                <div className="flex items-center justify-start">

                                </div>
                                <DayTerm setParam={setParam} type={"oneYear"}></DayTerm>
                                <Image src={Search} alt={"검색"} width={22} height={20}
                                       className={'cursor-pointer ml-3'}></Image>
                            </div>
                            <Button color={"main"} fill height={35} width={120}>
                                <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                                신규등록
                            </Button>
                        </div>
                        <div className={'max-h-[250px] overflow-y-auto'}>
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
                                {kakaoPay.length ? (
                                    kakaoPay.map((kakao, index) => (
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
                        {/*페이지 관련 나중에 넣을예정*/}
                        {/*                        {totalPages > 0 && (
                            <Pagination
                                maxNumber={totalPages}
                            />
                        )}*/}
                    </div>
                    <div className={'px-8 py-6 bg-white rounded-xl w-1/2'}>
                        <div className={'flex justify-between items-start'}>
                            <div className={'text-lg font-light mb-6'}>오늘의 픽업 보험료</div>
                        </div>
                        <div className={"flex justify-between items-center mb-4 text-lg"}>
                            <div className={'border w-fit px-5 py-1 rounded-lg flex items-center'}>
                                <div className="flex items-center justify-start">

                                </div>
                                <DayTerm setParam={setParam} type={"oneYear"}></DayTerm>
                                <Image src={Search} alt={"검색"} width={22} height={20}
                                       className={'cursor-pointer ml-3'}></Image>
                            </div>
                            <Button color={"main"} fill height={35} width={120}>
                                <Image src={Plus} alt={'추가'} width={16} height={16} className={'mr-1'}/>
                                신규등록
                            </Button>
                        </div>
                        <div className={'max-h-[250px] overflow-y-auto'}>
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
                                {todayPickupPay.length ? (
                                    todayPickupPay.map((today, index) => (
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
                        {/*페이지 관련 나중에 넣을예정*/}
                        {/*                        {totalPages > 0 && (
                            <Pagination
                                maxNumber={totalPages}
                            />
                        )}*/}
                    </div>
                </div>
            </div>
    )
}