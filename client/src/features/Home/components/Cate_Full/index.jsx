import React from 'react';
import './cate.css'
import { Container, Row, Col } from 'reactstrap';


function Cate(props) {
    return (
        <div className="cate-full">
            <section>
                <Container>
                    <div className="cate-feature">
                        <div className="cate-main-image">
                            <img src="/Assets/images/nike-logo.png">
                            </img>

                        </div>
                        <div className="cate-title">
                            <h2>Who Are Care</h2>
                        </div>

                        <span className="cate-description">
                            <p>
                             Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                            </p>
                        </span>

                    </div>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col>
                            <div className="card-full">
                                <div className="cate-card">
                                    <div className="cate-card-image">
                                        <a href="https://www.youtube.com/">
                                            <img src="/Assets/images/cat-nike-icon.png"></img>
                                        </a>
                                    </div>

                                    <div className="card-line">
                                        
                                    </div>

                                    <div className="item-title">
                                        <h4>Vans</h4>
                                        <p>(10 items)</p>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col>
                            <div className="card-full">
                                <div className="cate-card">
                                    <div className="cate-card-image">
                                        <a href="https://www.youtube.com/">
                                            <img src="/Assets/images/cat-nike-icon.png"></img>
                                        </a>
                                    </div>

                                    <div className="card-line">
                                        
                                    </div>

                                    <div className="item-title">
                                        <h4>Vans</h4>
                                        <p>(10 items)</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="card-full">
                                <div className="cate-card">
                                    <div className="cate-card-image">
                                        <a href="https://www.youtube.com/">
                                            <img src="/Assets/images/cat-nike-icon.png"></img>
                                        </a>
                                    </div>

                                    <div className="card-line">
                                        
                                    </div>

                                    <div className="item-title">
                                        <h4>Vans</h4>
                                        <p>(10 items)</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="card-full">
                                <div className="cate-card">
                                    <div className="cate-card-image">
                                        <a href="https://www.youtube.com/">
                                            <img src="/Assets/images/cat-nike-icon.png"></img>
                                        </a>
                                    </div>

                                    <div className="card-line">
                                        
                                    </div>

                                    <div className="item-title">
                                        <h4>Vans</h4>
                                        <p>(10 items)</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className="card-full">
                                <div className="cate-card">
                                    <div className="cate-card-image">
                                        <a href="https://www.youtube.com/">
                                            <img src="/Assets/images/cat-nike-icon.png"></img>
                                        </a>
                                    </div>

                                    <div className="card-line">
                                        
                                    </div>

                                    <div className="item-title">
                                        <h4>Vans</h4>
                                        <p>(10 items)</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Cate;