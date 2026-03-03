import { useState } from "react";
import AppRoutes from "./Routes/AppRoutes";

function App() {
    const [isLoggedIn, SetIsLogstate] = useState<string>(() => {
        return localStorage.getItem('isLoggedIn') || 'false';
    });

    const AppServerLoginRequest = () => {  // Will change most of these later
        localStorage.setItem('isLoggedIn', 'true');
        SetIsLogstate('true');
    };

    return (
        <div className="app-container">
            <AppRoutes isLoggedIn={isLoggedIn} ServerLoginRequest={AppServerLoginRequest} />
        </div>
    );
}

export default App;