import React, { useState } from 'react';
import './cardV2.css'
import Star from '../Star';


function CardV2(props) {

    const {productName,productImage,productPrice,numberStar} = props;

    const [isHovered, setIsHovered1] = useState(false);
    const handleHover = () => {
        setIsHovered1(!isHovered);
    }
    return (
        <div onMouseEnter={handleHover} onMouseLeave={handleHover} className={isHovered ? "item-inner item-inner-active" : "item-inner" }>
            <div className="image">
                <a>
                    <img src={productImage} />
                </a>                
            </div>
            <div className="caption">
                <div className="rating-box">
                    <Star numberStar={numberStar}/>
                </div>
                <a className="product-name" href="#">{productName}</a>
                {isHovered ?
                <div className="btn-cart">
                    <a className="btn-default btn-add-to-cart">
                        Add to cart
                    </a>
                </div> : 
                <div className="price-box">
                    <p className="new">${productPrice}</p>
                    <p className="old">$45.00</p>
                </div>}
            </div>
        </div>
    )
}

export default CardV2;