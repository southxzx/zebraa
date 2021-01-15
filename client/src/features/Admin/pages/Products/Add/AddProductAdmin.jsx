import React,{useEffect, useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axiosClient from '../../../../../api/axiosClient';
import categoryApi from '../../../../../api/categoryApi';
import productApi  from '../../../../../api/productApi'; 

function AddProductAdmin(props) {

    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        active: true,
        category: '',

    });
    const [cate,setCate] = useState([]);
    const { name, description,category,active } = formData;
    
    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    };

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if(name && description && category){
            setFormData({...formData,textChange: 'Submitting'});

            axiosClient.post('/product/add',{
                name,
                description,
                active,
                category
            })
            .then(res => {
                setFormData({
                    ...formData,
                    name:'',
                    description:'',
                    active:true,
                    category:'',
                    textChange:'Submitted'
                })
                
            })
            .catch(err => {
                setFormData({
                    ...formData,
                    name:'',
                    description:'',
                    active:true,
                    category:'',
                    textChange:'Submitted'
                })
                
            })


            //Next step
            props.nextStep();
        }

    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await categoryApi.getAll();
                console.log(response.data);

                setCate(response.data);
                setFormData({...formData, category: response.data[0]._id});
                
            } catch (error) {
                console.log('Failed to fetch cate list: ', error);
            }

            console.log(cate);

        }

        fetchCategory();
    },[])
    

    return (
        <div className="add-product-admin">
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="add-product-admin-frm">
                    <div className="name">
                        <Input 
                            type="name" 
                            className="frm-input frm-error"  
                            placeholder="Name Product"
                            name="name"
                            onChange={(event)=>handleChange(event)}
                            value={name}
                        />
                        <span className="error-message">&nbsp;</span>
                    </div>
                    <div className="description">
                        <Input 
                            type="description" 
                            className="frm-input frm-error"  
                            placeholder="Description"
                            name="description"
                            onChange={(event)=>handleChange(event)}
                            value={description}/>
                        <span className="error-message">&nbsp;</span>
                    </div>

                    <div className="category">
                        <Input onChange={(event)=>handleChange(event)} type="select" name="category" id="exampleSelect">
                            {
                                cate ? cate.map(item => (
                                    <option onChange={(event)=>handleChange(event)} value={item._id} key={item._id}>{item.name}</option>
                                )) : null
                            }
                        </Input>
                    </div>

                </div>

                <button type="submit" className='btn-default btn-subscribe btn-next'>
                   Save and Next
                </button>

            </form>
        </div>
    );
}

export default AddProductAdmin;