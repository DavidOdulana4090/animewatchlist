import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../Pages/LoginPage";
import CreateAccountPage from "../Pages/CreateAccount";
import HomePage from "../Pages/HomePage";
import ForgotPassword from '../Pages/ForgotPassword';
import ProtectedRoutes from './ProtectedRoutes';
import { useAuth } from '../utils/AuthContext';
import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile'
import Messages from '../Pages/Inbox';
import Settings from '../Pages/Settings'
import Tags from '../Pages/MyList'
import ContactMe from '../Pages/ContactMe';
import Logout from '../Pages/Logoutpage'

function AppRoutes(){
    const { isLoggedIn } = useAuth();

    return (
        <Routes> 
            {/* Children Protected */}
            <Route element={<ProtectedRoutes />}>
                <Route element={<HomePage />} >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/Inbox" element={<Messages />} />
                    <Route path='Contact' element={<ContactMe />} />
                    <Route path='/MyList' element={<Tags /> } />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path='/Logout' element={<Logout />} />

            
                    {/* Default redirect: */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Route>
            
            {/* LoginPage Redirect && LoginPage */}
            <Route 
                path="/login" 
                element={isLoggedIn ? <Navigate to='/dashboard' replace/> : <LoginPage />} />
            
            {/* Empty Path  */}
            <Route
                path="/"
                element={<Navigate to="/dashboard" replace />} />

            {/* Forgot Password */}
            <Route
                path='/forgot-password'
                element={<ForgotPassword />} />
            
            {/* Signup */}
            <Route
                path="/sign-up"
                element={<CreateAccountPage />} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            
        </Routes>
    );
};

export default AppRoutes;