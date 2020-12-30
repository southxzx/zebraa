import React, { useState,useStateIfMounted } from 'react';
import './product_item.css'
// import './product_item.js'
import { Container, Row, Col, Form } from 'reactstrap';
import Product_Detail_Image from '../Product_Detail_Image';
import Star from '../../../../components/Star';
import { useEffect } from 'react';

function Product_Detail_Item(props) {

    const {productName,countReview,productImages,productColor,productImagesColor,productPrice,productBrand,productDes,productLove,numberStar} = props
    //console.log(productImages);

    
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
    const [color,setColor] = useState([]);
    console.log(productColor);
    
    // images
    const [imageList,setImageList] = useState([]);
    useEffect(()=>{

        setImageList(productImages);
        setColor(productColor);
        handleContentLoaded();

    },[productImages])

    console.log(imageList);


    //get image by color
    function imageListByColor(item){
        
        for(let i = 0 ; i < color.length; i++){
            if(item == color[i]){
                setImageList(productImagesColor[`${color[i]}`][0]);
                console.log(productImagesColor[`${color[i]}`][0]);
                
            }
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

    //Handle js
    const handleContentLoaded = () =>{
            ///Item-mini
        const items = document.querySelectorAll('.item');
        function changeItem(){
            items.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        }
        if(items == null) return
        else{
            items.forEach(item => item.addEventListener('click', changeItem));
        }
            

        ///Size
        const sizes = document.querySelectorAll('.size');
        function changeSize(){
            sizes.forEach(size => size.classList.remove('active'));
            this.classList.add('active');
        }
        if(sizes == null) return
        else{
            sizes.forEach(size => size.addEventListener('click', changeSize));
        }
            

        ///color
        const shoes = document.querySelectorAll('.shoe');
        const colors = document.querySelectorAll('.color');

        function changeColor(){
            //let color = this.getAttribute('color');
            //let shoe = document.querySelector(`.shoe[color="${color}"]`);

            colors.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            items.forEach(item => item.classList.remove('active'));//remove item border
            //items[0].classList.add('active');
            // shoes.forEach(s => s.classList.remove('show'));
            // shoe.classList.add('show');
        }
        if(colors == null) return
        else{
            colors.forEach(c => c.addEventListener('click', changeColor));
        }
            



        ///zoom
        const mainContainer = document.querySelector('.thumbnail');
        const rect = document.querySelector('.rect');
        const zoom = document.querySelector('.zoom');

        //Moving the selector box
        function move(event) {
            //Width and height of main img
            let w1 = mainContainer.offsetWidth;
            let h1 = mainContainer.offsetHeight;

            //Zoom ratio
            let ratio = 2;
            //Zoom window background-image size
            zoom.style.backgroundSize = w1 * ratio + 'px' + h1 * ratio + 'px';

            //Width and height of selector
            let w2 = rect.offsetWidth;
            let h2 = rect.offsetHeight;

            //Zoom window width and height
            zoom.style.width = w2 * ratio + 'px';
            zoom.style.height = h2 * ratio + 'px';


            //Half of selector show outside the main img
            w2 = w2/2;
            h2 = h2/2;

            //Coordinates of mouse cursor
            let x,y,xx,yy;
            //How far is the mouse cursor from the element
            //x how far from the cursor left of element
            x = event.offsetX;
            //y how far from the cursor top of element
            y = event.offsetY;

            xx = x - w2;
            yy = y - h2;
            //Keeping the selector inside the main img
            if(x < w2){ // left of img
                x = w2;
                //Matching the zoom window with the selector
                xx = 0;
            }
            if(x > w1 - w2){ // right of img
                x = w1 - w2;
                xx = x - w2;
            }
            if(y < h2){ // top of img
                y = h2;
                yy = 0;
            }
            if(y > h1 - h2){ // bottom of img
                y = h1 - h2;

            }

            xx = xx * ratio;
            yy = yy * ratio;

            //Changing the position of the selector
            rect.style.left = x + 'px';
            rect.style.top = y + 'px';

            let t = '-' + xx + 'px' + " " + '-' + yy + 'px';
    
            //Changing background image of zoom
            zoom.style.backgroundPosition = t;
        }

        if(mainContainer == null) return;
        else{
            mainContainer.addEventListener('mousemove',move);
        }
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