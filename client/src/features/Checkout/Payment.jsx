import React, { useEffect, useRef, useState } from 'react';
function Payment(props) {

    const [cash,setCash] = useState(false);
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    const handleClick = (type) => {
      if (type === "cash"){
        setCash(!cash);
      }
      props.handlePayment(type);

    }

    useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Your description",
                    amount: {
                      currency_code: "USD",
                      value: props.value,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaid(true);
              handleClick("paypal");
              console.log(order);
            },
            onError: (err) => {
            //   setError(err),
              console.error(err);
            },
          })
          .render(paypalRef.current);
      }, []);

    const onNext = () => {
      props.nextStep();
      // Save order to database
      props.addOrder();
    }

    if (paid) {
      return (
      <div>
        <button className="btn-default btn-subscribe btn-next" onClick={onNext}>
          Next
        </button>
        <div className="success-paypal"><h3>Payment successful!!!</h3></div>
      </div>)
    }

    // If any error occurs
    if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
    }


    return (
      <div>
        <div className="panel">
          <div className="title">
            <p>Please select your payment method!</p>
          </div>
          <div className="payment">
            <button onClick={() => handleClick("cash")} className="btn btn-cash">
              <i className="fa fa-money" aria-hidden="true"></i>
                    Cash on delivery
                    {cash ? (<i className="fa fa-check"></i>) : null}
            </button>
            <div ref={paypalRef} />
          </div>
        </div>
        <button className="btn-default btn-subscribe btn-next" onClick={onNext}>
          Next
        </button>  
      </div>
    )
}

export default Payment
