import { useState } from "react";
import Button from "../components/Button";
import NewAnimeform from "../components/NewAnimeform";


function MyList() {
    const [formVisible, setFormVisible] = useState(false);

    const newAnime = () => {
        console.log("New Anime button clicked");
        setFormVisible(true);
    }

    return (
        <>
            <h1>Manage Your Anime Watchlist here </h1>
            <br></br>
            <Button text="New Anime" onClick={newAnime} />
            {formVisible && <NewAnimeform />}
    
        </>
    );
}

export default MyList;