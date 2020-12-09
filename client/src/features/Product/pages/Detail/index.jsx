import React from 'react';
import './detail.css'
import { Container, Row, Col } from 'reactstrap';
import Header from '../../../../components/Header/index.jsx';
import Product_Detail_Item from '../../components/Product_Detail_Item';
import Product_Detail_Related from '../../components/Product_Detail_Related';
import Product_Detail_Review from '../../components/Product_Detail_Review';


function DetailPage(props) {
    return (
        <div className="main-product-detail">
            <Header/>
            <Product_Detail_Item 
                productName = "Nike Boom X" 
                countReview = {1}
                productPrice = "$199"
                productBrand = "Nike"
                productDes = "Samsung Galaxy Tab 10.1, is the world’s thinnest tablet, measuring 8.6 mm thickness, running with Android 3.0 Honeycomb OS on a 1GHz dual-core Tegra 2 processor."
                productLove = {true}
                numberStar={4.5}
            />
            <Product_Detail_Review numberReview={4} numberStar={4.7}/>
            <Product_Detail_Related/>
        </div>
    );
}

export default DetailPage;