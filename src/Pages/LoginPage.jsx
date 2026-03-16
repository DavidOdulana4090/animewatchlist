import "../styles/Login.css"

import Button from "../components/Button";
import InputField from "../components/Input";
import Label from "../components/Label"
import Heading1 from "../components/H1";
import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { isValidLogin as isValidLogin } from "../utils/Logic";

function LoginPage(props) {
    // States / Ref
    const [showpassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function passwordToggle() {
        setShowPassword(!showpassword);
    }

    function clientLoginRequest() {
        let email = emailRef.current.value;
        let password = passwordRef.current.value

        if (isValidLogin(email, password)) {
            props.clientLoginSuccess();  // AppRoutes
            
            let userdata = {
                EmailAddress: email,
                Password: password
            }
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