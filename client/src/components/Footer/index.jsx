import React from 'react';
import './footer.css';
import { Container, Row, Col } from 'reactstrap';

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
                            <a className="btn-default btn-subscribe" >
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
                            <div className="wrapper">
                                <img src="/Assets/images/bg_icon1.png" alt="Icon"/>
                                <div className="text">
                                    <h3>Free Delivery</h3>
                                    <p>am liber tempor cum soluta nobis eleifend option congue.</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="wrapper">
                                <img src="/Assets/images/bg_icon2.png" alt="Icon"/>
                                <div className="text">
                                    <h3>Money Guarantee</h3>
                                    <p>am liber tempor cum soluta nobis eleifend option congue.</p>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="wrapper">
                                <img src="/Assets/images/bg_icon3.png" alt="Icon"/>
                                <div className="text">
                                    <h3>Online Support</h3>
                                    <p>am liber tempor cum soluta nobis eleifend option congue.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    </div>
                </div>
                <div className="footer-top">
                    <Row>
                        <Col lg="5">
                            <a className="logo"><img src="/Assets/images/nike-logo.png" alt="Logo"/></a>
                            <p className="des">We are a team of designers and developers that create high quality Magento, Prestashop, Opencart.</p>
                            <ul className="contact">
                                <li className="address">
                                    <i className="fa fa-map-marker"></i>
                                    <p>Address : No 40 Baria Sreet 133/2, NewYork, USA.</p>
                                </li>
                                <li className="phone">
                                    <i className="fa fa-phone"></i>
                                    <p>Phone: +(1234) 567 890</p>
                                </li>
                                <li className="mail">
                                    <i className="fa fa-envelope-o"></i>
                                    <p>danieldang@gmail.com</p>
                                </li>
                            </ul>
                        </Col>
                        <Col lg="2">
                            <h5>Information</h5>
                            <ul className="information">
                                <li><a>About Us</a></li>
                                <li><a>Delivery Information</a></li>
                                <li><a>Privacy Policy</a></li>
                                <li><a>Term, Conditions</a></li>
                                <li><a>Brands</a></li>
                                <li><a>Gift Certificate</a></li>
                            </ul>
                        </Col>
                        <Col lg="2">
                            <h5>Customer Service</h5>
                            <ul className="information">
                                <li><a>Contact Us</a></li>
                                <li><a>Returns</a></li>
                                <li><a>Site Map</a></li>
                                <li><a>Affiliate</a></li>
                                <li><a>Specials</a></li>
                                <li><a>Newletters</a></li>
                            </ul>
                        </Col>
                        <Col lg="3">
                            <h5>Instagram</h5>
                            <ul className="information">
                                <li>Server not found</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div className="footer-bottom">
                    <div className="copyright">
                        <p>Copyright © 2018 PlazaThemes. All Right Reserved.</p>
                    </div>
                    <div className="payment">
                        <img src="/Assets/images/payment.png" alt="Payment"/>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
