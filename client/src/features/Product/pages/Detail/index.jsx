import React, { useEffect, useState } from 'react';
import './detail.css'
import { Container, Row, Col, Breadcrumb } from 'reactstrap';
import Header from '../../../../components/Header/index.jsx';
import Product_Detail_Item from '../../components/Product_Detail_Item';
import Product_Detail_Related from '../../components/Product_Detail_Related';
import Product_Detail_Review from '../../components/Product_Detail_Review';
import Breadcrumbs from '../../../../components/Breadscrumbs';
import productApi from '../../../../api/productApi';
import { useParams } from "react-router-dom";

function DetailPage(props) {
    let { _idProduct,_idColorProduct } = useParams(); // id = useParams().id

    console.log(_idProduct,_idColorProduct);
    // console.log(typeof _idProduct); // string
    // console.log(typeof _idColorProduct); // string


    const [productItem,setProductItem] = useState([])

    useEffect(() => {
        const fetchSingleProduct = async () =>{
            try {
                
                const response = await productApi.get(_idProduct);
                //console.log(response.data);
                setProductItem(response.data);
            } catch (error) { 
                console.log('Failed to fetch category list: ', error);
            }
        }
        fetchSingleProduct();
    },[])
    console.log(productItem.data ? productItem.data[0] : null);
    //console.log(productItem.data ? productItem.data[0].colorProducts[(productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct) == -1 ? 0: productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct))].images : null);
    const color = [];
    const colorProduct = {};
    const handleData = () => {
        if(productItem.data){
            // get all color
            productItem.data[0].colorProducts.map(item => color.push(item.color.name));

            // get all images by color
            for(let i = 0 ; i < color.length ; i++){
                colorProduct[`${color[i]}`] = []
                colorProduct[color[i]].push(productItem.data[0].colorProducts[i].images)

            }
            
        }

    }
    handleData();
    console.log(colorProduct);
    
    return (
        <div className="">
            <Header/>
            <Breadcrumbs title="Product" linkBack="Home" active="Nike Boom X"/>
            <div className="main-product-detail">
        
                <Product_Detail_Item 
                    productName = {productItem.data ? productItem.data[0].name : null}
                    countReview = {productItem.data ? productItem.data[0].review.length : null}
                    productImages = {productItem.data ? productItem.data[0].colorProducts[(productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct) == -1 ? 0: productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct))].images : null}
                    productColor = {color}
                    productImagesColor = {colorProduct}
                    productPrice = "110"
                    productBrand = "Nike"
                    productDes = {productItem.data ? productItem.data[0].description : null}
                    productLove = {true}
                    numberStar={4.5}
                />
                <Product_Detail_Review numberReview={4} numberStar={4.7}/>
                <Product_Detail_Related/>
            </div>
        </div>

    );
}

export default DetailPage;