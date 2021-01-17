import React, { useEffect, useState } from 'react';

function Card(props) {

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);


    var countDownDate = new Date("Feb 10, 2021 15:37:25").getTime();

    useEffect(()=>{
        // Update the count down every 1 second
        var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
            
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes and seconds
        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
                   
        if (distance < 0) {
            clearInterval(x);
            //document.getElementById("demo").innerHTML = "EXPIRED";
        }
        }, 1000);
    },[days,hours,minutes,seconds])

    return (
        <div className={props.active ? "item-inner active" : "item-inner" }>
            <div className="image">
                <a>
                    <img src={props.image} />
                </a>                
                <div className={props.active ? "time active-time" : "time"}>
                    <div className="day">
                        <h2>{days}</h2>
                        <span>days</span>
                    </div>
                    <div className="hour">
                        <h2>{hours}</h2>
                        <span>hours</span>
                    </div>
                    <div className="min">
                        <h2>{minutes}</h2>
                        <span>mins</span>
                    </div>
                    <div className="second">
                        <h2>{seconds}</h2>
                        <span>secs</span>
                    </div>
                </div>
            </div>
            <div className="caption">
                <div className="rating-box">
                    <img src="/Assets/images/rating5.png" />
                </div>
                <a className="product-name" href="#">Nike Air 4 (Limited)</a>
                {props.hover ?
                <div className="btn-cart">
                    <a className="btn-default btn-add-to-cart">
                        Add to cart
                    </a>
                </div> : 
                <div className="price-box">
                    <p className="new">$75.00</p>
                    <p className="old">$45.00</p>
                </div>}
            </div>
        </div>
    )
}

export default Card
