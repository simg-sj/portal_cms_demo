'use client'
import React, {useState} from 'react';
import Button from "@/app/components/common/ui/button";
import Step1 from "@/app/components/pageComponents/parking/accidentAccept/step1-turu";
import Step2 from "@/app/components/pageComponents/parking/accidentAccept/step2-turu";
import Step3 from "@/app/components/pageComponents/parking/accidentAccept/step3";
import Search from "@/assets/images/icon/save-icon.png" //수정해야함

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
    time: string;
    contents: string;
    etc: string;
    image?: FileList | null;

    [key: string]: string | FileList | null | undefined;
}

export interface ParkingListType {
    pklName: string;
    pklAddress: string;
}

export default function Page() {

    //스탭
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        email2: '',
        parking: '',
        car: '',
        color: '',
        carNum: '',
        date: '',
        time: '',
        contents: '',
        etc: '',
        image: null
    });
    const [text, setText] = useState<string>('')

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, 3));
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleReset = () => {
        setCurrentStep(1);
        setFormData({
            name: '',
            phone: '',
            email: '',
            email2: '',
            parking: '',
            car: '',
            color: '',
            carNum: '',
            date: '',
            time: '',
            contents: '',
            etc: '',
            image: null
        });
    };

    const clickEventHandler = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | HTMLInputElement>) => {
        e.preventDefault();
        // const target = e.target as HTMLElement;
        // const id = target.id;
        /*
                if(searchDiv.current){
                    if(id === 'cancel') {
                        searchDiv.current.style.display = 'none';
                        document.body.style.removeProperty('overflow');
                        document.body.style.removeProperty('position');
                        document.body.style.removeProperty('top');
                        document.body.style.removeProperty('width');
                        document.body.style.overflow = "unset"
                    }
                    if(id === 'open') {
                        searchDiv.current.style.display = 'block';
                        searchText.current && searchText.current.focus();
                        document.body.style.overflow = 'hidden';
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100%';
                        document.body.style.overflow = "hidden";
                    }
                }*/
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 onNext={handleNext} formData={formData} setFormData={setFormData}
                              clickEventHandler={clickEventHandler}/>;
            case 2:
                return <Step2 onNext={handleNext} onPrev={handlePrev} param={formData}/>;
            case 3:
                return <Step3 onReset={handleReset}/>;
            default:
                return null;
        }
    };

    return (
        <>
            <div className={'px-8 py-6 bg-white rounded-xl'}>
                <div className={'text-xl font-light mb-6'}>사고접수</div>
                <div>
                    <div className="flex justify-center mb-[50px] text-main-light font-bold text-2xl step">
                        <div
                            className={`border-main-light border-2 rounded-full px-[25px] py-[15px] ${currentStep === 1 ? 'bg-main-light text-white' : ''}`}
                        >1
                        </div>
                        <div className="w-[50px] h-[4px] bg-main-light mt-7"></div>
                        <div
                            className={`border-main-light border-2 rounded-full px-[25px] py-[15px] ${currentStep === 2 ? 'bg-main-light text-white' : ''}`}
                        >2
                        </div>
                        <div className="w-[50px] h-[4px] bg-main-light mt-7"></div>
                        <div
                            className={`border-main-light border-2 rounded-full px-[25px] py-[15px] ${currentStep === 3 ? 'bg-main-light text-white' : ''}`}
                        >3
                        </div>
                    </div>
                    {renderStep()}
                    <div
                        className={'hidden px-10 py-5 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)] bg-white rounded-t-2xl fixed z-30 bottom-0 min-h-[700px] mx-6 w-[950px] popup'}>
                        <div className={'flex justify-between text-2xl font-medium pt-6 pb-10'}>
                            <div>주차장명을 검색해주세요</div>
                        </div>
                        <div className={'relative'}>
                            <input
                                autoComplete={'off'}
                                type={'text'}
                                id="parking"
                                value={text || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)}
                            />
                            <button>
                                <img src={Search.src} width={20} className={'absolute right-3 top-3'} alt={'검색'}/>
                            </button>
                        </div>

                        <div className={'h-[380px] overflow-y-scroll my-5'}>
                            {/*{
                                parkingList.map((item, index) =>
                                    <div key={index} className={'py-5 cursor-pointer'}>
                                        <div className={'font-medium text-lg pb-2'} id={'cancel'}
                                             onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                                                 setFormData((prev: FormData) => ({...prev, parking: item.pklName}));
                                                 clickEventHandler(e);
                                             }}>{item.pklName}</div>
                                        <div className={'pb-6'}>{item.pklAddress}</div>
                                    </div>
                                )
                            }*/}
                        </div>
                        <div className={'flex justify-center mt-10 mb-5 text-xl'}>
                            <Button color={"gray"} id={'cancel'}
                                    className={' w-full h-[60px] button'}>취소</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}