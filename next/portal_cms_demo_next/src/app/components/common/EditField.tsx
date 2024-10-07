import React, { useState, useEffect } from 'react';
import FormatNumber from "@/app/components/common/formatNumber";
import EditIcon from "@/assets/images/icon/edit-icon.png";
import CheckIcon from "@/assets/images/icon/check-icon.png";

const EditableField = ({ value, onChange, className = '' }: EditableFieldProps) => {
    const [internalValue, setInternalValue] = useState<string>(value.toString());
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        setInternalValue(value.toString());
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
                type="number"
                value={internalValue}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded text-right"
            />
            <button onClick={handleConfirm} className="ml-2 bg-main-light text-white px-1.5 py-2 rounded-full">
                <img src={CheckIcon.src} alt={'확인'} width={18}/>
            </button>
        </div>
    ) : (
        <div className={`flex items-center justify-end ${className}`}>
            <span>{FormatNumber(Number(value))}</span>
            <button onClick={() => setEditMode(true)} className="ml-2">
                <img src={EditIcon.src} alt={'수정'} width={18}/>
            </button>
        </div>
    );
};

export default EditableField;
