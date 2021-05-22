import React,{useEffect, useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axiosClient from '../../../../../api/axiosClient';
import categoryApi from '../../../../../api/categoryApi';
import './add.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../../Component/Common/Title';


function AddCategory(props) {

    const [formData, setFormData] = useState({
        name : "",
        
    });

    const {name} = formData;

    const handleChange = (event) => {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name);
        if(name){

            axiosClient.post('/category/add',{
                name: name,
                active: true

            })
            .then(res => {
                setFormData({
                    ...formData,
                    name: "",
                    textChange: "Submitted",
                  });
                toast.success("New category has been added! :)");
            })
            .catch(err => {
                setFormData({
                    ...formData,
                    name: "",
                    textChange: "Submitted",
                  });
                toast.error("Something went wrong! :(");
            })
        }
    }    

    return (
        <div className="add-category-admin">
            <ToastContainer/>
            <Title title="ADD CATEGORY" title_below="Zebraa Category" />
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="add-product-admin-frm">
                    <div className="name">
                        <Input 
                            type="name" 
                            className="frm-input frm-error"  
                            placeholder="Name Category"
                            name="name"
                            onChange={(event)=>handleChange(event)}
                            value={name}
                        />
                        <span className="error-message">&nbsp;</span>
                    </div>
                    

                </div>

                <button type="submit" className='btn-default btn-subscribe btn-next'>
                Save
                </button>

            </form>
    </div>
    );
}

export default AddCategory;