import React, { useState, useEffect } from 'react';
import FormatNumber from "@/app/components/common/ui/formatNumber";
import EditIcon from "@/assets/images/icon/edit-icon.png";
import CheckIcon from "@/assets/images/icon/check-icon.png";
import Image from 'next/image';

interface EditableFieldProps {
    type : string;
    value: string | number;
    onChange: (newValue: string) => void;
    className?: string;
}

const EditableField = ({ type, value, onChange, className = '' }: EditableFieldProps) => {
    const [internalValue, setInternalValue] = useState<string>(value ? value.toString() : '');
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        setInternalValue(value ? value.toString() : ''); // value가 undefined일 경우 빈 문자열 처리
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
    };

    const handleConfirm = () => {
        if (window.confirm('수정하시겠습니까?')) {
            onChange(internalValue);
            console.log("입력값:", internalValue);
            setEditMode(false);
        }
    };

    return editMode ? (
        <div className={`flex items-center ${className}`}>
            <input
                type="text"
                value={internalValue}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded text-right"
            />
            <button onClick={handleConfirm} className="ml-2 bg-main-light text-white px-1.5 py-2 rounded-full">
                <Image src={CheckIcon} alt={'확인'} height={18} width={18} />
            </button>
        </div>
    ) : (
        <div className={`flex items-center justify-end ${className}`}>
            {
                type === 'number' ? <span>{FormatNumber(Number(value ?? 0))}</span>
                    :
                    <span>{value}</span>
            }
            <button onClick={() => setEditMode(true)} className="ml-2">
                <Image src={EditIcon} alt={'수정'} width={18} height={18}/>
            </button>
        </div>
    );
};

export default EditableField;