import React from "react";
import Button from "@/app/components/common/ui/button/button";
import type {Step3Props} from "@/@types/common";


const Step3 = ({onReset}: Step3Props) => {
    return (
        <div className={'text-3xl font-semibold my-[150px] text-center'}>
            <div>보험신청 되었습니다.</div>
            <div className={'mt-5 mb-[200px]'}>감사합니다</div>
            <div className={'mt-10'}>
                <Button color={"main"} fill={true} onClick={onReset} textSize={18} width={1100} height={60} >확인</Button>
            </div>
        </div>
    );
};

export default Step3;