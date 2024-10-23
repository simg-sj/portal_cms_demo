import React, { useEffect, useState } from 'react';
import Button from "@/app/components/common/ui/button";

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

interface SlidePopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    Content: React.ComponentType<{ isEditing: boolean, onSave: (data: any) => void }>;
    buttons: ButtonConfig[];
}

const SlidePopup = ({isOpen, onClose, title, Content, buttons }: SlidePopupProps) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDelete = () => {
        if (window.confirm('삭제하시겠습니까?')) {
            onClose();
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (data: any) => {
        if (window.confirm('저장하시겠습니까?')) {
            console.log('변경된 데이터:', data);
            setIsEditing(false);
        }
    };

    const modifiedButtons = buttons.map(button => {
        if (button.label === "삭제") {
            return { ...button, onClick: handleDelete };
        }
        if (button.label === "편집") {
            if (isEditing) {
                return {
                    ...button,
                    label: "저장",
                    onClick: () => handleSave({}),
                    fill: true
                };
            }
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
                            <Button
                                key={index}
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
                        ))}
                    </div>
                </div>
                <div className="px-8 pb-8">
                    <Content isEditing={isEditing} onSave={handleSave} />
                </div>
            </div>
        </div>
    );
};

export default SlidePopup;