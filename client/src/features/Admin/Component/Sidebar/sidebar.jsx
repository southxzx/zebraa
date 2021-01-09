import React from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavItem, NavLink, Nav } from "reactstrap";
// import {
//     faHome,
//     faBriefcase,
//     faPaperPlane,
//     faQuestion,
//     faImage,
//     faCopy,
//   } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames";
import { Link } from "react-router-dom";
import SubMenu from "./submenu";


function Sidebar(props) {
    const { isOpen, toggle } = props;

    const submenus = [
        [
          {
            title: "Home 1",
            target: "Home-1",
          },
          {
            title: "Home 2",
            target: "Home-2",
          },
          {
            itle: "Home 3",
            target: "Home-3",
          },
        ],
        [
          {
            title: "Page 1",
            target: "Page-1",
          },
          {
            title: "Page 2",
            target: "Page-2",
          },
        ],
      ];

    return (
        <div className={classNames("sidebar", { "is-open": !isOpen })}>
            <div className="sidebar-header">
                <h3>Zebraa Dashboard</h3>
            </div>

            <div className="side-menu">
                <Nav vertical className="list-unstyled pb-3">

                    {/* <SubMenu title="Home" icon='' items={submenus[0]} /> */}
                    
                    <NavItem>
                        <NavLink className="side-item" tag={Link} to={"/admin"}>
                            <i className="fa fa-dashcube" aria-hidden="true"></i>
                            <div className="side-text">Dashboard Home</div>
                            
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className="side-item" tag={Link} to={"/admin/product"}>
                            <i className="fa fa-product-hunt" aria-hidden="true"></i>
                            <div className="side-text">Product</div>
                        </NavLink>
                    </NavItem>

                    <SubMenu className="side-sub" title="Pages" icon='fa fa-product-hunt' items={submenus[1]} />

                    <NavItem>
                        <NavLink className="side-item" tag={Link} to={"/admin/about"}>
                            {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
                            <div className="side-text">About</div>
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className="side-item" tag={Link} to={"/admin/about"}>
                            {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
                            <div className="side-text">About</div>
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className="side-item" tag={Link} to={"/admin/about"}>
                            {/* <FontAwesomeIcon icon={faBriefcase} className="mr-2" /> */}
                            <div className="side-text">About</div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;