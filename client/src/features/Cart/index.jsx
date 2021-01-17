import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadscrumbs';
import { 
    Container, Row, Col, Table, InputGroup, InputGroupAddon, Input, Collapse, Button
} from 'reactstrap';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux'; 
import cartApi from '../../api/cartApi'; 
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { RemoveItem } from '../../utils/cart';


function Cart() {

    const [count,setCount] = useState(1);
    const [cartList,setCart] = useState([]);
    const [isEdit,setIsEdit] = useState(9999);
    const [isRender,setIsRender] = useState(false);
    const [valueState,setValueState] = useState("");

    // REtrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    function increase(){
        setCount(count+1);
    }
    function decrease(){
        console.log("dec");
        if(count >= 2){
            setCount(count-1);
        }
    }

    const { promiseInProgress } = usePromiseTracker();

    const [isOpenCollapse1, setIsOpenCollapse1] = useState(false);

    const toggleCollapse1 = () => setIsOpenCollapse1(!isOpenCollapse1);

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
                await trackPromise(cartApi.delete(item._id));
                await dispatch({ type: 'removeItem'});
                RemoveItem(item);
                setIsRender(!isRender);
            } catch (error) {
                console.log('Failed to remove cart item: ', error);
            }
        }
        deleteItem();
    }
    const editItemInCart = (item,key) => {
        var dropdownSize = document.getElementsByClassName('custom-select');
        var tableBody = document.getElementsByClassName('table-body');
        var quantityInput = document.getElementsByClassName('quantity-input');
        var buttonSaveChanges = document.getElementsByClassName('fa-check-square');
        cartList.map((item, key)=>{
            dropdownSize[key].disabled = true;
            quantityInput[key].disabled = true;
            tableBody[key].style.backgroundColor = "#fff";
            buttonSaveChanges[key].style.display = "none";
        })
        dropdownSize[key].disabled = false;
        quantityInput[key].disabled = false;
        tableBody[key].style.backgroundColor = "#fff9eb";
        buttonSaveChanges[key].style.display = "inline";

        setValueState(dropdownSize.value);
        setIsEdit(key);
        setCount(item.quantity);
        setIsRender(!isRender);
    }

    let dataSaveChanges = {
        idSizeOld:"",
        idSizeNew:"",
        quantity:0
    }
    const saveChangesItemInCart = (item,key) => {
        setIsEdit(false);
        var dropdownSize = document.getElementsByClassName('custom-select');
        var tableBody = document.getElementsByClassName('table-body');
        var quantityInput = document.getElementsByClassName('quantity-input');
        var buttonSaveChanges = document.getElementsByClassName('fa-check-square');
        cartList.map((item, key)=>{
            dropdownSize[key].disabled = true;
            quantityInput[key].disabled = true;
            tableBody[key].style.backgroundColor = "#fff";
            buttonSaveChanges[key].style.display = "none";
        })

        setIsEdit(9999);

        dataSaveChanges.idSizeOld = item.idSize;
        dataSaveChanges.idSizeNew = dropdownSize[key].value;
        dataSaveChanges.quantity = quantityInput[key].defaultValue;
        console.log(dataSaveChanges);

        
        const updateItemInCart = async () =>{
            await trackPromise(cartApi.update(dataSaveChanges));
            setIsRender(!isRender);
        }
        updateItemInCart();
    }

    cartList ? getSpecificProduct() : console.log("empty cart");

    useEffect(() => {
        const fetchCart = async () => {
            try{

                    const response = await trackPromise(cartApi.getAll(user._id));
                    await dispatch({ type: 'getCart', payload: response.data })
                    setCart(response.data.cart);
            }
            catch(err){
                console.log('Failed to fetch cart list: ', err);
            }
        }
        fetchCart();
    },[isRender]);

    const handleChange = (item,e,key) =>{
        const idSize = e.target.value;
        const value=item.idProduct.colorProducts[
            item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
        ].sizeProducts[
            item.idProduct.colorProducts[
                item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
            ].sizeProducts.findIndex(y => y._id === idSize)
        ]._id;

        setValueState(value);

        var dropdownSize = document.getElementsByClassName('custom-select');
        dropdownSize[key].value = value;
    }

    return (
        <div>
            <Header/>

            <Breadcrumbs
                title="Shopping Cart"
                linkBack="Home"
                active="Shopping Cart"
            />

            <Container>
                <Row>
                    <div className="cart-content">
                        <form>
                            { promiseInProgress &&
                                <div className="load">
                                    <Loader
                                        type="ThreeDots"
                                        color="#ff6500"
                                        height={100}
                                        width={100}
                                    //3 secs

                                    />
                                </div>}
                            <Table size="large" bordered>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {
                                    cartList ? cartList.map((item, key)=>(
                                        <tbody className="table-body" key={key}>
                                            <tr>
                                                <td className="thumbnail" scope="row"><img className="thumbnail-cart" src={item.idColorProduct.images[0]} /></td>
                                                <td>{item.idProduct.name}</td>
                                                <td>
                                                    <select 
                                                        value= {isEdit === key ? valueState :
                                                            item.idProduct.colorProducts[
                                                                item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
                                                            ].sizeProducts[
                                                                item.idProduct.colorProducts[
                                                                    item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
                                                                ].sizeProducts.findIndex(y => y._id === item.idSize)
                                                            ]._id
                                                        } 
                                                        disabled 
                                                        key={key} 
                                                        onChange={(e)=>handleChange(item,e,key)}
                                                        className="custom-select" 
                                                        id={`inputGroupSelect${key}`}>
                                                        {
                                                            item.idProduct.colorProducts[item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)].sizeProducts.map((value,key) => (
                                                                <option key={key} value={value._id}>{value.size.name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <Button color="white" onClick={() => decrease()}><i className="fa fa-minus" aria-hidden="true"></i></Button>
                                                        </InputGroupAddon>
                                                        <Input key={key} disabled className="quantity-input" value={isEdit === key ? count : item.quantity} />
                                                        <InputGroupAddon addonType="prepend">
                                                            <Button color="white" onClick={() => increase()}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                                                        </InputGroupAddon>
                                                    </InputGroup>
                                                </td>
                                                <td>
                                                    ${item.idColorProduct.price}
                                                </td>
                                                <td>
                                                    ${item.idColorProduct.price * item.quantity}
                                                </td>
                                                <td>
                                                    <div className="cart-action">
                                                        <i  onClick={() =>removeItemInCart(item)} className="fa fa-window-close" aria-hidden="true"></i>
                                                        <i  onClick={() =>editItemInCart(item,key)} className="fa fa-pencil-square" aria-hidden="true"></i>
                                                        <i key={key} onClick={() =>saveChangesItemInCart(item,key)} style={{display:"none"}} className="fa fa-check-square" aria-hidden="true"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                        : (<div>
                                            {promiseInProgress &&
                                                <div className="load">
                                                    <Loader
                                                        type="ThreeDots"
                                                        color="#ff6500"
                                                        height={100}
                                                        width={100}
                                                        timeout={3000} //3 secs

                                                    />
                                                </div>}
                                        </div>)
                                }
                            </Table>
                        </form>
                        <div className="total">
                            <h3>Total: ${priceTotal}</h3>
                        </div>
                        <h2>What would you like to do next?</h2>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        <div className="panel-group">  
                            <div className="panel">
                                <div className="heading">
                                    <a onClick={toggleCollapse1} >
                                        <h5>Use coupon code</h5>
                                        <i className="fa fa-caret-down" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <Collapse className="collapse-coupon" isOpen={isOpenCollapse1}>
                                    <Input className="" placeholder="Enter your coupon"/>
                                    <label className="error-msg">Your coupon is invalid!</label>
                                    <a className="btn-default btn-subscribe">Apply</a>
                                </Collapse>
                            </div>                        
                        </div>
                    <div className="option-cart-btn">
                        <a className="btn-default btn-subscribe btn-continue">
                            Continue shopping
                        </a>
                        <Link to="/checkout" className="btn-default btn-subscribe btn-check-out">
                            Checkout
                        </Link>
                    </div>
                    </div>
                    
                </Row>
            </Container>

            <Footer/>
        </div>
    )
}

export default Cart
