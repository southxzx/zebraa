import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import './register_login.css';
import {Link, useHistory} from 'react-router-dom';
import { authenticate, isAuth } from '../../helpers/auth';
import { Container, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosClient from '../../api/axiosClient';

function Login(props) {
    const  history  = useHistory();

    const toggleLoginForm = () => {  
        props.toggleLoginForm();     
    }
    
    const toggleRegisterForm = () => {
        props.toggleLoginForm();  
        props.toggleRegisterForm();       
    }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        textChange: 'Sign In'
      });
    
    const { email, password, textChange } = formData;

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

        if (email && password){
            
            setFormData({ ...formData, textChange: 'Submitting' });

            axiosClient
                .post('/user/login',{
                    email,
                    password: password,
                        
                })
                .then(res => { 
                    authenticate(res,() => {    // middleware authenticate must be next() to pass To ,() => {...}
                        
                        setFormData({
                            ...formData,
                            email: '',
                            password: '',
                            textChange: 'Submitted'
                        });
                        console.log(formData);
                        //toast.success("Sign In Successfully");

                        // Because have isAuth() so Login will render : Redirect to='/'
                        // Want to render another link . Purpose is authorization
                        // props.history.push to Redirect link
                        isAuth() && isAuth().role === 'admin'
                        ? history.push('/admin')
                        : history.push('/products')

                        console.log(isAuth());
                        toast.success(`Hey ${res.data.user.name}, Welcome back!`);

                        
                    });
                    
                })

                .catch(err => {
                    setFormData({
                        ...formData,
                        email: '',
                        password: '',
                        textChange: 'Sign In'
                    });
                    toast.error(err.response.data.errors);
                });
        }

        else{
            toast.error('Please fill all fields');
        }
    }

    /// If success we need to authenticate user and redirect
    const informParent = (response) => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin'
            ? props.history.push('/admin')
            : props.history.push('/private');
        });
    };

    return (
        <div>
            <Modal size="lg" isOpen={props.isOpen}>
                <ToastContainer/>
                <div className="row-login">
                    <div className="btn-cancel">
                        <a onClick={toggleLoginForm}><i className="fa fa-times"></i></a>
                    </div>
                
                    <Col>
                        <div className="form-group login-modal">
                            <div className="content">
                                <div className="title">
                                    <img className="logo" src="Assets/images/nike-logo.png"/>
                                    <h5>Your account for everything nike</h5>
                                </div>
                                <div className="login-with">
                                    <p>With your social network</p>
                                    <a className="btn-default btn-login btn-google">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                    <a className="btn-default btn-login btn-facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                    <a className="btn-default btn-login btn-twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                    <p className="or">or</p>
                                </div>
                                
                                <form onSubmit={(event)=>handleSubmit(event)}>
                                    <div className="login-frm">
                                        <div className="email">
                                            <input 
                                                type="email" 
                                                className="frm-input frm-error"  
                                                placeholder="Email address"
                                                name="email"
                                                onChange={(event)=>handleChange(event)}
                                                value={email}
                                            />
                                            <span className="error-message">&nbsp;</span>
                                        </div>
                                        <div className="password">
                                            <input 
                                                type="password" 
                                                className="frm-input frm-error"  
                                                placeholder="Password"
                                                name="password"
                                                onChange={(event)=>handleChange(event)}
                                                value={password}/>
                                            <span className="error-message">&nbsp;</span>
                                        </div>
                                    </div>
                                    <div className="row-forgot">
                                        <div className="remember">
                                            <input type="checkbox"/>
                                            <label>Remember me</label>
                                        </div>
                                        <Link
                                            to='/users/password/forget'
                                            className='forget'
                                            >
                                            Forget password?
                                        </Link>  
                                    </div>
                                    <button type="submit" className='btn-register'>
                                        <span type="submit" className="btn-default btn-sign-in">
                                            SIGN IN
                                        </span>
                                    </button>

                                    <div className="else">
                                        <label>Not a member?</label>
                                        <a onClick={toggleRegisterForm}>Sign Up</a>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </Col>
                    <Col className="login-artwork">
                        <div className="login-artwork">
                            <img src="Assets/images/login.png"/>
                        </div>
                    </Col>
                </div>
            </Modal>
        </div>
    )
}

export default Login
