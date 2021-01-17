import React from 'react';
import './prod.css';
import { Container, Row, Col } from 'reactstrap';


function Prod(props) {
    return (
        <div className="product-full">
            <Container>
                <Row>
                    <Col sm="12" md="4">
                        <div className="item">
                            <div className="item-inner">
                                <div className="item-image">
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/coconut.jpg">
                                        </img>
                                    </a>
                                </div>

                                <div className="caption">
                                    <div className="rating">
                                        <img src="/Assets/images/rating2.png"></img>
                                    </div>

                                    <h4 className="product-name">
                                        <a href="https://www.youtube.com/">
                                            Radian Tee
                                        </a>
                                    </h4>

                                    <div className="product-price">
                                        <p>$142</p>
                                    </div>

                                    <div className="product-cart">
                                        <a href="https://www.youtube.com/">
                                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>       
                    </Col>

                    <Col sm="12" md="4">
                        <div className="item">
                            <div className="item-inner">
                                <div className="item-image">
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/coconut.jpg">
                                        </img>
                                    </a>
                                </div>

                                <div className="caption">
                                    <div className="rating">
                                        <img src="/Assets/images/rating2.png"></img>
                                    </div>

                                    <h4 className="product-name">
                                        <a href="https://www.youtube.com/">
                                            Radian Tee
                                        </a>
                                    </h4>

                                    <div className="product-price">
                                        <p>$142</p>
                                    </div>

                                    <div className="product-cart">
                                        <a href="https://www.youtube.com/">
                                            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>       
                    </Col>

                    <Col sm="12" md="4">
                                
                    </Col>

                </Row>
            </Container>
        </div>
    );
}

export default Prod;