import React from 'react';
import { useEffect } from 'react';
import './miniCart.css';
import cartApi from '../../api/cartApi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function MiniCart(props) {



    const cartList = useSelector(state => state.cart.cartList.cart);
    cartList ? console.log(cartList) : console.log("ko co");

    //Tổng
    let priceTotal = 0;
    let numberItem = 0;

    // So sánh các id trong cart và lấy ra product với color và size đúng như đã chọn
    const getSpecificProduct = () => {

        cartList.map((item,key)=>{
            priceTotal += item.quantity * item.idColorProduct.price;
            numberItem ++;
        })

    }

    const dispatch = useDispatch();

    const removeItemInCart = (item) => {
        const deleteItem = async () => {
            try {
                await cartApi.delete(item._id);
                await dispatch({ type: 'removeItem'});
            } catch (error) {
                console.log('Failed to remove cart item: ', error);
            }
        }
        deleteItem();
    }

    cartList ? getSpecificProduct() : console.log("empty cart");



    useEffect(() => {
        let isCancelled = false;
        const fetchCart = async () => {
            try{
                if (!isCancelled){
                    const response = await cartApi.getAll("5fede8dc2f490c5e6807257b");
                    await dispatch({ type: 'getCart', payload: response.data })
                  // setCart(cartList);
                }
                
            }
            catch(err){
                console.log('Failed to fetch cart list: ', err);
            }
        }
        
        fetchCart();
        return () => {
            isCancelled = true;
        };
    },[cartList]);

    return (
        <div ref={props.wrapperRef} className="miniCart">
            {cartList ? 
                (
                    cartList.length > 0 ? (
                        <div>
                            <div className="top-content">
                                <div className="row-total">
                                    <div className="quantity">
                                        <h6>Total: </h6>
                                        <h6>${priceTotal}</h6>
                                    </div>
                                    <div className="total">
                                        <h6>Items:</h6>
                                        <h6>{numberItem}</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="middle-content">
                                <div className="inner">
                                    {
                                        cartList ? cartList.map((item, key) => (
                                            <div className="item" key={key}>
                                                <div className="image">
                                                    <img src={item.idColorProduct.images[0]} alt="Product"></img>
                                                </div>
                                                <div className="info">
                                                    <p className="name">{item.idProduct.name}</p>
                                                    <p>${item.idColorProduct.price}</p>
                                                    <p>Quantity: <b>{item.quantity}</b></p>
                                                </div>
                                                <a onClick={() => removeItemInCart(item)} className="icon-delete"><i className="fa fa-trash-o"></i></a>
                                            </div>
                                        ))
                                            : null
                                    }
                                </div>
                            </div>
                            <div className="bottom-content">
                                <Link to="/cart" className="btn-default btn-edit">
                                    Edit Cart
                                </Link>
                                <a className="btn-default btn-checkout">
                                    Checkout
                                </a>
                            </div>
                        </div>
                    )
                    : 
                    (
                        <div className="empty-cart">
                            Your shopping cart is empty!
                        </div>
                    )
                ) 
                : null
            } 
        </div>
    )
}

export default MiniCart
