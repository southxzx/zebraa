import React,{useState} from 'react';
import './App.css';
// npm i --save axios js-cookie jsonwebtoken react-facebook-login react-google-login react-router-dom react-toastify
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Home from './features/Home';
import Product from './features/Product';
import Cart from './features/Cart';
import Search from './features/Search';
import Profile from './features/Profile';
import Activate from './components/ActiveAccount';
import ResetPassword from './components/ResetPassword';
import AdminRoute from './Routes/AdminRoute';
import AdminHome from './features/Admin/pages/AdminHome';
import Content from './features/Admin/Component/Content/content';
import Checkout from './features/Checkout';
import Test from './features/Test/test';

function App() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/test' component={Test} />
      <Route path='/products' component={Product} />
      <Route path='/cart' exact component={Cart} />
      <Route path='/search' exact component={Search} />
      <Route path='/profile' exact component={Profile}/>
      <Route path='/checkout' exact component={Checkout}/>
      <Route path='/users/activate/:token' exact component={Activate}/>
      <Route path='/users/password/reset/:token' exact component={ResetPassword}/>

      <AdminRoute path='/admin' exact component={AdminHome}/>
      <AdminRoute path='/admin/about' exact component={() => <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}/>}/>
      <AdminRoute path='/admin/products/add' exact component={() => <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}/>}/>
      <AdminRoute path='/admin/products/edit' exact component={() => <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}/>}/>
      <AdminRoute path='/admin/products/edit/:_idProduct' exact component={() => <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}/>}/>
      <AdminRoute path='/admin/products/remove_product/:_idProduct' exact component={() => <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}/>}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
