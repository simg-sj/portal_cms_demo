import React from "react";

type colorType = "main" | "sub" | "blue" | "green" | "red" | "gray" | "dark-gray" ;

interface Button extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    rounded?: boolean;
    textSize?: number;
    fill?: boolean;
    color: colorType;
    fontWeight?: "font-medium" | "font-bold";
    width?: number;
    height?: number;
    params ?: Record<string, string>;
    fileName ?: string;
    use ?: string;
    style?: React.CSSProperties;
    onClick ?: () => void;
}

const bgColor: { [key in colorType]: string } = {
    main: "bg-main",
    sub: "bg-sub",
    blue: "bg-blue-500",
    green: "bg-[#6aa364]",
    red: "bg-[#ff5e5e]",
    gray: "bg-[#c7c7c7]",
    "dark-gray": "bg-[#707070]",
};

const borderColor: { [key in colorType]: string } = {
    main: "border-main",
    sub: "border-sub",
    blue: "border-blue-500",
    green: "border-[#6aa364]",
    red: "border-[#ff5e5e]",
    gray: "border-[#c7c7c7]",
    "dark-gray": "border-[#707070]",
};

const textColor: { [key in colorType]: string } = {
    main: "text-main",
    sub: "text-sub",
    blue: "text-blue-500",
    green: "text-[#6aa364]",
    red: "text-[#ff5e5e]",
    gray: "text-[#c7c7c7]",
    "dark-gray": "text-[#707070]",
};

function combineClass({ rounded, fill, color, fontWeight }: Omit<Button, "children" | "width" | "height">) {
    let className = rounded ? "rounded-full" : "rounded-lg";
    if (fontWeight) className += " " + fontWeight;

    if (fill) {
        let textColor = "text-white";
        if (color === "gray") {
            textColor = "text-[#555555]";
        }
        return `${className} ${bgColor[color]} ${textColor}`;
    } else {
        return `border bg-white ${className} ${borderColor[color]} ${textColor[color]}`;
    }
}

function Button({
                    children,
                    type = "button",
                    rounded = false,
                    textSize,
                    fill = false,
                    color,
                    fontWeight,
                    width,
                    height,
                    className = "",
                    style ,
                    params,
                    use,
                    clickEvent,
                    onClick,
                    fileName,
                    ...props
                }: Button) {
    if (!style) style = {};

    if (width) {
        style.width = width + "px";
    }
    if (height) {
        style.height = height + "px";
    }
    if (textSize) {
        style.fontSize = textSize + "px";
    }

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();

            const response = await fetch('https://center-api.simg.kr/api/portal/excelRoute/download', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error ${response.status}: ${response.statusText} - ${errorDetails}`);
            }

            const blob = await response.blob(); // 응답 데이터를 Blob으로 변환
            const downloadUrl = window.URL.createObjectURL(blob);

            // 가상의 링크 생성 및 클릭 트리거
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = fileName; // 다운로드될 파일 이름
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("파일 다운로드 실패:", error);
            alert("파일 다운로드에 실패했습니다. 콘솔 로그를 확인하세요.");
        }
    };


    return (
        <button
            {...props}
            type={type}
            onClick={use === 'down' ? handleDownload : onClick}
            className={`inline-flex items-center justify-center py-1 px-1 ${combineClass({ color, fill, rounded, fontWeight })}${
                className ? " " + className : ""
            }`}
            style={style}
        >
            {children}
        </button>
    );
}

export default Button;
