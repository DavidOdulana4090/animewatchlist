import "./styles/Login.css"

import Button from "./components/Button";
import InputField from "./components/Input";
import Label from "./components/Label"
import Heading1 from "./components/H1";
import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function LoginPage(props) {
    const [showpassword, Setshowpassword] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    function PasswordVisibilityToggle(){
        Setshowpassword(!showpassword);
    }

    function ValidateLogin() {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

            const loginData = {
                email,    
                password  
            };

        console.log("UserInfo", loginData);
    }

    function login() {
        ValidateLogin()
        props.loginSuccess();
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
                                {showpassword ? <Eye className="icon-eye-password" onClick={PasswordVisibilityToggle}/> : <EyeOff className="icon-eye-password" onClick={PasswordVisibilityToggle}/>}
                            </div>                 
                        </div>
                    <br></br><br></br>
                    <Button text="login" onClick={login} />
                    <br></br>
                    <p className="no-account-p"> Don't have an account? <Link to={'/sign-up'}> sign up </Link> </p>
                </div>
            </div>
        </>
     );
}

export default LoginPage;