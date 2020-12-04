import React from 'react';
import {Popover } from 'reactstrap';

function MiniCart(props) {
    return (
        <div>
            <Popover placement="bottom" target="cart-icon" isOpen={props.isOpen}>
                DMM
            </Popover>
        </div>
    )
}

export default MiniCart
