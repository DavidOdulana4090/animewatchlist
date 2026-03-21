import "../styles/CreateAcc.css";
import InputField from "../components/Input";
import Label from "../components/Label";
import { Eye, EyeOff, Underline } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { isMatchingPassword } from "../utils/Logic";

function CreateAccountPage() {
	const [showpassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

	const emailref = useRef(null);
	const passwordref = useRef(null);
	const confirmpasswordref = useRef(null);

	function passwordToggle() {
		setShowPassword(!showpassword);
	}

	function passwordToggleConfirm() {
		setShowPasswordConfirm(!showPasswordConfirm);
	}

	function showPasswordError() {}

	async function createAccount() {
		const emailvalue = emailref.current.value;
		const passwordvalue = passwordref.current.value;
		const confirmpasswordvalue = confirmpasswordref.current.value;
		console.log(emailvalue, passwordvalue, confirmpasswordvalue);

		if (isMatchingPassword(passwordvalue, confirmpasswordvalue)) {
			console.log(true);
		} else {
			console.log(false);
		}
	}

	async function fetchData() {
		try {
			const backendport = import.meta.env.VITE_API_BASE_URL;
			const response = await fetch(`${backendport}/api/response`);

			if (response.ok) {
				const data = await response.text();
				console.log(data);
			} else {
				console.error(response.status);
			}
		} catch (error) {
			console.error(error);
		}
	}

	fetchData();

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
					<Button text="confirm" className="createaccountbutton" onClick={createAccount}/>
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
