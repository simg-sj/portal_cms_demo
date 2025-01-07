"use client"
import React, { useEffect, useRef } from 'react';

interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean) => void;
}

const Checkbox = ({checked, indeterminate, onChange}: CheckboxProps) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate || false;
            checkboxRef.current.checked = checked;
        }
    }, [checked, indeterminate]);

    return (
        <input
            ref={checkboxRef}
            type="checkbox"
            onChange={(e) => onChange(e.target.checked)}
        />
    );
};

export default Checkbox;
