'use client'
import Image from "next/image";
import ChargeIcon from "@/assets/images/icon/charge-icon.png";
import CheckChargeIcon from "@/assets/images/icon/checckCharge-icon.png";
import CancelChargeIcon from "@/assets/images/icon/cancelCharge-icon.png";
import AlarmIcon from "@/assets/images/icon/alarm-icon.png";
import Button from "@/app/components/common/ui/button";
import Tooltip from "@/app/components/common/ui/tooltip"
import Plus from "@/assets/images/icon/plus-icon.png";
import EditIcon from "@/assets/images/icon/edit-icon.png";
import DeleteIcon from "@/assets/images/icon/delete-icon.png";
import WarningIcon from "@/assets/images/icon/warning-icon.png";
import React from "react";
import CountCard from "@/app/components/common/CountCard";


export default function Page() {
    return (
        <>
            <div className={'p-6 rounded-lg bg-white'}>
                    <div className={'flex items-center mb-6'}>
                        <div className={'text-xl font-light'}>보험관리</div>
                        <Tooltip content={"보험관리 추가 버튼으로 현재 가입되어 있는 보험을 추가하여 해당 페이지에서 모든 보험을 관리할 수 있으며, 갱신 예정인 보험을 1달전에 알림으로 알려드립니다. 갱신 정보는 보험관리추가 버튼을 통해 추가할 수 있습니다."}/>
                    </div>
                <div className={'flex justify-between space-x-10'}>
                    <CountCard
                        icon={CheckChargeIcon}
                        title={'가입 보험'}
                        value={3}
                        unit={"건"}
                    />
                    <CountCard
                        icon={ChargeIcon}
                        title={'총 보험료'}
                        value={56328430043}
                        unit={"원"}
                    />
                    <CountCard
                        icon={CancelChargeIcon}
                        title={'만료된 보험'}
                        value={1}
                        unit={"건"}
                    />
                    <CountCard
                        icon={AlarmIcon}
                        title={'갱신예정 보험'}
                        value={1}
                        unit={"건"}
                    />
                    {/*<div className={'w-2 h-2 bg-red-500 rounded-full absolute top-0 left-[90px]'}></div>*/}
                </div>
            </div>
            {/*보험리스트*/}
            <div className={'p-6 rounded-lg bg-white my-5'}>
                <div className={'flex justify-between'}>
                <div className={'text-xl font-light mb-6'}>보험리스트</div>
                <Button color={"main"} fill height={36} width={132}>
                    <Image src={Plus.src} alt={'추가'} width={14} height={14} className={'mr-1'}/>
                    보험관리추가
                </Button>
                </div>
                <div className={'max-h-[calc(100vh-500px)] overflow-y-auto'}>
                    <div className={'rounded-xl border border-gray-200 my-3'}>
                        <div className={'flex justify-between items-start px-7 pt-5 mb-5'}>
                            <div>
                                <Button color={"blue"} height={26} width={180} rounded={true} textSize={14}>2025.10.01
                                    갱신예정</Button>
                                <div className={'font-semibold text-lg my-4 mx-2 relative'}>
                                    주차장배상책임보험
                                </div>
                            </div>
                            <div className={'flex items-center space-x-4'}>
                                <div className={'flex items-center text-sm py-2 px-5 bg-gray-100 rounded-lg'}>
                                    <Image src={WarningIcon.src} alt={'경고'} width={18} height={18}
                                           className={'cursor-pointer mr-2'}/>
                                    <div>갱신일정이 13일 남았습니다. 갱신정보를 입력해주세요.</div>
                                </div>
                                <Image src={EditIcon.src} alt={'수정'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                                <Image src={DeleteIcon.src} alt={'삭제'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                            </div>
                        </div>
                        <div className={'flex justify-between items-end px-7 mb-5'}>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>증권번호</div>
                                <div>F-2024-0494293</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험사</div>
                                <div>하나손해보험</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>담당사</div>
                                <div>SIMG</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험기간</div>
                                <div>2024.10.01 ~ 2025.10.01</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험료</div>
                                <div><span>4,600,000</span> 원</div>
                            </div>
                        </div>
                        <div className={'bg-gray-50 mt-5 py-2'}>
                            <div className={'flex justify-between py-3 px-7'}>
                                <div>F-2023-0494293</div>
                                <div>하나손해보험</div>
                                <div>SIMG</div>
                                <div>2023.10.01 ~ 2024.10.01</div>
                                <div>4.800.000 원</div>
                            </div>
                            <div className={'flex justify-between py-3 px-7'}>
                                <div>F-2022-0494293</div>
                                <div>하나손해보험</div>
                                <div>SIMG</div>
                                <div>2022.10.01 ~ 2023.10.01</div>
                                <div>4.800.000 원</div>
                            </div>
                        </div>
                    </div>


                    <div className={'rounded-xl border border-gray-200 my-3'}>
                        <div className={'flex justify-between items-start px-7 pt-5 mb-5'}>
                            <div>
                                <Button color={"gray"} fill height={26} width={180} rounded={true} textSize={14}>2024.10.23
                                    만료</Button>
                                <div className={'font-semibold text-lg my-4 mx-2 relative'}>
                                    개인정보배상책임보험
                                </div>
                            </div>
                            <div className={'flex items-center space-x-4'}>
                                <Image src={EditIcon.src} alt={'수정'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                                <Image src={DeleteIcon.src} alt={'삭제'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                            </div>
                        </div>
                        <div className={'flex justify-between items-end px-7 mb-5'}>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>증권번호</div>
                                <div>F-2024-0494293</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험사</div>
                                <div>하나손해보험</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>담당사</div>
                                <div>SIMG</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험기간</div>
                                <div>2024.10.01 ~ 2025.10.01</div>
                            </div>₩
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험료</div>
                                <div><span>4,600,000</span> 원</div>
                            </div>
                        </div>
                    </div>

                    <div className={'rounded-xl border border-gray-200 my-3'}>
                        <div className={'flex justify-between items-start px-7 pt-5 mb-5'}>
                            <div>
                                <Button color={"gray"} fill height={26} width={180} rounded={true} textSize={14}>2024.10.23
                                    만료</Button>
                                <div className={'font-semibold text-lg my-4 mx-2 relative'}>
                                    주차장배상책임보험
                                </div>
                            </div>
                            <div className={'flex items-center spa' +
                                '' +
                                '' +
                                '₩ce-x-4'}>
                                <Image src={EditIcon.src} alt={'수정'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                                <Image src={DeleteIcon.src} alt={'삭제'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                            </div>
                        </div>
                        <div className={'flex justify-between items-end px-7 mb-5'}>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>증권번호</div>
                                <div>F-2024-0494293</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험사</div>
                                <div>하나손해보험</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>담당사</div>
                                <div>SIMG</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험기간</div>
                                <div>2024.10.01 ~ 2025.10.01</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험료</div>
                                <div><span>4,600,000</span> 원</div>
                            </div>
                        </div>
                    </div>

                    <div className={'rounded-xl border border-gray-200 my-3'}>
                        <div className={'flex justify-between items-start px-7 pt-5 mb-5'}>
                            <div>
                                <Button color={"gray"} fill height={26} width={180} rounded={true} textSize={14}>2024.10.23
                                    만료</Button>
                                <div className={'font-semibold text-lg my-4 mx-2 relative'}>
                                    주차장배상책임보험
                                </div>
                            </div>
                            <div className={'flex items-center space-x-4'}>
                                <Image src={EditIcon.src} alt={'수정'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                                <Image src={DeleteIcon.src} alt={'삭제'} width={18} height={18}
                                       className={'cursor-pointer'}/>
                            </div>
                        </div>
                        <div className={'flex justify-between items-end px-7 mb-5'}>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>증권번호</div>
                                <div>F-2024-0494293</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험사</div>
                                <div>하나손해보험</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>담당사</div>
                                <div>SIMG</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험기간</div>
                                <div>2024.10.01 ~ 2025.10.01</div>
                            </div>
                            <div>
                                <div className={'text-gray-600 mb-2 text-sm'}>보험료</div>
                                <div><span>4,600,000</span> 원</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}