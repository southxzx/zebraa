import React, { useState, useEffect } from 'react';
import './activeaccount.css'
import { Col,Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import jwt from 'jsonwebtoken';
import axiosClient from '../../api/axiosClient';

function Activate(props) {

    const [formData, setFormData] = useState({
        name: '',
        token: '',

    });

    useEffect(() => {
        // In App ,We have route with path /users/activate/:token
        // When we access link: /users/activate/TOKEN_HERE ; so props.match.params.token = TOKEN_HERE
        // Get token from params like /active/token
        // then decode this token and get name
        let token = props.match.params.token;
        let { name } = jwt.decode(token);

        if (token) {
            setFormData({ ...formData, name, token });
        }
      
        console.log(token, name);
    },[props.match.params]);

    const { name, token } = formData;

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        axiosClient
            .post('/user/activation',{
                token
            })
            .then(res => {
                setFormData({
                ...formData,
                
            });
  
                toast.success(res.data.message);
            })
            .catch(err => {
          
                toast.error(err.response.data.errors);
            });
    }


    return (
        <div className="activate">
            <div className="activate_main">
                <Row>
                    <ToastContainer/>
                    <Col sm="12" md="6">
                        <div className="activate_content">
                            <div className="content">
                                <h1>Welcome {name}</h1>

                                <form onSubmit={(event) => handleSubmit(event)}>
                                    <div className="activate_btn">
                                       <button type='submit' className="activate-button">
                                            <i className="fa fa-user-plus"></i>
                                            <span>Activate your Account</span>
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

export default Activate;