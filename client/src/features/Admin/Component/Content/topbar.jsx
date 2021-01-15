import React, { useState } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

function Topbar(props) {
    const { toggleSidebar } = props;

    const [topbarIsOpen, setTopbarOpen] = useState(true);
    const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

    return (
        <Navbar
            color="light"
            light
            className="topbar navbar shadow-sm p-3 mb-5 bg-white rounded"
            expand="md"
        >
            <Button className="move" onClick={toggleSidebar}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </Button>
            <div className="search-bar">
                <input type="search" placeholder="Search" name="name"/>
                <a className="search-icon" href="/search">
                    <img src="/Assets/images/search.png">
                    </img>
                </a>
            </div>

            <div className="ring-bar">
                <a href="https://www.youtube.com/">
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                </a>
                <span className="count">0</span>
            </div>

            <div className="user-bar">
                
                <a  id="user-icon">
                    <img className="user-image" src="/Assets/images/user.jpg">
                    </img> 
                </a>
               
            </div>
            
        </Navbar>
    );
}

export default Topbar;