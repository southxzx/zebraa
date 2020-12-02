import React from 'react';
import './header.css'
import { Container, Row, Col } from 'reactstrap';


function Header(props) {
    return (
        <header>
            <Container>
                <Row>
                    <Col lg="5">
                        <nav className="desk-menu">
                            <ul>
                                <li className="active itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        Home
                                    </a>
                                </li>
                            

                            
                                <li className="itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        category
                                    </a>
                                </li>
                        

                        
                                <li className="itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        Home
                                    </a>
                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                </li>

                          

                           
                                <li className="itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        Home
                                    </a>
                                </li>
                           

                            
                            
                            </ul>
                        </nav>
                    </Col>

                    <Col lg="2">
                        <div className="logo-menu">
                            <a href="https://www.youtube.com/">
                                <img src="/Assets/images/nike-logo.png">

                                </img>
                            </a>
                        </div>
                    </Col>

                    <Col lg="5">
                        <nav className="icon">
                            <ul>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/search.png">
                                        </img>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/enter.png">
                                        </img>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/heart.png">
                                        </img>
                                    </a>
                                    <span className="count">0</span>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/shopping-cart.png">
                                        </img>

                                        
                                    </a>
                                    <span className="count">0</span>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                </Row>

            </Container>
        </header>
    );
}

export default Header;