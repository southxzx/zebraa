import React, { useState } from 'react';
import BackToTop from '../../components/BackToTop';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Cate from './components/Cate_Full';
import Prod from './components/Prod_Full';
import Countdown from './Countdown';
import './home.css';

function Home() {

    return (
        <div>
            <Header/>
            <Banner/>
            <Cate/>
            <Countdown/>
            {/* <Prod/> */}
            <Footer/>
        </div>
    )
}

export default Home
