import { useState } from "react";
import Button from "../components/Button";
import NewAnimeform from "../components/NewAnimeform";
import Dashboard from "./Dashboard";

function MyList() {
    const [formVisible, setFormVisible] = useState(false);

    const newAnime = () => {
        setFormVisible(true);
    }

    return (
        <>
            <h1>Manage Your Anime Watchlist here </h1>
            <br></br>
            <Button text="New Anime" onClick={newAnime} />
            {formVisible && <NewAnimeform />}
            <br></br>
            <p> Customize your watchlist </p>
        </>
    );
}

export default MyList;