import React,{useEffect, useState} from 'react';
import './product.css';
import { Container, Row, Col } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import CardV2 from '../../../../components/Card';



function Product(props) {

    //Att
    const [attribute,setAttribute] = useState([]);

    //category
    const cate = [`Shoe (${0})`,`Sandal (${0})`,`Tut (${0})`];

    //price
    const [price, setPrice] = useState({min:2,max:100});
    //color
    const color = [
        "white","blue","green","orange","black","green","orange", 
    ];
    var color1 = [],color2 = [];
    function divideColor(){
        if(color.length >= 4 ){
            for(let i = 0 ; i < 4 ; i++){
                color1[i] = color[i];
            }
            for(let j = 4 ; j < color.length ; j++){
                color2[j] = color[j];
            }
        }
        else{
            for(let i = 0 ; i < color.length ; i++){
                color1[i] = color[i];
            }
        }

    }
    divideColor();

    //Manufacturer
    //`Nike (${0})`,`Adidas (${0})`,`Jordan (${0})`,`Balenciaga (${0})`
    const manuf = [
        `Nike (${0})`,`Adidas (${0})`,`Jordan (${0})`,`Balenciaga (${0})`
    ];

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
            return value != item;
        });
        setAttribute(filtered);
    }
    function clearAll(){
        setAttribute([]);
    }

    console.log(attribute);


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
                                                    color1.map((item,key) => (
                                                        <span onClick={()=> addAtt(item)} className="color" color={item} key={key}></span>
                                                    ))
                                                }
                                        </div>
                                        <div className="item-colors">
                                                {
                                                    color2.map((item,key) => (
                                                        <span onClick={()=> addAtt(item)} className="color" color={item} key={key}></span>
                                                    ))
                                                }
                                        </div>
                                    </div>

                                    <div className="filter-manufacture">
                                        <h4>
                                            Manufacturer
                                        </h4>
                                        <div className="list-item">
                                            {
                                                manuf.map((item,key)=>(
                                                    <div onClick={()=> addAtt(item)} className="filter" key={key}>
                                                        <span className="item" href="https://www.youtube.com/">
                                                            {item}
                                                        </span>
                                                    </div>
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
                                Total 100 products
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
                                <Col md="4">
                                    
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Product;