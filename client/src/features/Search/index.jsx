import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Breadscrumbs';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './search.css';

function Search() {
    return (
        <div>
            <Header/>
            <Breadcrumbs
                title="Search - Adidas Basic"
                linkBack="Home"
                active="Search"
            />
            <div className="search-section">
                <Container>
                    <div className="search-content">
                        <div className="search-form">
                            <div className="left-side">
                                <img src="/Assets/images/search.png"/>
                                <form>                                   
                                    <input className="search-input" type="search" placeholder="Search"/>                                            
                                </form>
                            </div>
                            <nav className="sreach-nav">

                            </nav>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default Search
