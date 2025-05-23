// 팝업 Content에 표시할 컴포넌트
import {useForm} from "react-hook-form";
import {InsuFormData} from "@/@types/common";
import Image from "next/image";
import Close from "@/assets/images/icon/close-icon.png";
import Button from "@/app/components/common/ui/button/button";
import React, {SetStateAction} from "react";
import {useNotifications} from "@/context/NotificationContext";

interface DepositPopupType {
    setIsOpen : React.Dispatch<SetStateAction<boolean>>
}
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
                    <h2 className="text-lg font-semibold">예치금 충전하기</h2>
                    <Image src={Close.src} alt={'닫기'} width={16} height={16} className={'mr-1 cursor-pointer'}
                           onClick={()=>setIsOpen(false)}/>
                </div>
                <div className="px-8 py-3">
                    <form className="space-y-4">
                        <div className={'flex items-center'}>
                            <div className={'w-[110px]'}>잔액</div>
                            <div className="flex-1">
                                100,000원
                            </div>
                        </div>

                        <div className={'flex items-center'}>
                            <div className={'w-[110px]'}>충전금액 <span className="text-red-500">*</span></div>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    {...register("productName", { required: "금액을 입력하세요" })}
                                    placeholder={'금액을 입력하세요'}
                                    className={'w-full border rounded px-2 py-1'}
                                />
                                {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
                            </div>
                        </div>

                        <div className={'flex items-center'}>
                            <div className={'w-[110px]'}>충전 후 잔액 </div>
                            <div className="flex-1">
                                100,000원
                            </div>
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