import React from 'react';
import { useEffect } from 'react';
import './miniCart.css';
import cartApi from '../../api/cartApi';
import { useState } from 'react';

function MiniCart(props) {

    const [cart,setCart] = useState();

    //Tổng
    let priceTotal = 0;
    let numberItem = 0;

    // So sánh các id trong cart và lấy ra product với color và size đúng như đã chọn
    const getSpecificProduct = () => {

        const idProduct = "5feb385fbd8c14194c6b3ecb";
        const idColorProduct = "5feb3956bd8c14194c6b3ecc";
        const idSize = "5fed533333ee690cec4f9007";

        cart.map((item,key)=>{
            priceTotal += item.quantity * item.idColorProduct.price;
            numberItem ++;
        })

    }

    const removeItemInCart = (item) => {
        const deleteItem = async () => {
            try {
                await cartApi.delete(item._id);
            } catch (error) {
                console.log('Failed to remove cart item: ', error);
            }
        }
        deleteItem();
    }

    cart ? getSpecificProduct() : console.log("empty cart");

    useEffect(() => {
        const fetchCart = async () => {
            try{
                const response = await cartApi.getAll("5fede8dc2f490c5e6807257b");
                setCart(response.data.cart);
                
            }
            catch(err){
                console.log('Failed to fetch cart list: ', err);
            }
        }
        fetchCart();
    },[cart]);

    return (
        <div ref={props.wrapperRef} className="miniCart">
            <div className="top-content">
                {
                    cart ? (
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
                    )
                    : null
                }
            </div>
            <div className="middle-content">
                <div className="inner">
                    {
                        cart ? cart.map((item,key) => (
                            <div className="item" key={key}>
                                <div className="image">
                                    <img src={item.idColorProduct.images[0]} alt="Product"></img>
                                </div>
                                <div className="info">
                                    <p className="name">{item.idProduct.name}</p>
                                    <p>${item.idColorProduct.price}</p>
                                    <p>Quantity: <b>{item.quantity}</b></p>
                                </div>
                                <a href="#" onClick={()=> removeItemInCart(item)} className="icon-delete"><i className="fa fa-trash-o"></i></a>
                            </div>
                        ))
                        : null
                    }
                </div>
            </div>
            <div className="bottom-content">
                <a href="/cart" className="btn-default btn-edit">
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
