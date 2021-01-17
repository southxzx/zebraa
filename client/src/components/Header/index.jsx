import React, { useEffect, useRef, useState } from 'react';
import './header.css'
import { Container, Row, Col } from 'reactstrap';
import MiniCart from '../MiniCart';
import Login from '../../features/Register_Login/login';
import Register from '../../features/Register_Login/register';
import { Link, NavLink } from "react-router-dom";
import jwt from 'jsonwebtoken';
import cookie from 'js-cookie';
import Forget from '../../features/Register_Login/forget';
import { signout } from '../../helpers/auth';
import Count from './Count';

function Header(props) {

    // REtrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Ref CLICK OUTSIDE
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const [showHeader, setShowHeader] = useState(false);
    const [modal, setModal] = useState(false);
    const [popoverCart, setPopoverCart] = useState(false);
    const [popoverUser, setPopoverUser] = useState(false);
    const [isReload, setIsReload] = useState(false);

    // Bật form LOGIN/REGISTER/FORGET
    const [modalLogin, setModalLogin] = useState(false);
    const [modalRegister, setModalRegister] = useState(false);
    const [modalForget, setModalForget] = useState(false);

    const toggleLoginForm = () => {
        setModalLogin(!modalLogin);
        console.log("Login",modalLogin);
    }
    const toggleRegisterForm = () => {
        setModalRegister(!modalRegister);
        console.log("Register",modalRegister);
    }
    const toggleForgetForm = () => {
        setModalForget(!modalForget);
        console.log("Forget",modalForget);
    }

    // Bật popover CART
    const toggleCart = (e) => {
        // console.log(e.target.parentElement.id);
        setPopoverCart(!popoverCart);
    }

    // Bật popover USER
    const toggleUser = (e) => {
        setPopoverUser(!popoverUser);
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setPopoverCart(false);
                    setPopoverUser(false);
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

    /// login 10s
    
    // useEffect(() => {
    //     const changeStatusLogin = () => {
    //         if(cookie.get('token')){
    //             console.log(cookie.get('token'));
    //             setTimeout(()=>{
    //                 cookie.remove('token');
    //                 localStorage.removeItem('user');
    //                 //setLogin(true);
                    
    //             },10000);
    //             //setLogin(true);
    //         }
    //         else{
    //            // setLogin(false)
    //             console.log('no cookie');
    //         }
    //     }
    //     changeStatusLogin();

    // },[cookie.get('token')])

    // useEffect(() => {
    //     if(cookie.get('token')){
    //         setIsReload(!isReload);
    //     }
    // },[])


    const logout = () => {
        signout();
        setIsReload(!isReload);
    }
 
    //console.log(localStorage.getItem('user'));

    return (
        <header id="header" className={showHeader ? "dark-bg" : "transparent-bg"}>
            <Container>
                <Row>
                    <Col lg="5">
                        <nav className="desk-menu">
                            <ul>
                                <li className="active itemMenu">
                                    {/* <a className="layer1" href="/" title="Home">
                                        Home
                                    </a> */}
                                    <NavLink to='/' className="layer1" title="Home">
                                        Home
                                    </NavLink>
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
                                    <form className="search-form" action='/search' method='GET'>
                                        <input type="search" placeholder="Search" name="name"/>
                                        <a className="search-icon" href="/search">
                                            <img src="/Assets/images/search.png">
                                            </img>
                                        </a>
                                    </form>
                                </li>
                                {cookie.get('token') ? 
                                    null :  
                                    <li>
                                    <a onClick={toggleLoginForm}>
                                        <img src="/Assets/images/enter.png">
                                        </img>
                                    </a>
                                    <Login
                                        isOpen={modalLogin}
                                        toggleLoginForm={toggleLoginForm}
                                        toggleRegisterForm={toggleRegisterForm}
                                        toggleForgetForm={toggleForgetForm}
                                    />
                                    <Register
                                        isOpen={modalRegister}
                                        toggleLoginForm={toggleLoginForm}
                                        toggleRegisterForm={toggleRegisterForm}
                                    />
                                    <Forget
                                        isOpen={modalForget}
                                        toggleLoginForm={toggleLoginForm}
                                        toggleForgetForm={toggleForgetForm}
                                    />
                                </li>
                                }
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
                                    <span className="count">
                                        <Count/>
                                    </span>
                                </li>
                                {cookie.get('token') ? 
                                    <li>
                                        <div className="user">
                                            <a  id="user-icon" onClick={toggleUser}>
                                                <img className="user-image" src={user.avatar ? user.avatar : '/Assets/images/user.jpg'}>
                                                </img> 
                                            </a>
                                            {popoverUser ? 
                                            <div ref={wrapperRef} className="popover-user">
                                                <div className="content">
                                                    <h6>My account</h6>
                                                    <div className="link">
                                                        <Link to="/profile"><i className="fa fa-cog"></i>Profile</Link>
                                                        <a><i className="fa fa-lock"></i>Change password</a>
                                                        <a onClick={()=>logout()}><i class="fa fa-sign-out"></i>Logout</a>
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
                                        </div>
                                    </li> 
                                : null} 
                                
                            </ul>
                        </nav>
                    </Col>
                </Row>

            </Container>
        </header>
    );
}

export default Header;