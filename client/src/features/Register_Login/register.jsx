import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Modal } from 'reactstrap';

function Register(props) {

    const toggleLoginForm = () => {  
        props.toggleLoginForm(); 
        props.toggleRegisterForm();     
    }
    
    const toggleRegisterForm = () => { 
        props.toggleRegisterForm();       
    }

    return (
        <div>
            <Modal size="lg" isOpen={props.isOpen}>
                <div className="row-login">
                    <div className="btn-cancel">
                        <a onClick={toggleRegisterForm}><i class="fa fa-times"></i></a>
                    </div>
                    <Col>
                        <div className="form-group login-modal">
                            <div className="content">
                                <div className="title">
                                    <img className="logo" src="Assets/images/nike-logo.png"/>
                                    <h5>BECOME A NIKE MEMBER</h5>
                                    <p>Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.</p>
                                </div>
                                <div className="login-frm">
                                    <div className="name">
                                        <div className="first-name">
                                            <input type="text" className="frm-input frm-error"  placeholder="First name"/>
                                            <span className="error-message">&nbsp;</span>
                                            
                                        </div>
                                        <div className="last-name">
                                            <input type="text" className="frm-input frm-error"  placeholder="Last name"/>
                                            <span className="error-message">&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="email">
                                        <input type="email" className="frm-input frm-error"  placeholder="Email address"/>
                                        <span className="error-message">Please enter a valid email address.</span>
                                    </div>
                                    <div className="password">
                                        <input type="password" className="frm-input frm-error"  placeholder="Password"/>
                                        <span className="error-message">Please enter a valid email address.</span>
                                    </div>
                                </div>
                                <p>By creating an account, you agree to Nike's Privacy Policy and Terms of Use.</p>
                                <a className="btn-default btn-sign-in">
                                    JOIN US
                                </a>
                                <div className="else">
                                    <label>Already a member?</label>
                                    <a onClick={toggleLoginForm}>Sign In</a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col class="login-artwork">
                        <div class="login-artwork">
                            <img src="Assets/images/register.png"/>
                        </div>
                    </Col>
                </div>
            </Modal>
        </div>
    )
}

export default Register
