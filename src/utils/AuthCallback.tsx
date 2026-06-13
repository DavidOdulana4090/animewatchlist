import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import axios from "axios";
import { useAuth } from "./AuthContext";
import LoadingScreen from "../components/LoadingScreen";

export const AuthCallback = () => {
    const navigate = useNavigate();
    const { isUserLoggedIn,userData, setuserData, setisUserLoggedIn } = useAuth();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                // Listen for the moment Supabase successfully sets the session 
                const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
                    if (session) {
                        const user = session.user;

                        try {
                            const backendUrl = import.meta.env.VITE_API_BASE_URL;

                            const response = await axios.post(`${backendUrl}/auth/login`, {
                                email: user.email,
                                username: user.user_metadata?.name || user.email?.split('@')[0],
                                provider: "google", // dont need for now 
                                CreatedAt: user.created_at
                            });

                            // Store backend token 
                            localStorage.setItem("token", response.data.token);                        
                            console.log("OAuth login successful:", response.data);
                            navigate("/dashboard", { replace: true });
                            setisUserLoggedIn(true);
                            setuserData(response?.data)
                        } catch (error: any) {
                            console.error("Backend OAuth exchange failed:", error.response?.data || error.message);
                            navigate("/login", { replace: true });
                        }
                    } else if (event === "SIGNED_OUT") {
                        navigate("/login");
                    }
                });

                return () => subscription.unsubscribe();
            } catch (error) {
                console.error("OAuth callback error:", error);
                navigate("/login", { replace: true });
            }
        };

        handleOAuthCallback();
    }, [navigate]);

    return (
        <LoadingScreen text="Completing secure auth"/>

    );
};