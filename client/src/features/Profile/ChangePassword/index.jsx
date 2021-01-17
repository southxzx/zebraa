import React, { useState, useEffect } from 'react';
import { Col,Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';
import axiosClient from '../../../api/axiosClient';
 
function ChangePassword() {

    const [formData, setFormData] = useState({
        password: '',
        password1: '',
        password2: ''
    });

    const {password,password1,password2} = formData;


    // Handle change form inputs
    function handleChange(event) {
        const text = event.target.name;
        setFormData({ ...formData, [text]: event.target.value });
        console.log(text, event.target.value);
    };

    // Handle submit data
    function handleSubmit(event){

        event.preventDefault();

        if(cookie.get('token')){
            let {_id} = jwt.decode(cookie.get('token'));

            axiosClient
                .put('/user/password/change',{
                    _id : _id,
                    oldPassword : password,
                    newPassword : password2
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
    }

    return (
        <div className="card">
            <ToastContainer/>
            <div className="card-content">
                <div className="tab-pane">
                    <form onSubmit={(event) => handleSubmit(event)} className="form-content">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Old password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="exampleFormControlInput1" 
                                placeholder="Old password" 
                                name = 'password'
                                onChange={(event)=>handleChange(event)}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">New Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="exampleFormControlInput1" 
                                placeholder="New Password" 
                                name = 'password1'
                                onChange={(event)=>handleChange(event)}
                                value={password1}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Retype New Password</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="exampleFormControlInput1" 
                                placeholder="Retype New Password" 
                                name = 'password2'
                                onChange={(event)=>handleChange(event)}
                                value={password2}
                            />
                        </div>
                        <div className="flex-column">
                            <button className="btn btn-primary" type="submit">Save changes</button>
                            {/* <button className="btn btn-secondary" type="submit">Cancel</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
