import cookie from 'js-cookie'
import axiosClient from '../api/axiosClient';
import jwt from 'jsonwebtoken';

// Helper Functions to set,remove cookie and deal with Local Storage

// Set in Cookie
export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1         ///  1/1440 1minutes
        }) 
    }
}
// remove from cookie
export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};


// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Remove from localstorage
export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

// Authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next(); // middleware so must be next() 
};

// Access user info from localstorage
export const isAuth = () => {
    if (window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};

//
export const isAuthorized = () =>{  
    console.log('ss');
    const token = cookie.get('token');
    let {_id} = jwt.decode(token);

    return axiosClient.get(`/user/author/?_id=${_id}`)     // resolve promise pending
                .then(res => {
                    if(res.data.role == 'admin')
                        return true;
                })
    //return 'admin';
    
}

// SignOut
export const signout = () => {
    removeCookie('token');
    removeLocalStorage('user');
    removeLocalStorage('cart');
};

// Update user data in localstorage
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};