import React, { useState } from 'react';
import './checkout.css';
import { Container } from 'reactstrap';
import { Steps } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Breadcrumbs from '../../components/Breadscrumbs';
import Header from '../../components/Header';
import InfoConfirm from './InfoConfirm';
import Payment from './Payment';
import Delivery from './Delivery';
import { Link } from 'react-router-dom';
import orderApi from '../../api/orderApi';
import cartApi from '../../api/cartApi';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import historyApi from '../../api/historyApi';
import { RemoveItem } from '../../utils/cart';
import productApi from '../../api/productApi';

function Checkout() {

  const[order,setOrder] = useState({
    idUser: "",
    cart:"",
    status:"Shipping",
    payment:"",
    shipment:"Standard",
    note:"",
    name:"",
    address:"",
    phone:"",
    totalRaw:"",
    shipmentFee:"",
    discount:"",
    totalOrder:"",
  })

  const [step, setStep] = React.useState(0);

  const onChange = nextStep => {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const handlePayment = (value) => {
    setOrder({
      ...order,
      payment: value
    })
  }
  // save order
  const addOrder = async() => {
    if (order.payment !== ""){
      await orderApi.add(order);
    }
    saveHistory();
  }

  const removeItemInCart = (item) => {
    const deleteItem = async () => {
        try {
            await trackPromise(cartApi.delete(item._id));
            await RemoveItem(item);
        } catch (error) {
            console.log('Failed to remove cart item: ', error);
        }
    }
    deleteItem();
}

  let history = {
    idUser: order.idUser,
    idProduct: "",
    idColorProduct: "",
    idSize: "",
    totalPrice: "",
    quantity: 2
  }

  const saveHistory = () => {

    const addHistory = async (history) => {
      await trackPromise(historyApi.add(history))
    };

    const updateQty = async (data) => {
      await trackPromise(productApi.updateQty(data))
    }

    order.cart.map((item,key)=>{
      history.idProduct = item.idProduct._id;
      history.idColorProduct = item.idColorProduct._id;
      history.idSize = item.idSize;
      history.quantity = item.quantity;
      history.totalPrice = item.idColorProduct.price * item.quantity;
      addHistory(history);
      removeItemInCart(item);
      updateQty(history);
    })

  }

  const render = (step) => {

    switch(step){
      case 0:
        return (
          <InfoConfirm
            nextStep={() => onNext()}
            infoData={(data) => getInfoData(data)}
          />
        )
      case 1:
        return (
          <Payment
            handlePayment={(type) => handlePayment(type)}
            value={order.totalOrder}
            nextStep={() => onNext()}
            infoData={(data) => getInfoData(data)}
            addOrder={()=> addOrder()}
          />
        )
      case 2:
        return (
          <Delivery/>
        )
      default: 
        return (<div></div>)
    }
  }

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  const getInfoData = (data) => {
    let orderNew = order;

    for (let item in data) {
      orderNew[item] = data[item];
    }
    
    setOrder({
      ...order,
      orderNew
    })
  }
  //console.log(order);

  return (
    <div>
        <Header/>
        <Breadcrumbs
            title="Checkout"
            active="Checkout"
            linkBack="Home"
        />
        <Container>
              <section className="checkout">
                <div className="step-checkout">
                  <Steps current={step}>
                    <Steps.Item title="Confirmation" description="" />
                    <Steps.Item title="Payment" description="" />
                    <Steps.Item title="Delivery" description="" />
                  </Steps>
                </div>
                  <hr />
                  <div>
                    {render(step)}
                  </div>
                  <hr />
                {step < 2 ? (
                  null
                ) : 
                (
                  <Link className="btn-default btn-subscribe btn-next" to="/">
                  Continue
                </Link>
                )}
              </section>
        </Container>
    </div>
  );
}

export default Checkout
