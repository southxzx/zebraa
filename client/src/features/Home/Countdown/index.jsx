import React, { useState } from 'react';
import { Container, Row, Col,Button } from 'reactstrap';
import Card from '../../../components/Card';
import './countdown.css';

function Countdown() {

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const handleHover1 = () => {
        setIsHovered1(!isHovered1);
    }
    const handleHover2 = () => {
        setIsHovered2(!isHovered2);
    }
    const handleHover3 = () => {
        setIsHovered3(!isHovered3);
    }

    return (
        <section className="countdown">
            <Container fluid={true}>
                <div className="countdown-title">
                    <img src="Assets/images/hot-price.png" alt="deal"/>
                    <h2>Deal of the day</h2>
                </div>
                <div className="countdown-container">
                <Row>
                    <Col>
                        <div className="countdown-item" onMouseEnter={handleHover1} onMouseLeave={handleHover1}>
                            <Card
                                image="/Assets/images/product1.png"
                                hover={isHovered1 ? "true" : null}
                                active={isHovered1 ? "true" : null}
                            />
                        </div>
                    </Col>                   
                    <Col>
                        <div className="countdown-item" onMouseEnter={handleHover3} onMouseLeave={handleHover3}>
                            <Card
                                image="/Assets/images/product2.png"
                                active="true"
                                hover={isHovered3 ? "true" : null}
                            />
                        </div>
                    </Col>

                    <Col>
                        <div className="countdown-item" onMouseEnter={handleHover2} onMouseLeave={handleHover2}>
                            <Card
                                image="/Assets/images/product3.png"
                                hover={isHovered2 ? "true" : null}
                                active={isHovered2 ? "true" : null}
                            />
                        </div>
                    </Col>
                </Row>
                </div>
            </Container>
        </section>
    )
}

export default Countdown
