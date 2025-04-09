import React from 'react';
import Button from "@/app/components/common/ui/button/button";

export interface ButtonConfig {
    label: string;
    onClick: () => void;
    color: "main" | "sub" | "blue" | "green" | "red" | "gray" | "dark-gray";
    fill?: boolean;
    rounded?: boolean;
    textSize?: number;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
    className?: string;
    disabled?: boolean;
}

interface ButtonGroupProps {
    buttons: ButtonConfig[];
    className?: string;
    isEditing?: boolean;
    onEdit?: () => void;
    onSave?: (data: any) => void;
    onDelete?: () => void;
    onClose?: () => void;
}
const ButtonGroup = ({buttons,
                        className = '',
                        isEditing,
                        onEdit,
                        onSave,
                        onDelete,
                        onClose }: ButtonGroupProps) => {


    const getDefaultButtons = (): ButtonConfig[] => {
        if (isEditing) { //편집모드 **모드 추가해서 return 버튼 종류 다르게 설정하여 재사용
            return [
                {
                    label: "저장",
                    onClick: () => onSave?.({}),
                    color: "blue",
                    fill: true,
                    width: 100,
                    height: 35,
                },
                {
                    label: "취소",
                    onClick: onClose,
                    color: "gray",
                    width: 100,
                    height: 35,
                }
            ];
        }
        return [ //기본버튼그룹
            {
                label: "편집",
                onClick: onEdit,
                color: "blue",
                width: 100,
                height: 35,
            },
            {
                label: "삭제",
                onClick: onDelete,
                color: "red",
                width: 100,
                height: 35,
            },
            {
                label: "닫기",
                onClick: onClose,
                color: "gray",
                width: 100,
                height: 35,
            }
        ];
    };

    const finalButtons = buttons?.length > 0 ? buttons : getDefaultButtons();

    return (
        <div className={`flex justify-end space-x-5 ${className}`}>
            {finalButtons.map((button, index) => (
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
                    className={button.className}
                    disabled={button.disabled}
                >
                    {button.label}
                </Button>
            ))}
        </div>
    );
};

export default ButtonGroup;