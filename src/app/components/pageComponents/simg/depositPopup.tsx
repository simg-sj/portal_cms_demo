// 팝업 Content에 표시할 컴포넌트
import {useForm} from "react-hook-form";
import {InsuFormData} from "@/@types/common";
import Image from "next/image";
import Close from "@/assets/images/icon/close-icon.png";
import Button from "@/app/components/common/ui/button/button";
import React, {SetStateAction} from "react";
import {useNotifications} from "@/context/NotificationContext";
import Tooltip from "@/app/components/common/ui/tooltip";

interface DepositPopupType {
    setIsOpen : React.Dispatch<SetStateAction<boolean>>
}

const DepositGuide = () => {
    return (
        <>
            <div className="font-bold text-base mb-3">예치금 충전 가이드</div>
            <ul className="text-sm leading-relaxed list-disc pl-4 space-y-1">
                <li>
                    <span className="font-medium">입금계좌:</span> 110-000-000000 (예금주: ㅇㅇ)<br />
                    <span className="ml-4 text-gray-500">※ 입금자명을 <span className="font-medium">회사명</span>으로 입력해주세요.</span>
                </li>
                <li>
                    <span className="font-medium">충전금액 입력 후 신청</span>
                </li>
                <li>
                    <span className="font-medium">영업시간 확인:</span> 평일 오전 9시 ~ 오후 6시<br />
                    <span className="ml-4 text-gray-500">※ 확인 후 예치금이 충전됩니다.</span>
                </li>
                <li>
                    <span className="font-medium">충전된 금액으로 보험 신청 진행</span>
                </li>
            </ul>
        </>
    );
};


const DepositPopup = ({setIsOpen} : DepositPopupType) => {
    const { register, formState: { errors } } = useForm<InsuFormData>({
        defaultValues: {
            bpk : 1,
            productName: "",
            pNo: "",
            insurer: "",
            nickName: "",
            sDay: "",
            eDay: "",
            yPremiums: null,
            useYNull: "Y",
        },
    });

    // 알림창
    const {showAlert} = useNotifications();

    const onSubmit = () => {
        showAlert("신청되었습니다.", () => {
            setIsOpen(false);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg min-w-[500px] max-w-[800px]">
                <div className="flex justify-between items-center px-8 py-6">
                    <div className={'flex'}>
                        <h2 className="text-lg font-semibold">예치금 충전하기</h2>
                        <Tooltip content={<DepositGuide/>} width={400}/>
                    </div>
                    <Image src={Close.src} alt={'닫기'} width={16} height={16} className={'mr-1 cursor-pointer'}
                           onClick={()=>setIsOpen(false)}/>
                </div>
                <div className="py-3">
                    <form className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl shadow-sm mb-4 mx-8">
                            <div className={'flex items-center justify-between mb-3'}>
                                <div className="text-md text-gray-500">예치금 잔액</div>
                                <div className="text-lg font-semibold text-gray-900">100,000원</div>
                            </div>
                            <div className={'flex items-center justify-between mb-5'}>
                                <div className="text-md text-gray-500">충전 금액</div>
                                <div className={'flex items-center'}>
                                    <input
                                        type="number"
                                        {...register("productName", { required: "충전금액을 입력하세요" })}
                                        placeholder={'충전할 금액을 입력하세요'}
                                        className={'w-[250px] border rounded px-2 py-1 text-right'}
                                    />
                                    <div className={'text-lg text-gray-900 font-semibold ml-2'}>원</div>
                                </div>
                            </div>
                            <div className={'flex items-center justify-between mb-3 border-t-2 pt-3'}>
                                <div className="text-md text-gray-700 font-semibold">충전 후 잔액</div>
                                <div className="text-xl font-semibold text-gray-900">100,000원</div>
                            </div>
                            {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message} 하이</p>}
                        </div>
                    </form>
                </div>
                <div className="flex justify-center px-8 py-5 space-x-10">
                    <Button
                        onClick={() => setIsOpen(false)}
                        color={'gray'}
                        fill={false}
                        width={130}
                        height={40}
                    >
                        취소
                    </Button>
                    <Button
                        onClick={() => onSubmit()}
                        color={'main'}
                        fill={true}
                        width={130}
                        height={40}
                    >
                        신청
                    </Button>
                </div>
            </div>
        </div>

    );
};


export default DepositPopup;