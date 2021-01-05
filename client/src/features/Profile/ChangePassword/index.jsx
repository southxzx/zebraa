import React from 'react';

function ChangePassword() {
    return (
        <div className="card">
            <div className="card-content">
                <div className="tab-pane">
                    <form className="form-content">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Old password</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Old password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">New Password</label>
                            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="New Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Retype New Password</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Retype New Password" />
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

export default ChangePassword
