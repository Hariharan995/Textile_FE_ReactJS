import React from "react";

import "./styles.scss";

type TInputFieldProps = {
    text?: string,
    error?: boolean,
    errorText?: string,
    register?: any,
    name?: string
    hint?: string,
    dropdown: string[] | [],
    notrequired?: boolean,
    defaultValue?: string,
} & React.SelectHTMLAttributes<HTMLSelectElement>

const InputLabelDownWithDropDown: React.FC<TInputFieldProps> = ({ register, name, text, hint, error, errorText, dropdown, notrequired, defaultValue, ...props }) => {
    return (
        <div className="input-with-dropdown-down">
            <label className="txt-label">{text} {notrequired ? "" : <span className="label-star">*</span>}  :</label>
            <div className="input-and-error">
                <select
                    {...register}
                    autoComplete="false"
                    className="input-field-box"
                    placeholder={text}
                    style={error ? { border: "1px solid #ff0000" } : { border: "1px solid #069800" }}
                    {...props}
                    defaultValue={defaultValue}
                >
                    <option value="" disabled selected hidden>Select {text}</option>
                    {dropdown.length ?
                        (dropdown.map((element: string) => <option key={element} value={element}>{element}</option>))
                        : <option value="">No Data</option>}
                </select>
                {error ? <p className="error-text">* {errorText}</p> : ""}
                {hint ? <p className="hint-text">{hint}</p> : ""}
            </div>

        </div>
    );
};

export default InputLabelDownWithDropDown;
