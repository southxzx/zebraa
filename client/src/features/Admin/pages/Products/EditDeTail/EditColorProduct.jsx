import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Uploader,Icon} from 'rsuite';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axiosClient from '../../../../../api/axiosClient';
import productApi  from '../../../../../api/productApi'; 
import colorApi from '../../../../../api/colorApi';


function EditColorProduct(props) {
    const {colorProductDetail} = props;
    console.log(colorProductDetail._id);

    const [formData, setFormData] = useState({
        color: '',
        price: '',
        avatar: false,
        imgFile: [],
        
    });

    const {color,price,avatar,imgFile} = formData;
    const [colorList,setColorList] = useState([]);
    

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    };


    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if(color && price){
            let bodyFormData = new FormData();
            
            bodyFormData.append('color',color);
            bodyFormData.append('price',parseInt(price));
            bodyFormData.append('avatar',avatar);
            imgFile.forEach(value => bodyFormData.append('images',value.originFileObj));


            axiosClient.put(`/colorProduct/update?id=${colorProductDetail._id}`,bodyFormData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res=>{

            })
            .catch(err=>{

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
                setFormData({...formData, color: colorProductDetail.color._id ,  
                            price: colorProductDetail.price,
                });
                
                
            } catch (error) {
                console.log('Failed to fetch color list: ', error);
            }
        }

        fetchData();
    },[])

    console.log(formData);
    console.log(colorList);



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
        <div className="edit_color_product">
            <form  onSubmit={(event)=>handleSubmit(event)}>
                <div className="add-product-admin-frm">
                    <div className="color">
                        <Input onChange={(event)=>handleChange(event)} type="select" name="color" id="exampleSelect">
                            {
                                colorList ? colorList.map((item,key) => item._id === colorProductDetail.color._id ? 
                                    (<option key={key} selected="selected" onChange={(event)=>handleChange(event)} value={item._id} key={item._id}>{item.name}</option>) 
                                    : (<option onChange={(event)=>handleChange(event)} value={item._id} key={item._id}>{item.name}</option>) 
                                ) : null

                                
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

                    <div className="edit_color_showImg">
                        <div className="color_showImg">
                            {
                                colorProductDetail ? colorProductDetail.images.map((item,key) => (
                                    <div key={key} className="showImg"><img src={item}></img></div>
                                )) : null
                            }

                        </div>

                        <div className="showArrow">
                            <div className="arrow_down">
                                <img src="/Assets/images/down-arrow.png"></img>
                            </div>
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
 
                    

                </div>

                <button type="submit" className='btn-default btn-subscribe btn-next'>
                   Save and Next
                </button>

            </form>


        </div>
    );
}

export default EditColorProduct;