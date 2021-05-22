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
import AddCategory from "../../pages/Category/Add";
import EditCategory from "../../pages/Category/Edit_Remove";
import RemoveCategory from "../../pages/Category/Remove";
import EditDetailCategory from "../../pages/Category/EditDetail";
import EditDetailPro from "../../pages/Products/EditDeTail/index.jsx";



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
                                <Route path="/admin/products/edit/:_idProduct" exact component={EditDetailPro} />
                                <Route path="/admin/products/remove_product/:_idProduct" exact component={RemoveProduct} />
                                <Route path="/admin/category/add" exact component={AddCategory} />
                                <Route path="/admin/category/edit" exact component={EditCategory} />
                                <Route path="/admin/category/edit/:_idCategory" exact component={EditDetailCategory} />
                                <Route path="/admin/category/remove_category/:_idCategory" exact component={RemoveCategory} />
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