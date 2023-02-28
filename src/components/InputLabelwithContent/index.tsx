import React from "react";

import "./styles.scss";

type InputLabelProps = {
    label: string
    content: any
    number?: string

}

const InputLabelwithContent: React.FC<InputLabelProps> = ({ label, content, number }) => {
    return (
        <div className="input-label-content">
            <p className="text-label">{label}</p>
            <p className="text-label-content">{content ? content : "NIL"}</p>
            <p className="text-label-content">{number}</p>

        </div>
    );
};

export default InputLabelwithContent;
