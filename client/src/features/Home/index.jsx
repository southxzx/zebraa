import React from 'react';
import Header from '../../components/Header';
import Cate from './components/Cate_Full';


function Home(props) {

    return (
        <div className="main-content">
            <Header/>
            <Cate/>
        </div>
    );
}

export default Home;