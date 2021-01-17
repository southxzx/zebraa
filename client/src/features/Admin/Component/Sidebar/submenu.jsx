import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


function Submenu(props) {
    const [collapsed, setCollapsed] = useState(true);
    const toggle = () => setCollapsed(!collapsed);
    const { icon, title, items } = props;

    return (
        <div>
            <NavItem
                onClick={toggle}
                className={classNames({ "menu-open": !collapsed })}
            >
                <NavLink className="dropdown-toggle sub-item">
                    <i className={icon} aria-hidden="true"></i>
                    {title}
                </NavLink>
            </NavItem>

            <Collapse
                style={{padding:0}}
                isOpen={!collapsed}
                navbar
                className={classNames("items-menu", { "mb-1": !collapsed })}
            >
                {items.map((item, index) => (
                <NavItem key={index} className="pl-4 sub-item-text">
                    <NavLink className="sub-text" tag={Link} to={item.target}>
                    {item.title}
                    </NavLink>
                </NavItem>
                ))}
            </Collapse>
    </div>
    );
}

export default Submenu;