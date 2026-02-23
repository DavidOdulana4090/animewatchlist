import "./styles/login.css"
import Button from "./components/button";
import InputField from "./components/input";

function LoginPage() {


    return ( 
        <>
            <div className="Login-container-container">
                <div className="Login-container"> 
                    <p> Track your anime watchlist</p>
                    <InputField placeholder="Email Address" type="email"/> 
                    <InputField placeholder="Password" type="password"/>
                    <Button text="login"/>
                </div>
            </div>
        </>
     );
}

export default LoginPage;