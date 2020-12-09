import React,{useState} from 'react';
import './product.css';
import { Container, Row, Col } from 'reactstrap';

function Product(props) {

    //Att
    const [attribute,setAttribute] = useState([]);
    var att = [];

    //category
    const cate = [`Shoe (${0})`,`Sandal (${0})`,`Tut (${0})`];

    //color
    const color = [
        "white","blue","green","orange","black","green","orange", 
    ];
    var color1 = [],color2 = [];
    function divideColor(){
        for(let i = 0 ; i < 4 ; i++){
            color1[i] = color[i];
        }
        for(let j = 5 ; j < color.length ; j++){
            color2[j] = color[j];
        }
    }
    divideColor();

    //Manufacturer
    const manuf = [`Nike (${0})`,`Adidas (${0})`,`Jordan (${0})`,`Balenciaga (${0})`];


    //Attribute
    function addAtt(item){
        setAttribute(oldArray => [...oldArray, item]);
    }
    function clearAtt(item){
        attribute.filter(item);
    }

    console.log(attribute);
    console.log(att);

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
        
                                                        <div className="clear">
                                                            <img src="/Assets/images/cancel.png"></img>
                                                        </div>
                                                    </div>

                                                ))
                                            }
                                        

                                        <div className="clear-all">
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
                                            Price
                                        </h4>

                                        <div className="list-item">
                                            <div className="filter">
                                                <span className="item" href="https://www.youtube.com/">
                                                    $0.00 - $99.99 (2)
                                                </span>
                                            </div>

                                            <div className="filter">
                                                <span className="item" href="https://www.youtube.com/">
                                                    $100.00 - $149.00 (2)
                                                </span>
                                            </div>

                                            <div className="filter">
                                                <span className="item" href="https://www.youtube.com/">
                                                    $150.00 - $199.00 (2)
                                                </span>
                                            </div>
                                            
                                            <div className="filter">
                                                <span className="item" href="https://www.youtube.com/">
                                                    $200.00 and above (2)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="filter-color">
                                        <h4>
                                            Color
                                        </h4>

                                        <div className="item-colors">
                                                {
                                                    color1.map((item,key) => (
                                                        <span className="color" color={item} key={key}></span>
                                                    ))
                                                }
                                        </div>
                                        <div className="item-colors">
                                                {
                                                    color2.map((item,key) => (
                                                        <span className="color" color={item} key={key}></span>
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
                                                    <div className="filter" key={key}>
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

                </Col>
            </Row>
        </Container>
    );
}

export default Product;