import React, { useState } from 'react';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Login from '../Register_Login/login';
import Countdown from './Countdown';
import './home.css';

function Home() {

    const [modal, setModal] = useState(false);

    const toggleLoginForm = () => {
        setModal(!modal);
        console.log(modal);
    }
    return (
        <div>
            <div className="header-wrapper">
                <Header
                    toggleLoginForm = {toggleLoginForm}
                />
                <Banner/>
            </div>
            <Login
                isOpen = {modal}
                toggleLoginForm = {toggleLoginForm}
            />
            <Countdown/>
            <Footer/>
        </div>
    )
}

export default Home
