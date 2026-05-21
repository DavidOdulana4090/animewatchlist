import { useAuth } from '../utils/AuthContext';
import '../styles/Settings.css'

function Settings() {
    const { userData, handleTheme } = useAuth();
    const avatarLetter = userData?.username ? userData.username.charAt(0).toUpperCase() : '?';

    const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleTheme(e.target.value);
    };

    return (
        <>
            <div className='div-container-settings'> 
                <div className='container-settings'>
                    <h1 className='section-heading'> PROFILE </h1>

                    <div className='profile-avatar-section'>
                        <div className='profile-avatar'>
                            {avatarLetter}
                        </div>
                    </div>

                    <div className='profile-details'>
                        <div className='profile-field'>
                            <span className='profile-field-label'>Username</span>
                            <span className='profile-field-value'>{userData?.username || 'Not set'}</span>
                        </div>
                        <div className='profile-field'>
                            <span className='profile-field-label'>Email</span>
                            <span className='profile-field-value'>{userData?.email || 'Not set'}</span>
                        </div>
                    </div>
                </div>

                <div className='container-settings'>
                    <h1 className='section-heading'> PREFRENCES </h1>
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
            </div>
        </>
    );
}

export default Settings;