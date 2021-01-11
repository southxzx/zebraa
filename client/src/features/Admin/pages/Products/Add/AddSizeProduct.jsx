import React,{useEffect, useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axiosClient from '../../../../../api/axiosClient';
import productApi  from '../../../../../api/productApi'; 
import colorApi from '../../../../../api/colorApi';
import sizeApi from '../../../../../api/sizeApi';
import colorProduct from '../../../../../api/colorProductApi';


function AddSizeProduct(props) {

    const [formData, setFormData] = useState({
        _idColorProduct : '',
        quantity: 0,
        _idSize : ''

    });

    const [sizeList, setSizeList] = useState([]);

    const {_idColorProduct,quantity,_idSize} = formData;

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    };

    
    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if(_idSize && _idColorProduct && quantity){

            axiosClient.post('/sizeProduct/add',{
                colorProduct: _idColorProduct,
                size: _idSize,
                quantity: parseInt(quantity)

            })
            .then(res => {})
            .catch(err => {})
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseSize = await sizeApi.getAll();
                const responseColorProduct = await colorProduct.getAll({});
                console.log(responseSize.data);
                console.log(responseColorProduct.data);

                // console.log(responseProduct.data.data[responseProduct.data.data.length - 1]);
                setSizeList(responseSize.data);
                setFormData({...formData, _idSize: responseSize.data[0]._id ,  _idColorProduct: responseColorProduct.data[responseColorProduct.data.length - 1]._id});
                
                
            } catch (error) {
                console.log('Failed to fetch color list: ', error);
            }
        }

        fetchData()
    },[])

    console.log(formData);

    return (
        <div className="add-product-size">
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="add-product-size-frm">
                    <div className="size">
                        <Input onChange={(event)=>handleChange(event)} type="select" name="_idSize" id="exampleSelect">
                            {
                                sizeList ? sizeList.map(item => (
                                    <option onChange={(event)=>handleChange(event)} value={item._id} key={item._id}>{item.name}</option>
                                )) : null
                            }
                        </Input>
                        <span className="error-message">&nbsp;</span>
                    </div>

                    <div className="quantity">
                        <Input 
                            type="number" 
                            className="frm-input frm-error"  
                            placeholder="Quantity"
                            name="quantity"
                            onChange={(event)=>handleChange(event)}
                            value={quantity}/>
                        <span className="error-message">&nbsp;</span>
                    </div>


                </div>

                <button type="submit" className='btn-default btn-subscribe btn-next'>
                    Next
                </button>

            </form>
        </div>
    );
}

export default AddSizeProduct;