import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";


function LogOutPage() {
    const [username, setUsername] = useState(null);
    const { userdata, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userLogout = async () => {
            const response = await logout();
            console.log(response.Message);
            navigate('/login');
        }
        userLogout();
    })

    // Will add like a confirm logout here or something 
    return (
        <>
            <h1> LOGOUT PAGE TEST </h1>
            <p> Bye Bye </p> 
            <span> ${userdata?.username} </span>
    </> );
}

export default LogOutPage;