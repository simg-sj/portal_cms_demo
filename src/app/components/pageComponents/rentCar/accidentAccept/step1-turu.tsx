import React, {useEffect, useState} from "react";
import Button from "@/app/components/common/ui/button/button";
import type {dutyRowType, Step1Props} from "@/@types/common";
import {useSession} from "next-auth/react";
import TimePicker from "@/app/components/common/ui/input/timePicker";
import DayTerm from "@/app/components/common/ui/calender/dayTerm";

const Step1 = ({onNext, formData, setFormData}: Step1Props) => {
    const {data} = useSession();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [confirmation, setConfirmation] = useState<'Y' | 'N' | null>(null);
    const isAdmin = data?.user?.auth === 'admin';

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev: dutyRowType) => ({...prev, [name]: value}));
    };


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.partnerName) newErrors.partnerName = "제휴사명을 선택해주세요.";
        const carNumRegex = /^\d{2,3}[가-힣]\d{4}$/;
        if (!formData.carNum) {
            newErrors.carNum = "차량번호를 입력해주세요. 차량번호입력시 차종이 자동입력됩니다.";
        } else if (!carNumRegex.test(formData.carNum)) {
            newErrors.carNum = "차량번호 형식이 올바르지 않습니다. 형식: 12가3456 또는 123가4567 으로 입력해주세요.";
        }
        if (!formData.accidentDate) newErrors.accidentDate = "사고일시를 선택해주세요.";
        if (!formData.accidentTime) newErrors.accidentTime = "사고시간을 선택해주세요.";
        if (!formData.arrivalETA) newErrors.arrivalETA = "예상입고일정을 선택해주세요.";
        if (!formData.propDamage && !formData.persInjury && !formData.etc) newErrors.damage = "피해규모를 입력해주세요"
        if (!formData.accidentDetail) newErrors.accidentDetail = "사고내용을 입력해주세요";
        if (isAdmin) {
            if (confirmation === null) {
                newErrors.confirmation = "컨펌여부를 선택해주세요";
            }
            if (confirmation === 'Y' && !formData.confirmedBy) {
                newErrors.confirmedBy = "담당자를 선택해주세요";
            }
        }
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

    useEffect(() => {
        if(data && data.user){
            if(!isAdmin){
                setFormData((prev: dutyRowType) => ({...prev, partnerName : data.user.bName}));
            }
        }
    }, [data]);
    return (
        <>
            <div className={'text-lg font-light my-6 px-[100px] text-gray-700'}>별따러가자 책임 보험접수 페이지입니다. 보험접수 내용을 입력하여
                접수해주세요.
            </div>
            <div className={'text-xl my-[50px] stepOne'}>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사업자번호 <span className={'text-red-500'}>*</span></div>
                            <input
                                type={'text'}
                                name="partnerName"
                                defaultValue={formData.partnerName || ''}
                                onChange={handleInputChange}
                                className={'w-[800px]'}
                            />
                </div>
                {errors.partnerName &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.partnerName}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>보험기간 <span className={'text-red-500'}>*</span>
                    </div>
                        <DayTerm  type={'day'} setParam={setFormData} sDay={new Date(formData.startDate)} eDay={new Date(formData.endDate)}/>
                </div>
                {errors.accidentDate &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.accidentDate}</div>
                }
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>차대번호 <span className={'text-red-500'}>*</span>
                    </div>
                    <input
                        type={'text'}
                        name="carNum"
                        defaultValue={formData.carNum || ''}
                        onChange={handleInputChange}
                        className={'w-[800px]'}
                    />
                </div>
                {errors.carNum && <div className="text-red-500 pl-[100px] text-base error">{errors.carNum}</div>}
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>피해규모 <span className={'text-red-500'}>*</span></div>
                    <div className={'flex justify-between w-[800px]'}>
                        <div className={'flex items-center w-1/3 mr-5'}>
                            <div className={'text-base'}>대물</div>
                            <input
                                type={'text'}
                                name="propDamage"
                                defaultValue={formData.propDamage}
                                onChange={handleInputChange}
                                className={'mx-3 w-[140px]'}
                            />
                            <div className={'text-base'}>대</div>
                        </div>
                        <div className={'flex items-center w-1/3 mr-5'}>
                            <div className={'text-base'}>대인</div>
                            <input
                                type={'text'}
                                name="persInjury"
                                defaultValue={formData.persInjury}
                                onChange={handleInputChange}
                                className={'mx-3 w-[140px]'}
                            />
                            <div className={'text-base'}>인</div>
                        </div>
                        <div className={'flex items-center w-1/3'}>
                            <div className={'text-base'}>기타</div>
                            <input
                                type={'text'}
                                name="etc"
                                defaultValue={formData.etc}
                                onChange={handleInputChange}
                                className={'mx-3 w-[140px]'}
                            />
                            <div className={'text-base'}>기</div>
                        </div>
                    </div>
                </div>
                <div className={'flex'}>
                    {errors.damage && <div className="text-red-500 pl-[100px] text-base error">{errors.damage}</div>}
                </div>
                <div className={'flex px-[100px] py-5 items-center'}>
                    <div className={'font-medium w-[300px] mr-1'}>사고내용 <span className={'text-red-500'}>*</span>
                    </div>
                    <textarea rows={3}
                              className={'h-20 resize-none w-[800px]'}
                              name="accidentDetail"
                              defaultValue={formData.accidentDetail}
                              onChange={handleInputChange}>
                    </textarea>
                </div>
                {errors.accidentDetail &&
                    <div className="text-red-500 pl-[100px] text-base error">{errors.accidentDetail}</div>}

                {/*관리자만 보이는 Form 컨펌여부*/}
                {isAdmin && (
                    <>
                        <div className={'flex px-[100px] py-5 items-center'}>
                            <div className={'font-medium w-[300px] mr-1'}>컨펌여부 <span className={'text-red-500'}>*</span>
                            </div>
                            <div className={'flex items-center'}>
                                <label className={'flex items-center mr-10'}>
                                    <input
                                        type="radio"
                                        name="confirmation"
                                        className={'mr-3'}
                                        checked={confirmation === 'Y'}
                                        onChange={() => handleConfirmationChange('Y')}
                                    />
                                    <span>예</span>
                                </label>
                                <label className={'flex items-center'}>
                                    <input
                                        type="radio"
                                        name="confirmation"
                                        className={'mr-3'}
                                        checked={confirmation === 'N'}
                                        onChange={() => handleConfirmationChange('N')}
                                    />
                                    <span>아니오</span>
                                </label>
                                {confirmation === 'Y' && (
                                    <select
                                        className={'ml-20 w-[560px]'}
                                        value={formData.confirmedBy || ''}
                                        name="confirmedBy"
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>담당자를 선택하세요</option>
                                        <option value="A">담당자A</option>
                                        <option value="B">담당자B</option>
                                    </select>
                                )}
                            </div>
                        </div>
                        {errors.confirmation &&
                            <div className="text-red-500 pl-[100px] text-base error">{errors.confirmation}</div>}
                        {errors.confirmedBy &&
                            <div className="text-red-500 pl-[100px] text-base error">{errors.confirmedBy}</div>}
                    </>
                )}
            </div>
            <div className={'flex my-10 mx-[100px]'}>
                <Button color={"main"} fill={true} onClick={handleNext} textSize={18} width={1100} height={60}>확인</Button>
            </div>
        </>
    );
};

export default Step1;