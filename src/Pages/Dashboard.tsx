import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { useAuth } from "../utils/AuthContext";
import "../styles/Dashboard.css";
import axios from "axios";
import { PiTelevision } from "react-icons/pi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import type { NewAnimeFormProps } from "../components/NewAnimeform";
import { GiVomiting } from "react-icons/gi";
import { FcTodoList } from "react-icons/fc";
import { Heart } from "lucide-react";
import { Interface } from "node:readline";

export interface DashboardProps {
    userAnimeListProp: NewAnimeFormProps[];
}

function Dashboard() {
    const { userData } = useAuth();
    const [userAnimeList, setUserAnimeList] = useState<NewAnimeFormProps[]>([]); 

    const fetchUserAnimeData: () => Promise<void> = async() => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(`${backendurl}/anime/list/${userData.userId}`);
            console.log("Raw Anime Data: ", response.data);
            const animeList = response.data.map((anime: any) => {
                return {
                    id: anime.id || 0,
                    Title: anime?.title || "Unknown Title",
                    Status: anime?.progress > 99 ? "Completed" : anime?.Status == null ? "Planned" : anime?.Status || "Error",
                    Progress: anime?.progress || 0,
                    Genres: anime?.genres || null,
                    Rating: anime?.rating || 0,
                    Favourite: anime?.isFavourite || false,
                } 
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
        if (userData.userId) {
            fetchUserAnimeData();
            }
        }, [userData.userId]);

	return (
		<div className="div-container-container">
			<div className="dashboard-container">
				{/* Hero Section */}
				<div className="dashboard-hero">
					<div className="hero-content">
						<h1 className="dashboard-heading">
							Welcome, {userData?.username || "Guest"}!
						</h1>
                        <p className="hero-subtitle">
                            {(() => {
                                if (userAnimeList.length === 0) {
                                    return "Your anime watchlist is empty. Start adding your favorite shows to track your progress and discover new anime to enjoy!";
                                } else {
                                    return `You have ${userAnimeList.length} anime in your watchlist. Keep up the great work`;
                                }
                            })()}
						</p>
					</div>
				</div>
				{/* Stats Section */}
				<div className="stats-grid">
					<div className="stat-card completed">
						<div className="stat-icon"> <Icon Icon={IoCheckmarkCircleSharp} color="green" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.Status === "Completed").length}</div>
						<div className="stat-label">Completed</div>
                    </div>
                    
					<div className="stat-card watching">
						<div className="stat-icon"> <Icon Icon={PiTelevision} color="cyan" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.Status === "Watching").length}</div>
						<div className="stat-label">Watching</div>
                    </div>
                    
					<div className="stat-card planned">
						<div className="stat-icon"> <Icon Icon={FcTodoList} color="white" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.Status === "Planned").length}</div>
						<div className="stat-label">Planned</div>
                    </div>
                    
                    <div className="stat-card dropped">
                        <div className="stat-icon"> <Icon Icon={GiVomiting} color="grey" size={36}/> </div>
                        <div className="stat-value">{userAnimeList.filter((anime) => anime.Status === "Dropped").length}</div>
                        <div className="stat-label">Dropped</div>
                    </div>

					<div className="stat-card favorite">
						<div className="stat-icon"> <Icon Icon={Heart} color="Red" size={36}/> </div>
						<div className="stat-value">{userAnimeList.filter((anime) => anime.Favourite).length}</div>
						<div className="stat-label">Favorites</div>
					</div>
				</div>
				{/* Featured Section */}
				<div className="featured-section">
					<h2 className="section-title"> Watching </h2>
					<div className="featured-grid">
						{userAnimeList
							.filter((anime) => anime.Status === "Watching")
							.map((anime) => (
								<div key={anime.id} className="featured-card">
									<div className="featured-header">
										<h3>{anime.Title}   <Icon Icon={PiTelevision} color="cyan" size={36}/> </h3>
										<div className="rating-badge">Rating: {anime.Rating}</div>
									</div>
									<div className="anime-meta">{anime?.Genres && anime.Genres.map && anime.Genres.map((genre: string) => (
										<span key={genre} className="genre-tag">
											{genre}
										</span>
									))}</div>
									<div className="progress-section">
										<div className="progress-bar">
											<div
												className="progress-fill"
												style={{ width: `${anime.Progress}%` }}
											></div>
										</div>
										<span className="progress-text">
											{anime.Progress}% Complete
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
