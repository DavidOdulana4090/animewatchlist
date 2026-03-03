import { useState } from "react";
import AppRoutes from "./Routes/AppRoutes";

function App() {
    const [isLoggedIn, SetIsLogstate] = useState<string>(() => {
        return localStorage.getItem('isLoggedIn') || 'false';
    });

    const loginRequest = () => {
        localStorage.setItem('isLoggedIn', 'true');
        SetIsLogstate('true');
    };

    const logoutRequest = () => {
        localStorage.removeItem('isLoggedIn');
        SetIsLogstate('false');
    };

    return (
        <div className="app-container">
            <AppRoutes isLoggedIn={isLoggedIn} onLogin={loginRequest} />
        </div>
    );
}

export default App;