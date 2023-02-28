import React from "react"
import logo  from "../../../src/assets/logo.jpeg"
import { Login } from "../../containers/Form/Login"
import { Register } from "../../containers/Form/Register"
import "./styles.scss";

type Tprops = {
    page: string
}

export const LoginPage: React.FC<Tprops> = ({ page }) => {
    return (
        <div className="login-page">
            <div className="content-wrapper">
                <div className="left-content">
                    <img alt='' src={logo} draggable="false" />
                    <div className="right-content">
                    {page === "login" && <Login />}
                    {page === "signup" && <Register />}
                </div>
                </div>
                
            </div>
        </div>
    )
}