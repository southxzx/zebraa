import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateUser, isAuth, getCookie, signout } from '../../../../helpers/auth';
import { Link, Redirect, useHistory } from 'react-router-dom';
import axiosClient from '../../../../api/axiosClient';

function AdminHome(props) {
    return (
        <div>
            232d
        </div>
    );
}

export default AdminHome;