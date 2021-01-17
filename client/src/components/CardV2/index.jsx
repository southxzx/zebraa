import React, { useEffect, useState } from 'react';
import './cardV2.css'
import Star from '../Star';
import {
    NavLink,Link
  } from "react-router-dom";
import { Row, Col } from 'reactstrap';


function CardV2(props) {

    const { productId,
            productName,
            productCategory,
            productColorProductId,
            productImage,
            productPrice,
            numberStar,
            allProductImages} = props;
    
    // console.log(allProductImages);

    const [isHovered, setIsHovered1] = useState(false);
    const [avatar, setAvatar] = useState(productImage);

    // Hover vào card
    const handleHover = () => {
        setIsHovered1(!isHovered);
    }

    // Hover vào color 
    const handleHoverAvatar = (key) => {
        setAvatar(allProductImages[key].images[0])
    }

    useEffect(() => {
        setAvatar(productImage)
    },[props])

    console.log(avatar)

    function chuyenDoiUrl(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();     
 
        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
 
        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');
 
        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');
    
        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');
    
        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');
    
        // return
        return str;
    }
    return (
        
            <div onMouseEnter={handleHover} onMouseLeave={handleHover} className={isHovered ? "item-inner item-inner-active" : "item-inner" }>
                <div className="image">
                    <Link to={"/products/" + chuyenDoiUrl(productName + '-'+ productCategory) + '/' + productId + '/' + productColorProductId} >
                        <img src={avatar} />
                    </Link>                
                </div>             
                    {isHovered ?
                    (<div>
                        <div className="item-color">
                            <Row>
                                {
                                    allProductImages.map((item, key) => (
                                        <Col md="3" key={key}>
                                            <div className="img-color" onMouseEnter={()=>handleHoverAvatar(key)}>
                                                <img src={item.images[0]} alt="Image Color" />
                                            </div>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                        <div className="btn-cart">
                            <Link to='' className="btn-default btn-add-to-cart">
                                Add to cart
                        </Link>
                        </div>
                    </div>)
                        : 
                    (<div className="caption">
                        <div className="rating-box">
                            <Star numberStar={numberStar} />
                        </div>
                        <Link to='' className="product-name">
                            {productName.length > 25 ? productName.slice(0, 25).concat('...') : productName}
                        </Link>
                        <div className="price-box">
                            <p className="new">${productPrice}</p>
                            <p className="old">$345.00</p>
                        </div>
                    </div>)}
            </div>

        
    )
}

export default CardV2;