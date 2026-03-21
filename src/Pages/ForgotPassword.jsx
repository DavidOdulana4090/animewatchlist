import { useRef, useState } from "react";
import "../styles/ForgotPassword.css"
import InputField from "../components/Input";
import Label from "../components/Label"
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState("null@gmail.com")
    const navigate = useNavigate();

    const updatePassword = async () => {
        try {
            const datatosend = {
                email: emailRef.current.value
            }
            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const backend = `${backendurl}/api/user/forgotpassword`;

            const response = await axios.put(backend, datatosend);
            if (response.data) {
                setIsEmailVerified(true);
                setVerifiedEmail(emailRef.current.value);
            } else {
                setIsEmailVerified(false);
            }
            emailRef.current.value = "";

        } catch (error) {
            if (error.response) {
                console.log("Error msg ", error.response.data)
            } else {
                console.log("error occured ", error.response)
            }
        }
    }

    const setPassword = async () => {
        try {
            const datatosend = {
                password: passwordRef.current.value,
                email: verifiedEmail
            }

            const backendurl = import.meta.env.VITE_API_BASE_URL;
            const backend = `${backendurl}/api/user/newpassword`;

            const response = await axios.put(backend, datatosend);

            if (response) {
                console.log(response.data)
                navigate("/login")
            }
        } catch (error) {
            if (error.response) {
                console.log("Error msg ", error.response.data)
            } else {
                console.log("error occured ", error.response)
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