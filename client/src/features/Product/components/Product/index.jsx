import React,{useEffect, useState } from 'react';
import './product.css';
import { Container, Row, Col } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import CardV2 from '../../../../components/CardV2';
import Pagination from 'reactjs-hooks-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import productApi from '../../../../api/productApi';
import categoryApi from '../../../../api/categoryApi';
import colorApi from '../../../../api/colorApi';

import { Spinner } from 'reactstrap';



function Product(props) {

    //Att
    const [attribute,setAttribute] = useState([]);

    //category
    const [cate,setCate] = useState([]);

    //price
    const [price, setPrice] = useState({min:2,max:100});
    //color
    const [color,setColor] = useState([]);

    //Manufacturer
    //`Nike (${0})`,`Adidas (${0})`,`Jordan (${0})`,`Balenciaga (${0})`

    //Attribute
    function addAtt(item){       
        // cate.splice(cate.indexOf(item),1);
        var i = item.indexOf(' ');
        if(i > 0){
            if(attribute.indexOf(item.substr(0,i)) >= 0)
            return;
            setAttribute(oldArray => [...oldArray, item.substr(0,i)]);
        }
        else{
            if(attribute.indexOf(item) >= 0)
            return;
            setAttribute(oldArray => [...oldArray, item]);
        }
        
    }
    function clearAtt(item){
        var filtered = attribute.filter(function(value, index, arr){
            return value !== item;
        });
        setAttribute(filtered);
    }
    function clearAll(){
        setAttribute([]);
    }

    console.log(attribute);


    ///Pagination
    
    const productList = useSelector(state => state.product.productList.data);
    const loading = useSelector(state => state.product.loading);

    const [totalRecords, setTotalRecords] = useState(100);
    const [currentPage,setCurrentPage] = useState(1);
    const pageLimit = 9;

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductList = async () =>{
            try {
                const params = {
                    limit: pageLimit,
                    skip: currentPage

                };
    
                const response = await productApi.getAll(params);
                await dispatch({ type: 'OnSuccess', payload: response.data })
                //console.log(response.data);
                

            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }

        }

        fetchProductList();
    }, [currentPage]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await categoryApi.getAll();
                //console.log(response.data);
                response.data.map(item => setCate(oldArray => [...oldArray, item.name]))
            } catch (error) {
                console.log('Failed to fetch category list: ', error);
            }
        }

        const fetchColor = async () => {
            try {
                const response = await colorApi.getAll();
                console.log(response.data);
                response.data.map(item => setColor(oldArray => [...oldArray, item.name]))
            } catch (error) {
                console.log('Failed to fetch color list: ', error);
            }
        }

        fetchCategory();
        fetchColor();
    },[])
    //console.log(currentPage);
    //console.log(loading);
    //productList ? console.log(productList[0].colorProducts[0].images[0]) : console.log('caccas');;


    //productList ? productList.map(x => console.log( (typeof(x.colorProducts[0]) != 'undefined' ) ? x.colorProducts[0].images[0] : 'kk')) : console.log('nu');

    return (
        <Container>
            <Row>

                <Col sm="12" md="3">
                    <div className="layer-navigation">
                        <div className="panel">
                            <div className="layer-heading">
                                <h3>
                                    Shop By
                                </h3>
                            </div>

                            <div className="layer">
                                <div className="list-groups">
                                    <div className="filter-attribute">
                                     
                                            {
                                                attribute.map((item,key)=>(
                                                    <div className="att" key={key}>
                                                        <div className="att-item">
                                                            {item}
                                                        </div>
        
                                                        <div onClick={() => clearAtt(item)} className="clear">
                                                            <img src="/Assets/images/cancel.png"></img>
                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        

                                        <div onClick={()=>clearAll()} className="clear-all">
                                            Clear all
                                        </div>
                                    </div>

                                    <div className="filter-category">
                                        <h4>
                                            Categories
                                        </h4>
                                        <div className="list-item">
                                
                                            {
                                                cate.map((item,key)=>(
                                                    <div onClick={()=> addAtt(item)} className="filter" key={key}>
                                                        <span className="item" href="https://www.youtube.com/">
                                                            {item}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div className="filter-price">
                                        <h4>
                                            Price $
                                        </h4>

                                        <div className="list-item">
                                            <form className="form">
                                            <InputRange
                                                maxValue={500}
                                                minValue={0}
                                                value={price}
                                                onChange={value => setPrice(value)}
                                                onChangeComplete={value => console.log(value)} />
                                            </form>
                                            
                                        </div>
                                    </div>

                                    <div className="filter-color">
                                        <h4>
                                            Color
                                        </h4>

                                        <div className="item-colors">
                                                {
                                                    color.map((item,key) => (
                                                        <span onClick={()=> addAtt(item)} className="color" color={item} key={key}></span>
                                                    ))
                                                }
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col sm="12" md="9">
                    <div className="main-content-product">
                        <div className="toolbar">
                            <div className="modes">
                                <i className="fa fa-th" aria-hidden="true"></i>
                                <i className="fa fa-th-list" aria-hidden="true"></i>
                            </div>

                            <div className="toolbar-amount">
                                Total {productList? productList.length : null} products
                            </div>

                            <div className="sort">
                                <span>Sort By:</span>
                                <div className="dropdown drop-product">
                                    <button className="btn btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Dropdown
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button className="dropdown-item" type="button">Action</button>
                                        <button className="dropdown-item" type="button">Another action</button>
                                        <button className="dropdown-item" type="button">Something else here</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-list">
                            <Row>
                                {
                                   loading ? ( <Spinner className="loading" color="primary" /> ) :( productList.map((data,key) =>(
                                        <Col key={key} md="4">
                                            <CardV2
                                                productName = {data.name}
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
                                                
                                            />
                                        </Col>
                                    )))
                                }


                            </Row>


                        </div>

                        <div className="d-flex flex-row py-4 justify-content-end">
                            <Pagination
                                totalRecords={totalRecords}
                                pageLimit={pageLimit}
                                pageRangeDisplayed={1}
                                onChangePage={setCurrentPage}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Product;