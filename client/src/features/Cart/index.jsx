import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadscrumbs';

import { 
    Container, Row, Col, Table, InputGroup, InputGroupAddon, Input, Collapse,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from 'reactstrap';
import './cart.css';



function Cart() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isOpenCollapse1, setIsOpenCollapse1] = useState(false);

    const toggleCollapse1 = () => setIsOpenCollapse1(!isOpenCollapse1);

    const toggle = () => setDropdownOpen(prevState => !prevState);
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
                            <Table size="large" bordered>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Brand</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="thumbnail" scope="row"><img class="thumbnail-cart" src="Assets/images/product1.png"/></td>
                                        <td>Vans Oldskool Basic</td>
                                        <td>Nike</td>
                                        <td>
                                            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                                <DropdownToggle caret color="white">
                                                    40
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>39</DropdownItem>
                                                    <DropdownItem>40</DropdownItem>
                                                    <DropdownItem>41</DropdownItem>
                                                    <DropdownItem>42</DropdownItem>
                                                    <DropdownItem>43</DropdownItem>
                                                    <DropdownItem>44</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            <InputGroup>
                                                <InputGroupAddon>
                                                    <Button color="white"><i class="fa fa-minus" aria-hidden="true"></i></Button>
                                                </InputGroupAddon>
                                                <Input className="quantity-input" value="1"/>
                                                <InputGroupAddon>
                                                    <Button color="white"><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </td>
                                        <td>
                                            300$
                                        </td>
                                        <td>
                                            665$
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="thumbnail" scope="row"><img class="thumbnail-cart" src="Assets/images/product1.png"/></td>
                                        <td>Vans Oldskool Basic</td>
                                        <td>Nike</td>
                                        <td>
                                            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                                <DropdownToggle caret color="white">
                                                    40
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>39</DropdownItem>
                                                    <DropdownItem>40</DropdownItem>
                                                    <DropdownItem>41</DropdownItem>
                                                    <DropdownItem>42</DropdownItem>
                                                    <DropdownItem>43</DropdownItem>
                                                    <DropdownItem>44</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            <InputGroup>
                                                <InputGroupAddon>
                                                    <Button color="white"><i class="fa fa-minus" aria-hidden="true"></i></Button>
                                                </InputGroupAddon>
                                                <Input className="quantity-input" value="1"/>
                                                <InputGroupAddon>
                                                    <Button color="white"><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </td>
                                        <td>
                                            300$
                                        </td>
                                        <td>
                                            665$
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="thumbnail" scope="row"><img class="thumbnail-cart" src="Assets/images/product1.png"/></td>
                                        <td>Vans Oldskool Basic</td>
                                        <td>Nike</td>
                                        <td>
                                            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                                <DropdownToggle caret color="white">
                                                    40
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>39</DropdownItem>
                                                    <DropdownItem>40</DropdownItem>
                                                    <DropdownItem>41</DropdownItem>
                                                    <DropdownItem>42</DropdownItem>
                                                    <DropdownItem>43</DropdownItem>
                                                    <DropdownItem>44</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            <InputGroup>
                                                <InputGroupAddon>
                                                    <Button color="white"><i class="fa fa-minus" aria-hidden="true"></i></Button>
                                                </InputGroupAddon>
                                                <Input className="quantity-input" value="1"/>
                                                <InputGroupAddon>
                                                    <Button color="white"><i class="fa fa-plus" aria-hidden="true"></i></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </td>
                                        <td>
                                            300$
                                        </td>
                                        <td>
                                            665$
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        </form>
                        <h2>What would you like to do next?</h2>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        <div className="panel-group">  
                            <div className="panel">
                                <div className="heading">
                                    <a onClick={toggleCollapse1} >
                                        <h5>Use coupon code</h5>
                                        <i class="fa fa-caret-down" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <Collapse className="collapse-coupon" isOpen={isOpenCollapse1}>
                                    <Input className="" placeholder="Enter your coupon"/>
                                    <label className="error-msg">Your coupon is invalid!</label>
                                    <a className="btn-default btn-subscribe">Apply</a>
                                </Collapse>
                            </div>
                            <div className="panel">
                                <div className="heading">
                                    <a onClick={toggleCollapse1} >
                                        <h5>Delivery Information</h5>
                                        <i class="fa fa-caret-down" aria-hidden="true"></i>
                                    </a>
                                </div>
                                <Collapse className="collapse-destination" isOpen={isOpenCollapse1}>
                                    <form>
                                        <Row>
                                            <Col lg="2">
                                                <p>Name:</p>
                                            </Col>
                                            <Col lg="10">
                                                <Input placeholder="Your name"></Input>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2">
                                                <p>Destination:</p>
                                            </Col>
                                            <Col lg="10">
                                                <InputGroup>
                                                    <Input placeholder="Your destination"></Input>
                                                    <InputGroupAddon>
                                                        <Button color="white"><i class="fa fa-map-o" aria-hidden="true"></i></Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="2">
                                                <p>Phone:</p>
                                                
                                            </Col>
                                            <Col lg="10">
                                                <Input placeholder="Your phone number"></Input>
                                            </Col>
                                        </Row>
                                    </form>                                   
                                    <a className="btn-default btn-subscribe">Confirm Information</a>
                                </Collapse>
                            </div>                         
                        </div>

                        <div className="cart-calculation">
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th scope="row">Sub-total:</th>
                                    <td>650$</td>
                                </tr>
                                <tr>
                                    <th scope="row">Discount:</th>
                                    <td>0$</td>
                                </tr>
                                <tr>
                                    <th scope="row">Total:</th>
                                    <td>650$</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    <div class="option-cart-btn">
                        <a class="btn-default btn-subscribe btn-continue">
                            Continue shopping
                        </a>
                        <a class="btn-default btn-subscribe btn-check-out">
                            Checkout
                        </a>
                    </div>
                    </div>
                    
                </Row>
            </Container>

            <Footer/>
        </div>
    )
}

export default Cart
