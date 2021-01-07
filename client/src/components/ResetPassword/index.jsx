import React, { useState, useEffect } from 'react';
import './resetpass.css'
import { Col,Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosClient from '../../api/axiosClient';


function ResetPassword(props) {

    const [formData, setFormData] = useState({
        password1: '',
        password2: '',
        token: '',
        textChange: 'Submit'
    });

    const { password1, password2, textChange, token } = formData;

    useEffect(() => {
        let token = props.match.params.token
        if(token) {
            setFormData({...formData, token,})
        }
        
    }, [])

    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
        console.log(text, event.target.value);
    };

    // Handle submit data
    function handleSubmit(event){

        event.preventDefault();

        if ((password1 === password2) && password1 && password2){
            setFormData({ ...formData, textChange: 'Submitting' });
            
            axiosClient
                .put('user/password/reset',{
                    newPassword: password1,
                    resetPasswordLink: token
                })
                .then(res => {
                    console.log(res.data.message)
                      setFormData({
                        ...formData,
                         password1: '',
                        password2: ''
                      });
                      toast.success(res.data.message);
                    
                })
                .catch(err => {
                    toast.error(err.response.data.errors);
                });
        }
        else {
            toast.error('Passwords don\'t matches');
        }
    }

    return (
        <div className="activate">
            <div className="activate_main">
                <Row>
                    <ToastContainer/>
                    <Col sm="12" md="6">
                        <div className="activate_content">
                            <div className="content">
                                <h1>Welcome</h1>

                                <form onSubmit={(event) => handleSubmit(event)}>
                                    <input
                                    className='password_txt'
                                    type='password'
                                    placeholder='password'
                                    name = 'password1'
                                    onChange={(event)=>handleChange(event)}
                                    value={password1}
                                    />

                                    <input
                                    className='password_txt'
                                    type='password'
                                    placeholder='Confirm password'
                                    name = 'password2'
                                    onChange={(event)=>handleChange(event)}
                                    value={password2}
                                    />

                                    <div className="activate_btn">
                                       <button type='submit' className="activate-button">
                                            <i className="fa fa-refresh"></i>
                                            <span>{textChange}</span>
                                       </button>
                                    </div>

                                    <div className="activate_sig">
                                        <span>Or sign up again</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Col>

                    <Col sm="12" md="6">
                        <div className="activate_img">
                            <img src="/Assets/images/login.png">
                            </img>
                        </div>
                    </Col>
                </Row>
                
            </div>
        </div>
    );
}

export default ResetPassword;