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
        imgFile: []

    });

    const [colorList,setColorList] = useState([]);
    const [imageFile, setImageFile] = useState([]);

    const {_idProduct,color,price,avatar,imgFile} = formData;

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    };

    
    function handleImgChange(event) {
        const imgFiles = event.target.files[0];

        //Check duplicate or undefined
        let flag = true;
        for(let i =0 ;i < imageFile.length;i++){
            if(imageFile && imgFiles){
                if(imageFile[i].lastModified == imgFiles.lastModified)
                    flag = false;
            }
            if(!imgFiles){
                flag = false;
            }

        }

        if(flag === true){
            setImageFile(oldArray => [...oldArray, imgFiles]);
        }
        
    }
    console.log(imageFile);

    useEffect(() => {
        setFormData({...formData,imgFile:imageFile})
    },[imageFile])

    

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if(_idProduct && color && price ){
            let bodyFormData = new FormData();
            
            bodyFormData.append('color',color);
            bodyFormData.append('price',price);
            bodyFormData.append('avatar',avatar);
            bodyFormData.append('product',_idProduct);
            imgFile.forEach(value => bodyFormData.append('images',value));


            axiosClient.post('/colorProduct/add',bodyFormData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res=>{
                setFormData({
                    _idProduct : '',
                    color: '',
                    price: '',
                    avatar: false,
                    imgFile: []
                })
            })
            .catch(err=>{
                setFormData({
                    _idProduct : '',
                    color: '',
                    price: '',
                    avatar: false,
                    imgFile: []
                })
            })

            //Next step
            props.nextStep();
        }
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseColor = await colorApi.getAll();
                const responseProduct = await productApi.getAll({});
                //console.log(responseColor.data);
                //console.log(responseColor.data[0]._id);

                // console.log(responseProduct.data.data[responseProduct.data.data.length - 1]);
                setColorList(responseColor.data);
                setFormData({...formData, color: responseColor.data[0]._id ,  _idProduct: responseProduct.data.data[responseProduct.data.data.length - 1]._id});
                
                
            } catch (error) {
                console.log('Failed to fetch color list: ', error);
            }
        }

        fetchData();
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
 
                    <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="file" />
                    <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" />
                    <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" />
                    <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" />
                    <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" />


                </div>

                <button type="submit" className='btn-default btn-subscribe btn-next'>
                    Next
                </button>

            </form>

        </div>
    );
}

export default AddColorProduct;