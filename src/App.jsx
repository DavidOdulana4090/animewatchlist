import LoginPage from "./LoginPage";
import CreateAccountPage from "./Createaccount";
import { useState } from "react";

function App() {
    const [isLoggedIn, SetLogstate] = useState(true);

    return (
        <>
            {isLoggedIn ? <LoginPage/> : <CreateAccountPage/>}
        </>
    );
}

export default App
