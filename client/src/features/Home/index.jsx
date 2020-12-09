import React from 'react';
import Header from '../../components/Header';
import Cate from './components/Cate_Full';
import Prod from './components/Prod_Full';


function Home(props) {

    return (
        <div className="main-content">
            <Header/>
            <Cate/>
            <Prod/>
        </div>
    );
}

export default Home;