import React, { useEffect, useState } from 'react';
import { Row, Col, Input, InputGroup, InputGroupAddon, Button, Table } from 'reactstrap';
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import cartApi from '../../api/cartApi';
import FormError from '../../utils/formError';

function InfoConfirm(props) {

    const [cartList,setCart] = useState([]);
    const [info,setInfo] = useState({
        idUser: "",
        cart:"",
        note:"",
        name:"",
        address:"",
        phone:"",
        totalRaw:"",
        shipmentFee:"",
        discount:"",
        totalOrder:"",
    });

    const [formErr,setFormErr] = useState({
        addressValid: true,
        phoneValid: true,
        nameValid: true
    })

    // REtrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);

    let totalRaw = 0, discount = 10, shipmentFee = 5, totalOrder = 0;
    const cal = () => {
        cartList.map((item, key) =>{
            totalRaw += item.idColorProduct.price * item.quantity;
        }) 
        totalOrder = parseFloat(totalRaw - ((totalRaw * discount)/100) + shipmentFee).toFixed(2);
        //console.log(totalRaw,totalOrder);
    }
    cartList ? cal() : console.log("");

    const { promiseInProgress } = usePromiseTracker();

    const dispatch = useDispatch();

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
    },[]);

    const onNext = () => { 

        let infoNew = info;
        infoNew.idUser = user._id;
        infoNew.cart = cartList;
        infoNew.address !== "" ? infoNew.address = infoNew.address :infoNew.address = user.address;
        infoNew.phone !== "" ? infoNew.phone = infoNew.phone : infoNew.phone = user.phone;
        infoNew.name !== "" ? infoNew.name = infoNew.name : infoNew.name = user.name;
        infoNew.totalRaw = totalRaw;
        infoNew.discount = discount;
        infoNew.shipmentFee = shipmentFee;
        infoNew.totalOrder = totalOrder;

        if (typeof(infoNew.address) === "undefined" 
            || typeof(infoNew.name) === "undefined"  
            || typeof(infoNew.phone) === "undefined" ){
                // Validation form
        }
        else{
            // Next step
            props.nextStep();
            props.infoData(infoNew);
        }

    }

    const handleChange = (e, type) => {

        setInfo({
            ...info,
            [type]: e.target.value
        })
    }

    return (
        <div className="panel">
            <Row>
                <Col>
                    <div className="title">
                        <p>Confirm your delivery address</p>
                    </div>
                    <div className="info">
                        <form>
                            <Row>
                                <Col lg="3">
                                    <p>Name:</p>
                                </Col>
                                <Col lg="9">
                                    { formErr.nameValid ? (null) : (<div className="warning"><span> Error : Please enter your name.</span></div>)}   
                                    <Input onChange={(e)=>handleChange(e, "name")} placeholder="Your name" defaultValue={user.name ? user.name : ""}></Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3">
                                    <p>Address:</p>
                                </Col>
                                <Col lg="9">
                                    { formErr.addressValid ? (null) : (<div className="warning"><span> Error : Please enter your address.</span></div>)}
                                    <InputGroup>
                                        <Input onChange={(e)=>handleChange(e, "address")} placeholder="Your address" defaultValue={user.address ? user.address : ""}></Input>
                                        <InputGroupAddon addonType="prepend">
                                            <Button color="white"><i className="fa fa-map-o" aria-hidden="true"></i></Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3">
                                    <p>Phone:</p>
                                </Col>
                                <Col lg="9">
                                { formErr.phoneValid ? (null) : (<div className="warning"><span> Error : Please enter your phone number.</span></div>)}  
                                    <Input onChange={(e)=>handleChange(e, "phone")} placeholder="Your phone number" defaultValue={user.phone ? user.phone : ""}></Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="3">
                                    <p>Order note:</p>

                                </Col>
                                <Col lg="9">
                                    <textarea onChange={(e)=>handleChange(e, "note")} placeholder="Write your note here"></textarea>
                                </Col>
                            </Row>
                        </form>  
                    </div>
                </Col>
                <Col>
                    <div className="title">
                        <p>Confirm your purchase total</p>
                    </div>
                    <div className="cart-calculation">
                        {promiseInProgress ?
                        (
                            <div className="load">
                            <Loader
                                type="ThreeDots"
                                color="#ff6500"
                                height={100}
                                width={100}
                            //3 secs

                            />
                        </div>
                        ) 
                        :
                        ( 
                            <Table bordered>
                            <tbody>
                                <tr>
                                    <th scope="row">Sub-total:</th>
                                    <td>${totalRaw}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Discount:</th>
                                    <td>{discount}%</td>
                                </tr>
                                <tr>
                                    <th scope="row">Shipment Fee:</th>
                                    <td>${shipmentFee}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Your total:</th>
                                    <td>${totalOrder}</td>
                                </tr>
                            </tbody>
                        </Table>
                        )}
                    </div>
                </Col>
            </Row>   

            <button className="btn-default btn-subscribe btn-next" onClick={onNext}>
                Next
            </button>                              
    </div> 
    )
}

export default InfoConfirm
