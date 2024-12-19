import React from "react";
import Button from "@/app/components/common/ui/button";


interface Step3Props {
    onReset: () => void;
}

const Step3: React.FC<Step3Props> = ({onReset}) => {
    return (
        <div className={'text-3xl font-semibold my-[100px] text-center'}>
            <div>사고접수가 완료되었습니다</div>
            <div className={'mt-5 mb-[200px]'}>감사합니다</div>
            <div className={'mt-10'}>
                <Button color={"green"} fill={true} onClick={onReset}
                        className={'text-xl font-medium w-4/5 h-[60px] button'}>확인</Button>
            </div>
        </div>
    );
};

export default Step3;