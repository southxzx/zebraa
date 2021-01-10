import React, { useEffect, useState } from 'react';
import { Row, Table, Col } from 'reactstrap';
import orderApi from '../../api/orderApi';
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

function Delivery() {

    const [order,setOrder] = useState();

    // REtrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await trackPromise(orderApi.get(user._id));
            setOrder(response.data[0]);
            console.log(order);
        }
        fetchOrder();
    },[])

    const { promiseInProgress } = usePromiseTracker();

    const renderPaymentLine = (payment) => {
        console.log(payment);
        switch(payment){
            case "paypal":
                return (
                    <div>Already paid with Paypal</div>
                )
            default:
                return (
                    <div>Default</div>
                )
        }
    }

    return (
        <div>
            {promiseInProgress || !order ? (
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
                : (
                    <div>
                        <div className="title">
                            <p>Thanks for your purchase. Below is your invoice!</p>
                        </div>
                        <div className="delivery">
                            <div className="invoice-box">
                                <Row>
                                    <Col lg="7">
                                        <img src="Assets/images/nike-logo.png" alt="Logo" />
                                    </Col>
                                    <Col lg="5">
                                        <h2>Invoice</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="col-sm-6"><strong>Date:</strong> 05/12/2019</div>
                                    <div className="col-sm-6 text-sm-right"> <strong>Invoice No:</strong> 16835</div>
                                </Row>
                                <Row className="last-row">
                                    <div className="col-sm-6 text-sm-right order-sm-1">
                                        <strong>Pay To:</strong>
                                        <div>
                                            {`
                        Koice Inc\n
                        2705 N. Enterprise St\n
                        Orange, CA 92865
                        contact@koiceinc.com
                        `}
                                        </div>
                                    </div>
                                    <div className="col-sm-6 order-sm-0"> <strong>Invoiced To:</strong>
                                        <address>{order.address}
                            </address>
                                    </div>
                                </Row>
                                <div className="card">
                                    {
                                        order.cart.map((item,key)=>(
                                                <Table borderless>
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Color</th>
                                                        <th>Size</th>
                                                        <th>Item Price</th>
                                                        <th>Qty</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{item.idProduct.name}</td>
                                                        <td>{item.idColorProduct.color.name}</td>
                                                        <td>7.5</td>
                                                        <td>${item.idColorProduct.price}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>${item.idColorProduct.price * item.quantity}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        ))
                                    }
                                    <div className="card-body px-2">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <td colSpan="10" className="bg-light-2 text-right col-10 text-right"><strong>Sub Total:</strong></td>
                                                        <td className="bg-light-2 text-right">${order.totalRaw}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="10" className="bg-light-2 text-right"><strong>Discount:</strong></td>
                                                        <td className="bg-light-2 text-right">{order.discount}%</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="10" className="bg-light-2 text-right"><strong>Shipment Fee:</strong></td>
                                                        <td className="bg-light-2 text-right">${order.shipmentFee}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="10" className="bg-light-2 text-right"><strong>Total:</strong></td>
                                                        <td className="bg-light-2 text-right">${order.totalOrder}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <Row className="last-row">
                                        <div className="col-sm-2 order-sm-0">
                                            <strong>Payment:</strong>
                                        </div>
                                        <div className="payment-line">
                                        {renderPaymentLine(order.payment)}
                                    </div>
                                </Row>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                                    <p className="text-1"><strong>NOTE :</strong> This is computer generated receipt and does not require physical signature.</p>
                                    <div className="btn-group btn-group-sm d-print-none"> <a href="javascript:window.print()" className="btn btn-light border text-black-50 shadow-none"><i className="fa fa-print"></i> Print</a> <a href="" className="btn btn-light border text-black-50 shadow-none"><i className="fa fa-download"></i> Download</a> </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default Delivery
