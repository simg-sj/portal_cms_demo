import {useState} from "react";
// import {api1001} from "../api/commonAPi.ts";
import Button from "@/app/components/common/ui/button";

interface Step2Props {
    onNext: () => void;
    onPrev: () => void;
    param: FormData;
}

export default function Step2({onNext, onPrev, param} : Step2Props)  {
    //체크박스 유효성검사
    const [agreements, setAgreements] = useState({
        privacy: false,
        thirdParty: false
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = e.target;
        setAgreements(prev => ({...prev, [name]: checked}));
    };

    const isAllChecked = agreements.privacy && agreements.thirdParty;

    const handleSubmit = async () => {
        try {
            let formData = new FormData();
            if (isAllChecked) {
                formData.append('name', param.name);
                formData.append('car', param.car);
                formData.append('carNum', param.carNum);
                formData.append('color', param.color);
                formData.append('contents', param.contents);
                formData.append('date', param.date);
                formData.append('datetime', param.date + ' ' + param.time);
                formData.append('etc', param.etc);
                formData.append('email', param.email +'@'+param.email2);
                formData.append('parking', param.parking);
                formData.append('phone', param.phone);
                formData.append('privacy', agreements.privacy ? 'Y' : 'N');
                formData.append('thirdParty', agreements.thirdParty ? 'Y' : 'N');

                if(param.image){
                    for(const file of param.image){
                        formData.append('photos', file);
                    }
                }

                /*for(let i of formData){
                    console.log(i);
                    onNext();

                }*/

                let {statusCode} = await api1001(formData);
                if(statusCode === '200'){
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
                <Button color={"gray"} onClick={onPrev} className={'mr-10 w-3/5 h-[60px] button'}>취소</Button>
                <Button color={"green"} fill={true} onClick={handleSubmit} className={'w-3/5 h-[60px] button'}>접수하기</Button>
            </div>
        </div>
    );
};