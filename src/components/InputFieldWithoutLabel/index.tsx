import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import React, { useState } from "react";

import "./styles.scss";

type Tprops = {
    text: string,
    error?: boolean,
    errorText?: string,
    register?: any,
    icon?: any,
    type?: string

} & React.InputHTMLAttributes<HTMLInputElement>


const InputFieldWithoutLabel: React.FC<Tprops> = ({ register, name, text, error, errorText, icon, type, ...props }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const togglePasswordVisiblity = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="input-label-wrapper">
            <div className='input-img-wrapper'>
                {icon ? <img src={icon} alt='ic' /> : <></>}
                {type === "password" ?
                    (<>
                        <input autoComplete='off' {...register} placeholder={text} type={(type === "password" && showPassword) ? "text" : "password"} {...props} />
                        <span>
                            {showPassword ? (<VisibilityOutlined style={{ color: "#ff8e33", cursor: "pointer" }} onClick={togglePasswordVisiblity} />) : (<VisibilityOffOutlined style={{ color: "#ff8e33", cursor: "pointer" }} onClick={togglePasswordVisiblity} />)}
                        </span>
                    </>) : (
                        <input autoComplete='off' {...register} placeholder={text} {...props} />
                    )
                }
            </div>
            {error ? <p className="error-text-wrap">* {errorText}</p> : ""}

        </div>


    );
};

export default InputFieldWithoutLabel;
