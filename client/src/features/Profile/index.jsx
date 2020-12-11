import React from 'react';
import Header from '../../components/Header';
import Breadcrumbs from '../../components/Breadscrumbs';
import Footer from '../../components/Footer';
import { Container, Row, Col } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText} from 'reactstrap';
import './profile.css';
import classnames from 'classnames';
import { useState } from 'react';
import General from './General';
import ChangePassword from './ChangePassword';
import History from './History';

function Profile() {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Header/>
            <Breadcrumbs
                title="Account Setting"
                linkBack="Home"
                active="General"
            />
            <div className="profile-section">
                <Container className="profile-container">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                >
                                    <h4>General</h4>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    <h4>Change Password</h4>
                            </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: activeTab === '3' })}
                                    onClick={() => { toggle('3'); }}
                                >
                                    <h4>History</h4>
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col lg="12">
                                        <General/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col lg="12">
                                        <ChangePassword/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col lg="12">
                                        <History/>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default Profile
