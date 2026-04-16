import { useEffect, useMemo, useState } from "react";
import Icon from "../components/Icon";
import { useAuth } from "../utils/AuthContext";
import "../styles/Dashboard.css";
import axios from "axios";
import { Heart, Notebook, NotebookTabs, WatchIcon } from "lucide-react";
import { GiCheckMark, GiVomiting } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";
import { FcDislike, FcTodoList } from "react-icons/fc";
import { PiTelevision } from "react-icons/pi";
import { ImCheckmark, ImCheckmark2 } from "react-icons/im";
import { List } from "postcss/lib/list";

interface Anime {
        id: number;
        title: string;
        status?: "completed" | "watching" | "planned" | "dropped" | null;
        progress?: number ; // percentage
        genres?: string[] | null;
        rating?: number; // out of 10
        favourite?: boolean;
    }

function Dashboard() {
    const { userdata 
} = useAuth();
    const [Id, setId] = useState<number>(0);
    const [userAnimeList, setUserAnimeList] = useState<Anime[]>([]); 

    // Mock data for demonstration this is where user's anime list would be fetched and stored in state
	// const userAnimeList: Anime[] = [
    //     {
    //      // Test data, replace with actual data from backend
	// 		id: 0,
	// 		title: "Demon Slayer",
	// 		status: "watching",
	// 		progress: 100,
	// 		genres: "Action",
	// 		rating: 9.2,
	// 		favourite: true,
    //     },
        
    //     {
	// 		id: 1,
    //         title: "One Piece",
    //         status: "watching",
    //         progress: 0,
    //         genres: "Adventure",
    //         rating: 8.8,
    //         favourite: false,
    //     }
	// ];

    // Function to determine card styling based on anime status
    const getStylefromStatus = (status: Anime["status"]) => {
        switch (status) {
            case "completed":
                return `stat-card completed`;
            case "watching":
                return `stat-card watching`;
            case "planned":
                return `stat-card planned`;
            case "dropped":
                return `stat-card dropped`;
            default:
                return "";
        }
    };

    const fetchUserAnimeData: () => Promise<Anime[]> = async (): Promise<Anime[]> => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(`${backendurl}/anime/list/${userdata.userId}`);
            const animeList = response.data.map((anime: any) => {
                return {
                    id: anime?.id || 0,
                    title: anime?.title || "Unknown Title",
                    status: anime?.progress > 99 ? "completed" : anime?.status == null ? "planned" : anime?.status || "Error",
                    progress: anime?.progress || 0,
                    genres: anime?.genres || null,
                    rating: anime?.rating || 0,
                    favourite: anime?.favourite || false,
                } as Anime;
            });
            setUserAnimeList(animeList);
            console.log("[INFO] User Anime List:", animeList);
            return animeList;

        }
        catch (error : any) {
            console.error("[ERROR] Error fetching user data: ", error.response?.data || error.message);
            throw error;
        }

    };

    useEffect(() => {
        if (userdata.userId) {
            fetchUserAnimeData();
            }
        }, [userdata.userId]);

	return (
		<div className="div-container-container">
			<div className="dashboard-container">
				{/* Hero Section */}
				<div className="dashboard-hero">
					<div className="hero-content">
						<h1 className="dashboard-heading">
							Welcome, {userdata?.username || "Guest"}!
						</h1>
						<p className="hero-subtitle">
                            <strong> Wow!! </strong> you have {userAnimeList.length} anime in your list! Keep up the great work and enjoy your anime journey!
						</p>
					</div>
				</div>

				{/* Stats Section */}
				<div className="stats-grid">
					<div className="stat-card completed">
						<div className="stat-icon"> <Icon Icon={ImCheckmark} color="green" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.status === "completed").length}</div>
						<div className="stat-label">Completed</div>
                    </div>
                    
					<div className="stat-card watching">
						<div className="stat-icon"> <Icon Icon={PiTelevision} color="cyan" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.status === "watching").length}</div>
						<div className="stat-label">Watching</div>
                    </div>
                    
					<div className="stat-card planned">
						<div className="stat-icon"> <Icon Icon={FcTodoList} color="white" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.status === "planned").length}</div>
						<div className="stat-label">Planned</div>
                    </div>
                    
                    <div className="stat-card dropped">
                        <div className="stat-icon"> <Icon Icon={GiVomiting} color="grey" size={36}/> </div>
                        <div className="stat-value">{userAnimeList.filter((anime) => anime.status === "dropped").length}</div>
                        <div className="stat-label">Dropped</div>
                    </div>

					<div className="stat-card favorite">
						<div className="stat-icon"> <Icon Icon={Heart} color="Red" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.favourite).length}</div>
						<div className="stat-label">Favorites</div>
					</div>
				</div>

				{/* Featured Section */}
				<div className="featured-section">
					<h2 className="section-title">Currently Watching</h2>
					<div className="featured-grid">
						{userAnimeList
							.filter((anime) => anime.status === "watching")
							.map((anime) => (
								<div key={anime.id} className="featured-card">
									<div className="featured-header">
										<h3>{anime.title}</h3>
										<div className="rating-badge">Rating: {anime.rating}</div>
									</div>
									<div className="anime-meta">{anime?.genres && anime.genres.map && anime.genres.map((genre: string) => (
										<span key={genre} className="genre-tag">
											{genre}
										</span>
									))}</div>
									<div className="progress-section">
										<div className="progress-bar">
											<div
												className="progress-fill"
												style={{ width: `${anime.progress}%` }}
											></div>
										</div>
										<span className="progress-text">
											{anime.progress}% Complete
										</span>
									</div>
								</div>
							))}
					</div>
				</div>

				{/* Your Watchlist Section */}
			</div>
		</div>
	);
}

export default Dashboard;
