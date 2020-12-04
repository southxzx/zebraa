import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import './register_login.css';
import { Container, Row, Col } from 'reactstrap';

function Login(props) {
    const toggleLoginForm = () => {  
        props.toggleLoginForm();     
    }
    return (
        <div>
            <Modal size="lg" isOpen={props.isOpen}>
                <div className="row-login">
                    <div className="btn-cancel">
                        <a onClick={toggleLoginForm}><i class="fa fa-times"></i></a>
                    </div>
                    <Col>
                        <div className="form-group login-modal">
                            <div className="content">
                                <div className="title">
                                    <img className="logo" src="Assets/images/nike-logo.png"/>
                                    <h5>Your account for everything nike</h5>
                                </div>
                                <div className="login-with">
                                    <p>With your social network</p>
                                    <a class="btn-default btn-login btn-google">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                    <a class="btn-default btn-login btn-facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                    <a class="btn-default btn-login btn-twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                    <p className="or">or</p>
                                </div>
                                <div className="login-frm">
                                    <div className="email">
                                        <input type="email" className="frm-input frm-error"  placeholder="Email address"/>
                                        <span className="error-message">Please enter a valid email address.</span>
                                    </div>
                                    <div className="password">
                                        <input type="password" className="frm-input frm-error"  placeholder="Password"/>
                                        <span className="error-message">Please enter a valid email address.</span>
                                    </div>
                                </div>
                                <div className="row-forgot">
                                    <div className="remember">
                                        <input type="checkbox"/>
                                        <label>Remember me</label>
                                    </div>
                                    <p>Forgot your password?</p>
                                </div>
                                <a className="btn-default btn-sign-in">
                                    SIGN IN
                                </a>
                                <div className="else">
                                    <label>Not a member?</label>
                                    <a>Sign Up</a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col class="login-artwork">
                        <div class="login-artwork">
                            <img src="Assets/images/login.png"/>
                        </div>
                    </Col>
                </div>
            </Modal>
        </div>
    )
}

export default Login
