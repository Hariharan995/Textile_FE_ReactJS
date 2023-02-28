import React from "react";

import "./styles.scss";

type TInputFieldProps = {
    text?: string,
    error?: boolean,
    errorText?: string,
    register?: any,
    name?: string
    hint?: string,
    dropdown: string[] | []
    notrequired?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

const DropDown: React.FC<TInputFieldProps> = ({ register, name, text, hint, error, errorText, dropdown, notrequired, ...props }) => {
    return (
        <div className="input-with-dropdown">
            <div className="input-wrap">
                <select
                    className="select-label-wrapper"
                    {...register}
                    key={text}
                    {...props}
                >
                    <option value="" disabled hidden>{text}</option>
                    {dropdown.length ?
                        dropdown.map((element: string) => {
                            return <option key={element} value={element}>{element} </option>;
                        }) : <option value=''>Please select {name}</option>}
                </select>
            </div>
        </div>
    );
};

export default DropDown;
