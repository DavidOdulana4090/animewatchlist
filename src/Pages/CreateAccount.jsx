import "../styles/CreateAcc.css";
import InputField from "../components/Input";
import Label from "../components/Label";
import { Eye, EyeOff, Underline } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { isMatchingPassword } from "../utils/Logic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccountPage() {
	const [showpassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
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

    const handleCreateAccount = async () => {
        try {
            if (!isMatchingPassword(passwordref.current.value, confirmpasswordref.current.value)) {
                return false;
            }

            const userData = {
                email: emailref.current.value,
                password: passwordref.current.value
            }
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${backendurl}/api/user/register`, userData);

            if (response.data == null && response.status != 200) {
                return false;
            }
            navigate("/login")  
        } catch (error) {
            if (error.response) {
                console.log("Error Msg: ", error.response?.data || error.message)
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
