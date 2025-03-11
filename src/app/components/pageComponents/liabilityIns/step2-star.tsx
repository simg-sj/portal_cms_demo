import React, {useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import {dutyApi1001} from "@/app/(Navigation-Group)/action";
import {Step2PropsDT} from "@/@types/common";




const Step2= ({onNext, onPrev, param} : Step2PropsDT) =>  {
    //체크박스 유효성검사
    const [agreements, setAgreements] = useState({
        privacy: false,
        thirdParty: false
    });
    console.log(param);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setAgreements(prev => ({...prev, [name]: checked}));
    };

    const isAllChecked = agreements.privacy && agreements.thirdParty;

    const handleSubmit = async () => {
        try {
            if (isAllChecked) {
                let {code} = await dutyApi1001(param);
                if(code === '200'){
                    onNext();
                }
            } else {
                alert("모든 약관에 동의해주세요.");
            }
        }catch(error){
            console.error(error);
        }
    };
    return (
        <div className={'text-xl my-[70px] mx-[100px] stepTwo'}>
            <div className={'mb-5 text-2xl font-bold'}>개인정보 수집 및 이용동의</div>
            <div className={'font-medium my-3'}>1. 개인정보의 수집 및 이용목적</div>
            <div className={'text-gray-800 mb-5'}>보험금지급·심사 및 보험사고 조사(보험사기 조사 포함), 보험금지급관련 민원처리 및 분쟁대응</div>
            <div className={'font-medium my-3'}>2. 수집항목</div>
            <div className={'text-gray-800 mb-5'}>성명,연락처(휴대전화),이메일</div>
            <div className={'font-medium my-3'}>3. 개인정보의 이용 및 보유기간</div>
            <div className={'text-gray-800 mb-5'}>목적 완료 후 즉시 파기</div>


            <div className={'mt-10 mb-5 text-2xl font-bold'}>개인정보 제3자 제공동의</div>
            <div className={'font-medium my-3'}>1. 개인정보를 제공받는 자</div>
            <div className={'text-gray-800 mb-5'}>기명 피보험자 : 별따러가자 <br/>보험회사 등 : 현대</div>
            <div className={'font-medium my-3'}>2. 제공하는 개인정보의 항목</div>
            <div className={'text-gray-800 mb-5'}>성명, 연락처(휴대전화), 이메일</div>
            <div className={'font-medium my-3'}>3. 개인정보를 제공받는 자의 개인정보 이용 목적</div>
            <div className={'text-gray-800 mb-5'}>기명 피보험자 : [추가해야함] 가입여부 확인<br/>보험회사 등 : 보험금지급·심사 및 보험사고 조사(보험사기 조사 포함),
                보험금지급관련 민원처리 및 분쟁대응
            </div>
            <div className={'font-medium my-3'}>4. 제공받는 자의 개인정보 보유·이용기간</div>
            <div className={'text-gray-800 mb-5'}>기명 피보험자 : 기사 가입여부 확인 후 즉시 삭제<br/>보험회사 등 : 목적 완료 후 즉시 파기</div>

            <label className={'flex items-center mt-10'}>
                <input
                    type="checkbox"
                    name="privacy"
                    checked={agreements.privacy}
                    onChange={handleCheckboxChange}
                    className={'mr-3 w-4'}
                />
                <div className={'text-lg text-gray-700'}> 위와 같이 개인정보수집 및 이용방침에 동의합니다.</div>
            </label>
            <label className={'flex items-center'}>
                <input
                    type="checkbox"
                    name="thirdParty"
                    checked={agreements.thirdParty}
                    onChange={handleCheckboxChange}
                    className={'mr-3 w-4'}
                />
                <div className={'text-lg text-gray-700'}> 위와 같이 개인정보 제3자 제공에 동의합니다.</div>
            </label>
            <div className={'flex justify-center my-10'}>
                <Button color={"gray"} onClick={onPrev} textSize={18} width={540} height={60}
                        className={'mr-[20px]'}>취소</Button>
                <Button color={"main"} fill={true} onClick={handleSubmit} textSize={18} width={540}
                        height={60}>접수하기</Button>
            </div>
        </div>
    );
};

export default Step2;

