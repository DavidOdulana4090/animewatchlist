import { useAuth } from '../utils/AuthContext';
import '../styles/Settings.css'
import React, { useRef } from 'react';
import Button from '../components/Button';
import { PenIcon } from 'lucide-react';

function Settings() {
    const { userData, handleTheme , setDashboardStatus} = useAuth();
    const avatarLetter = userData?.username ? userData.username.charAt(0).toUpperCase() : '?';
    const Allpref = useRef(null)

    const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleTheme(e.target.value);
    };

    // set new status in auth to rerender and save in local storage
    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDashboardStatus(e.target.value)
        localStorage.setItem("status", e.target.value);
    }

    // Function to Change all p elements in Profile to Input to be edit not implemented
    const toggleInput = () => {
        if (Allpref.current) {
            const pElements = document.querySelectorAll("p");

            pElements.forEach((p, index) => {
                console.log(`${index} of ${p.textContent}`)
            })
        }
    }

    return (
        <>
            <div className='div-container-settings' ref={Allpref}> 
                <div className='container-settings'>
                    <h1 className='section-heading'> PROFILE
                       <span> <Button Icon={PenIcon} iconSize={23} className='edit-button-settings' onClick={toggleInput}/> </span>
                    </h1>   
                    <span className='optional-field-description'> Change your profile icon, username & more </span>
                    <div className='profile-avatar-section'>
                        <p className='profile-avatar'>
                            {avatarLetter}
                        </p>
                    </div>

                    <div className='profile-details'>
                        <div className='profile-field'>
                            <span className='profile-field-label'>Username</span>
                            <p className='profile-field-value'>{userData?.username || 'Not set'}</p>
                        </div>
                        <div className='profile-field'>
                            <span className='profile-field-label'>Email</span>
                            <p className='profile-field-value'>{userData?.email || 'Not set'}</p>
                        </div>
                    </div>
                </div>

                <div className='container-settings'>
                    <h1 className='section-heading'> PREFRENCES </h1>
                    <span className='optional-field-description'> Change your theme </span>
                    <div className='profile-details'>
                        <div className='profile-field'>
                            <span className='profile-field-label'>THEME</span>
                            <div className='theme-toggle'>
                                <input type="radio" name='theme' value='dark' id='theme-dark' onChange={onThemeChange} />
                                <label htmlFor='theme-dark'>Dark</label>
                                <input type="radio" name='theme' value='light' id='theme-light' onChange={onThemeChange} />
                                <label htmlFor='theme-light'>Light</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container-settings'>
                    <h1 className='section-heading'> STATUS DISPLAY </h1>
                    <span className='optional-field-description'> Modify the item displayed on your dashboard </span>
                    <div className='profile-details'>
                        <div className='profile-field'>
                            <span className='profile-field-label'>STATUS</span>
                            <div className='status-toggle'>
                                <input type="radio" name='status' id='Completed' value={`Completed`} onChange={handleStatusChange}/>
                                <label htmlFor="Completed"> Completed </label>
                                <input type="radio" name='status' id='Dropped' value={`Dropped`} onChange={handleStatusChange}/>
                                <label htmlFor="Dropped"> Dropped </label> 
                                <input type="radio" name='status' id='Watching' value={`Watching`} onChange={handleStatusChange}/>
                                <label htmlFor="Watching"> Watching </label>
                                <input type="radio" name='status' id='Planned' value={`Planned`} onChange={handleStatusChange}/>
                                <label htmlFor="Planned"> Planned </label>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Settings;