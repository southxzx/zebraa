import React from 'react';
import { Container, Row, Col,Button } from 'reactstrap';
import './countdown.css';
function Countdown() {
    return (
        <section className="countdown">
            <Container>
                <div className="countdown-title">
                    <h2>Deal of the day</h2>
                </div>
                <div className="countdown-container">
                <Row>
                        <Col lg={4}>
                            <div className="countdown-item">
                                <div className="item-inner">
                                    <div className="image">
                                        <a>
                                            <img src="Assets/images/product1.jpg"/>
                                        </a>
                                        <div className="time">
                                            <div className="day">
                                                <h2>07</h2>
                                                <span>days</span>
                                            </div>
                                            <div className="hour">
                                                <h2>12</h2>
                                                <span>hours</span>
                                            </div>
                                            <div className="min">
                                                <h2>45</h2>
                                                <span>mins</span>
                                            </div>
                                            <div className="second">
                                                <h2>12</h2>
                                                <span>secs</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="caption">
                                        <div className="rating-box">
                                            <img src="Assets/images/rating.png"/>
                                        </div>
                                        <a className="product-name" href="#">Nike Air 4</a>
                                        <div className="price-box">
                                            <p className="new">$75.00</p>
                                            <p className="old">$45.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>

                        </Col>
                        <Col lg={4}>

                        </Col>
                    
                </Row>
                </div>
            </Container>
        </section>
    )
}

export default Countdown
