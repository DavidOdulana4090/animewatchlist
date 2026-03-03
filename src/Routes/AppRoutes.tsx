import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../Pages/LoginPage";
import CreateAccountPage from "../Pages/CreateAccount";
import HomePage from "../Pages/HomePage";

export interface AppRoutesProps {
    isLoggedIn: string;
    ServerLoginRequest: () => void;
}

const AppRoutes = (props : AppRoutesProps) => {
    return (
        <Routes>
            {/* Protected Route */}
            <Route 
                path="/home" 
                element={props.isLoggedIn === 'true' ? <HomePage /> : <Navigate to="/login" />} 
            /> 

            {/* Auth Routes Login page */}
            <Route 
                path="/login" 
                element={props.isLoggedIn === 'true' ? <Navigate to="/home" /> : <LoginPage ClientLoginSuccess={props.ServerLoginRequest} />} 
            />
            
            <Route path="/sign-up" element={<CreateAccountPage />} />

            {/* Default | Redirect */}
            <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};

export default AppRoutes;