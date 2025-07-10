import React from "react";
import Button from "@/app/components/common/ui/button/button";
import {Step2PropsLC} from "@/@types/common";
import {useNotifications} from "@/context/NotificationContext";
import {simg1TimeDeposit} from "@/app/(Navigation-Group)/onetimeConsignMent/action";




const Step2= ({onNext, onPrev, getValues, register} : Step2PropsLC) =>  {
    const {showAlert} = useNotifications();

    const handleSubmit = async () => {
        try {
            let privacy = getValues('privacy');
            let thirdParty = getValues('thirdParty');
            let depositor = getValues('depositor');
            if (privacy  && thirdParty && depositor ) {
                let value = getValues();
                const result = await simg1TimeDeposit(value);
                if(result.code === '200'){
                    onNext();
                }else{
                    showAlert(result.msg)
                }
            } else {
                alert("모든 약관에 동의해주세요.");
            }
        }catch(error){
            console.error(error);
        }
    };
    return (
        <div className={'text-md md:text-lg sm:text-xl my-[70px] stepTwo break-keep'}>
            <div className={'text-lg font-light my-6 text-gray-700'}>개인정보 수집 및 이용에 동의하시고 사고접수를 완료해주세요.
            </div>
            <div className={'mb-10 text-xl sm:text-lg font-bold'}>개인정보 수집 및 이용동의</div>
            <div className={'font-medium my-3'}>1. 개인정보의 수집 및 이용목적</div>
            <div className={'text-gray-800 mb-5'}>보험금지급·심사 및 보험사고 조사(보험사기 조사 포함), 보험금지급관련 민원처리 및 분쟁대응</div>
            <div className={'font-medium my-3'}>2. 수집항목</div>
            <div className={'text-gray-800 mb-5'}>성명,연락처(휴대전화),이메일</div>
            <div className={'font-medium my-3'}>3. 개인정보의 이용 및 보유기간</div>
            <div className={'text-gray-800 mb-5'}>목적 완료 후 즉시 파기</div>
            <label className={'flex items-center mt-10'}>
                <input
                    type="checkbox"
                    name="privacy"
                    {...register("privacy", { required: "개인정보수집 및 이용방침에 동의해주세요." })}
                    className={'mr-3 w-4'}
                />
                <div className={'text-lg text-gray-700'}> 위와 같이 개인정보수집 및 이용방침에 동의합니다.</div>
            </label>


            <div className={'mt-10 mb-5 text-xl sm:text-lg font-bold'}>개인정보 제3자 제공동의</div>
            <div className={'font-medium my-3'}>1. 개인정보를 제공받는 자</div>
            <div className={'text-gray-800 mb-5'}>기명 피보험자 : [예정] <br/>보험회사 등 : 하나손해보험</div>
            <div className={'font-medium my-3'}>2. 제공하는 개인정보의 항목</div>
            <div className={'text-gray-800 mb-5'}>성명, 연락처(휴대전화), 이메일</div>
            <div className={'font-medium my-3'}>3. 개인정보를 제공받는 자의 개인정보 이용 목적</div>
            <div className={'text-gray-800 mb-5'}>기명 피보험자 : [확인필요] 가입여부 확인<br/>보험회사 등 : 보험금지급·심사 및 보험사고 조사(보험사기 조사 포함),
                보험금지급관련 민원처리 및 분쟁대응
            </div>
            <div className={'font-medium my-3'}>4. 제공받는 자의 개인정보 보유·이용기간</div>
            <div className={'text-gray-800 mb-5'}>기명 피보험자 : 기사 가입여부 확인 후 즉시 삭제<br/>보험회사 등 : 목적 완료 후 즉시 파기</div>

            <label className={'flex items-center mt-10'}>
                <input
                    type="checkbox"
                    name="thirdParty"
                    {...register("thirdParty", { required: "개인정보 제3자 제공에 동의해주세요." })}
                    className={'mr-3 w-4'}
                />
                <div className={'text-lg text-gray-700'}> 위와 같이 개인정보 제3자 제공에 동의합니다.</div>
            </label>

            <div className={'mt-10 mb-5 text-xl sm:text-lg font-bold'}>예금자보호 관련 안내사항</div>
            <div className={'my-3'}>1. 이 보험계약은 「예금자보호법」에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 5천만원까지 (본 보험회사의 여타 보호상품과 합산) 보호됩니다.</div>
            <div className={'my-3'}>2. 또한 본 보험회사의 보호상품 중 사고보험금은 별도로 1인당 5천만원까지 보호됩니다.<br/></div>
            <div className={'my-3'}>3. 보험계약 해지 후 신규계약 체결 시, 보험 인수 거절 / 보험료 인상 / 보장내용 변경 가능성 있습니다.</div>
            <div className={'my-3'}>4. 보험금 지급은 약관의 지급한도 / 면책사항 등에 따라 제한될 수 있습니다.</div>
            <div className={' text-md text-gray-800 mb-5'}>* 계약 전 상품설명서 및 약관을 반드시 확인하세요.</div>
            <label className={'flex items-center mt-10'}>
              <input
                type="checkbox"
                name="depositor"
                {...register("depositor", { required: "개인정보수집 및 이용방침에 동의해주세요." })}
                className={'mr-3 w-4'}
              />
              <div className={'text-lg text-gray-700'}> 위 예금자보호 관련 사항을 확인하였으며, 이해하고 동의합니다.</div>
            </label>

            <div className={'flex justify-center my-10 space-x-5'}>
                <Button color={"gray"} onClick={onPrev} textSize={18} width={540} height={60} className={'!w-1/2'}>취소</Button>
                <Button color={"main"} fill={true} onClick={handleSubmit} textSize={18} width={540} height={60} className={'!w-1/2'} >접수하기</Button>
            </div>
        </div>
    );
};

export default Step2;
