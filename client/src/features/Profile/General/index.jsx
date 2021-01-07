import React from 'react';

function General() {
    return (
        <div className="card">
            <div className="card-content">
                <div className="tab-pane">
                    <div className="media">
                        <img src="Assets/images/user.jpg"></img>
                        <div className="media-body">
                            <div className="flex-column">
                                <a className="btn-default btn-upload">Upload new photo</a>
                                <a className="btn-default btn-reset">Reset</a>
                            </div>
                            <span>Allowed JPG, GIF or PNG. Max size of 800kB</span>
                        </div>
                    </div>
                    <form className="form-content">
                        <div className="form-row form-group">
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">First Name</label>
                                <input type="text" className="form-control" placeholder="First name" />
                            </div>
                            <div className="col">
                                <label htmlFor="exampleFormControlInput1">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Your email address..." />
                        </div>
                        <div className="form-group warning">
                            <p>Your email is not confirmed. Please check your inbox.</p>
                            <a href="#">Resend confirmation</a>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Address</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Your delivery address..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Phone Number</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Your phone number..." />
                        </div>
                        <div className="flex-column">
                            <button className="btn btn-primary" type="submit">Save changes</button>
                            <button className="btn btn-secondary" type="submit">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default General
