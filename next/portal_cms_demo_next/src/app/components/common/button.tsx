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
    style?: React.CSSProperties;
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
                    style,
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

    return (
        <button
            {...props}
            type={type}
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
