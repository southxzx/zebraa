import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { updateUser, isAuth, getCookie, signout } from '../../../../helpers/auth';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './adminhome.css'
import axiosClient from '../../../../api/axiosClient';
import Sidebar from '../../Component/Sidebar/sidebar';
import Content from '../../Component/Content/content';

function AdminHome(props) {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
        <div className="App wrapper">
            {/* <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} /> */}
            <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
    );
}

export default AdminHome;