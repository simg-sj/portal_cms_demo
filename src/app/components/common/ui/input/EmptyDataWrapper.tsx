import React from "react";
import Image from "next/image";
import ErrorIcon from "@/assets/images/icon/error-icon.png"; // 에러 이미지 가져오기

interface EmptyDataWrapperProps {
    data: any[];
    children: React.ReactNode;
}

const EmptyDataWrapper: React.FC<EmptyDataWrapperProps> = ({ data, children }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <tr>
                <td colSpan={15}>
                    <div className="flex items-center justify-center my-[65px]">
                        <Image src={ErrorIcon} alt={"에러"} width={30} height={30} className="mr-5" />
                        <div className="text-gray-700 text-lg">데이터가 없습니다.</div>
                    </div>
                </td>
            </tr>
        );
    }
    return <>{children}</>;
};

export default EmptyDataWrapper;