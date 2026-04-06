import "../styles/CreateAcc.css";
import InputField from "../components/Input";
import Label from "../components/Label";
import { Eye, EyeOff, Underline } from "lucide-react";
import { useRef, useState } from "react";
import { data, Link } from "react-router-dom";
import Button from "../components/Button";
import { isMatchingPassword } from "../utils/Logic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccountPage() {
	const [showpassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isError, setisError] = useState(false);
    const navigate = useNavigate();

	const emailref = useRef(null);
	const passwordref = useRef(null);
	const confirmpasswordref = useRef(null);

	const passwordToggle = () => {
		setShowPassword(!showpassword);
	}

	const passwordToggleConfirm = () => {
		setShowPasswordConfirm(!showPasswordConfirm);
    }
    
    if (isError) {
        setTimeout(() => {
            setisError(false);
            setErrorMsg("");
        }, 4000)
    }

    const handleCreateAccount = async () => {
        try {
            if (!isMatchingPassword(passwordref.current.value, confirmpasswordref.current.value)) {
                setErrorMsg("Password do not Match");
                setisError(true)
                return false;
            }

            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${backendurl}/register`, {
                email: emailref.current.value,
                password: passwordref.current.value,
            });

            navigate("/login") 
            console.log(response?.data)

        } catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data);
                setisError(true)
                return {
                    isSuccess: false,
                    message: error.message,
                    data: error.response.data
                }
            }
        }
    }

	return (
		<>
			<div className="container-container-createaccount">
				<div className="container-createaccount">
					<h1 className="createaccountheading"> Make your first account </h1>
					<br></br> <br></br>
					<Label text="Email address" className="createaccountlabel" />
					<InputField
						placeholder="Enter email address"
						id="enter-email"
						ref={emailref}
					/>
					<br></br>
					<div className="password-input-wrapper">
						<Label text="Password" className="createaccountlabel" />
						<InputField
							placeholder="Enter password"
							id="enter-password-field"
							type={showpassword ? "text" : "password"}
							ref={passwordref}
						/>
						{showpassword ? (<Eye className="icon-eye-password" onClick={passwordToggle} />) : (<EyeOff className="icon-eye-password" onClick={passwordToggle} />)}
					</div>
					<br></br>
					<div className="password-input-wrapper">
						<Label text="Confirm password" className="createaccountlabel" />
						<InputField
							placeholder="confirm password"
							id="confirm-password-field"
							type={showPasswordConfirm ? "text" : "password"}
							ref={confirmpasswordref}
						/>
						{showPasswordConfirm ? (
							<Eye
								className="icon-eye-password"
								onClick={passwordToggleConfirm}
							/>
						) : (
							<EyeOff
								className="icon-eye-password"
								onClick={passwordToggleConfirm}
							/>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <p className="error-message"> {errorMsg} </p>
                    </div>
					<br></br>
					<Button text="confirm" className="createaccountbutton" onClick={handleCreateAccount}/>
					<br></br>
					<p className="loginpage">
						Already have an account? <Link to={"/login"}> login </Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default CreateAccountPage;
