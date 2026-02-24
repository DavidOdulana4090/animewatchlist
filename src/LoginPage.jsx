import "./styles/Login.css"

import Button from "./components/Button";
import InputField from "./components/Input";
import Label from "./components/Label"
import Heading1 from "./components/H1";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function LoginPage(props) {
    const [showpassword, Setshowpassword] = useState(false);

    function PasswordVisibilityToggle(){
        Setshowpassword(!showpassword);
    }

    function login() {
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
                            <InputField placeholder="Enter Email address.." type="email" id="email-field"/> 
                        </div>
                            <br></br>
                        <div className="input-container"> 
                            <Label htmlFor="password-field" text="Password"/>
                            <div className="input-password-wrapper">
                                <InputField placeholder="Enter password.." type={showpassword ? "text" : "password"} id="password-field" className="password-input" />
                                {showpassword ? <Eye className="icon-eye-password" onClick={PasswordVisibilityToggle}/> : <EyeOff className="icon-eye-password" onClick={PasswordVisibilityToggle}/>}
                            </div>                 
                        </div>
                    <br></br><br></br>
                    <Button text="login" onClick={login} />
                    <br></br>
                    <p className="no-account-p"> Don't have an account? <Link to={'./CreateAccount.jsx'}> sign up </Link> </p>
                </div>
            </div>
        </>
     );
}

export default LoginPage;