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
            await axios.post(`${backendurl}/login`, {
                email: email,
                password: password
            });

            const newUserData = {
                email: email,
                // username: userResponse.data
            };

            setUserData(newUserData);
            setisLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            return {
                isSuccess: true,
                Message: ""
            };

        } catch (error) {
            console.error("Login failed: ", error);
            return {
                isSuccess: false,
                Message: error.response?.data,
            };
        }
    };
    
    const logout = async () => {
        try {
            if (userdata.email == null) {
                return null;
            }
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${backendurl}/logout`, {
                    email: userdata.email 
            });
            return {
                isSuccess: true,
                Message: response?.data
            }

        } catch (error) {
            console.error("Logout error: ", error.response?.data || error.message);
            return {
                isSuccess: false,
                Message: error.response?.data
            }

        } finally {
            setisLoggedIn(false);
            setUserData({
                    email: null,
                    username: null
                });
            localStorage.setItem('isLoggedIn', 'false');
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userdata, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};