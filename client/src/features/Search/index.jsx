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
                            <div className="right-side">
                                <div className="vertical-divider"></div>
                                <select class="custom-select" id="inputGroupSelect01">
                                    <option selected>Sneaker</option>
                                    <option value="1">Shoes</option>
                                    <option value="2">Sandal</option>
                                    <option value="3">Socks</option>
                                </select>
                                <div className="vertical-divider"></div>
                                <select class="custom-select" id="inputGroupSelect01">
                                    <option selected>Adidas</option>
                                    <option value="1">Nikes</option>
                                    <option value="2">Balenciaga</option>
                                    <option value="3">Vans</option>
                                </select>
                            </div>
                        </div>
                        <h4>Result of "Air jordan"</h4>
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default Search
