import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";


function LogOutPage() {
    const [username, setUsername] = useState(null);
    const { user, userdata, login, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(userdata)
        logout();
        navigate('/login')
    })

    console.log(userdata)
    // Will add like a confirm logout here or something 
    return (
        <>
            <h1> LOGOUT PAGE TEST </h1>
            <p> Bye Bye </p> 
            <span> ${userdata} </span>
    </> );
}

export default LogOutPage;