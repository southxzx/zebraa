import React, { useState } from 'react';
import { useSelector } from 'react-redux';


function Count() {

    const cartList = useSelector(state => state.cart.cartList);

    let result;
    let x;

    if (localStorage.getItem('cart')){
        x = JSON.parse(localStorage.getItem('cart'));
        result = x.length;
    }
    else{
        result = 0;
    }

    if (cartList.cart){
        if (cartList.cart.length > result){
            localStorage.setItem('cart',JSON.stringify(cartList.cart));
        }
    }

    

    return (
        <div>
            {typeof(cartList.cart) !== 'undefined' ? cartList.cart.length : result}
        </div>
    )
}

export default Count
