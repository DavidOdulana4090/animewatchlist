import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";

interface userData {
	email?: string | null;
	username?: string | null;
	createdAt?: string | null;
	userId?: string;
	token?: string | null;
}

export interface AuthContextType {
	isUserLoggedIn: boolean;
	userData: userData;
	userLogin: (email: string, password: string) => Promise<{isSuccess: boolean; Message: string | object}>;
	userLogout: () => Promise<any>;
}

export const AuthProvider = ({ children }: any) => {
	const [isUserLoggedIn, setisUserLoggedIn] = useState(() => {
		return localStorage.getItem("token") ? true : false;
	});
	const [userData, setuserData] = useState<userData>({});

	const userLogin = async (email: string, password: string) => {
		try {
			const backendurl = import.meta.env.VITE_API_BASE_URL;
			const response = await axios.post(`${backendurl}/userLogin`, {
				email: email,
				password: password,
			});

			const newuserData = {
				email: email,
				username: null,
				createdAt: response.data?.createdAt || null,
				userId: response.data?.userId || null,
				token: response.data?.token || null,
			};

			setuserData(newuserData);
			setisUserLoggedIn(true);
			console.log("userLogin successful: ", newuserData);
			localStorage.setItem("token", response.data.token);
			return {
				isSuccess: true,
				Message: response?.data || "userLogin Successful",
			};
		} catch (error: any) {
			console.error("userLogin failed: ", error);
			return {
				isSuccess: false,
				Message: error.response?.data || error.message,
			};
		}
	};

	const checkTokenValidity = async (token: string) => {
		try {
			const backendurl = import.meta.env.VITE_API_BASE_URL;
			const response = await axios.get(`${backendurl}/token/validate`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("[INFO]", response?.data);
			return true;
		} catch (error: any) {
			console.error(
				"[ERROR] Token validation failed: ",
				error.response?.data || error.message,
			);
			return false;
		}
	};

	const initializeuserData = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			setisUserLoggedIn(false);
			return;
		}
		if (!(await checkTokenValidity(token))) {
			setisUserLoggedIn(false);
			localStorage.removeItem("token");
			userLogout();
			return;
		}

		try {
			const backendurl = import.meta.env.VITE_API_BASE_URL;
			const response = await axios.get(`${backendurl}/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("[INFO] User data fetched: ", response.data);
			setuserData((prev) => ({
				...prev,
				email: response.data.email,
				username: response.data.username,
				createdAt: response.data.createdAt,
				userId: response.data.userId,
				token: token,
			}));
		} catch (error: any) {
			console.error("[ERROR] Failed to initialize user data: ", error);
		}
	};

	const userLogout = async () => {
		try {
			if (userData.email == null) {
				return null;
			}
			const backendurl = import.meta.env.VITE_API_BASE_URL;
			const response = await axios.post(`${backendurl}/userLogout`, {
				email: userData.email,
			});
			return {
				isSuccess: true,
				Message: response?.data || "userLogout Success",
			};
		} catch (error: any) {
			console.error(
				"[ERROR] userLogout error: ",
				error.response?.data || error.message,
			);
			return {
				isSuccess: false,
				Message: error.response?.data || error.message,
			};
		} finally {
			setisUserLoggedIn(false); // this just forces the state to update immediately, deleting token for userLogout process
			setuserData({
				email: null,
				username: null,
				createdAt: null,
				userId: null,
				token: null,
			});
			localStorage.removeItem("token");
		}
	};

	useEffect(() => {
		if (isUserLoggedIn) {
			initializeuserData();
		}
	}, [isUserLoggedIn]);

	return (
		<AuthContext.Provider value={{ isUserLoggedIn, userData, userLogin, userLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
