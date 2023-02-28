import React from "react";
import { Tooltip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import "./styles.scss";

type InputLabelInputProps = {
    label: string
    content?: string
    number?: string
    textarea?: boolean
    value?: string
    register?: any
    name?: string
    error?: boolean
    errorText?: string
    hintText?: string
    hint?: boolean
    type?: string
    disabled?: boolean
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    tooltip?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const InputLabelinputWarehouse: React.FC<InputLabelInputProps> = ({ label, textarea, register, name, errorText, error, hintText, value, hint, onChange, onClick, type, tooltip, disabled, ...props }) => {
    return (
        <div className="input-label-input-warehouse">
            <p className="text-label">{label}
                {tooltip ?
                    <Tooltip title={tooltip} placement="top">
                        <ErrorIcon className="tooltip-icon" />
                    </Tooltip>
                    : <> </>
                }
            </p>
            {textarea ?
                <div className="input-with-verified-icon">
                    <textarea ref={register} name={name} type={type} className="text-area-content" onChange={onChange} {...props} {...register} />
                </div>
                :
                <>
                    <div className="input-with-verified-icon" style={error ? { border: "1px solid #ff0000" } : { border: "none" }}>
                        <input ref={register} name={name} type={type} disabled={disabled} className="text-label-content" onChange={onChange} {...register}  {...props} />
                    </div>
                    {hint && !error ? <p className="hint-text"> {hintText}</p> : ""}
                    {error ? <p className="error-text">* {errorText}</p> : ""}
                </>
            }
        </div>
    );
};

export default InputLabelinputWarehouse;
