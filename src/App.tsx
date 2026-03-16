import { useState } from "react";
import AppRoutes from "./Routes/AppRoutes";
import "./styles/App.css"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<string>(() => {
        return localStorage.getItem('isLoggedIn') || 'false';
    });

    const appLoginRequest = () => {  // Will change most of these later
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn('true');
    };


    return (
        <div className="app-container">
            <AppRoutes isLoggedIn={isLoggedIn} serverLoginRequest={appLoginRequest} />
        </div>
    );
}

export default App;