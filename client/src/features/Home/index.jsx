import React, { useState } from 'react';
import BackToTop from '../../components/BackToTop';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Countdown from './Countdown';
import './home.css';

function Home() {

    return (
        <div>
            <div className="header-wrapper">
                <Header/>
                <Banner/>
            </div>
            <Countdown/>
            <Footer/>
            <BackToTop/>
        </div>
    )
}

export default Home
