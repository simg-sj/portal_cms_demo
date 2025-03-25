import { useState } from "react";
import Image from "next/image";
import SelectIcon from "@/assets/images/icon/select-icon.png";

interface SelectDropdownProps {
    options: string[];
    defaultLabel?: string;
    selectedValue?: string;
    onSelect?: (selected: string) => void;
}

const SelectDropdown = ({ options, defaultLabel = "선택하세요", onSelect }: SelectDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultLabel);

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (onSelect) onSelect(item); // 선택 시 콜백 실행
    };

    return (
        <div className="relative w-[230px]">
            <button
                className="w-full flex items-center justify-between py-1 rounded-lg bg-white px-5"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedItem}
                <Image src={SelectIcon} alt="선택" width={12} height={12} />
            </button>
            {isOpen && (
                <ul className="absolute left-0 w-full bg-white border mt-2 rounded-lg shadow-md max-h-[300px] overflow-y-auto bg-white">
                    {options.map((item) => (
                        <li
                            key={item}
                            className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectDropdown;
