import { useState } from 'react';
import '../styles/HomePage.css'
import Footer from "../components/Footer"
import clsx from 'clsx';
import Button from '../components/Button';
import AsideButtons from '../components/AsideButton';
import { HomeIcon, UserIcon, MessageSquareIcon, LucideSettings, DoorOpenIcon, TagsIcon, PhoneCallIcon } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function HomePage() {
    const [isActive, setIsActive] = useState(null);
    const navigate = useNavigate();

    function HandleNavgiation(pathname, text) {
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
                        text="Tags"
                        Icon={TagsIcon}
                        active={isActive}
                        onClick={() => HandleNavgiation('Tags', 'Tags')} />
                    
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
                    <div className='main-content'>
                        <Outlet />
                    </div>
            </div>
        </>
)};

export default HomePage;
