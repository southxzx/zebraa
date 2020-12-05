import React from 'react';
import './miniCart.css';



function MiniCart(props) {

    return (
        <div ref={props.wrapperRef} className="miniCart">
            <div className="top-content">
                <div className="row-total">
                    <div className="quantity">
                        <h6>Total: </h6>
                        <h6>$96.00</h6>
                    </div>
                    <div className="total">
                        <h6>Items:</h6>
                        <h6>3 </h6>
                    </div>
                </div>
            </div>
            <div className="middle-content">
                <div className="inner">
                    <div className="item">
                        <div className="image">
                            <img src="Assets/images/product1.png" alt="Product"></img>
                        </div>
                        <div className="info">
                            <p className="name">Vans Oldskool</p>
                            <p>$30.00</p>
                            <p>Quantity: <b>1</b></p>
                        </div>
                        <a href="#" className="icon-delete"><i className="fa fa-trash-o"></i></a>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src="Assets/images/product1.png" alt="Product"></img>
                        </div>
                        <div className="info">
                            <p className="name">Vans Oldskool</p>
                            <p>$30.00</p>
                            <p>Quantity: <b>1</b></p>
                        </div>
                        <a href="#" className="icon-delete"><i className="fa fa-trash-o"></i></a>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src="Assets/images/product1.png" alt="Product"></img>
                        </div>
                        <div className="info">
                            <p className="name">Vans Oldskool</p>
                            <p>$30.00</p>
                            <p>Quantity: <b>1</b></p>
                        </div>
                        <a href="#" className="icon-delete"><i className="fa fa-trash-o"></i></a>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src="Assets/images/product1.png" alt="Product"></img>
                        </div>
                        <div className="info">
                            <p className="name">Vans Oldskool</p>
                            <p>$30.00</p>
                            <p>Quantity: <b>1</b></p>
                        </div>
                        <a href="#" className="icon-delete"><i className="fa fa-trash-o"></i></a>
                    </div>               
                    <div className="item">
                        <div className="image">
                            <img src="Assets/images/product1.png" alt="Product"></img>
                        </div>
                        <div className="info">
                            <p className="name">Vans Oldskool</p>
                            <p>$30.00</p>
                            <p>Quantity: <b>1</b></p>
                        </div>
                        <a href="#" className="icon-delete"><i className="fa fa-trash-o"></i></a>
                    </div>
                    <div className="item">
                        <div className="image">
                            <img src="Assets/images/product1.png" alt="Product"></img>
                        </div>
                        <div className="info">
                            <p className="name">Vans Oldskool</p>
                            <p>$30.00</p>
                            <p>Quantity: <b>1</b></p>
                        </div>
                        <a href="#" className="icon-delete"><i className="fa fa-trash-o"></i></a>
                    </div>
                </div>
            </div>
            <div className="bottom-content">
                <a className="btn-default btn-edit">
                    Edit Cart
                </a>
                <a className="btn-default btn-checkout">
                    Checkout
                </a>
            </div>
        </div>
    )
}

export default MiniCart
