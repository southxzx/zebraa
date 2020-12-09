import React, { useState } from 'react';
import './product_item.css'
import './product_item.js'
import { Container, Row, Col, Form } from 'reactstrap';
import Product_Detail_Image from '../Product_Detail_Image';
import Star from '../../../../components/Star';

function Product_Detail_Item(props) {

    const {productName,countReview,productPrice,productBrand,productDes,productLove,numberStar} = props

    //count
    const [count,setCount] = useState(1);
    const [value,setValue] = useState(1);
    function increase(){
        setCount(count+1);
    }
    function decrease(){
        if(count >= 2){
            setCount(count-1);
        }
    }
    function handleChange(event) {
        setValue({value: event.target.value});
    }
    
    function handleSubmit(event) {
        
        event.preventDefault();
    }

    //color
    const [color,setColor] = useState([
        "white",
        "blue",
        "green",
        "orange",
        "black"
    ]);

    const [imageList,setImageList] = useState([
        "/Assets/images/nike1-detail.jpg",
        "/Assets/images/nike1-0-detail.jpg",
        "/Assets/images/nike1-1-detail.jpg",
        "/Assets/images/nike1-2-detail.jpg",
        "/Assets/images/nike1-3-detail.jpg"
    ]);

    //get image by color
    function imageListByColor(color){
        if(color == "white"){
            setImageList([
                "/Assets/images/nike1-detail.jpg",
                "/Assets/images/nike1-0-detail.jpg",
                "/Assets/images/nike1-1-detail.jpg",
                "/Assets/images/nike1-2-detail.jpg",
                "/Assets/images/nike1-3-detail.jpg"
            ]);
        }

        if(color == "black"){
            setImageList([
                "/Assets/images/nike2-detail.jpg",
                "/Assets/images/nike2-0-detail.jpg",
                "/Assets/images/nike2-1-detail.jpg",
                "/Assets/images/nike2-2-detail.jpg",
                "/Assets/images/nike2-3-detail.jpg"
            ]);
        }
    }

    //Size
    const [size, setSize] = useState([
        7,8,9,10,11
    ])

    //Love
    const [love, setLove] = useState(productLove)

    function checkLove(){
        setLove(productLove => !productLove)
    }

    return (
        <div className="product-detail-item">
            <Container>
                <Row>
                    <Product_Detail_Image imageList={imageList}/>

                    <Col sm="7">
                        <div className="product-name">
                            <h1 className="name">
                                {productName}
                            </h1>

                            <div className="new">
                                <span onClick={()=>checkLove()} className={love ? 'active' : ''}>
                                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>

                        <div className="ratings">
                            <Star numberStar={numberStar}/>

                            <a href="https://www.youtube.com/">
                                {countReview} Reviews
                            </a>

                            <a href="https://www.youtube.com/">
                                Write A Review
                            </a>
                        </div>

                        <div className ="product-price">
                            <span className="price">{productPrice}</span>
                        </div>



                        <div className="product-info">
                            <ul className ="list-info">
                                <li>
                                    Brands
                                    <a href="https://www.youtube.com/">
                                        <span>
                                            {productBrand}
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    Product Code:
                                    <span className="cate">
                                        Shoe
                                    </span>
                                </li>

                                <li>
                                    Availability: 
                                    <span className="avail">
                                        In Stock
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="product-des">
                            
                            {productDes}
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <Container>
                                <Row>
                                    
                                    <Col sm="12" md="6" className="color-item">
                                        <div className="product-color">
                                            <div className="color-name">
                                                Color
                                            </div>

                                            <div className="item-color">
                                                {
                                                    color.map((item,key) => (
                                                        <span onClick={()=>imageListByColor(item)} className="color" color={item} key={key}></span>
                                                    ))
                                                }
                                            </div>

                                        </div>

                                    </Col>

                                    <Col sm="12" md="6" className="size-item">
                                        <div className="product-size">
                                            <div className="size-name">
                                                Size
                                            </div>

                                            <div className="item-size">
                                                {
                                                    size.map((item,key) => (
                                                        <span className="size" key={key}>{item}</span>
                                                    ))
                                                }
                                            </div>
                                    
                                        </div>
                                    </Col>
                                    
                                </Row>
                            </Container>


                            <Container>
                                <Row>
                                    <Col sm="12" md="6" className="size-item">
                                        <div className="quantity">
                                            <div className="number">
                                                <h4>Qty</h4>
                                                <div className="btn btn-outline-primary decrease" onClick={()=>decrease()}>-</div>
                                                <input className= "num" type="text" value={count} onChange={handleChange}/>
                                                <div className="btn btn-outline-primary increase" onClick={()=>increase()}>+</div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col sm="12" md="6" className="size-item">
                                        <div className="add-to-cart">
                                            <button type="submit" className="add btn" >Add To Cart</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>


                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Product_Detail_Item;