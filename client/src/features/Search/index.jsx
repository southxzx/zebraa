import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Breadscrumbs from '../../components/Breadscrumbs';
import CardV2 from '../../components/CardV2';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import searchApi from '../../api/searchApi';
import './search.css';


function Search() {

    var currentLocation = window.location.href;
    var index = currentLocation.indexOf('=');
    var keyword = currentLocation.slice(index+1,currentLocation.length).trim();

    useEffect(() => {
        const fetchSearch = async () => {
            const response = await searchApi.get(keyword);
            console.log(response.data);
            setProduct(response.data)
        }
        fetchSearch();
    },[1])


    const [product,setProduct] = useState([]);
    //console.log(product.data);


    return (
        <div>
            <Header/>
            <Breadscrumbs
                title="Search - Adidas Basic"
                linkBack="Home"
                active="Search"
            />
            <div className="search-section">
                <Container>
                    <div className="search-content">
                        <div className="search-form">
                            <div className="left-side">
                                <img src="/Assets/images/search.png"/>
                                <form>                                   
                                    <input className="search-input" type="search" placeholder="Search" name="name"/>                                            
                                </form>
                            </div>
                            <div className="right-side">
                                <div className="vertical-divider"></div>
                                <select class="custom-select" id="inputGroupSelect01">
                                    <option selected>Sneaker</option>
                                    <option value="1">Shoes</option>
                                    <option value="2">Sandal</option>
                                    <option value="3">Socks</option>
                                </select>
                                <div className="vertical-divider"></div>
                                <select class="custom-select" id="inputGroupSelect01">
                                    <option selected>Adidas</option>
                                    <option value="1">Nikes</option>
                                    <option value="2">Balenciaga</option>
                                    <option value="3">Vans</option>
                                </select>
                            </div>
                        </div>
                        <h4>Result of "{keyword}"</h4>
                    </div>
                    <div className="product-list">
                    <Row>
                        {
                            product.data ? ( product.data.map((data,key) =>(
                                    <Col key={key} md="4">
                                        <CardV2
                                            productId = {data._id}
                                            productName = {data.name}
                                            productCategory = {data.category.name}
                                            productColorProductId = {(typeof(data.colorProducts[0]) != 'undefined' ) ? 
                                            (
                                                data.colorProducts[( data.colorProducts.map(item => item.avatar).indexOf(true) ) == -1 ? 0 : data.colorProducts.map(item => item.avatar).indexOf(true)]._id
                                            ) 
                                            : null}
                                            productImage = {(typeof(data.colorProducts[0]) != 'undefined' ) ? 
                                            (
                                                data.colorProducts[( data.colorProducts.map(item => item.avatar).indexOf(true) ) == -1 ? 0 : data.colorProducts.map(item => item.avatar).indexOf(true)].images[0]
                                            ) 
                                            : null}

                                            productPrice = {(typeof(data.colorProducts[0]) != 'undefined' ) ? 
                                            (
                                                data.colorProducts[( data.colorProducts.map(item => item.avatar).indexOf(true) ) == -1 ? 0 : data.colorProducts.map(item => item.avatar).indexOf(true)].price
                                            ) 
                                            : null}

                                            numberStar={(typeof(data.review[0]) != 'undefined' ) ? 
                                            (

                                                data.review.reduce((accumulator, currentValue, currentIndex,array) =>
                                                    accumulator + currentValue.rating/array.length
                                                ,0)
                                                    
                                            ) 
                                            : 0}

                                            // Tất cả hình của product
                                            allProductImages = {data.colorProducts}
                                                
                                        />
                                    </Col>
                            ))) :null
                        }
                    </Row>
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default Search
