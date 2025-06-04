import React, { useEffect, useState } from 'react';
import Button from "@/app/components/common/ui/button/button";
import {CargoInsuType, ClaimRowType, ExtendedClaimRowType, ParkingRowType, rcAccidentType} from "@/@types/common";
import {deleteClaimData, getClaim} from "@/app/(Navigation-Group)/action";



interface SlidePopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    Content: React.ComponentType<{ isEditing: boolean, onSave?: (data: any) => void }>;
    buttons: ButtonConfig[];
    rowData : ExtendedClaimRowType;
    onDelete?: (data: ExtendedClaimRowType) => Promise<void>;
}

interface ButtonConfig {
    label: string;
    onClick: (() => void) ;
    onDelete ?: ((data: ClaimRowType | ParkingRowType | CargoInsuType) => void);
    color: "main" | "sub" | "blue" | "green" | "red" | "gray" | "dark-gray";
    fill?: boolean;
    rounded?: boolean;
    textSize?: number;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
}

const SlidePopup = ({isOpen, onClose, title, Content, buttons, onDelete, rowData  }: SlidePopupProps) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    //팝업화면 렌더링, 애니메이션 효과
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsAnimating(true), 50);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsEditing(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    //팝업 외부 클릭
    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    //편집버튼 클릭
    const handleEdit = () => {
        setIsEditing(true);
    };

    //**버튼 기능 추가 혹은 버튼종류 추가시 사용
    const modifiedButtons = buttons.map(button => {
        if (button.label === "삭제") {
            return { ...button, onClick: () => onDelete(rowData) };
        }
        if (button.label === "편집") {
            return { ...button, onClick: handleEdit };
        }
        return button;
    });

    if (!shouldRender) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex justify-end pointer-events-auto"
            onClick={handleOutsideClick}
        >
            <div
                className={`bg-white shadow-2xl min-h-screen w-[1000px] overflow-y-auto transform transition-transform duration-300 ease-in-out
                    ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center px-8 py-8">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <div className="flex justify-end space-x-5">
                        {modifiedButtons.map((button, index) => (
                            <div key={index}>
                                <Button
                                    onClick={button.onClick}
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
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-8 pb-8">
                    <Content isEditing={isEditing}/>
                </div>
            </div>
        </div>
    );
};

export default SlidePopup;

//상단타이틀, 버튼종류+기능, 내부내용 변경하여 사용