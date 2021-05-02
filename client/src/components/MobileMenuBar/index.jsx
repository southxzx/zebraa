import React, { useRef, useEffect, useState } from 'react'
import { signout } from '../../helpers/auth';
import { BagIcon, HelpIcon, OrderIcon } from '../../utils/listSvg'
import './MobileMenuBar.css'

const MobileMenuBar = ({ showMenuBar, toggleMenuBar, hasToken, username, toggleLoginForm, toggleRegisterForm, setIsReload }) => {

  const refWrapper = useRef();
  const [isRotated, setIsRotated] = useState({
    'cate' : false,
    'user' : false
  });

  useEffect(() => {


    const handleClickOutside = (e) => {
      if (refWrapper.current && !refWrapper.current.contains(e.target) && showMenuBar) {
        toggleMenuBar();
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refWrapper, showMenuBar])


  const toggleExpandMenu = (type) => {
    setIsRotated({ [type] : !isRotated[type] })
  }

  const logout = () => {
    signout();
    setIsReload(true);
  }

  return (
    <>
      <div ref={refWrapper} className={showMenuBar ? "mobileMenuBar showMenuBar" : "mobileMenuBar"}>
        <div className="menu-wrapper">
          <ul className="menuList">
            {hasToken && 
              <li className="buttonMenu hello-user" onClick={() => toggleExpandMenu('user')}>
                <div className="label-menu">
                  <span className="label-hello-user">{`Hi ${username}`}</span>
                  <img className={isRotated ? "right-arrow rotated" : "right-arrow"} src="/Assets/images/right-arrow.png" alt="Right-arrow" />
                </div>
                <ul className={isRotated.user ? "sub-menu expanded" : "sub-menu"}>
                  <li className="sub-item"><a href="/profile">Profile</a></li>
                  <li className="sub-item"><a href="/profile">Change password</a></li>
                  <li className="sub-item" onClick={() => logout()}>Logout</li>
                </ul>
              </li>
            }
            <li className="buttonMenu">
              <span><a href="/products">Shop now</a></span>
            </li>
            <li className="buttonMenu" onClick={() => toggleExpandMenu('cate')}>
              <div className="label-menu">
                <span>Category</span>
                <img className={isRotated ? "right-arrow rotated" : "right-arrow"} src="/Assets/images/right-arrow.png" alt="Right-arrow" />
              </div>
              <ul className={isRotated.cate ? "sub-menu expanded" : "sub-menu"}>
                <li className="sub-item">Shoes</li>
                <li className="sub-item">Socks</li>
                <li className="sub-item">T-shirt</li>
              </ul>
            </li>
            <li className="buttonMenu">
              <span><a href="/blog">Blog</a></span>
            </li>
            <li className="buttonMenu">
              <span><a href="/contact">Contact</a></span>
            </li>
          </ul>
          {!hasToken &&
            <div className="login-section">
              <span>Become a Nike member for the best products, inspiration and stories in sport. <a href='/'>Learn more</a></span>
              <div className="button-group">
                <button className="btn-default btn-join-us" onClick={() => toggleRegisterForm()}>Join Us</button>
                <button className="btn-default btn-sign-in-nav" onClick={() => toggleLoginForm()}>Sign In</button>
              </div>
            </div>}
          <ul className="listMenu-bottom">
            <li>
              <BagIcon />
              <span>Bag</span>
            </li>
            <li>
              <OrderIcon />
              <span>Order</span>
            </li>
            <li>
              <HelpIcon />
              <span>Help</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default MobileMenuBar
