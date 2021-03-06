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
            title: "Add Product",
            target: "/admin/products/add",
          },
          {
            title: "Edit Product",
            target: "/admin/products/edit",
          },
          {
            title: "Remove Product",
            target: "/admin/products/remove",
          },
        ],

        [
            {
                title: "Add Category",
                target: "/admin/category/add",
            },
            {
                title: "Edit Category",
                target: "/admin/category/edit",
            }
        ]
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

                    <SubMenu className="side-sub" title="Product" icon='fa fa-product-hunt' items={submenus[0]} />

                    <SubMenu className="side-sub" title="Category" icon='fa fa-product-hunt' items={submenus[1]} />
                    <NavItem>
                        <NavLink className="side-item" tag={Link} to={"/admin/orders"}>
                            <i className="fa fa-product-hunt" aria-hidden="true"></i>
                            <div className="side-text">Manage orders</div>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;