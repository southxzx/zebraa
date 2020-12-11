import React from 'react';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadscrumbs';
import Footer from '../../components/Footer';
import { Container, Row, Col } from 'reactstrap';
import './profile.css';

function Profile() {
    return (
        <div>
            <Header/>
            <Breadcrumbs
                title="Account Setting"
                linkBack="Home"
                active="General"
            />
            <div className="profile-section">
                <Container>
                    <Row>
                        <Col lg="3">
                            <ul className="profile-menu nav-pills">
                                <li><a className="nav-link active"><i className="fa fa-cog"></i>General</a></li>
                                <li><a className="nav-link"><i class="fa fa-lock"></i>Change Password</a></li>
                            </ul>
                        </Col>
                        <Col lg="9">
                            <div className="card">
                                <div className="card-content">
                                    <div className="tab-pane">
                                        <div className="media">
                                            <img src="Assets/images/user.jpg"></img>
                                            <div className="media-body">
                                                <div className="flex-column">
                                                    <a className="btn-default btn-upload">Upload new photo</a>
                                                    <a className="btn-default btn-reset">Reset</a>
                                                </div>
                                                <span>Allowed JPG, GIF or PNG. Max size of 800kB</span>
                                            </div>
                                        </div>
                                        <form className="form-content">
                                            <div class="form-row form-group">
                                                <div class="col">
                                                <label for="exampleFormControlInput1">First Name</label>
                                                    <input type="text" class="form-control" placeholder="First name" />
                                                </div>
                                                <div class="col">
                                                <label for="exampleFormControlInput1">Last Name</label>
                                                    <input type="text" class="form-control" placeholder="Last name" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleFormControlInput1">Email address</label>
                                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Your email address..."/>
                                            </div>
                                            <div class="form-group warning">
                                                <p>Your email is not confirmed. Please check your inbox.</p>
                                                <a href="#">Resend confirmation</a>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleFormControlInput1">Address</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Your delivery address..."/>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleFormControlInput1">Phone Number</label>
                                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Your phone number..."/>
                                            </div>
                                            <div class="flex-column">
                                                <button class="btn btn-primary" type="submit">Save changes</button>
                                                <button class="btn btn-secondary" type="submit">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile
