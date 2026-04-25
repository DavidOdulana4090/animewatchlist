import { useRef, useState } from 'react';
import '../styles/NewAnimeForm.css';
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';

// Structure for the anime data
export interface NewAnimeFormProps {
    id?: number;
    title: string;
    status?: "Completed" | "Watching" | "Planned" | "Dropped" | null;
    progress: number; // percentage
    genres?: string[] | null;
    rating: number; 
    favourite: boolean;
}


function NewAnimeForm() {
    const formref = useRef<HTMLFormElement>(null)
    const [checked, setChecked] = useState(false);
    const { userData } = useAuth();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(formref.current!);
        console.log("Form Data:", Object.fromEntries(formData.entries()));
        const animeToAdd: NewAnimeFormProps = {
            title: formData.get("title")?.toString() || "Unknown Title",
            status: formData.get("status") as NewAnimeFormProps["status"],
            progress: Number(formData.get("progress")) > 100 ? 100 : Number(formData.get("progress")) < 0 ? 0 : Number(formData.get("progress")),
            genres: formData.get("genres") ? (formData.get("genres") as string).split(",").map(genre => genre.trim()) : null,
            rating: Number(formData.get("rating")),
            favourite: checked || false,
        };
        addNewAnime(animeToAdd, userData.userId);
    }

    const addNewAnime = async (animeData: NewAnimeFormProps, userId: string | undefined) => {
        if (!userId) {
            console.error("User ID is undefined. Cannot add anime.");
            return;
        }
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${backendurl}/anime/add/${userId}`, 
                animeData
            );
            if (response.status != 200) {
                throw new Error(`[ERROR] Failed to add new anime. ${response.status}`);
            }
            console.log("New anime added successfully: ", response.data);
          }
        catch (error: any) {
            console.error("Error adding new anime: ", error.response?.data || error.message);
        }
    };

            

    return (
        <div className="anime-form-container">
            <h1>Enter Details</h1>
            <form className="anime-form" ref={formref} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required placeholder='Required Field'/>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status" required>
                        <option value="">Select Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Watching">Watching</option>
                        <option value="Planned">Planned</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="progress">Progress (%):</label>
                    <input type="number" id="progress" name="progress" min="0" max="100" placeholder='1-100'/>
                </div>
                <div className="form-group">
                    <label htmlFor="genres">Genres (comma separated):</label>
                    <input type="text" id="genres" name="genres" />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <input type="number" id="rating" name="rating" min="1" max="10" step="0.1" placeholder='1.0-10'/>
                </div>
                <div className="form-group checkbox-group">
                    <label htmlFor="favourite">Favourite:</label>
                    <input type="checkbox" id="favourite" name="favourite" checked={checked} onChange={(() => {
                        setChecked(!checked);
                    })}/>
                </div>
                <button type="submit" className="form-submit-btn">Add Anime</button>
            </form>
        </div>
     );
}

export default NewAnimeForm;