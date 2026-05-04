import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

interface userData {
	email?: string | null;
	username?: string | null;
	createdAt?: string | null;
	userId?: string | null;
	token?: string | null;
}

export interface AnimeListItem {
    id?: number;
    title: string;
    status?: "Completed" | "Watching" | "Planned" | "Dropped" | null;
    progress: number; // percentage
    genres?: string[] | null;
    rating: number; 
    favourite: boolean;
}

interface AnimeBackendResponse {
    id: number;
    title: string;
    status: "Completed" | "Watching" | "Planned" | "Dropped" | null;
    progress: number;
    genres: string[] | null;
    rating: number; 
    isFavourite: boolean; 
}

export interface AuthContextType {
	isUserLoggedIn: boolean;
	userData: userData;
	userAnimeList: AnimeListItem[];
	userLogin: (email: string, password: string) => Promise<{isSuccess: boolean; Message: string | object}>;
	userLogout: () => Promise<any>;
    fetchUserAnimeData: (UserId: userData["userId"]) => Promise<void>;
    SetIsLoading(isLoading: boolean): void;
    isLoading: Boolean
}

export const AuthProvider = ({ children }: any) => {
	const [isUserLoggedIn, setisUserLoggedIn] = useState(() => {
		return localStorage.getItem("token") ? true : false;
	});
	const [userData, setuserData] = useState<userData>({});
    const [userAnimeList, setUserAnimeList] = useState<AnimeListItem[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false)

	const userLogin = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			const backendurl = import.meta.env.VITE_API_BASE_URL;
			const response = await axios.post(`${backendurl}/login`, {
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
        } finally {
            setIsLoading(false)
        }
	};

	const checkTokenValidity = async (token: string) => {
		try {
			setIsLoading(true);
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
        } finally {
            setIsLoading(false)
        }
	};

	const initializeuserData = async (): Promise<userData | undefined> => {
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
			setIsLoading(true);
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
            return response.data;
		} catch (error: any) {
			console.error("[ERROR] Failed to initialize user data: ", error);
        } finally {
            setIsLoading(false)
        }
	};

	const userLogout = async () => {
		try {
			setIsLoading(true);
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
            setIsLoading(false)
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

	const fetchUserAnimeData = async (userId: userData["userId"]) => {
		try {
			setIsLoading(true);
			const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get<AnimeBackendResponse[]>(`${backendurl}/anime/list/${userId}`);
			const animeList: AnimeListItem[] = response.data.map((anime) => ({
				id: anime.id || 0,
				title: anime?.title || "Unknown Title",
				status: anime?.status || "Planned",
				progress: anime?.progress || anime?.status === "Completed" ? 100 : 0,
				genres: anime?.genres || null,
				rating: anime?.rating || 0,
				favourite: anime?.isFavourite || false,
			}));
			setUserAnimeList(animeList);
			console.log("[INFO] User Anime List:", animeList);
		} catch (error: any) {
			console.error("[ERROR] Error fetching user anime data: ", error.response?.data || error.message);
        } finally {
            setIsLoading(false)
        }
	};

    useEffect(() => {
        // using 1 render / function to trigger fetching user profile then their anime data linked to it
        const bootApp = async() => {
            if (!isUserLoggedIn) {
                return 
            }
            const data = await initializeuserData();
            if (data?.userId != null) {
                fetchUserAnimeData(data.userId);
            }
        }
        bootApp();

	}, [isUserLoggedIn]);


	return (
		<AuthContext.Provider
			value={{
				isUserLoggedIn,
				userData,
				userAnimeList,
				userLogin,
				userLogout,
				fetchUserAnimeData,
                SetIsLoading: setIsLoading,
                isLoading
			}}
		>
			{isLoading ? <LoadingScreen /> : children}
		</AuthContext.Provider>
	);
};
