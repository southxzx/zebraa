import React, { useEffect, useState } from 'react';
import './header.css'
import { Container, Row, Col } from 'reactstrap';


function Header(props) {

    const [showHeader, setShowHeader] = useState(false);
    const [modal, setModal] = useState(false);

    // Bật form LOGIN
    const toggle = () => {
        setModal(!modal);
        props.toggleLoginForm();
    }

    const handleShowHeader = () => {
    // Nếu kéo qua vị trí 0 thì hiển thị header
        if(window.scrollY > 0){
            setShowHeader(true);
       } else {
           setShowHeader(false);
       }
    }

    useEffect(() => {
        // Hiển thị header khi scroll 
        window.addEventListener("scroll",handleShowHeader,{ passive: true });
        return () => {
            window.removeEventListener("scroll", handleShowHeader);
          };
      },[showHeader]);

    return (
        <header className={showHeader ? "dark-bg" : "transparent-bg"}>
            <Container>
                <Row>
                    <Col lg="5">
                        <nav className="desk-menu">
                            <ul>
                                <li className="active itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        Home
                                    </a>
                                </li>
                                <li className="itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        Categories
                                        <i className="fa fa-chevron-down dropdown" aria-hidden="true"></i>
                                    </a> 
                                </li>
                                <li className="itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        Blog
                                    </a>  
                                </li>
                                <li className="itemMenu">
                                    <a className="layer1" href="/" title="Home">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </Col>

                    <Col lg="2">
                        <div className="logo-menu">
                            <a href="https://www.youtube.com/">
                                <img src="/Assets/images/nike-logo.png">

                                </img>
                            </a>
                        </div>
                    </Col>

                    <Col lg="5">
                        <nav className="icon">
                            <ul>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/search.png">
                                        </img>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={toggle}>
                                        <img src="/Assets/images/enter.png">
                                        </img>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/heart.png">
                                        </img>
                                    </a>
                                    <span className="count">0</span>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/">
                                        <img src="/Assets/images/shopping-cart.png">
                                        </img>

                                        
                                    </a>
                                    <span className="count">0</span>
                                </li>
                            </ul>
                        </nav>
                    </Col>
                </Row>

            </Container>
        </header>
    );
}

export default Header;