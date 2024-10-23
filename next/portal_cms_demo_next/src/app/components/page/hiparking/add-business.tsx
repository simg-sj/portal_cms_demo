

export const AddBusiness = () => (
        <>
            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>주차장명 <span className={'text-red-500'}>*</span></div>
                <input type={"text"} placeholder={'주차장명을 입력하세요'} className={'w-full'}/>
            </div>
            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>주차장주소 <span className={'text-red-500'}>*</span></div>
                <input type={"text"} placeholder={'주차장주소를 입력하세요'} className={'w-full'}/>
            </div>
            <div className={'flex my-3'}>
                <div className={'w-[150px]'}>주차장구분 <span className={'text-red-500'}>*</span></div>
                <div className={'flex flex-col w-full'}>
                <label className={'flex items-center my-1'}>
                    <input type={"checkbox"} name={'parkCategory'}/>
                    <div className={'mx-3 w-[60px]'}>옥내</div>
                    <input type={'number'} disabled/>
                    <div className={'ml-3'}>㎡</div>
                </label>
                <label className={'flex items-center my-1'}>
                    <input type={"checkbox"} name={'parkCategory'}/>
                    <div className={'mx-3 w-[60px]'}>옥외</div>
                    <input type={'number'} disabled/>
                    <div className={'ml-3'}>㎡</div>
                </label>
                <label className={'flex items-center my-1'}>
                    <input type={"checkbox"} name={'parkCategory'}/>
                    <div className={'mx-3 w-[60px]'}>기계식</div>
                    <input type={'number'} disabled/>
                    <div className={'ml-3'}>대</div>
                </label>
                <label className={'flex items-center my-1'}>
                    <input type={"checkbox"} name={'parkCategory'}/>
                    <div className={'mx-3 w-[60px]'}>카리프트</div>
                    <input type={'number'} disabled/>
                    <div className={'ml-3'}>대</div>
                </label>
                </div>
            </div>
        </>
    )
;