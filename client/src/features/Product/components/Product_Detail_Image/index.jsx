import React, { useEffect, useState } from 'react';
import './product_image.css'
import { Container, Row, Col, Form } from 'reactstrap';

function Product_Detail_Image(props) {
    const {imageList} = props;
    //console.log(imageList);
    const [image, setImage] = useState(imageList ? imageList[0] : null);

    useEffect(()=>{
        setImage(imageList ? imageList[0] : null);
    },[imageList ? imageList[0] : null]);

    function changeImage(imgLink){
        setImage(imgLink);
    }

    return (

        <Col sm="5" >
            <div className="thumbnails">
                <div className="thumbnail">
                    <div className="rect" id="rect"></div>
                    <img src={image}>
                    </img>
                </div>
                <div className="zoom" style={{ backgroundImage: "url(" + image  + ")"}}></div>
            </div>


            <div className="image-additional">
                {
                   imageList ?  imageList.map((item,key) =>(
                        <div onClick={()=>changeImage(item)} className="item " key={key}>
                            <img src={item}>

                            </img>
                        </div>
                    )) : null
                }
            </div>

        
        </Col>
    );
}

export default Product_Detail_Image;