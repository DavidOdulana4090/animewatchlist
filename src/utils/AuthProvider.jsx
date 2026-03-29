import { useState } from 'react';
import { AuthContext } from './AuthContext'; 
import axios from 'axios';
import { useEffect } from 'react';

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setisLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
    const [userData, setUserData] = useState({
        email: null,
        username: null
    });

    useEffect(() => {
        if (userData.email != null) {
            console.log("Updated: ", JSON.stringify(userData));
        }
    }, [userData]);

    const login = async (email, password) => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const loginResponse = await axios.post(`${backendurl}/api/user/login`, { email, password });
            
            if (loginResponse.status === 200) {
                const userResponse = await axios.post(`${backendurl}/api/user/getusername`, { email });

                const newUserData = {
                    email: email,
                    username: userResponse.data 
                };

                setUserData(newUserData);
                setisLoggedIn(true);
                
                localStorage.setItem('isLoggedIn', 'true');
                console.log(JSON.stringify(userData));
                
                return true;
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            return false;
        }
    };
    
    const logout = async () => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            await axios.post(`${backendurl}/api/user/logout`, { email: userData.email });

        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);

        } finally {
            setisLoggedIn(false);
            setUserData({ email: null, username: null });
            localStorage.removeItem('isLoggedIn');
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};