import '../styles/CreateAcc.css'
import InputField from '../components/Input';
import Label from '../components/Label'

function CreateAccountPage() {
    return ( 
        <>
            <div className='container-container-createaccount'>
                <div className='container-createaccount'>
                    <Label text="email address" className="createaccountlabel"/>
                    <InputField placeholder="Enter email address" id="enter-email"/>
                    <br></br>
                    <Label text="password" className="createaccountlabel"/>
                    <InputField placeholder="Enter password" id="enter-password-field" />
                    <br></br>
                    <Label text="confirm-password" className="createaccountlabel"/>
                    <InputField placeholder="confirm password" id="confirm-password-field"/>
                </div>
            </div>
        </> 
);}

export default CreateAccountPage;