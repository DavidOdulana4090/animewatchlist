import "../styles/ContactMe.css"
import { GithubIcon } from "lucide-react";
import { MdEmail } from "react-icons/md";

function ContactMe() {
    return (
        <div className='contact-me-container'>
            <div className="contact-container">
                <h1 className='header'> Contact Information </h1>

                <div className="contact-link">
                    <a href="https://github.com/DavidOdulana4090" target="_blank" rel="noopener noreferrer" title="https://github.com/DavidOdulana4090"> 
                        <GithubIcon size={32}/>  
                    </a>
                </div>
                <div className="contact-link">
                    <a href="mailto:daveedtee5@gmail.com" title="daveedtee5@gmail.com"> 
                        <MdEmail size={32} /> 
                    </a>  
                </div>
            </div>
        </div>
    );
}

export default ContactMe;