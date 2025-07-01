'use client'
import Image from "next/image";
import React, { useState } from "react";
import TooltipIcon from "../../../../../public/images/icon/tooltip-icon.png";

export type TooltipProps = {
    content: React.ReactNode;
    width?: number; // note.나중에 전체 호환 후 삭제
};

const Tooltip = ({ content, width }: TooltipProps) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
      <div className="relative inline-block">
          <Image
            src={TooltipIcon.src}
            alt="툴팁"
            width={24}
            height={24}
            className="ml-2 cursor-pointer"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          />
          {visible && (
            <div
              className={`
            absolute top-full left-0 mt-2 z-50
            bg-white shadow-md opacity-95 p-4 rounded-md
            ${!width ? 'w-[60vw] max-w-[60vw]' : ''}
            text-sm break-words
          `}
           /* <div
              className={`
              absolute top-full left-0 mt-2 z-50
              bg-white shadow-md opacity-95 p-4 rounded-md
              w-[60vw] max-w-[60vw]
              text-sm break-words
              `}
            >*/
              style={width ? { width: `${width}px` } : undefined}
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
            >
                {content}
            </div>
          )}
      </div>
    );
};

export default Tooltip;
