import React, { useEffect, useState } from 'react';
import { Container, Row, Col,Button } from 'reactstrap';
import Card from '../../../components/Card';
import productApi from '../../../api/productApi';
import './countdown.css';

function Countdown() {
    const[product, setProduct] = useState([]);

    const sortThreeNewestProduct = (data,arr) => {
        arr.push(data[1]);
        arr.push(data[0]);
        arr.push(data[2]);
        return arr;
    }

    useEffect(()=>{
        const fetchThreeNewestProduct = async () => {
            const response = await productApi.getAll({limit:3,skip:0});
            console.log(response.data.data);
            setProduct(sortThreeNewestProduct(response.data.data,[]));
        }

        fetchThreeNewestProduct();
    },[])

    console.log('pr',product);

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
        <section className="countdown">
            <Container fluid={true}>
                <div className="countdown-title">
                    <img src="Assets/images/hot-price.png" alt="deal"/>
                    <h2>New Shoes Released</h2>
                </div>
                <div className="countdown-container">
                <Row>
                    {
                        product.length > 0 && product.map((data,key)=>(
                            <Col sm="12" lg="4" key={key}>
                                <div className="countdown-item">
                                    <Card
                                        image={data.colorProducts[0]?.images[0]}
                                        link={"/products/" + chuyenDoiUrl(data.name + '-' + data.category.name) + '/' + data._id + '/' + data.colorProducts[0]?._id}
                                        name={data.name} 
                                        price={data.colorProducts[0]?.price} 
                                        priceOld={data.colorProducts[0]?.price - 50} 
                                    />
                                </div>
                            </Col>  
                        ))
                    }                  
                </Row>
                </div>
            </Container>
        </section>
    )
}

export default Countdown
