import React from "react";

import "./styles.scss";

type Tprops = {
    label: string;
    color?: "reject";
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: "submit" | "reset" | "button" | undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>


const ActionButton: React.FC<Tprops> = ({ label, color, onClick, type, style }) => {
    return (
        <button style={style} type={type} className={color === "reject" ? "btn-outline-wrap" : "btn-color-wrap"} onClick={onClick}>{label}</button>
    );
};

export default ActionButton;
