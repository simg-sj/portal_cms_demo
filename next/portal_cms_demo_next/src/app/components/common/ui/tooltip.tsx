import Image from "next/image";
import React, {useState} from "react";
import TooltipIcon from "@/assets/images/icon/tooltip-icon.png";

export type TooltipProps = {
    content: string;
};

const Tooltip = ({ content }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return(
        <div className={'relative'}>
        <Image src={TooltipIcon.src} alt={'툴팁'} width={24} height={24} className={'ml-2 cursor-pointer'} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}/>
        {visible && <div className="absolute w-[800px] bg-black bg-opacity-5 p-5 z-10 rounded-md mt-2">{content}</div>}
        </div>
    )
}

export default Tooltip;