import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { BrowserRouter,Switch, Route } from "react-router-dom";
import Topbar from "./topbar";
import Sidebar from "../Sidebar/sidebar";
import DashBoard from "../../pages/DashBoard";
import AddProduct from "../../pages/Products/Add";
import EditProduct from "../../pages/Products/Edit_Remove";
import EditDetail from "../../pages/Products/EditDeTail/index.jsx";
import RemoveProduct from "../../pages/Products/Remove";



function Content(props) {
    const { sidebarIsOpen, toggleSidebar } = props;

    return (
        <Container
            fluid
            className={classNames("content", { "is-open": sidebarIsOpen })}
        >
            <div className="admin-main">
                <div className="admin-side">
                    <Topbar toggleSidebar={toggleSidebar} />
                    

                    <div className="admin-content">
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/admin" component={DashBoard} />
                                <Route path="/admin/about" exact component={() => "About kojkojojo hiohoih"} />
                                <Route path="/admin/products/add" exact component={AddProduct} />
                                <Route path="/admin/products/edit" exact component={EditProduct} />
                                <Route path="/admin/products/edit/:_idProduct" exact component={EditDetail} />
                                <Route path="/admin/products/remove_product/:_idProduct" exact component={RemoveProduct} />
                                
                            </Switch>
                        </BrowserRouter>
                    </div>
                    <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen}/>
                </div>

            </div>            
        </Container>
    );
}

export default Content;