import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import axios from "axios";
import { useAuth } from "./AuthContext";

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
        <div className="flex h-screen items-center justify-center bg-slate-950 text-teal-400 font-medium h-max w-max">
            <div className="text-center space-y-3 h-max w-max">
                <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sm tracking-wide text-slate-300">Completing secure handshake...</p>
            </div>
        </div>
    );
};