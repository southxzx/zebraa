import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, InputGroup, InputGroupAddon, Button, Spinner } from 'reactstrap'
import orderApi from '../../../../api/orderApi'
import OrderDetail from '../../../../components/OrderDetail'
import { fetchOrdersAdmin, reloadOrderAdmin, setFilterStatus, updateOrderStatus } from '../../../../slice/ordersAdmin.slice'
import timeSince from '../../../../utils/timeSince'
import './orders.css'

const Orders = () => {

  const { loading, orders, loadingUpdateStatus, reload, filterStatus } = useSelector(state => state.ordersAdmin);

  const [visibleNew, setVisibleNew] = useState(true);
  const [orderListState, setOrderListState] = useState([]);
  const [openModal, setOpenModal] = useState({
    open: false,
    order: {}
  });
  const [orderEdit, setOrderEdit] = useState({
    key: NaN,
    value: ''
  });

  let filteredOrderList = [];

  const statusList = [
    'Shipping',
    'Delivered',
    'Confirming',
    'Order placed',
    'Cancelled'
  ];

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const orderListClone = [...orders].reverse();
    const orderList = orderListClone.filter((order) => order._id.slice(16, 24).includes(e.target.value));
    setOrderListState(orderList);
  }

  const handleFilter = (status) => {
    dispatch(setFilterStatus(status));
    const orderListClone = [...orders].reverse();
    if (status === 'All') {
      setOrderListState([...orderListClone]);
    } else {
      const orderList = orderListClone.filter((order) => order.status === (status));
      setOrderListState(orderList);
    }
  }

  const handleOrderStatusUpdate = (id, key, e) => {
    setOrderEdit({
      key,
      value: e.target.value
    });
    dispatch(updateOrderStatus({ idOrder: id, status: e.target.value }));
  }

  const handleOpenModal = (order = {}) => {
    if (openModal.open) {
      setOpenModal({
        open: false,
        order: {}
      });
    } else {
      setOpenModal({
        open: !openModal.open,
        order: order
      });
    }
  }

  useEffect(() => {
    if (loading === false) {
      filteredOrderList = [...orders].reverse();
      setOrderListState(filteredOrderList);
      handleFilter(filterStatus);
    } else {
      dispatch(fetchOrdersAdmin());
    }

    if (loadingUpdateStatus === false && loading === false && reload === true) {
      dispatch(reloadOrderAdmin());
    }

    if (loadingUpdateStatus === false && loading === false && reload === false) {
      setOrderEdit({
        key: NaN,
        value: ''
      });
    }

    // setInterval(() => {
    //   dispatch(fetchOrdersAdmin());
    // }, 1000);

    console.log("rendering");

    // setTimeout(() => {
    //   setVisibleNew(false);
    // }, 5000);

    return () => {
      setVisibleNew(true);
      setOrderListState([]);
    }
  }, [loading, loadingUpdateStatus, orders])

  return (
    <div className="orders-page" >
      <div className="order-nav">
        <div className="search-bar">
          <input onChange={handleOnChange} type="search" placeholder="Search" name="name" />
          <a className="search-icon" href="/search">
            <img src="/Assets/images/search.png">
            </img>
          </a>
        </div>
        <select
          value={filterStatus}
          className="custom-select"
          onChange={(e) => handleFilter(e.target.value)}
        >
          {<option key={filterStatus} value='All'>All</option>}
          {statusList.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      { openModal.open && <OrderDetail
        openModal={openModal.open}
        order={openModal.order}
        toggleModal={handleOpenModal}
      />}
      <Table size="large">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Time</th>
            <th>Buyer</th>
            <th>Items</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        {
          loading ? (
            <div className="icon-loading">
              <Spinner color="primary" style={{ width: '5rem', height: '5rem' }} />
            </div>
          ) : (orderListState.map((ordersItem, key) => (
            <tbody className="table-body" key={ordersItem.id}>
              <tr className={`order-${ordersItem.status}`}>
                <td className="order-number" scope="row">{orderListState.length - key}</td>
                <td className="order-code">
                  <div class="order-code-wrap">
                    <span onClick={() => handleOpenModal(ordersItem)} className={`${ordersItem.status}`}>
                      {ordersItem._id.slice(16, 24).toUpperCase()}
                    </span>
                    <>{timeSince(new Date(ordersItem.createdAt).getTime()).includes('minutes')
                      || timeSince(new Date(ordersItem.createdAt).getTime()).includes('seconds') ? (
                      <div className={visibleNew ? "order-new" : "order-new-invisible"}>Mới</div>
                    ) : null}</>
                  </div>
                </td>
                <td>{timeSince(new Date(ordersItem.createdAt).getTime())}</td>
                <td>
                  {ordersItem.name}
                </td>
                <td>
                  {ordersItem.cart.length}
                </td>
                <td>
                  {ordersItem.payment}
                </td>
                <td className="order-status">
                  {reload && orderEdit.key === key ? (
                    <div className="icon-loading-status">
                      <Spinner color="primary" size="sm" />
                    </div>
                  ) : (
                    null
                  )}
                  <select
                    // Nếu đúng là order đang sửa thì update value
                    value={orderEdit.key === key ? orderEdit.value : ordersItem.status}
                    className="custom-select"
                    onChange={(e) => handleOrderStatusUpdate(ordersItem._id, key, e)}
                  >
                    {statusList.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="order-total">
                  ${ordersItem.totalOrder}
                </td>
              </tr>
            </tbody>
          )))
        }
      </Table>
    </div>
  )
}

export default React.memo(Orders);
