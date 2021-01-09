import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { BrowserRouter,Switch, Route } from "react-router-dom";
import Topbar from "./topbar";
import Sidebar from "../Sidebar/sidebar";
import DashBoard from "../../pages/DashBoard";



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
                                {/* <Route exact path="/Pages" component={() => "Pages"} />
                                <Route exact path="/faq" component={() => "FAQ"} />
                                <Route exact path="/contact" component={() => "Contact"} />*/}
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