import "../styles/Login.css"

import Button from "../components/Button";
import InputField from "../components/Input";
import Label from "../components/Label"
import Heading1 from "../components/H1";
import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { isValidLogin as isValidLogin } from "../utils/Logic";
import axios from "axios";

function LoginPage(props) {
    // States / Ref
    const [showpassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function passwordToggle() {
        setShowPassword(!showpassword);
    }

    const handleLogin = async () => {

        try {
            // user login data 
             const userdata = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        const backendurl = import.meta.env.VITE_API_BASE_URL;
        const backend = `${backendurl}/api/user/login`;

            const response = await axios.post(backend, userdata);
            console.log(response)
            props.clientLoginSuccess();  // AppRoutes
            
        } catch (error) {
            if (error.response) {
                console.log("Error msg: ", error.response.data)
            } else {
                console.log("Error ", error.response)
            }
            return false;
        }
    }

    function clientLoginRequest() {
        let email = emailRef.current.value;
        let password = passwordRef.current.value

        if (isValidLogin(email, password)) {
            handleLogin();
        } else {
            alert("Invalid Password or email")
            return false;
        }   
    }


return ( 
    <>
        <div className="Login-container-container">
            <div className="Login-container"> 
                <Heading1 text="Track your movies.." className="heading1"/>
                <br></br>

                    <div className="input-container">
                        <Label htmlFor="email-field" text="Email address"/>
                    <InputField name="user-emailaddress" placeholder="Enter Email address.." type="email" id="email-field" ref={emailRef} /> 
                    </div>
                <br></br>
                
                    <div className="input-container"> 
                        <Label htmlFor="password-field" text="Password"/>
                        <div className="input-password-wrapper">
                            <InputField name="user-password" placeholder="Enter password.." type={showpassword ? "text" : "password"} id="password-field" className="password-input" ref={passwordRef}/>
                            {showpassword ? <Eye className="icon-eye-password" onClick={passwordToggle}/> : <EyeOff className="icon-eye-password" onClick={passwordToggle}/>}
                        </div>                 
                    </div>
                <br></br><br></br>
                <Button text="login" onClick={clientLoginRequest} />
                <br></br>
                <p className="no-account-p"> Don't have an account? <Link to={'/sign-up'}> sign up </Link> </p>
            </div>
        </div>
    </>
    );}

export default LoginPage;