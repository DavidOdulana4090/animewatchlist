import "./styles/login.css"
import Button from "./components/button";
import InputField from "./components/input";
import Label from "./components/label"
import Heading1 from "./components/h1";
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function LoginPage() {

    const showpassword = false;

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
                                <InputField placeholder="Enter password.." type="password" id="password-field" className="password-input"/>
                                {showpassword ? <Eye className="icon-eye-password"/> : <EyeOff className="icon-eye-password"/>}
                            </div>                 
                        </div>
                    <br></br><br></br>
                    <Button text="login"/>
                </div>
            </div>
        </>
     );
}

export default LoginPage;