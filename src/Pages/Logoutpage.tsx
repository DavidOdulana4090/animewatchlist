import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import '../styles/LogoutPage.css'

function LogOutPage() {
    const { userData, userLogout } = useAuth();
    const [count, setCount] = useState(5);

    useEffect(() => {
        if (count <= 0) return;
			const timer = setInterval(() => {
				setCount((prevCount) => {
                    if (prevCount > 0) {
						return prevCount - 1;
                    }
                    console.log("Logging Out")
                    // Logout function here wont put for now
					return prevCount;
                });
                
			}, 1000);

			return () => clearInterval(timer);
		}, []); 
    

    const message = count > 0 ? `Logging out of ${userData.username} in ${count} Seconds!` : "You have been logged out !!";

    // Will add like a confirm logout here or something 
    return (
        <div className="logout-page-container">
            <div className="logout-page-main-content">
                <h1 className="logout-message">
                    {message}
                </h1>
            </div>
        </div>
    );
}

export default LogOutPage;