import { useRef, useState } from "react";
import "../styles/ForgotPassword.css"
import InputField from "../components/Input";
import Label from "../components/Label"
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState("null@gmail.com")
    const navigate = useNavigate();

    const updatePassword = async () => {
			try {
				const backendurl = import.meta.env.VITE_API_BASE_URL;
                await axios.put(`${backendurl}/api/user/forgot-password`, emailRef.current?.value);
                
				setIsEmailVerified(true);
				setVerifiedEmail(emailRef.current?.value || "");
                emailRef.current!.value = "";

            } catch (error: any) {
                setIsEmailVerified(false)
                console.log("Error msg ", error.response?.data || error.message);
                return {
                    isSuccess: false,
                    message: error.response.data,
                    data: error.message
                }
			}
		};

    const setPassword = async () => {
        try {
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            await axios.put(`${backendurl}/api/user/update-password`, {
                email: verifiedEmail,
                password: passwordRef.current?.value
            });

            navigate("/login")

        } catch (error: any) {
            console.log("Error msg ", error.response?.data || error.message)
            return {
                isSuccess: true,
                message: error.response.data,
                data: error.message
            }
        }
    }

    return (
        <>
            {isEmailVerified ?
                <div className="div-container-container">
                    <div className="div-container">
                        <h1 className="header"> Enter Password </h1>
                        <Label text="New password" className="label-field" />
                        <InputField ref={passwordRef} />
                        <br></br>
                        <Button className="button-reset-password" text="reset" onClick={setPassword} />
                    </div>
                </div>
                :
                <div className="div-container-container">
                    <div className="div-container">
                        <h1 className="header"> Enter Associated email to reset password </h1>
                        <Label text="Email address" className="label-field" />
                        <InputField ref={emailRef} />
                        <br></br>
                        <Button className="button-reset-password" text="reset" onClick={updatePassword} />
                    </div>
                </div>
            }
        </>
    );
}

export default ForgotPassword;