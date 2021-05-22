import React,{useEffect, useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axiosClient from '../../../../../api/axiosClient';
import categoryApi from '../../../../../api/categoryApi';
import './editdetail.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from '../../../Component/Common/Title';
import * as _ from 'lodash';
import { useParams } from 'react-router';


function EditDetailCategory(props) {
    const {_idCategory} = useParams();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        active: true,
    });
    const [cate,setCate] = useState([]);
    const { name, description,active } = formData;

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
    };

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if(name){
            setFormData({...formData,textChange: 'Submitting'});

            axiosClient.put(`/category/update?id=${_idCategory}`,{
                name : name,
                active : true
            })
            .then(res => {
                console.log(res);
                setFormData({
                    ...formData,
                    name:'',
                    description:'',
                    active:true,
                    textChange:'Submitted'
                })
                toast.success("Category has been updated! :)");
            })
            .catch(err => {
                setFormData({
                    ...formData,
                    name:'',
                    description:'',
                    active:true,
                    textChange:'Submitted'
                })
                toast.error("Something went wrong! :(");
            })

        }

    }

    var oldNameCategory = _.get(props,'location.params.oldNameCategory',null);

    useEffect(() => {
        setFormData({...formData,name: oldNameCategory});
    },[])
    //console.log(props.location.params.oldNameCategory);

    return (
        <div className="add-category-admin">
            <ToastContainer/>
            <Title title="EDIT CATEGORY" title_below="Zebraa Category" />
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

export default EditDetailCategory;