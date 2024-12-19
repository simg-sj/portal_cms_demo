import React, {useEffect, useState} from "react";
import Button from "@/app/components/common/ui/button";

interface FormData {
    name: string;
    phone: string;
    email: string;
    email2: string;
    parking: string;
    car: string;
    color: string;
    carNum: string;
    date: string;
    time : string;
    contents: string;
    etc: string;
    image?: FileList | null;
    [key: string]: string | FileList | null | undefined;
}

interface Step1Props {
    onNext: () => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    clickEventHandler : (event: React.MouseEvent<HTMLInputElement>) => void;
}


const Step1: React.FC<Step1Props> = ({onNext, formData, setFormData, clickEventHandler}) => {
    // input 빈칸 방지 유효성검사
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;

        if (name === 'image' && e.target instanceof HTMLInputElement) {
            const files = e.target.files;
            setFormData((prev: FormData) => ({...prev, [name]: files}));
        } else {
            const { value } = e.target;
            setFormData((prev: FormData) => ({...prev, [name]: value}));
        }
    };
    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};

        if (!formData.name) newErrors.name = "접수자성명을 입력해주세요";
        if (!formData.phone) newErrors.phone = "접수자 휴대폰번호를 입력해주세요";
        if (!formData.email || !formData.email2) newErrors.email = "접수자 이메일을 입력해주세요";
        if (!formData.parking) newErrors.parking = "사업장명(주차장)을 입력해주세요";
        if (!formData.car) newErrors.car = "사고차량 차종을 입력해주세요";
        if (!formData.color) newErrors.color = "사고차량 색상을 입력해주세요";
        if (!formData.carNum) newErrors.carNum = "사고차량 번호를 입력해주세요";
        if (!formData.date) newErrors.date = "사고일시를 입력해주세요";
        if (!formData.time) newErrors.time = "사고시간을 입력해주세요";
        if (!formData.contents) newErrors.contents = "누가, 언제, 어디서, 무엇을, 어떻게, 왜 형식으로 입력해주세요";
        if (!formData.image) newErrors.image = "사진파일을 첨부해주세요";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [formData]);

    const handleNext = () => {
        if (isFormValid) {
            onNext();
        } else {
            alert("모든 필수 항목을 입력해주세요.");
        }
    };
    return (
        <>
            <div className={'text-xl my-[70px] stepOne'}>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>접수자 성명 <span className={'text-red-500'}>*</span></div>
                    <input
                        type={'text'}
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className={'w-full'}
                    />
                </div>
                {errors.name && <div className="text-red-500 pl-[100px] text-base error">{errors.name}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>접수자 휴대전화 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'number'}
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.phone && <div className="text-red-500 pl-[100px] text-base error">{errors.phone}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>접수자 이메일 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="email"
                        value={formData.email || ''}
                        autoComplete={'off'}
                        onChange
                            ={handleInputChange}
                        className={'w-6/12'}
                    />
                    <span className={'w-1/12 text-center'}>@</span>
                    <input type="text" autoComplete={'off'} name='email2' value={formData.email2 || ''} list="email-list" className={'w-5/12 leading-5'} onChange={handleInputChange}/>
                    <datalist title="이메일 선택" id={'email-list'} >
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="hanmail.com">hanmail.com</option>
                        <option value="daum.net">daum.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="korea.kr">korea.kr</option>
                        <option value="icloud.com">icloud.com</option>
                        <option value="outlook.com">outlook.com</option>
                    </datalist>
                </div>
                {errors.email && <div className="text-red-500 pl-[100px] text-base error">{errors.email}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사업장명 (주차장)<span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        id={'open'}
                        defaultValue={formData.parking || ''}
                        placeholder={'주차장 및 주소를 검색해주세요.'}
                        readOnly={true}
                        onClick={clickEventHandler}
                    />
                </div>
                {errors.parking && <div className="text-red-500 pl-[100px] text-base error">{errors.parking}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차종 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="car"
                        value={formData.car || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.car && <div className="text-red-500 pl-[100px] text-base error">{errors.car}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차량색상 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="color"
                        value={formData.color || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.color && <div className="text-red-500 pl-[100px] text-base error">{errors.color}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고차량번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        value={formData.carNum || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고일자 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'date'}
                        name="date"
                        value={formData.date || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.date && <div className="text-red-500 pl-[100px] text-base error">{errors.date}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고시간 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'time'}
                        name="time"
                        value={formData.time || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.time && <div className="text-red-500 pl-[100px] text-base error">{errors.time}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고내용 <span className={'text-red-500'}>*</span>
                    </div>
                    <textarea rows={3}
                              className={'h-20 resize-none'}
                              name="contents"
                              value={formData.contents || ''}
                              onChange={handleInputChange}>
                    </textarea>
                </div>
                {errors.contents && <div className="text-red-500 pl-[100px] text-base error">{errors.contents}</div>}
                <div className={'flex px-[100px] py-5 items-start'}>
                    <div className={'font-medium w-[300px] mr-1'}>기타 하실 말씀</div>
                    <textarea rows={3}
                              className={'h-20 resize-none'}
                              name="etc"
                              value={formData.etc || ''}
                              onChange={handleInputChange}
                              placeholder={'하고 싶으신 말씀이 있으시면 자유롭게 입력해주세요'}>
                    </textarea>
                </div>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>첨부파일 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        name='image'
                        type={'file'}
                        accept="image/*"
                        multiple={true}
                        onChange={handleInputChange}
                    />
                </div>
                {errors.image && <div className="text-red-500 pl-[100px] text-base error">{errors.image}</div>}
            </div>
            <div className={'flex justify-center my-10'}>
                <Button color={"main"} fill={true} onClick={handleNext}
                        className={'text-xl w-4/5 h-[60px] button'}>확인</Button>
            </div>
        </>
    )
        ;
};

export default Step1;