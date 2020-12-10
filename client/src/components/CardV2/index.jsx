import React from 'react';
import './cardV2.css'


function CardV2(props) {
    return (
        <div className={props.active ? "item-inner active" : "item-inner" }>
            <div className="image">
                <a>
                    <img src="/Assets/images/product1.png" />
                </a>                
                <div className={props.active ? "time active-time" : "time"}>
                    <div className="day">
                        <h2>{days}</h2>
                        <span>days</span>
                    </div>
                    <div className="hour">
                        <h2>{hours}</h2>
                        <span>hours</span>
                    </div>
                    <div className="min">
                        <h2>{minutes}</h2>
                        <span>mins</span>
                    </div>
                    <div className="second">
                        <h2>{seconds}</h2>
                        <span>secs</span>
                    </div>
                </div>
            </div>
            <div className="caption">
                <div className="rating-box">
                    <img src="/Assets/images/rating5.png" />
                </div>
                <a className="product-name" href="#">Nike Air 4 (Limited)</a>
                {props.hover ?
                <div className="btn-cart">
                    <a className="btn-default btn-add-to-cart">
                        Add to cart
                    </a>
                </div> : 
                <div className="price-box">
                    <p className="new">$75.00</p>
                    <p className="old">$45.00</p>
                </div>}
            </div>
        </div>
    )
}

export default CardV2;