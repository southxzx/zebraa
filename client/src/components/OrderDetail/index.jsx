import React, { useState } from 'react'
import { Modal, Table, Row } from 'reactstrap'
import timeSince from '../../utils/timeSince';
import './OrderDetail.css'

const OrderDetail = ({ openModal, order, toggleModal }) => {

  console.log("order", order);

  const { _id, note, cart, payment, name, address, phone, totalRaw, shipmentFee, discount, totalOrder, createdAt} = order;

  const closeModal = () => toggleModal();

  return (
    <Modal size="lg" isOpen={openModal}>
      <div className="order-detail-modal">
        <div class="btn-cancel"><a onClick={() => closeModal()}><i class="fa fa-times"></i></a></div>
        <div className="invoice-box">
          <div className="header-content">
          <h3>#{_id.slice(16,24).toUpperCase()}</h3>
            <Row>
              <div className="col-sm-6"><strong>Date: </strong>{`${createdAt} (${timeSince( new Date(createdAt).getTime())})`}</div>
              <div className="col-sm-6  text-sm-right " ><strong>Name: </strong>{name}</div>
              <div className="col-sm-6"><strong>Address: </strong>{address}</div>
              <div className="col-sm-6  text-sm-right "><strong>Phone: </strong>{phone}</div>
              <div className="col-sm-6"><strong>Note: </strong>{note}</div>
            </Row>
          </div>
          <div className="table-content">
            <Table borderless>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Image</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Item Price</th>
                  <th>Qty</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
              {cart.map((item, key) => (
                <tr>
                  <td>{item.idProduct.name}</td>
                  <td><img width="50px" src={item.idColorProduct.images[0]} /></td>
                  <td>{item.idColorProduct.color.name}</td>
                  <td>{item.idProduct.colorProducts[
                    item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
                  ].sizeProducts[
                    item.idProduct.colorProducts[
                      item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
                    ].sizeProducts.findIndex(y => y._id === item.idSize)
                  ].size.name}</td>

                  <td>${item.idColorProduct.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.idColorProduct.price * item.quantity}</td>
                </tr>
              ))}
              </tbody>
            </Table>
            <div className="card-body px-2">
              <div className="table-responsive">
                <table className="table">
                  <tbody style={{ display: 'flex'}}>
                    <tr style={{flex: 1}}>
                      <td colSpan="10" className="bg-light-2 text-right col-10 text-right"><strong>Sub Total:</strong></td>
                      <td className="bg-light-2 text-right">${totalRaw}</td>
                    </tr>
                    <tr>
                      <td colSpan="10" className="bg-light-2 text-right"><strong>Discount: </strong></td>
                      <td className="bg-light-2 text-right">{discount}%</td>
                    </tr>
                    <tr>
                      <td colSpan="10" className="bg-light-2 text-right"><strong>Shipment Fee: </strong></td>
                      <td className="bg-light-2 text-right">${shipmentFee}</td>
                    </tr>
                    <tr>
                      <td colSpan="10" className="bg-light-2 text-right"><strong>Total: </strong></td>
                      <td style={{color: 'red'}} className="bg-light-2 text-right">${totalOrder}</td>
                    </tr>
                    <tr>
                      <td colSpan="10" className="bg-light-2 text-right"><strong>Payment: </strong></td>
                      <td className="bg-light-2 text-right">{payment}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default OrderDetail
