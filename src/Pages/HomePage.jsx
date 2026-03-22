import { useState } from 'react';
import '../styles/HomePage.css'
import Footer from "../components/Footer"
import clsx from 'clsx';
import Button from '../components/Button';
import AsideButtons from '../components/AsideButton';
import { HomeIcon, UserIcon, MessageSquareIcon, LucideSettings, DoorOpenIcon, TagsIcon, PhoneCallIcon } from 'lucide-react';

function HomePage(props) {
    const [username, setUsername] = useState(null);
    const [isActive, setIsActive] = useState(null);


    return (
        <>
            <aside className={clsx('aside-styling')}>
                <br></br>
                <AsideButtons text="Dashboard" Icon={HomeIcon} active={isActive} onClick={setIsActive}/> 
                <AsideButtons text="Profile" Icon={UserIcon} active={isActive} onClick={setIsActive}/>
                <AsideButtons text="Inbox" Icon={MessageSquareIcon} active={isActive} onClick={setIsActive}/>
                <AsideButtons text="Contact Me" Icon={PhoneCallIcon} active={isActive} onClick={setIsActive}/>
                <AsideButtons text="Tags" Icon={TagsIcon} active={isActive} onClick={setIsActive}/>
                <AsideButtons text="Settings" Icon={LucideSettings} active={isActive} onClick={setIsActive}/>
                

                {/*  Aligned End */}
                <AsideButtons text="Logout" className="Logout-button" Icon={DoorOpenIcon} active={isActive} onClick={setIsActive} />
            </aside>
        </>
)};

export default HomePage;
