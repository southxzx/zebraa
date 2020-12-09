import React from 'react';
import './product_review.css'
import { Container, Row, Col } from 'reactstrap';
import Star from '../../../../components/Star';

function Product_Detail_Review(props) {
    const {numberReview, numberStar} = props;
    return (
        <div className="product-detail-review">
            <Container>
                <Row>
                    <Col>
                        <div className="title-review">
                            <h2>
                                Review ({numberReview})
                            </h2>
                            

                            <Star numberStar={numberStar}/>

                            <div className="number-star">{numberStar} Stars</div>
                        </div>
                    </Col>

                </Row>
            </Container>

            <Container>
                <Row>
                    <Col>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas impedit minima aliquam, fugit excepturi necessitatibus odit voluptatem magni vero, suscipit voluptates tempore ipsa dolores labore aut voluptas sit repudiandae sequi?
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Product_Detail_Review;