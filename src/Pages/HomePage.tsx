import { useState } from 'react';
import '../styles/HomePage.css'
import clsx from 'clsx';
import AsideButtons from '../components/AsideButton';
import { HomeIcon, UserIcon, MessageSquareIcon, LucideSettings, DoorOpenIcon, TagsIcon, PhoneCallIcon } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

function HomePage() {
    const [isActive, setIsActive] = useState<string | null>(null);
    const navigate = useNavigate();

    // Handle navigation and active state for aside buttons for css styling
    function HandleNavgiation(pathname: string, text: string) {
        setIsActive(text);
        navigate(pathname);
    }

    return (
        <>
            <div className='app-container'>
                <aside className={clsx('aside-styling')}>
                    <br></br>
                    <AsideButtons
                        text="Dashboard"
                        Icon={HomeIcon}
                        active={isActive}
                        onClick={() => HandleNavgiation('/dashboard', 'Dashboard')}
                    /> 
                    
                    <AsideButtons
                        text="Profile"
                        Icon={UserIcon}
                        active={isActive}
                        onClick={() => HandleNavgiation('/profile', 'Profile')} />
                    
                    <AsideButtons
                        text="Inbox"
                        Icon={MessageSquareIcon}
                        active={isActive}
                        onClick={() => HandleNavgiation('Inbox', 'Inbox')} />
                    
                    <AsideButtons
                        text="Contact Me"
                        Icon={PhoneCallIcon}
                        active={isActive}
                        onClick={() => HandleNavgiation('Contact', 'Contact Me')} />
                    
                    <AsideButtons
                        text="My List"
                        Icon={TagsIcon}
                        active={isActive}
                        onClick={() => HandleNavgiation('MyList', 'My List')} />
                    
                    <AsideButtons
                        text="Settings"
                        Icon={LucideSettings}
                        active={isActive}
                        onClick={() => HandleNavgiation('Settings', 'Settings')} />
                    

                    {/*  Aligned End */}
                    <AsideButtons
                        text="Logout"
                        className="Logout-button"
                        Icon={DoorOpenIcon}
                        active={isActive}
                        onClick={() => HandleNavgiation('Logout', 'Logout')} />
                    
                </aside>
                    {/*  Main page goes here */}
                    <div className='main-content'>
                        <Outlet />
                    </div>
            </div>
        </>
)};

export default HomePage;
