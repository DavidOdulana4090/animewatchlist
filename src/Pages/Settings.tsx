import '../styles/Settings.css'
import { useAuth } from '../utils/AuthContext';

function Settings() {
    const { userData } = useAuth();
    const avatarLetter = userData?.username ? userData.username.charAt(0).toUpperCase() : '?';

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
            </div>
    </>  );
}

export default Settings;
