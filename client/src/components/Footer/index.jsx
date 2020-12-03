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
                        <div class="warning"> Error : Please enter valid email address.</div>
                    </div>
                </div>
                <div class="follow">
                    <ul class="link-follow">
                        <li><a><i class="fa fa-twitter"></i></a></li>
                        <li><a><i class="fa fa-google-plus"></i></a></li>
                        <li><a><i class="fa fa-facebook"></i></a></li>
                        <li><a><i class="fa fa-youtube"></i></a></li>
                        <li><a><i class="fa fa-instagram"></i></a></li>
                    </ul>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
