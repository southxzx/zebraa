import React,{useEffect, useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axiosClient from '../../../../../api/axiosClient';
import productApi  from '../../../../../api/productApi'; 
import colorApi from '../../../../../api/colorApi';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

function AddColorProduct(props) {

    const [formData, setFormData] = useState({
        _idProduct : '',
        color: '',
        price: '',
        avatar: false,
        imgFile: []

    });

    const { promiseInProgress } = usePromiseTracker();

    const [colorList,setColorList] = useState([]);
    const [imageFile, setImageFile] = useState([]);

    const {_idProduct,color,price,avatar,imgFile} = formData;

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    };

    
    // function handleImgChange(event) {
    //     const imgFiles = event.target.files[0];

    //     //Check duplicate or undefined
    //     let flag = true;
    //     for(let i =0 ;i < imageFile.length;i++){
    //         if(imageFile && imgFiles){
    //             if(imageFile[i].lastModified == imgFiles.lastModified)
    //                 flag = false;
    //         }
    //         if(!imgFiles){
    //             flag = false;
    //         }

    //     }

    //     if(flag === true){
    //         setImageFile(oldArray => [...oldArray, imgFiles]);
    //     }
        
    // }
    // console.log(imageFile);

    // useEffect(() => {
    //     setFormData({...formData,imgFile:imageFile})
    // },[imageFile])
    console.log(promiseInProgress);
    

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if(_idProduct && color && price ){
            let bodyFormData = new FormData();
            
            bodyFormData.append('color',color);
            bodyFormData.append('price',price);
            bodyFormData.append('avatar',avatar);
            bodyFormData.append('product',_idProduct);
            imgFile.forEach(value => bodyFormData.append('images',value.originFileObj));


            trackPromise(axiosClient.post('/colorProduct/add',bodyFormData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }))
            .then(res=>{
                setFormData({
                    _idProduct : '',
                    color: '',
                    price: '',
                    avatar: false,
                    imgFile: []
                })
                //Next step
                props.nextStep();
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

    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        const imgFiles = newFileList;

        setFormData({...formData,imgFile:imgFiles})
        
    };
    
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
        <div className="add-color-product-admin">
            {
                promiseInProgress ? (
                    <div className="load">
                        <Loader
                            type="ThreeDots"
                            color="#ff6500"
                            height={30}
                            width={30} //3 secs

                        />
                    </div>
                ) : 
                (
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
     
                        <div className="input_image_color">
                                <ImgCrop rotate>
                                    <Upload
                                        //action="http://localhost:3000/admin/products/edit/5ffc4cbedb153c18dcda44eb"
                                        listType="picture-card"
                                        fileList={fileList}
                                        type="file" 
                                        name="images"
                                        onChange={onChange}
                                        onPreview={onPreview}
                                        
                                    >
                                        {fileList.length < 5 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>
                                
                                {/* <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="file" />
                                <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" />
                                <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" />
                                <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" />
                                <Input type="file" name="images" onChange={(event) => handleImgChange(event)} id="exampleFile" /> */}
                            </div>
    
                    </div>
    
                    <button type="submit" className='btn-default btn-subscribe btn-next'>
                       Save and Next
                    </button>
    
                </form>
                )
            }
        </div>
    );
}

export default AddColorProduct;