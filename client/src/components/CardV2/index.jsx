import React, { useState } from 'react';
import './cardV2.css'
import Star from '../Star';
import {
    NavLink,Link
  } from "react-router-dom";


function CardV2(props) {

    const {productId,productName,productCategory,productColorProductId,productImage,productPrice,numberStar} = props;

    const [isHovered, setIsHovered1] = useState(false);
    const handleHover = () => {
        setIsHovered1(!isHovered);
    }

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
    console.log(productColorProductId);
    console.log(typeof productColorProductId);
    return (
        
            <div onMouseEnter={handleHover} onMouseLeave={handleHover} className={isHovered ? "item-inner item-inner-active" : "item-inner" }>
                <div className="image">
                    <Link to={"/products/" + chuyenDoiUrl(productName + '-'+ productCategory) + '/' + productId + '/' + productColorProductId} >
                        <img src={productImage} />
                    </Link>                
                </div>
                <div className="caption">
                    <div className="rating-box">
                        <Star numberStar={numberStar}/>
                    </div>
                    <Link to='' className="product-name">{productName}</Link>
                    {isHovered ?
                    <div className="btn-cart">
                        <Link to='' className="btn-default btn-add-to-cart">
                            Add to cart
                        </Link>
                    </div> : 
                    <div className="price-box">
                        <p className="new">${productPrice}</p>
                        <p className="old">$45.00</p>
                    </div>}
                </div>
            </div>

        
    )
}

export default CardV2;