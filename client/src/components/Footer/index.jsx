import React from 'react';
import './footer.css';
import { Container, Row, Col,Button } from 'reactstrap';

function Footer() {
    return (
        <footer>
            <Container>
                <div className="newletter">
                    <div className="newletter-title">
                        <h3>Subscribe Newletter.</h3>
                        <label>Get e-mail updates about our latest shop and special offers.</label>
                    </div>
                    <div className="newletter-content">
                        <form className="frm-subscribe">
                            <input type="text" placeholder="Enter you email address here..." id="subscribe-input"></input>
                            <a className="btn-default btn-subscribe">
                                Subcribe
                            </a>
                        </form>
                        <div className="warning"> Error : Please enter valid email address.</div>
                    </div>
                </div>
                <div className="follow">
                    <ul className="link-follow">
                        <li><a><i className="fa fa-twitter"></i></a></li>
                        <li><a><i className="fa fa-google-plus"></i></a></li>
                        <li><a><i className="fa fa-facebook"></i></a></li>
                        <li><a><i className="fa fa-youtube"></i></a></li>
                        <li><a><i className="fa fa-instagram"></i></a></li>
                    </ul>
                </div>
                <div className="corporate-about">
                    <div className="inner">
                    <Row>
                        <Col>
                            <div class="wrapper">
                                <img src="Assets/images/bg_icon1.png" alt="Icon"/>
                                <div class="text">
                                    <h3>Free Delivery</h3>
                                    <p>am liber tempor cum soluta nobis eleifend option congue.</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div class="wrapper">
                                <img src="Assets/images/bg_icon1.png" alt="Icon"/>
                                <div class="text">
                                    <h3>Free Delivery</h3>
                                    <p>am liber tempor cum soluta nobis eleifend option congue.</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div class="wrapper">
                                <img src="Assets/images/bg_icon1.png" alt="Icon"/>
                                <div class="text">
                                    <h3>Free Delivery</h3>
                                    <p>am liber tempor cum soluta nobis eleifend option congue.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
