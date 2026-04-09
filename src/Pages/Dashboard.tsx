import { useMemo } from "react";
import { useAuth } from "../utils/AuthContext";
import "../styles/Dashboard.css";

function Dashboard() {
    const { userdata } = useAuth();
    
    interface Anime {
        id: number;
        title: string;
        status?: "completed" | "watching" | "planned" | "dropped";
        progress?: number; // percentage
        genre?: string | null;
        rating?: number; // out of 10
        favourite?: boolean;
    }

    // Mock data for demonstration this is where user's anime list would be fetched and stored in state
	const userAnimeList: Anime[] = [
        {
            // Test data, replace with actual data from backend
			id: 1,
			title: "Demon Slayer",
			status: "watching",
			progress: 75,
			genre: "Action",
			rating: 9.2,
			favourite: true,
        },
        
        {
			id: 2,
            title: "One Piece",
            status: "planned",
            progress: 0,
            genre: "Adventure",
            rating: 8.8,
            favourite: false,
        }
	];

    userAnimeList.map((anime) => {
        console.log(anime.title, anime)

    })


	const getStatusColor = (status: string) => {
		switch (status) {
			case "completed":
				return "text-emerald-400";
			case "watching":
				return "text-cyan-400";
			case "planned":
				return "text-purple-400";
			default:
				return "text-gray-400";
		}
	};

	const getStatusBg = (status: string) => {
		switch (status) {
			case "completed":
				return "bg-emerald-500/20 border-emerald-500/50";
			case "watching":
				return "bg-cyan-500/20 border-cyan-500/50";
			case "planned":
				return "bg-purple-500/20 border-purple-500/50";
			default:
				return "bg-gray-500/20 border-gray-500/50";
		}
	};

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
							Track your favorite anime and never miss an episode
						</p>
					</div>
				</div>

				{/* Stats Section */}
				<div className="stats-grid">
					<div className="stat-card completed">
						<div className="stat-icon"></div>
						{/* <div className="stat-value">{stats.totalWatched}</div> */}
						<div className="stat-label">Completed</div>
					</div>
					<div className="stat-card watching">
						<div className="stat-icon"></div>
						{/* <div className="stat-value">{stats.currentlyWatching}</div> */}
						<div className="stat-label">Watching</div>
					</div>
					<div className="stat-card planned">
						<div className="stat-icon"></div>
						{/* <div className="stat-value">{stats.planned}</div> */}
						<div className="stat-label">Planned</div>
					</div>
					<div className="stat-card favorite">
						<div className="stat-icon"></div>
						{/* <div className="stat-value">{stats.favoriteGenre}</div> */}
						<div className="stat-label">Favorite Genre</div>
					</div>
				</div>

				{/* Featured Section */}
				<div className="featured-section">
					<h2 className="section-title">Currently Watching</h2>
					<div className="featured-grid">
						{userAnimeList
							.filter((a) => a.status === "watching")
							.map((anime) => (
								<div key={anime.id} className="featured-card">
									<div className="featured-header">
										<h3>{anime.title}</h3>
										<div className="rating-badge">{anime.rating}</div>
									</div>
									<div className="anime-meta">
										<span className="genre-tag">{anime.genre}</span>
									</div>
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
