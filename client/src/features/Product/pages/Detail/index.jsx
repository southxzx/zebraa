import React, { useEffect, useState } from 'react';
import './detail.css'
import { Container, Row, Col, Breadcrumb } from 'reactstrap';
import Header from '../../../../components/Header/index.jsx';
import Footer from '../../../../components/Footer/index.jsx';
import Product_Detail_Item from '../../components/Product_Detail_Item';
import Product_Detail_Related from '../../components/Product_Detail_Related';
import Product_Detail_Review from '../../components/Product_Detail_Review';
import Breadcrumbs from '../../../../components/Breadscrumbs';
import productApi from '../../../../api/productApi';
import { useParams } from "react-router-dom";


function DetailPage(props) {
    let { _idProduct,_idColorProduct } = useParams(); // id = useParams().id

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
    //console.log(productItem.data ? productItem.data[0].colorProducts[(productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct) == -1 ? 0: productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct))].images : null);
    const color = [];
    const colorProduct = {};
    const price = {};
    const colorProductId = {};
    const handleData = () => {
        if(productItem.data){
            // get all color
            productItem.data[0].colorProducts.map(item => color.push(item.images[0]));

            // get all images by color
            for(let i = 0 ; i < color.length ; i++){
                //get all images by color
                colorProduct[`${color[i]}`] = []
                colorProduct[color[i]].push(productItem.data[0].colorProducts[i].images)

                // get all price by color
                price[`${color[i]}`] = productItem.data[0].colorProducts[i].price;

                // get all id colorProduct
                colorProductId[`${color[i]}`] = productItem.data[0].colorProducts[i]._id;

            }

        }

    }

    handleData();
    //console.log(colorProduct);
    //console.log(price);
    //console.log(productItem.data ? productItem.data[0].review : null);
    //console.log(colorProductId);
    return (
        <div className="">
            <Header/>
            <Breadcrumbs title="Product" linkBack="Product" active="Nike Boom X"/>
            <div className="main-product-detail">
        
                <Product_Detail_Item 
                    productSizes = {productItem.data ? productItem.data[0].colorProducts[
                        (productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct) == -1 
                        ? 0: productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct))].sizeProducts 
                        : null}
                    productName = {productItem.data ? productItem.data[0].name : null}

                    productImages = {productItem.data ? productItem.data[0].colorProducts[
                        (productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct) == -1 
                            ? 0: productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct))].images 
                            : null}

                    productColor = {color}
                    productImagesColor = {colorProduct}
                    productIdColor = {colorProductId}
                    productPrice = {productItem.data ? productItem.data[0].colorProducts[(productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct) == -1 ? 0: productItem.data[0].colorProducts.map(item => item._id).indexOf(_idColorProduct))].price : null}
                    productPriceColor = {price}
                    productBrand = {productItem.data ? productItem.data[0].category.name : null}
                    productDes = {productItem.data ? productItem.data[0].description : null}
                    productLove = {true}
                    productReview = {productItem.data ? productItem.data[0].review : null}
                />
                <Product_Detail_Review 
                    productReview = {productItem.data ? productItem.data[0].review : null}/>
                <Product_Detail_Related/>
            </div>
            <Footer/>
        </div>

    );
}

export default DetailPage;