import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import './register_login.css';
import {Link, useHistory} from 'react-router-dom';
import { authenticate, isAuth } from '../../helpers/auth';
import { Container, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosClient from '../../api/axiosClient';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function Login(props) {
    const  history  = useHistory();

    const toggleLoginForm = () => {  
        props.toggleLoginForm();     
    }
    
    const toggleRegisterForm = () => {
        props.toggleLoginForm();  
        props.toggleRegisterForm();       
    }

    const toggleForgetForm = () => {
        props.toggleLoginForm(); 
        props.toggleForgetForm();
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
        //console.log(text, event.target.value);
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
                        console.log(res.data.user);
                        setFormData({
                            ...formData,
                            email: '',
                            password: '',
                            textChange: 'Submitted'
                        });
                        
                        //toast.success("Sign In Successfully");

                        // Because have isAuth() so Login will render : Redirect to='/'
                        // Want to render another link . Purpose is authorization
                        // props.history.push to Redirect link
                        isAuth() && isAuth().role === 'admin'
                        ? history.push('/admin')
                        : history.push('/')

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
            ? history.push('/admin')
            : history.push('/');
        });
    };

    //// Send google token
    function sendGoogleToken(tokenId){
        axiosClient
            .post('user/googlelogin', {
                idToken: tokenId
            })
            .then(res => {
                console.log(res.data);
                    informParent(res);
                })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
        }
    
    // Get response from Google
    const responseGoogle = (response) => {
        console.log(response);
        sendGoogleToken(response.tokenId);  // Google provide
           
    };

    //// Send Facebook token
    function sendFacebookToken(userID, accessToken){
        axiosClient
            .post('user/facebooklogin', {
                userID,
                accessToken
            })
            .then(res => {
                console.log(res.data);
                informParent(res);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    }

    // Get response from Facebook
    const responseFacebook = (response) => {
        console.log(response);
        sendFacebookToken(response.userID, response.accessToken)
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
                                    <img className="logo" src="/Assets/images/nike-logo.png"/>
                                    <h5>Your account for everything nike</h5>
                                </div>
                                <div className="login-with">
                                    <p>With your social network</p>
                                    <GoogleLogin
                                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={renderProps => (
                                            <button
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            className='btn-default btn-login btn-google'
                                            >
                                                    <i className='fa fa-google ' />
                                                {/* <span className='ml-4'>Sign In with Google</span> */}
                                            </button>
                                        )}
                                    ></GoogleLogin>
                                    
                                    <FacebookLogin
                                        appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                                        autoLoad={false}    // If true, when login it go to LoginWithFacebook and We won't to do this
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            <button
                                                onClick={renderProps.onClick}
                                                className='btn-default btn-login  btn-facebook'
                                            >
                                                    <i className='fa fa-facebook' />                                               
                                            </button>
                                        )}
                                    ></FacebookLogin>

                                    <button className="btn-default btn-login btn-twitter">
                                        <i className="fa fa-twitter"></i>
                                    </button>
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
                                        {/* <Link
                                            to='/users/password/forget'
                                            className='forget'
                                            >
                                            Forget password?
                                        </Link>   */}
                                        <a onClick={toggleForgetForm} className='forget'>Forget password?</a>
                                    </div>
                                    <button type="submit" className='btn-register btn-default btn-sign-in'>
                                            SIGN IN
                                    </button>
                                    <div className="else">
                                        <label>Not a member?</label>
                                        <a onClick={toggleRegisterForm}>Sign Up</a>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </Col>
                </div>
            </Modal>
        </div>
    )
}

export default Login
