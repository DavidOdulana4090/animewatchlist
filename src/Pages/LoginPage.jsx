import "../styles/Login.css";

import Button from "../components/Button";
import InputField from "../components/Input";
import Label from "../components/Label";
import Heading1 from "../components/H1";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { isValidLogin as isValidLogin } from "../utils/Logic";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function LoginPage() {
	const [showpassword, setShowPassword] = useState(false);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
    const { user, userdata, login, logout } = useAuth();
    const [isError, setisError] = useState(false);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

	const passwordToggle = () => {
		setShowPassword(!showpassword);
    };
    
    if (isError) {
        setTimeout(() => {
            setisError(false);
            setErrorMsg("");
        }, 3000)


    }
	const clientLoginRequest = async() => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;

		if (!isValidLogin(email, password)) {
			return false;
		}

        const response = await login(email, password);
        
        if (!response.isSuccess) {
            setErrorMsg(response?.data)
            setisError(true)
            return false
        }

		navigate("/dashboard");
		return true;
	};

	return (
		<>
			<div className="Login-container-container">
				<div className="Login-container">
					<Heading1 text="Track your movies.." className="heading1" />
					<br></br>

					<div className="input-container">
						<Label htmlFor="email-field" text="Email address" />
						<InputField
							name="user-emailaddress"
							placeholder="Enter Email address.."
							type="email"
							id="email-field"
							ref={emailRef}
						/>
					</div>
					<br></br>

					<div className="input-container">
						<Label htmlFor="password-field" text="Password" />
						<div className="input-password-wrapper">
							<InputField
								name="user-password"
								placeholder="Enter password.."
								type={showpassword ? "text" : "password"}
								id="password-field"
								className="password-input"
								ref={passwordRef}
							/>
							{showpassword ? (
								<Eye className="icon-eye-password" onClick={passwordToggle} />
							) : (
								<EyeOff
									className="icon-eye-password"
									onClick={passwordToggle}
								/>
                            )}
						</div>
                    </div>
                    
                    <br></br>
                    <div className="error-message"> 
                        <p> {errorMsg} </p>
                    </div>
                    <br></br>
                    
					<Button text="login" onClick={clientLoginRequest} />
					<br></br>
					<Link to={"/forgot-password"} className="forgot-password">
						Forgot Password?
					</Link>
					<br></br>
					<p className="no-account-p">
						Don't have an account? <Link to={"/sign-up"}> sign up </Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
