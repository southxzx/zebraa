import React, { useState } from 'react';
import './editdetail.css';
import { Card, Button, CardTitle, CardText,Container,Row,Col,CardImg } from 'reactstrap';


function ChooseColorEdit(props) {
    const {colorList} = props;

    const [colorProductDetail,setColorProductDetail] = useState({
        _id:'',
        images:[],
        avatar:'',
        color:{},
        price:'',
        product:'',
        sizeProducts:[]
    })

    console.log(colorList);


    const onNext = (e,item) => { 

        let infoNew = colorProductDetail;
        for (let it in item) {
            infoNew[it] = item[it];
        }
        

        props.infoData(infoNew);
        //Next step
        props.nextStep();
        
    }
    return (
        <div className="choose_color_edit">
            <Container>
                <Row>
                    {
                        colorList ? colorList.map(item => (
                            <Col key={item._id} lg="4">
                            <div className="choose_color">
                                <Card body inverse className="color" colors={item.color.name}>
                                    <CardTitle tag="h5">{item.color.name.toUpperCase()}</CardTitle>
                                    <div className="choose_text">
                                        <CardText>{item.price}$</CardText>
                                        <CardText> - </CardText>
                                        <CardText>{item.sizeProducts.length} Size</CardText>
                                    </div>
                                    <div className="choose_img"><CardImg top width="100%" src={item.images[0]} alt="Card image cap" /></div>
                                    <Button onClick={(e) => onNext(e,item)} color="primary">Choose</Button>
                                </Card>
                            </div>
                            </Col>
                        )) : null
                    }
                </Row>
            </Container>

        </div>
    );
}

export default ChooseColorEdit;