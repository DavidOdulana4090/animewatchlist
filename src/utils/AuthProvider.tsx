import { useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

interface UserData {
    email?: string | null;
    username?: string | null;
    createdAt?: string | null;
    userId?: string | null;
    token?: string | null;
}

export interface AuthContextType {
    isLoggedIn: boolean;
    userdata: UserData;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
}

export const AuthProvider = ({ children }: any) => {

    const [isLoggedIn, setisLoggedIn] = useState(() => {
        return localStorage.getItem('token') ? true : false;
    });
    const [userdata, setUserData] = useState<UserData>({    });

    const login = async (email: string, password: string): Promise<object> => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${backendurl}/login`, {
                email: email,
                password: password
            });

            const newUserData = {
                email: email,
                username: null,
                createdAt: response.data?.createdAt || null,
                userId: response.data?.userId || null,
                token: response.data?.token || null
            };

            setUserData(newUserData);
            setisLoggedIn(true);
            console.log("Login successful: ", newUserData);
            localStorage.setItem('token', response.data.token);
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

    const initializeUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setisLoggedIn(false);
            return;
    }
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(`${backendurl}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("User data fetched: ", response.data);
            setUserData(prev => ({
                ...prev,
                email: response.data.email,
                username: response.data.username,
                createdAt: response.data.createdAt,
                userId: response.data.userId,
                token: token
            }));
        } catch (error: any) {
            console.error("Failed to initialize user data: ", error);
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
            setisLoggedIn(false); // this just forces the state to update immediately, the backend logout is more for token invalidation and security
            setUserData({
                    email: null,
                    username: null,
                    createdAt: null,
                    userId: null,
                    token: null
                });
            localStorage.removeItem('token');
        }
    };

    useEffect(() => {
        console.log("AuthProvider useEffect - isLoggedIn: ", isLoggedIn);
        if (isLoggedIn) {
            initializeUserData();
        }
    }, [isLoggedIn]);


    return (
        <AuthContext.Provider value={{ isLoggedIn, userdata, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};