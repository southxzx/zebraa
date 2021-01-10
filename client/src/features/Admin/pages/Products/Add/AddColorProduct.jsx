import React,{useEffect, useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axiosClient from '../../../../../api/axiosClient';
import productApi  from '../../../../../api/productApi'; 
import colorApi from '../../../../../api/colorApi';


function AddColorProduct(props) {

    const [formData, setFormData] = useState({
        _idProduct : '',
        color: '',
        price: '',
        avatar: false,


    });

    const [colorList,setColor] = useState([]);
    const {_idProduct,color,price,avatar} = formData;

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    };

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if(_idProduct && color && price ){
            var formDatas = new FormData();
            var imagefiles = document.querySelectorAll('.images');
            // console.log(imagefiles);
            imagefiles.forEach((value,key) => formDatas.append("images", value.files[key]));
            

            console.log(formDatas);
            axiosClient.post('/colorProduct/add',formDatas,{
                product: _idProduct,
                color,
                price,
                avatar,
                images: formDatas
            },{
                headers: {
                    "Content-Type": "multipart/form-data"
                  }
            })
            .then(res=>{})
            .catch(err=>{})
        }
        console.log(formData);
    }

    useEffect(() => {
        const fetchColor = async () => {
            try {
                const response = await colorApi.getAll();
                console.log(response.data);

                setColor(response.data);
                setFormData({...formData, color: response.data[0]._id});
                
            } catch (error) {
                console.log('Failed to fetch color list: ', error);
            }

           

        }

        const fetchLastProduct = async () => {
            try {
                const response = await productApi.getAll({});
                console.log(response.data);

                // console.log(response.data.data[response.data.data.length - 1]);
                setFormData({...formData, _idProduct: response.data.data[response.data.data.length - 1]._id});
                
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }

            

        }

        fetchColor();
        fetchLastProduct();
    },[])

    return (
        <div className="add-color-product-admin">
            <form  onSubmit={(event)=>handleSubmit(event)}>
                <div className="add-product-admin-frm">
                    <div className="color">
                        <Input onChange={(event)=>handleChange(event)} type="select" name="color" id="exampleSelect">
                            {
                                colorList ? colorList.map(item => (
                                    <option onChange={(event)=>handleChange(event)} value={item._id} key={item._id}>{item.name}</option>
                                )) : null
                            }
                        </Input>
                        <span className="error-message">&nbsp;</span>
                    </div>
                    <div className="price">
                        <Input 
                            type="text" 
                            className="frm-input frm-error"  
                            placeholder="Price"
                            name="price"
                            onChange={(event)=>handleChange(event)}
                            value={price}/>
                        <span className="error-message">&nbsp;</span>
                    </div>
 
                    <Input type="file" name="images" id="file" />
                    <Input type="file" name="images" id="exampleFile" />
                    <Input type="file" name="images" id="exampleFile" />
                    <Input type="file" name="images" id="exampleFile" />
                    <Input type="file" name="images" id="exampleFile" />


                </div>

                <button type="submit" className='btn-default btn-subscribe btn-next'>
                    Next
                </button>

            </form>
        </div>
    );
}

export default AddColorProduct;