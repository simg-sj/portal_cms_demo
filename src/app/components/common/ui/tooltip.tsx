'use client'
import Image from "next/image";
import React, {useState} from "react";
import TooltipIcon from "@/assets/images/icon/tooltip-icon.png";

export type TooltipProps = {
    content:  React.ReactNode;
    width?: number;
};

const Tooltip = ({content, width = 800}: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className={'relative'}>
            <Image src={TooltipIcon.src} alt={'툴팁'} width={24} height={24} className={'ml-2 cursor-pointer'}
                   onMouseEnter={showTooltip} onMouseLeave={hideTooltip}/>
            {visible && <div
                className="absolute bg-white shadow-md opacity-95 p-5 z-50 rounded-md"
                onMouseEnter={showTooltip} onMouseLeave={hideTooltip}
                style={{
                    width: `${width}px`,
                }}
            >{content}</div>}
        </div>
    )
}

export default Tooltip;