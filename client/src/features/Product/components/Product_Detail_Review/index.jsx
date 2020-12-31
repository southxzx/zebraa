import React, { useEffect,useState } from 'react';
import './product_review.css'
import { Container, Row, Col } from 'reactstrap';
import Star from '../../../../components/Star';

function Product_Detail_Review(props) {
    const {productReview} = props;

    useEffect(() => {
        setReview(productReview);
    },[productReview]);

    //review
    const [review,setReview] = useState([]);

    //star
    const starAverage = review ?  review.reduce((accumulator, currentValue, currentIndex,array) =>
            accumulator + currentValue.rating/array.length
        ,0) : null ;
    
    //countReview
    const countReview = review ? review.length : null;

    return (
        <div className="product-detail-review">
            <Container>
                <Row>
                    <Col>
                        <div className="title-review">
                            <h2>
                                Review ({countReview })
                            </h2>
                            

                            <Star numberStar={starAverage}/>

                            <div className="number-star">{starAverage} Stars</div>
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