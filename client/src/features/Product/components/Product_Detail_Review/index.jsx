import React, { useEffect,useState } from 'react';
import './product_review.css'
import { Container, Row, Col } from 'reactstrap';
import Star from '../../../../components/Star';
import { Table } from 'reactstrap';

function Product_Detail_Review(props) {
    const {productReview} = props;

    useEffect(() => {
        setReview(productReview);
    },[productReview]);

    //review
    const [review,setReview] = useState([]);

    //star
    const starAverage = review ?  parseFloat(review.reduce((accumulator, currentValue, currentIndex,array) =>
            accumulator + currentValue.rating/array.length
        ,0)).toFixed(1) : null ;
    
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
                    {review ? review.reverse().map((value,key) =>(
                        <Table bordered key={key}>
                            <thead>
                                <tr>
                                    <th>
                                        <Row>
                                            <Col>
                                                <div className="user-info">
                                                    <div className="avatar-user">
                                                        <img src={value.user.avatar ? value.user.avatar : '/Assets/images/user.jpg'}/>
                                                    </div>
                                                    <p className="name-user">
                                                        {value.user.name}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="date">
                                                    {value.createdAt.slice(0,19).replace("T"," / ")}
                                                </div>
                                            </Col>
                                        </Row>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="star-review">
                                            <Star
                                                numberStar = {value.rating}
                                            />
                                        </div>
                                        {value.comment}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    )) : null}
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Product_Detail_Review;