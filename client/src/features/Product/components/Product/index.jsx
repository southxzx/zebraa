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
import Header from '../../../../components/Header';
import Breadcrumb from '../../../../components/Breadscrumbs';


import { Spinner } from 'reactstrap';


function Product(props) {

    //Att
    const [attribute,setAttribute] = useState({
        category:[],
        "colorProducts.color":[],
        "colorProducts.price":[],
    });

    // isColorClicked = false; type= color
    // if (isClicked == true) HandleAvatar(ProductList); 

    //category
    const [cate,setCate] = useState([]);
    const [color,setColor] = useState([]);

    //price
    const [price, setPrice] = useState({min:2,max:100});

    //Attribute
    function addAtt(item,type){  
        
        if (type === "colorProducts.price"){
            // THÊM VÀO STATE FILTERS
            // vd: category: ['_id1', '_id2']
            const newFilters = {...params['filters']};
            const priceFilter = [];
            // item={min:0, max:100}
            priceFilter.push(item.min)
            priceFilter.push(item.max)

            newFilters[type] = priceFilter;


            setParams({
                ...params,
                filters: newFilters
            });
        }

        // THÊM TÊN VÀO MẢNG Attribute
        const newAttributes = {...attribute};
        // Tìm phần tử đó đã có trong mảng hay chưa
        const index = newAttributes[type].indexOf(item);
        if (index === -1){
            newAttributes[type].push(item);
            setAttribute({
                ...attribute,
                newAttributes
            })
        }



        // THÊM VÀO STATE FILTERS
        // vd: category: ['_id1', '_id2']
        const newFilters = {...params['filters']};
        newFilters[type].push(item._id);

        setParams({
            ...params,
            filters: newFilters
        });
    }

    function clearAtt(item, type){

        // XÓA TRONG STATE FILTERS
        // vd: category: ['_id1', '_id2']
        const newFilters = {...params['filters']};
        const index = newFilters[type].indexOf(item._id);
        if(index > -1){
            newFilters[type].splice(index, 1);
        }

        setParams({
            ...params,
            filters: newFilters
        });

        // XÓA TRONG ATTRIBUTE
        const newAttributes = {...attribute};
        const index2 = newAttributes[type].indexOf(item);
        if (index2 > -1){
            newAttributes[type].splice(index2, 1);
        }

        setAttribute({
            ...attribute,
            newAttributes
        })
    }
    function clearAll(){
        setAttribute({
            "category":[],
            "colorProducts.color":[],
            "colorProducts.price":[],
        });
        const filters = {
            "category": [],
            "colorProducts.color":[],
            "colorProducts.price": []
        };
        setParams({
            ...params,
            filters: filters
        });
    }



    ///Pagination
    
    const productList = useSelector(state => state.product.productList.data);
    const loading = useSelector(state => state.product.loading);

    const [totalRecords, setTotalRecords] = useState(100);
    const [currentPage,setCurrentPage] = useState(1);
    const pageLimit = 9;

    const [params,setParams] = useState({
        limit: pageLimit,
        // VD page = 1 thì skip = 0, page = 2 thì skip = 9
        skip: 0,
        filters:{
            "category": [],
            "colorProducts.color":[],
            "colorProducts.price": []
        }
    });



    const dispatch = useDispatch();

    useEffect(() => {

        const fetchProductList = async () =>{
            try {
                let response;
                // Xử lý avatar qua response
                if (params["filters"]["colorProducts.color"].length > 0){
                    response = await productApi.getAll(params);

                    // for qua product
                    for (let i = 0; i < response.data.data.length; i++){
                        // for qua color product trong mỗi product
                        for (let j = 0; j < response.data.data[i].colorProducts.length; j++){
                            // for màu trong param
                            for (let k = 0; k < params["filters"]["colorProducts.color"].length; k++){
                                // nếu màu trong param == màu trong color product thì đổi avatar = true
                                if (params["filters"]["colorProducts.color"][k] 
                                    == response.data.data[i].colorProducts[j].color._id){

                                        console.log("dd");
                                        response.data.data[i].colorProducts[j].avatar = true;
                                }
                                else{
                                    response.data.data[i].colorProducts[j].avatar = false;
                                }
                            }
                            
                        }
                    }

                    console.log(response.data.data);
                                      
                }
                else{
                    response = await productApi.getAll(params);
                }

                await dispatch({ type: 'OnSuccess', payload: response.data })
                //console.log(response.data);            
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }

        fetchProductList();
    }, [params]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await categoryApi.getAll();
                // Lưu response cate vào state 
                response.data.map(item => setCate(oldArray => [...oldArray, item]));
            } catch (error) {
                console.log('Failed to fetch category list: ', error);
            }
        }
        const fetchColor = async () => {
            try {
                const response = await colorApi.getAll();
                response.data.map(item => setColor(oldArray => [...oldArray, item]));
            }
            catch (err) {
                console.error('Failed to fetch color list: ', err);
            }
        }
        fetchCategory();
        fetchColor();
    },[1]);

    useEffect(() => {
        setParams({
            ...params,
            skip: (currentPage-1)*9
        })
    },[currentPage])
    //console.log(currentPage);
    // productList ? console.log(productList[0]) : console.log('caccas');;
    //productList ? productList.map(x => console.log( (typeof(x.colorProducts[0]) != 'undefined' ) ? x.colorProducts[0].images[0] : 'kk')) : console.log('nu');

    return (
        <div>
        <Header/>
        <Breadcrumb
            title="Product"
            linkBack="Home"
            active="Product"
        />
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
                                                attribute['category'].map((item,key)=>(
                                                    <div className="att" key={key}>
                                                        <div className="att-item">
                                                            {item.name}
                                                        </div>
                                                        <div onClick={() => clearAtt(item,'category')} className="clear">
                                                            <img src="/Assets/images/cancel.png"></img>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            {
                                                attribute['colorProducts.color'].map((item, key) => (
                                                    <div className="att" key={key}>
                                                        <div className="att-item">
                                                            {item.name}
                                                        </div>
                                                        <div onClick={() => clearAtt(item, 'colorProducts.color')} className="clear">
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
                                                    <div onClick={()=> addAtt(item,'category')} className="filter" key={key}>
                                                        <span className="item" href="https://www.youtube.com/">
                                                            {item.name}
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
                                                step={50}
                                                value={price}
                                                onChange={value => setPrice(value)}
                                                //onChangeComplete={value =>console.log("price:", value)}
                                                onChangeComplete={value => addAtt(value,"colorProducts.price")} 
                                                />
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
                                                        <span onClick={()=> addAtt(item,'colorProducts.color')} className="color" color={item.name} key={key}></span>
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
                                Total {productList ? productList.length : null} products
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
        </div>
    );
}

export default Product;