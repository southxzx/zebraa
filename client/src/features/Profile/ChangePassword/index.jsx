import React from 'react';

function ChangePassword() {
    return (
        <div className="card">
            <div className="card-content">
                <div className="tab-pane">
                    <form className="form-content">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Old password</label>
                            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Old password" />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">New Password</label>
                            <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="New Password" />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Retype New Password</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Retype New Password" />
                        </div>
                        <div class="flex-column">
                            <button class="btn btn-primary" type="submit">Save changes</button>
                            <button class="btn btn-secondary" type="submit">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
