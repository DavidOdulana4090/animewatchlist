import { useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { supabase } from "../utils/SupabaseClient"

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
    imageUrl? : string,
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
    isLoading: Boolean;
    theme: string;
    handleTheme: (theme: string) => void
    dashboardStatus: string;
    setDashboardStatus: (dashboardStatus: string) => void;
    signInWithGoogle: (e: React.MouseEvent<HTMLButtonElement>) => void;
    setuserData: (userData: userData) => void;
    setisUserLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthProvider = ({ children }: any) => {
    // Apply saved theme immediately before first paint
    const savedTheme = localStorage.getItem("theme") ?? 'light';
    const cssClass = savedTheme === 'dark' ? 'black' : 'white';
    document.documentElement.classList.remove('white', 'black');
    document.documentElement.classList.add(cssClass);

	const [isUserLoggedIn, setisUserLoggedIn] = useState(() => {
		return localStorage.getItem("token") ? true : false;
	});
	const [userData, setuserData] = useState<userData>({});
    const [userAnimeList, setUserAnimeList] = useState<AnimeListItem[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [theme, setTheme] = useState<string>(() => savedTheme);
    const [dashboardStatus, setDashboardStatus] = useState(() => {
        return localStorage.getItem("status") || "Watching"
    });

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
				username: response?.data.username || null,
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
			
			// Sign out from Supabase OAuth session
			await supabase.auth.signOut();
			
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

    const Api = 'https://api.jikan.moe/v4';
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchAnime = async (title: string) => {
    try {
        const response = await axios.get(`${Api}/anime?q=${title}`);
        const data = response.data.data;
        const random = data[Math.floor(Math.random() * data.length)];
        return {
            image: random.images.jpg.image_url
        };
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
    }};
    
    const signInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault();
            const reactApp = import.meta.env.VITE_REACT_APP_URL;
            setIsLoading(true);
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${reactApp}/auth/callback`,
                    queryParams: {
                        prompt: 'select_account',
                    },
                },
            });

            if (error) {
                console.error("Google OAuth error:", error.message);
                alert(`Google login failed: ${error.message}`);
                setIsLoading(false);
                return;
            }

            // If successful, the user will be redirected to /auth/callback
            console.log("Google OAuth initiated successfully");

        } catch (error: any) {
            console.error("Google login exception:", error.message);
            alert("An error occurred during Google login. Please try again.");
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const getImages = async () => {
            const updatedList: AnimeListItem[] = [];
            
            for (const anime of userAnimeList) {
                const result = await fetchAnime(anime.title);
                updatedList.push({ ...anime, imageUrl: result?.image });
                await delay(700); 
                console.log(result?.image)
            }
            
            setUserAnimeList(updatedList);
        };

        if (userAnimeList.length > 0) {
            getImages();
        }
}, [userAnimeList.length]); 

    const handleTheme = (theme: string) => {
        if (theme == null) return;
        setTheme(theme);
        console.log(theme)
        localStorage.setItem("theme", theme);
    }

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
    
    useEffect(() => {
        const root = document.documentElement
        root.classList.remove('white', 'black')
        const cssClass = theme === 'dark' ? 'black' : 'white'
        root.classList.add(cssClass)
    }, [theme])
    

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
                isLoading,
                theme,
                handleTheme,
                dashboardStatus,
                setDashboardStatus,
                signInWithGoogle,
                setuserData,
                setisUserLoggedIn
			}}
		>
			{isLoading ? <LoadingScreen /> : children}
		</AuthContext.Provider>
	);
};
