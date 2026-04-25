import { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

function LogOutPage() {
    const { userData, userLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userLogout = async () => {
            await userLogout();
            console.log("Logout Successful ");
            navigate('/login');
        }
        userLogout();
    })

    // Will add like a confirm logout here or something 
    return (
        <>
            <h1> LOGOUT PAGE TEST </h1>
            <p> Bye Bye </p> 
            <span> ${userData?.username} </span>
        </>
    );
}

export default LogOutPage;