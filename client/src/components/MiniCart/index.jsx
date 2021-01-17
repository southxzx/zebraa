import React from 'react';
import { useEffect } from 'react';
import './miniCart.css';
import cartApi from '../../api/cartApi';
import historyApi from '../../api/historyApi';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { RemoveItem } from '../../utils/cart';


function MiniCart(props) {

    // REtrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);

    const cartList = useSelector(state => state.cart.cartList.cart);
    const [isRender,setIsRender] = useState(false);

    console.log(cartList);

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

    const { promiseInProgress } = usePromiseTracker();

    cartList ? getSpecificProduct() : console.log("");

    const removeItemInCart = (item) => {
        const deleteItem = async () => {
            try {
                await trackPromise(cartApi.delete(item._id));
                setIsRender(!isRender);
                await RemoveItem(item);
            } catch (error) {
                console.log('Failed to remove cart item: ', error);
            }
        }
        deleteItem();
    }

    useEffect(() => {
        let isCancelled = false;
        const fetchCart = async () => {
            try{
                if (!isCancelled){
                    const response = await trackPromise(cartApi.getAll(user._id));
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
    },[isRender]);

    return (
        <div ref={props.wrapperRef} className="miniCart">
            {cartList ? 
                (
                    cartList.length > 0 ? (
                        <div>
                            {!cartList || promiseInProgress ? (
                                <div className="load">
                                    <Loader
                                        type="ThreeDots"
                                        color="#ff6500"
                                        height={30}
                                        width={30} //3 secs

                                    />
                                </div>) : null}
                            <div className="top-content">
                                <div className="row-total">
                                    <div className="quantity">
                                        <h6>Total: </h6>
                                        <h6>${parseFloat(priceTotal).toFixed(2)}</h6>
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
                                <Link to="/checkout" className="btn-default btn-checkout">
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    )
                    : 
                    (
                        <div>
                            {promiseInProgress &&
                                <div className="load">
                                    <Loader
                                        type="ThreeDots"
                                        color="#ff6500"
                                        height={30}
                                        width={30} //3 secs

                                    />
                                </div>}
                            <div className="empty-cart">
                                Your shopping cart is empty!
                            </div>
                        </div>
                    )
                ) 
                : (
                    <div>
                    {promiseInProgress &&
                        <div className="load">
                            <Loader
                                type="ThreeDots"
                                color="#ff6500"
                                height={30}
                                width={30}//3 secs

                            />
                        </div>}
                    <div className="empty-cart">
                        Your shopping cart is empty!
                    </div>
                </div>
                )
            } 
        </div>
    )
}

export default MiniCart
