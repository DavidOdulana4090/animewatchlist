import { useState } from "react";
import Button from "../components/Button";
import NewAnimeform from "../components/NewAnimeform";
import "../styles/MyList.css";
import type { NewAnimeFormProps } from "../components/NewAnimeform";

function MyList() {
    const [formVisible, setFormVisible] = useState(false);
    const [animeList, setAnimeList] = useState<NewAnimeFormProps[]>([]);

    const newAnime = () => {
        setFormVisible(!formVisible);
    }

    return (
        <div className="mylist-container">
            <div className="mylist-header">
                <div className="header-content">
                    <h1>Manage Your Anime Watchlist</h1>
                    <p className="header-subtitle">Organize and customize your favorite anime collection</p>
                </div>
                <Button text="+ New Anime" onClick={newAnime} />
            </div>

            {formVisible && (
                <div className="form-section">
                    <NewAnimeform />
                </div>
            )}

            <div className="anime-list-section">
                {animeList.length === 0 ? (
                    <div className="empty-state">
                        <p>Your watchlist is empty. Start by adding a new anime!</p>
                    </div>
                ) : (
                    <div className="anime-grid">
                        {animeList.map((anime, index) => (
                            <div key={index} className="anime-card">
                                <div className="anime-card-header">
                                    <h3 className="anime-title">{anime.title}</h3>
                                    {anime.favourite && <span className="favourite-badge">Favourite</span>}
                                </div>
                                
                                <div className="anime-card-body">
                                    <div className="card-row">
                                        <span className="label">Status:</span>
                                        <span className={`status ${anime.status?.toLowerCase()}`}>{anime.status}</span>
                                    </div>
                                    
                                    <div className="card-row">
                                        <span className="label">Progress:</span>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${anime.progress}%` }}></div>
                                        </div>
                                        <span className="progress-text">{anime.progress}%</span>
                                    </div>

                                    <div className="card-row">
                                        <span className="label">Rating:</span>
                                        <span className="rating">{'IconHere'.repeat(Math.round(anime.rating))} ({anime.rating}/10)</span>
                                    </div>

                                    {anime.genres && anime.genres.length > 0 && (
                                        <div className="card-row genres">
                                            <span className="label">Genres:</span>
                                            <div className="genre-tags">
                                                {anime.genres.map((genre, idx) => (
                                                    <span key={idx} className="genre-tag">{genre}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="anime-card-footer">
                                    <button className="card-btn edit-btn">Edit</button>
                                    <button className="card-btn delete-btn">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyList;