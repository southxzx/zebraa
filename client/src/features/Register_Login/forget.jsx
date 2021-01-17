import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import './register_login.css';
import {Link, useHistory} from 'react-router-dom';
import { authenticate, isAuth } from '../../helpers/auth';
import { Container, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosClient from '../../api/axiosClient';

function Forget(props) {

    const toggleLoginForm = () => {  
        props.toggleLoginForm(); 
        props.toggleForgetForm();     
    }
    
    const toggleForgetForm = () => { 
        props.toggleForgetForm();       
    }

    const [formData, setFormData] = useState({
        email: '',
        textChange: 'Submit'
      });
    
    const { email, textChange } = formData;

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
        //console.log(name,email, password1, password2);
        console.log(text, event.target.value);
    };

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        if ( email ){
            
            setFormData({ ...formData, textChange: 'Submitting' });

            axiosClient
                .put('user/password/forget', {
                    
                    email
                    
                })  
                .then(res => {
                    setFormData({
                        ...formData,
                        email: '',
                        textChange: 'Submitted'
                    });

                    toast.success(res.data.message);
                })
                .catch(err => {
                    
                    toast.error(err.response.data.errors);
                });

        

        }
        else{
            toast.error('Please fill all fields');
        }
    }

    return (
        <div>
            <Modal size="lg" isOpen={props.isOpen}>
                <ToastContainer/>
                <div className="row-login">
                    <div className="btn-cancel">
                        <a onClick={toggleForgetForm}><i class="fa fa-times"></i></a>
                    </div>
                    <Col>
                        <div className="form-group login-modal">
                            <div className="content">
                                <div className="title">
                                    <img className="logo" src="Assets/images/nike-logo.png"/>
                                    <h5>BECOME A NIKE MEMBER</h5>
                                    <p>Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.</p>
                                </div>



                                <form onSubmit={(event)=>handleSubmit(event)} className="login-frm">
                                    
                                    
                                    <div className="email">
                                        <input type="email" 
                                            className="frm-input frm-error"  
                                            placeholder="Email address"
                                            name = 'email'
                                            onChange={(event)=>handleChange(event)}
                                            value={email}/>
                                        <span className="error-message">&nbsp;</span>
                                    </div>
                                    
                                
                                    <p className="forget">Please enter your email address to retrieve your password</p>
                                    <button type="submit" className='btn-register'>
                                        <span type="submit" className="btn-default btn-sign-in">
                                            {textChange}
                                        </span>
                                    </button>
                                    
                                </form>
                                
                                   

                                <div className="else">
                                    <label>Already a member?</label>
                                    <a onClick={toggleLoginForm}>Sign In</a>
                                </div>
                            </div>
                        </div>
                    </Col>
                </div>
            </Modal>
        </div>
    )
}

export default Forget;