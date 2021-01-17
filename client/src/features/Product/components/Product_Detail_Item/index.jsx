import React, { useState } from 'react';
import './product_item.css'
// import './product_item.js'
import { Container, Row, Col, Form } from 'reactstrap';
import Product_Detail_Image from '../Product_Detail_Image';
import Star from '../../../../components/Star';
import { useEffect} from 'react';
import { useParams,useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import handleContentLoaded from './product_item';
import cartApi from '../../../../api/cartApi';
import { useDispatch } from 'react-redux';
import { AddItem } from '../../../../utils/cart';

function Product_Detail_Item(props) {

    const { slug,_idProduct,_idColorProduct } = useParams(); // id = useParams().id
    const history = useHistory();

    const {productSizes,productName,productImages,productColor,productImagesColor,productIdColor,
        productPrice,productPriceColor,productBrand,productDes,productReview,productLove} = props

    // REtrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);

    //count
    const [count,setCount] = useState(1);
    const [productQuantity,setProductQuantity] = useState(1);
    function increase(){
        setCount(count+1);
    }
    function decrease(){
        if(count >= 2){
            setCount(count-1);
        }
    }

    let data = {
        idUser : user ? user._id : null,
        idProduct: "",
        idSize: "",
        idColorProduct: "",
        quantity: 0
    }

    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        // Nếu có đăng nhập mới add SP được
        if (data.idUser){

            // Nếu thêm số lượng nhiều hơn số lượng hiện có của product
            if (count <= productQuantity){
                data.idProduct = _idProduct;
                data.idSize = _idSize;
                data.idColorProduct = _idColorProduct;
                data.quantity = count;
        
                // console.log(data);
        
    
                const addToCart  = async () => {
                    await cartApi.add(data);
                    AddItem(data);
                }
                addToCart();
            }
            else{
                toast.error("Sorry, there's not enough stock available");
            }
        }
        else{
            toast.error("Login is required for add to cart!");
        }
    }

    //color
    const [color,setColor] = useState([]);

    //Size
    const [size, setSize] = useState([]);

    //_idSize
    const [_idSize,set_IdSize] = useState();
    
    //price
    const [price,setPrice] = useState(0);

    //review
    const [review,setReview] = useState([]);

    //star
    const starAverage = review ?  parseFloat(review.reduce((accumulator, currentValue, currentIndex,array) =>
            accumulator + currentValue.rating/array.length
        ,0)).toFixed(1) : null ;
    //console.log(starAverage);
    //countReview
    const countReview = review ? review.length : null;

    // images
    const [imageList,setImageList] = useState([]);

    useEffect(()=>{

        setImageList(productImages);
        setColor(productColor);
        setPrice(productPrice);
        setReview(productReview);
        setSize(productSizes);
        handleContentLoaded.zoom();

    },[productImages])

    const ItemClicked = (item,key,type) => {

        if (type === 'size'){

            // Lưu state qty của size để check add to cart
            setProductQuantity(item.quantity);

            document.getElementById('quantity').innerHTML = `(${item.quantity} available products in size ${item.size.name})`;

            var size = document.getElementsByClassName("size");
            
            // Set all size to be grey 
            productSizes.map((value,key)=>{
                size[key].style.backgroundColor = "#fff";
                size[key].style.color = "#000";
            })
            // Set the size we need to be blue 
            size[key].style.backgroundColor = "rgb(255, 94, 0)";
            size[key].style.color = "#fff";

            // Set _idSize
            set_IdSize(productSizes[key]._id);
        }
    }
    
    //get image by color
    function imageListByColor(item){
        
        for(let i = 0 ; i < color.length; i++){
            if(item == color[i]){
                setImageList(productImagesColor[`${color[i]}`][0]);
                console.log(productImagesColor[`${color[i]}`][0]);
                
                // get price by color
                setPrice(productPriceColor[`${color[i]}`]);
                console.log(productPriceColor[`${color[i]}`]);

                // change URL by _idColorProduct
                history.push(`/products/${slug}/${_idProduct}/${productIdColor[`${color[i]}`]}`)
  
            }
        }
    }

    //Love
    const [love, setLove] = useState(productLove)

    function checkLove(){
        setLove(productLove => !productLove)
    }

    // console.log(productSizes);
    // console.log(_idSize);

    return (
        <div className="product-detail-item">
            <Container>
                <Row>
                    <ToastContainer/>
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
                            <Star numberStar={starAverage}/>

                            <a href="https://www.youtube.com/">
                                {countReview} Reviews
                            </a>
                        </div>

                        <div className ="product-price">
                            <span className="price">{price}$</span>
                            <span className="old-price">299$</span>
                        </div>



                        <div className="product-info">
                            <ul className ="list-info">
                                <li>
                                    <strong>Brands:</strong>
                                    <a href="https://www.youtube.com/">
                                        <span>
                                            {productBrand}
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <strong>Product Code:</strong>
                                    <span className="cate">
                                        { _idColorProduct}
                                    </span>
                                </li>

                                <li>
                                    <strong>Availability: </strong>
                                    <span className="avail">
                                        {` In Stock`}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="product-des">
                            <strong>Descriptions: </strong>
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
                                                <Row>
                                                {
                                                    color.map((item,key) => (
                                                        // <span onClick={()=>imageListByColor(item)} className="color" color={item} key={key}></span>
                                                        <Col md="3" key={key}>
                                                            <div onClick={() => imageListByColor(item)} className="img-color">
                                                                <img src={item} alt="Image Color" />
                                                            </div>
                                                        </Col>
                                                    ))
                                                }
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col sm="12" md="6" className="size-item">
                                        <div className="product-size">
                                            <div className="size-name">
                                                Size
                                                <span id="quantity" className="quantity-size"></span>
                                            </div>

                                            <div className="item-size">
                                                <Row>
                                                {
                                                    size ? size.map((item,key) => (
                                                        <Col md="2" key={key}>
                                                            <span
                                                                style={item.quantity <= 0 ? { "pointerEvents": "none", "opacity": 0.3 } : { backgroundColor: "#fff" }}
                                                                className="size"
                                                                onClick={() => ItemClicked(item, key, "size")}
                                                                key={key}>{item.size.name}
                                                            </span>
                                                        </Col>
                                                    ))
                                                    : null
                                                }
                                                </Row>
                                            </div>
                                            
                                        </div>
                                    </Col>
                                    
                                </Row>
                            </Container>


                            <Container>
                                <Row>
                                    <Col sm="12" md="6" className="size-item">
                                        <div className="quantity">
                                            <div className="quantity-name">
                                                Quantity
                                            </div>
                                            <div className="number">
                                                <div className="btn btn-quantity decrease" onClick={()=>decrease()}>-</div>
                                                <input className= "num" readOnly type="text" value={count} />
                                                <div className="btn btn-quantity increase" onClick={()=>increase()}>+</div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col sm="12" md="6" className="size-item">
                                        <div className="add-to-cart">
                                            <button type="submit" className="btn-default btn-subscribe" >Add To Cart</button>
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