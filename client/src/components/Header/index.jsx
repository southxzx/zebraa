import React, { useEffect, useRef, useState } from 'react';
import './header.css'
import { Container, Row, Col } from 'reactstrap';
import MiniCart from '../MiniCart';

function Header(props) {

    // Ref CLICK OUTSIDE
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const [showHeader, setShowHeader] = useState(false);
    const [modal, setModal] = useState(false);
    const [popoverCart, setPopoverCart] = useState(false);

    // Bật form LOGIN
    const toggle = () => {
        setModal(!modal);
        props.toggleLoginForm();
    }

    // Bật popover CART
    const toggleCart = (e) => {
        // console.log(e.target.parentElement.id);
        setPopoverCart(!popoverCart);
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setPopoverCart(false);
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
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
                                    <div className="menu-cate">
                                        <a className="layer1" href="/" title="Home">
                                            Categories
                                            <i className="fa fa-chevron-down dropdown" aria-hidden="true"></i>
                                        </a>
                                        <div className="popup-cate">
                                            <div className="block">
                                                <Col>
                                                    <div className="cate-name">
                                                        <a><h4>Nike</h4></a>
                                                    </div>
                                                    <div className="cate-item">
                                                        <a>Newest sneakers</a>
                                                        <a>Running</a>
                                                        <a>Basketball</a>
                                                        <a>Jordan</a>
                                                        <a>Running</a>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="cate-name">
                                                        <a><h4>Adidas</h4></a>
                                                    </div>
                                                    <div className="cate-item">
                                                        <a>Basic</a>
                                                        <a>Ultraboost</a>
                                                        <a>Superstar</a>
                                                        <a>Stan Smith</a>
                                                        <a>Pharell Williams</a>
                                                        <a>TX8</a>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="cate-name">
                                                        <a><h4>Baleciaga</h4></a>
                                                    </div>
                                                    <div className="cate-item">
                                                        <a>Tyrex Sneaker</a>
                                                        <a>Track Sneaker</a>
                                                        <a>Sandal</a>
                                                        <a>Boot</a>
                                                        <a>Speed Sneaker</a>
                                                    </div>
                                                </Col>
                                            </div>
                                        </div> 
                                    </div>
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
                                    <div className="cart">
                                        <a  id="cart-icon" onClick={(e)=>toggleCart(e)}>
                                            <img src="/Assets/images/shopping-cart.png">
                                            </img> 
                                        </a>
                                        {popoverCart ? 
                                        <MiniCart
                                            wrapperRef = {wrapperRef}
                                        /> 
                                        : null}
                                    </div>
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