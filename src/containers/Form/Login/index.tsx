import { useForm } from "react-hook-form"
import UserIcon from "../../../assets/icons/user.png";
import LockIcon from "../../../assets/icons/lock.png";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/ActionButton";
import InputFieldWithoutLabel from "../../../components/InputFieldWithoutLabel";
import "./styles.scss";
//import { useDispatch } from "react-redux";
import { AuthService } from "../../../services/auth.service";
//import { setAuthData } from "../../../redux/Actions/actions";

type formFields = {
    username: string
    password: string
}

export const Login = () => {
    const loginFormValidation = {
        username: {
            required: { value: true, message: "Username field is empty" },
            minLength: { value: 10, message: "Please Enter Valid Username" }
        },
        password: {
            required: { value: true, message: "Password field is empty" },
            minLength: { value: 6, message: "Password must be at least 6 characters long" }
        }
    };
    const { register, handleSubmit, formState: { errors } } = useForm<formFields>({ mode: "onChange" });
    const navigate = useNavigate();
    const Authentication = new AuthService();
    //const dispatch = useDispatch();

    const onSubmit = async (data: formFields) => {
        const LoginData: formFields = {
            username: data.username,
            password: data.password
        };
        const loginResponse = await Authentication.Login(LoginData);

        if (loginResponse) {
            let userDetails = loginResponse.data
            userDetails.token = loginResponse.token
            //dispatch(setAuthData(loginResponse.data));
            localStorage.setItem("user", JSON.stringify(userDetails));
            //navigate("/main/dashboard");
            window.location.replace("/main/dashboard")
        }
    };

    return (
        <div className="login-form">
            <div className="sign-in-content">
                <p> Login Page</p>
            </div>
            <div className="sub-content">
                <div className="title">
                    <p>Welcome Back, <br /><span> Enter you details</span> </p>
                </div>
                <form className="login-form-wrap" onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-body">
                        <InputFieldWithoutLabel
                            register={register("username", loginFormValidation.username)}
                            text="Username"
                            error={errors.username?.type !== undefined}
                            errorText={errors.username ? errors.username.message : ""}
                            icon={UserIcon}
                        />
                        <InputFieldWithoutLabel
                            register={register("password", loginFormValidation.password)}
                            error={errors.password?.type !== undefined}
                            errorText={errors.password ? errors.password.message : ""}
                            text="Password"
                            type="password"
                            icon={LockIcon}
                        />
                    </div>
                    <div className="form-btn-wrap">
                        <ActionButton type="submit" label="LOGIN" />
                    </div>
                </form>
                <div className="footer">
                    <p> Don't have an account? <span onClick={() => navigate("/signup")}>Sign up</span></p>
                </div>
            </div>
        </div>
    )
}