import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../Pages/LoginPage";
import CreateAccountPage from "../Pages/CreateAccount";
import HomePage from "../Pages/HomePage";
import ForgotPassword from '../Pages/ForgotPassword';
import ProtectedRoutes from './ProtectedRoutes';
import { useAuth } from '../utils/AuthContext';
import Dashboard from '../Pages/Dashboard';


function AppRoutes(){
    const { user } = useAuth();

    return (
        <Routes>
            {/* HomePage Protected */}            
            <Route
                path="/home" 
                element={!user ? <Navigate to='/login' /> : <HomePage />} />
            
            {/* Children Protected */}
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            
            {/* LoginPage Redirect && LoginPage */}
            <Route 
                path="/login" 
                element={user ? <Navigate to='/dashboard' replace/> : <LoginPage />} />
            
            {/* Empty Path  */}
            <Route
                path="/"
                element={<Navigate to="/home" replace />} />

            {/* Forgot Password */}
            <Route
                path='/forgot-password'
                element={<ForgotPassword />} />
            
            {/* Signup */}
            <Route
                path="/sign-up"
                element={<CreateAccountPage />} />
            
        </Routes>
    );
};

export default AppRoutes;