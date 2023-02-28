
import UserIcon from "../../../assets/icons/user.png";
import LockIcon from "../../../assets/icons/lock.png";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/ActionButton";
import InputFieldWithoutLabel from "../../../components/InputFieldWithoutLabel";
import "./styles.scss";
import { useState } from "react";
import { AuthService } from "../../../services/auth.service";
import { Loader } from "../../../components/Loader";
import AlertBox from "../../../components/AlertBox";

type formFields = {
    name: string
    mobile: string
    email: string
    password: string
}

export const Register = () => {
    const registerFormValidation = {
        name: {
            required: { value: true, message: "Name field is empty" },
            minLength: { value: 5, message: "Name must be at least 5 characters long" },
        },
        mobile: {
            required: { value: true, message: "Mobile field is empty" },
            minLength: { value: 10, message: "Mobile must be at least 10 characters long" },
        },
        email: {
            required: { value: true, message: "Email field is empty" },
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Please Enter Valid Email" }
        },
        password: {
            required: { value: true, message: "Password field is empty" },
            minLength: { value: 6, message: "Password must be at least 6 characters long" }
        }
    };
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<formFields>({ mode: "onChange" });
    const Authentication = new AuthService();
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");

    const handleOnAlert = (open: boolean, message: string, statusMsg: string) => {
        setOpenAlert(open);
        setAlertMsg(message);
        setStatus(statusMsg);
    };
    const onSubmit = async (data: formFields) => {
        setLoader(true);
        const signUp: any = {
            mobile: data.mobile,
            email: data.email,
            password: data.password,
            name: data.name,
        };
        const registerUser: any = await Authentication.Signup(signUp);
        console.log("registerUser", registerUser);
        
        if (registerUser.status === "error") {
            handleOnAlert(true, registerUser.message, registerUser.status);
            setLoader(false);
        }
        else {
            setLoader(false);
            handleOnAlert(true, registerUser.message, registerUser.status);
            navigate("/login");
        }
    };

    return (
        <div className="register-form" >
            <div className="sign-in-content">
                <p> Register Page</p>
            </div>
            <div className="sub-content">
                <div className="title">
                    <p>Welcome Back, <br /><span> Enter you details</span> </p>
                </div>
                <form className="login-form-wrap" onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-body">
                        <InputFieldWithoutLabel
                            register={register("name", registerFormValidation.name)}
                            text="Name"
                            error={errors.name?.type !== undefined}
                            errorText={errors.name ? errors.name.message : ""}
                            icon={UserIcon}
                        />
                        <InputFieldWithoutLabel
                            register={register("mobile", registerFormValidation.mobile)}
                            text="Mobile"
                            error={errors.mobile?.type !== undefined}
                            errorText={errors.mobile ? errors.mobile.message : ""}
                            icon={UserIcon}
                        />
                        <InputFieldWithoutLabel
                            register={register("email", registerFormValidation.email)}
                            text="Email"
                            error={errors.email?.type !== undefined}
                            errorText={errors.email ? errors.email.message : ""}
                            icon={UserIcon}
                        />
                        <InputFieldWithoutLabel
                            register={register("password", registerFormValidation.password)}
                            error={errors.password?.type !== undefined}
                            errorText={errors.password ? errors.password.message : ""}
                            text="Password"
                            type="password"
                            icon={LockIcon}
                        />
                    </div>
                    <div className="form-btn-wrap">
                        <ActionButton type="submit" label="REGISTER" />
                    </div>
                </form>
                {openAlert && <AlertBox severity={status} open={openAlert} message={alertMsg} btnName="OK" onClick={status === "success" ? () => navigate("/login") : () => setOpenAlert(false)} title={status === "success" ? "Success" : "Error"} />}
            {loader && <Loader open={loader} />}
                <div className="footer">
                    <p> Are you have an account? <span onClick={() => navigate("/login")}>Log in</span></p>
                </div>
            </div>
        </div >
    )
}