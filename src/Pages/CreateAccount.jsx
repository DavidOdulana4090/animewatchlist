import '../styles/CreateAcc.css'
import InputField from '../components/Input';
import Label from '../components/Label'
import { Eye, EyeOff, Underline } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function CreateAccountPage() {
    const [showpassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    function passwordToggle() {
        setShowPassword(!showpassword)
    }

    function passwordToggleConfirm() {
        setShowPasswordConfirm(!showPasswordConfirm);
    }
    return ( 
        <>
            <div className='container-container-createaccount'>
                <div className='container-createaccount'>
                    <h1 className='createaccountheading'> Make your first account </h1>
                    <br></br>
                    <Label text="Email address" className="createaccountlabel"/>
                    <InputField placeholder="Enter email address" id="enter-email"/>
                    <br></br>

                    <div className='password-input-wrapper'>
                    <Label text="Password" className="createaccountlabel"/>
                    <InputField placeholder="Enter password" id="enter-password-field" type={showpassword ? "text" : "password"}/>
                    {showpassword ? <Eye className="icon-eye-password" onClick={passwordToggle}/> : <EyeOff className="icon-eye-password" onClick={passwordToggle}/>} </div>
                    <br></br>

                    <div className='password-input-wrapper'>
                    <Label text="Confirm password" className="createaccountlabel"/>
                    <InputField placeholder="confirm password" id="confirm-password-field" type={showPasswordConfirm ? "text" : "password"} />
                    {showPasswordConfirm ? <Eye className="icon-eye-password" onClick={passwordToggleConfirm} /> : <EyeOff className="icon-eye-password" onClick={passwordToggleConfirm} />} </div>
                    <br></br>

                    <Button text="confirm" className="createaccountbutton"/>
                    <p className='loginpage'> Already have an account? <Link to={'/login'}> login </Link></p>
                </div>
            </div>
        </> 
);}

export default CreateAccountPage;