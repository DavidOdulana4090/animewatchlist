import { useState } from 'react';
import '../styles/HomePage.css'
import Footer from "../components/Footer"

function HomePage(props) {
    const [currentname, setcurrentname] = useState("nobody")


    return (
    
        <>
            <h1> Hello my name is {currentname} </h1>
            <button onClick={() => setcurrentname("david")}> button </button>
            <Footer/>
        </>
)};

export default HomePage;
