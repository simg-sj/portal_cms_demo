import React from 'react';
import Button from "@/app/components/common/ui/button";
import Image from "next/image";
import Close from "@/assets/images/icon/close-icon.png";

interface ButtonConfig {
    label: string;
    onClick: () => void;
    color: "main" | "sub" | "blue" | "green" | "red" | "gray" | "dark-gray";
    fill?: boolean;
    rounded?: boolean;
    textSize?: number;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
}

interface CenterPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    Content: React.ComponentType;
    buttons: ButtonConfig[];
    onConfirm?: () => void;
}


const CenterPopup = ({isOpen, onClose, title, Content, buttons, onConfirm}: CenterPopupProps) => {

    if (!isOpen) return null;

    //확인 클릭시 데이터전달, 나머지 닫기
    //** center 팝업 하단 버튼 기능 추가시 label 따라 분류하여 추가가능
    const handleButtonClick = (button: ButtonConfig) => {
        if (button.label === '확인' && onConfirm) {
            onConfirm();
        } else {
            button.onClick();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg min-w-[500px] max-w-[800px]">
                <div className="flex justify-between items-center px-8 py-6">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <Image src={Close.src} alt={'닫기'} width={16} height={16} className={'mr-1 cursor-pointer'}
                           onClick={onClose}/>
                </div>
                <div className="px-8 py-3">
                    <Content/>
                </div>
                <div className="flex justify-center px-8 py-5 space-x-10">
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            onClick={() => handleButtonClick(button)}
                            color={button.color}
                            fill={button.fill}
                            rounded={button.rounded}
                            textSize={button.textSize}
                            fontWeight={button.fontWeight}
                            width={button.width}
                            height={button.height}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CenterPopup;