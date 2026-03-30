import { useState } from 'react';
import { AuthContext } from './AuthContext'; 
import axios from 'axios';
import { useEffect } from 'react';

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setisLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
    const [userdata, setUserData] = useState({
        email: null,
        username: null
    });

    useEffect(() => {
        if (userdata.email != null) {
            console.log("Updated: ", JSON.stringify(userdata));
        }
    }, [userdata]);

    const login = async (email, password) => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const loginResponse = await axios.post(`${backendurl}/api/user/login`,
            
                {
                    email: email,
                    password: password 
                    
                });
            
            if (loginResponse.status === 200) {
                const userResponse = await axios.post(`${backendurl}/api/user/getusername`,
                
                    {
                        email: email 
                    });

                const newUserData = {
                    email: email,
                    username: userResponse.data
                };

                setUserData(newUserData);
                setisLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
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
            await axios.post(`${backendurl}/api/user/logout`,
            
                {
                    email: userdata.email 
                });

        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);

        } finally {
            setisLoggedIn(false);
            setUserData(
                {
                    email: null,
                    username: null
                });
            localStorage.removeItem('isLoggedIn');
        }
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, userdata, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};