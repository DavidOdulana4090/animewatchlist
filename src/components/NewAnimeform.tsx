import { useEffect, useRef, useState } from 'react';
import '../styles/NewAnimeForm.css';
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';

// Structure for the anime data
export interface NewAnimeFormProps {
    id?: number;
    title: string;
    status?: "Completed" | "Watching" | "Planned" | "Dropped" | string | null;
    progress: number; // percentage
    genres?: string[] | null;
    rating: number; 
    favourite: boolean;
}

// Stuff i might need
export interface NewAndEditedFormProps extends NewAnimeFormProps {
    info?: {
        newAnime: boolean,
    },
    onFormClose?: () => void;
}

function NewAnimeForm({ id, title, status, progress, genres, rating, favourite , info, onFormClose }:NewAndEditedFormProps ) {
    const formref = useRef<HTMLFormElement>(null)
    const [checked, setChecked] = useState(favourite || false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { userData, userAnimeList, fetchUserAnimeData, SetIsLoading } = useAuth();
    const [text, setText] = useState("Add New Anime");
    

    useEffect(() => {
        setChecked(favourite || false);
    }, [favourite])

    useEffect(() => {
        if (info?.newAnime) {
            setText("Add New Anime")
        } else {
            setText("Update Anime")
        }
    }, [info?.newAnime])

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formref.current!);
        console.log("Form Data:", Object.fromEntries(formData.entries()));
        const animeToAdd: NewAnimeFormProps = {
            id: id,
            title: formData.get("title")?.toString() || "Unknown Title",
            status: formData.get("status") as NewAnimeFormProps["status"],
            progress: Number(formData.get("progress")) > 100 ? 100 : Number(formData.get("progress")) < 0 ? 0 : Number(formData.get("progress")),
            genres: formData.get("genres") ? (formData.get("genres") as string).split(",").map(genre => genre.trim()) : null,
            rating: Number(formData.get("rating")),
            favourite: checked || false,
        };

        if (isAnimeExist(animeToAdd)) {
            // PutMapping Function Here 
            await updateExistingAnime(animeToAdd);
        } else {
            // Post Function 
            await addNewAnime(animeToAdd, userData.userId);
        }

        formref.current?.reset();
        setIsSubmitted(!isSubmitted);
        onFormClose?.();

        // refresh
        await fetchUserAnimeData(userData.userId);
    }

    // Add Post
    const addNewAnime: (anime: NewAnimeFormProps, userId: string | any) => Promise<{ isSuccess: boolean; Message: string } | object> = async (animeData, userId) => {
        if (!userId) {
            console.error("User ID is undefined. Cannot add anime.");
            return { isSuccess: false, Message: "User ID is undefined. Cannot add anime." };
        }
        try {
            const backendurl: String = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${backendurl}/anime/add/${userId}`, 
                animeData
            );
            SetIsLoading(true);
            if (response.status != 200) {
                throw new Error(`[ERROR] Failed to add new anime. ${response.status}`);
            }
            console.log("New anime added successfully: ", response.data);
            return { isSuccess: true, Message: "New anime added successfully." };
          }
        catch (error: any) {
            console.error("[Error] adding new anime: ", error.response?.data || error.message);
            return { isSuccess: false, Message: error.response?.data || error.message };
        } finally {
            SetIsLoading(false);
        }
    };

    const isAnimeExist = (userList: NewAnimeFormProps): boolean => {
        console.log("[DEBUG] ", userList.id, typeof userList.id)
        return userAnimeList.some(anime => {
            return String(anime.id) === String(userList.id)
        })
    }
    
    // Put
    const updateExistingAnime = async (anime: NewAnimeFormProps ) => {
        try {
            const backendurl: string = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.put(`${backendurl}/anime/update/${anime.id}`,
                anime)
            SetIsLoading(true)
            if (response.status != 200) {
                throw new Error(`[ERROR] Failed to update anime. ${response.status}`);
                return
            }

            console.log("[INFO] Update Anime Success: ", anime.title)

        } catch (error :any) {
            console.log("[ERROR] failed to Update ", error.response?.data || error.message )
        } finally {
            SetIsLoading(false)
        }
    };

    return ( 
        !isSubmitted ? (
        <div className="anime-form-container">
            <h1>Enter Details</h1>
            <form className="anime-form" ref={formref} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label" style={{ "color": "#f5f5f5" }}>
                        Title:
                    </label>
                    <input type="text" id="title" name="title" required placeholder='Required Field' defaultValue={title} style={{ "color": "#f5f5f5", "background": "transparent" }} />
                </div>
                <div className="form-group">
                    <label htmlFor="status" className="form-label" style={{ "color": "#f5f5f5" }}>
                        Status:
                    </label>
                    <select id="status" defaultValue={status || "Planned"} name="status" required>
                        <option value="Completed">Completed</option>
                        <option value="Watching">Watching</option>
                        <option value="Planned">Planned</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="progress" className="form-label" style={{ "color": "#f5f5f5" }}>
                        Progress (%):
                    </label>
                    <input type="number" id="progress" defaultValue={progress} name="progress" min="0" max="100" placeholder='1-100' style={{ "color": "#f5f5f5", "background": "transparent" }} />
                </div>
                <div className="form-group">
                    <label htmlFor="genres" className="form-label" style={{ "color": "#f5f5f5" }}>
                        Genres (comma separated):
                    </label>
                    <input type="text" id="genres" defaultValue={genres} name="genres" style={{ "color": "#f5f5f5", "background": "transparent" }} />
                </div>
                <div className="form-group">
                    <label htmlFor="rating" className="form-label" style={{ "color": "#f5f5f5" }}>
                        Rating:
                    </label>
                    <input type="number" id="rating" defaultValue={rating} name="rating" min="1" max="10" step="0.1" placeholder='1.0-10' style={{ "color": "white" }} />
                </div>
                <div className="form-group checkbox-group">
                    <label htmlFor="favourite" className="form-label" style={{ "color": "#f5f5f5" }}>
                        Favourite:
                    </label>
                        <input type="checkbox" id="favourite" name="favourite" checked={checked} onChange={() => setChecked(!checked)} />
                </div>
                <br></br>
                <button type="submit" className="form-submit-btn">{text}</button>
            </form>
        </div>
        ) : (
        <div>
            
        </div>
        )
    );
}

export default NewAnimeForm;