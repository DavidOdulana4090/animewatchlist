import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../Pages/LoginPage";
import CreateAccountPage from "../Pages/CreateAccount";
import HomePage from "../Pages/HomePage";

export interface appRoutesProps {
    isLoggedIn: string;
    serverLoginRequest: () => void;
}

const AppRoutes = (props : appRoutesProps) => {
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
                element={props.isLoggedIn === 'true' ? <Navigate to="/home" /> : <LoginPage clientLoginSuccess={props.serverLoginRequest} />} 
            />
            
            <Route path="/sign-up" element={<CreateAccountPage />} />

            {/* Default | Redirect */}
            <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};

export default AppRoutes;