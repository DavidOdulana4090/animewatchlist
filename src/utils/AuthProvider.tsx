import { useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

interface UserData {
    email: string | null;
    username: string | null;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    userdata: UserData;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
}

export const AuthProvider = ({ children }: any) => {

    const [isLoggedIn, setisLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');
    const [userdata, setUserData] = useState<UserData>({
        email: null,
        username: null
    });

    useEffect(() => {
        if (userdata.email != null) {
            console.log("Updated: ", JSON.stringify(userdata));
        }
    }, [userdata]);

    const login = async (email: string, password: string): Promise<object> => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${backendurl}/login`, {
                email: email,
                password: password
            });

            const newUserData = {
                email: email,
                username: null
            };

            setUserData(newUserData);
            setisLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            return {
                isSuccess: true,
                Message: response?.data || "Login Successful"
            };

        } catch (error: any) {
            console.error("Login failed: ", error);
            return {
                isSuccess: false,
                Message: error.response?.data || error.message,
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
                Message: response?.data || "Logout Success"
            }

        } catch (error: any) {
            console.error("Logout error: ", error.response?.data || error.message);
            return {
                isSuccess: false,
                Message: error.response?.data || error.message
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