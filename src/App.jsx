import LoginPage from "./LoginPage";
import CreateAccountPage from "./CreateAccount";
import HomePage from "./HomePage";
import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
    const [isLoggedIn, SetIsLogstate] = useState(() => {
        const saved = localStorage.getItem('isLoggedIn');
        return saved === 'false';
    });

    // isLoggedIn = ("true")  || ("false") Localstorage,stateforRendering
    const LoginRequest = () => {
        localStorage.setItem('isLoggedIn', 'true');
        SetIsLogstate('true');
    };

    const Errorlogin = () => {

    }

    const LogoutRequest = () => {
        localStorage.removeItem('isLoggedIn');
        SetIsLogstate('false');
};

    return (
        <>
            <Routes>
                {/*Whether to render login or home based on local storage saved key = value then State  to update */}
                <Route path="/home" element={isLoggedIn === "true" ? <HomePage /> : <Navigate to={"/login"} />} /> 

                <Route  path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage loginSuccess={LoginRequest} />} />
                
                <Route path="/sign-up" element={<CreateAccountPage />} />

                <Route path="/home" element={<HomePage />}  />
            </Routes>
        </>
    );}

export default App
