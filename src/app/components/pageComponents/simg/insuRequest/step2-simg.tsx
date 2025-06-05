import React, {useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import {Step2PropsLC} from "@/@types/common";
import {turuApi1001} from "@/app/(Navigation-Group)/turu/action";
import {appendToFormData} from "@/app/lib/common";
import {useNotifications} from "@/context/NotificationContext";
import {simg1TimeDeposit} from "@/app/(Navigation-Group)/onetimeConsignMent/action";




const Step2= ({onNext, onPrev, getValues, register} : Step2PropsLC) =>  {
    const {showAlert} = useNotifications();

    const handleSubmit = async () => {
        try {
            let privacy = getValues('privacy');
            let thirdParty = getValues('thirdParty');

            if (privacy  && thirdParty ) {
                let value = getValues();
                const result = await simg1TimeDeposit(value);
                console.log("@@@", result)
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
        <div className={'text-xl md:text-2xl my-[70px] stepTwo break-keep'}>
            <div className={'text-lg font-light my-6 text-gray-700'}>개인정보 수집 및 이용에 동의하시고 사고접수를 완료해주세요.
            </div>
            <div className={'mb-10 text-2xl font-bold'}>개인정보 수집 및 이용동의</div>
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


            <div className={'mt-10 mb-5 text-2xl font-bold'}>개인정보 제3자 제공동의</div>
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
            <div className={'flex justify-center my-10 space-x-5'}>
                <Button color={"gray"} onClick={onPrev} textSize={18} width={540} height={60} className={'!w-1/2'}>취소</Button>
                <Button color={"main"} fill={true} onClick={handleSubmit} textSize={18} width={540} height={60} className={'!w-1/2'} >접수하기</Button>
            </div>
        </div>
    );
};

export default Step2;
