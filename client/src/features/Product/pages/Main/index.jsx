import React,{useState} from 'react';
import './main.css';
import { Container, Row, Col } from 'reactstrap';
import Product from '../../components/Product';

function MainPage(props) {
    return(
        <div className="main-product">
            <Product/>
        </div>
    );
}

export default MainPage;