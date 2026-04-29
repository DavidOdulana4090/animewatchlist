import { useEffect, useState } from "react";
import Button from "../components/Button";
import NewAnimeform from "../components/NewAnimeform";
import "../styles/MyList.css";
import { useAuth } from "../utils/AuthContext";
import type { NewAnimeFormProps } from "../components/NewAnimeform";
import axios from "axios";

function MyList() {
    const [formVisible, setFormVisible] = useState(false);
    const { userAnimeList, fetchUserAnimeData } = useAuth();
    const [edittedAnimeForm, setEdittedAnimeForm] = useState<NewAnimeFormProps | null>(null)

    const newAnime = () => {
        setFormVisible(!formVisible);
    }

    const handleAnimeDelete = async (anime: NewAnimeFormProps) => {
        // Implement delete functionality here
        console.log(`${anime.title} Anime deleted!`);
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.delete(`${backendurl}/anime/delete/${anime.id}`)
            if (response.status != 200) {
                throw new Error(`[ERROR] Failed to delete anime. ${response.status}`);
            }
            console.log("Anime deleted successfully: ", response?.data);
            fetchUserAnimeData();
        } catch (error) {
            console.error("Error deleting anime:", error);
        }
    };

    const handleAnimeEdit = (anime: NewAnimeFormProps) => {
        setFormVisible(!formVisible);
        setEdittedAnimeForm(anime)
        return {
            ...anime
        }
    }

    useEffect(() => {
            //UI or some message here
    }, [userAnimeList])

    return (
        <div className="mylist-container">
            <div className="mylist-header">
                <div className="header-content">
                    <h1>Manage Your Anime Watchlist</h1>
                    <p className="header-subtitle">Organize and customize your favorite anime collection</p>
                </div>
                <Button className={formVisible ? "button-cancel" : "button-add"} text={formVisible ? "Cancel" : "Add New Anime"} onClick={newAnime}/>
            </div>

            {formVisible && edittedAnimeForm &&(
                <div className="form-section">
                    <NewAnimeform
                        {...edittedAnimeForm}
                    /> {/*  */}
                </div>
            )}

            <div className="anime-list-section">
                {userAnimeList.length === 0 ? (
                    <div className="empty-state">
                        <p>Your watchlist is empty. Start by adding a new anime!</p>
                    </div>
                ) : (
                    <div className="anime-grid">
                        {userAnimeList.map((anime, index) => (
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
                                        <span className="rating">{'★'.repeat(Math.round(anime.rating))} ({anime.rating}/10)</span>
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
                                    <button className="card-btn edit-btn" onClick={() => console.log(handleAnimeEdit(anime))}>Edit</button>
                                    <button className="card-btn delete-btn" onClick={() => handleAnimeDelete(anime)}>Delete</button>
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