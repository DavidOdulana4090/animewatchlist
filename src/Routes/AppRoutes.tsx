import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../Pages/LoginPage";
import CreateAccountPage from "../Pages/CreateAccount";
import HomePage from "../Pages/HomePage";

export interface AppRoutesProps {
    isLoggedIn: string;
    onLogin: () => void;
}

const AppRoutes = ({ isLoggedIn, onLogin }: AppRoutesProps) => {
    return (
        <Routes>
            {/* Protected Route */}
            <Route 
                path="/home" 
                element={isLoggedIn === 'true' ? <HomePage /> : <Navigate to="/login" />} 
            /> 

            {/* Auth Routes */}
            <Route 
                path="/login" 
                element={isLoggedIn === 'true' ? <Navigate to="/home" /> : <LoginPage loginSuccess={onLogin} />} 
            />
            
            <Route path="/sign-up" element={<CreateAccountPage />} />

            {/* Default | Redirect */}
            <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
    );
};

export default AppRoutes;