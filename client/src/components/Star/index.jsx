import React from 'react';
import './star.css';


function Star(props) {

    const {numberStar} = props;
    var t = 0;
    var numStar = numberStar;
    var numberArr = [];
    var numberFloor = Math.floor(numStar);
    var remainStar = numberStar - numberFloor;

    if(numberFloor == 0){
        numberArr[0] = String(numberStar*100)+"%"
        for(let i = 1; i < 5; i++){
            numberArr[i] = "0%";
        }
    }

    else{
        for(let i = 1; i <= numberFloor; i++){
            // numberArr.push('100%');
            numberArr[i] = "100%";
            t = i+1;
        }
        if(t > 0 && t < 6){
            numberArr[t] = String(remainStar*100)+"%";
            for(let j = t + 1; j <= 5; j++){
                numberArr[j] = "0%"
            }
        }
    }


    //numberArr.push(String(remainStar*100)+"%");

    // console.log(numberStar);
    // console.log(numStar);
    // console.log(numberFloor);
    // console.log(remainStar);
    // console.log(numberArr);
    return (
        <div className="main-star">
            <span className="total-star">
                {
                    numberArr.map((item,key)=>(
                        <span className="star" key={key}>
                            <i className="fa fa-star-o be" aria-hidden="true"></i>
                            <span className="star-up">
                                <i id="up" style={{width: item}} className="fa fa-star up" aria-hidden="true"></i>
                            </span>
                        </span>
                    ))
                }
            
            </span>            
        </div>
    );
}

export default Star;