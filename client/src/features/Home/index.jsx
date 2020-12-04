import React, { useState } from 'react';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Login from '../Register_Login/login';
import Register from '../Register_Login/register';
import Countdown from './Countdown';
import './home.css';

function Home() {

    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);

    const toggleLoginForm = () => {
        setModalLogin(!modalLogin);
        console.log("Login",modalLogin);
    }
    const toggleRegisterForm = () => {
        setModalRegister(!modalRegister);
        console.log("Register",modalRegister);
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
                isOpen = {modalLogin}
                toggleLoginForm = {toggleLoginForm}
                toggleRegisterForm={toggleRegisterForm}
            />
            <Register
                isOpen = {modalRegister}
                toggleLoginForm = {toggleLoginForm}
                toggleRegisterForm={toggleRegisterForm}
            />
            <Countdown/>
            <Footer/>
        </div>
    )
}

export default Home
