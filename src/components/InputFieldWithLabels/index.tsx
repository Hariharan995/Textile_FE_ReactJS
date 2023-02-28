import React from "react";

import "./styles.scss";

type Tprops = {
    text: string,
    error?: boolean | string,
    errorText?: string,
    register?: any,
    type?: string,
    className?:string

} & React.InputHTMLAttributes<HTMLInputElement>

const InputFieldWithLabels: React.FC<Tprops> = ({ register, type, text, error, errorText, className,...props }) => {

    return (

        <div className={`input-label-wrapper ${className}`} >
            <div className='input-label'>
                {text && <label>{text}:</label>}
                <div className='input-wrap'>
                    <input type={type} autoComplete='off' {...register} className={error ? "input-field-box-error" : "input-field-box"} placeholder={text} {...props} />
                </div>
            </div>
            {error ? <p className="error-text-wrap">* {errorText}</p> : ""}
        </div>
    );
};

export default InputFieldWithLabels;
