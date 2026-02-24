import LoginPage from "./LoginPage";
import CreateAccountPage from "./Createaccount";
import HomePage from "./HomePage";
import { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
    const [isLoggedIn, SetIsLogstate] = useState(() => {
        const saved = localStorage.getItem('isLoggedIn');
        return saved === "false";
});

    // Login
    const LoginRequest = () => {
        localStorage.setItem('isLoggedIn', 'true');
        SetIsLogstate(true);
    };

    const Errorlogin = () => {

    }

    const LogoutRequest = () => {
        localStorage.removeItem('isLoggedIn');
        SetIsLogstate(false);
};

    return (
        <>
            <Routes>
                <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to={"/login"} />} />

                <Route  path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage loginSuccess={LoginRequest} />} />
                
                <Route path="/sign-up" element={<CreateAccountPage />} />
            </Routes>
        </>
    );}

export default App
