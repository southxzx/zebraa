import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import axiosClient from "../../../api/axiosClient";
import userApi from "../../../api/userApi";
import * as _ from "lodash";

function General(props) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const email = _.get(JSON.parse(localStorage.getItem("user")), "email", "");
    const FetchInfoUser = async () => {
      const response = await userApi.get(email);
      console.log(email);
      console.log(response.data);
      setFormData(response.data.data);
    };

    FetchInfoUser();
  }, []);

  console.log(formData);

  const { name, address, phone } = formData;

  // Handle Change value form
  function handleChange(event) {
    const text = event.target.name;
    setFormData({ ...formData, [text]: event.target.value });
    console.log(text, event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (name && address && phone) {
        axiosClient.put(`/user/update?_id=${formData._id}`,formData)
                .then(res => {
                    //console.log(res.data.message)
                    setFormData({
                    ...formData,
                        name:'',
                        address:'',
                        phone:''
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
          <div className="media">
            <img
              src={_.get(formData, "avatar", "Assets/images/user.jpg")}
            ></img>
            <div className="media-body">
              <div className="flex-column">
                <a className="btn-default btn-upload">Upload new photo</a>
                <a className="btn-default btn-reset">Reset</a>
              </div>
              <span>Allowed JPG, GIF or PNG. Max size of 800kB</span>
            </div>
          </div>

          <form onSubmit={(event) => handleSubmit(event)} className="form-content">
            <div className="form-row form-group">
              <div className="col">
                <label htmlFor="exampleFormControlInput1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={(event)=>handleChange(event)}
                  value={_.get(formData, "name", "")}
                  placeholder="Name"
                />
              </div>
            </div>

            {/* <div className="form-group warning">
                            <p>Your email is not confirmed. Please check your inbox.</p>
                            <a href="#">Resend confirmation</a>
                        </div> */}
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Address</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="address"
                onChange={(event)=>handleChange(event)}
                value={_.get(formData, "address", "")}
                placeholder="Your delivery address..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                name="phone"
                value={_.get(formData, "phone", "")}
                onChange={(event)=>handleChange(event)}
                placeholder="Your phone number..."
              />
            </div>
            <div className="flex-column">
              <button className="btn btn-primary" type="submit">
                Save changes
              </button>
              {/* <button className="btn btn-secondary" type="submit">
                Cancel
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default General;
