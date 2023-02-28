import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../layouts";
import { LoginPage } from "../pages/LoginAndRegistration";

export const RootRoutes = () => {
    let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : ""
    return (
        <>
            {
                token === "" ?
                    <Routes>
                        <Route path="/*" element={<Navigate replace to="/login" />} />
                        <Route path="/login" element={<LoginPage page="login" />} />
                        <Route path='/signup' element={<LoginPage page="signup" />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/*" element={<Navigate replace to="/main/dashboard" />} />
                        <Route path='main/*' element={<Layout />} />
                    </Routes>
            }
        </>
    );
};