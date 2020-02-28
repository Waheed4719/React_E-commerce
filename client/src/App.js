import React from 'react';

import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab} from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Navbar from './components/UI/Navbar'
import Footer from './components/UI/Footer'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ProductList from './containers/ProductList'
import AdminLogin from './pages/Admin/AdminLogin'
import Home from './pages/Home';
import {message} from 'antd'
import UploadProduct from './pages/Admin/UploadProduct';
library.add(fab, fas)
message.config({
  maxCount: 1,
  duration: 2
})
function App() {
  return (
<BrowserRouter>
<div className="App">
<Navbar/>
<Switch>
<Route exact path="/"  component={Home}/>
<Route exact path="/store"  component={ProductList}/>
<Route exact path="/admin"  component={AdminLogin}/>
<Route exact path="/login"  component={Login}/>
<Route exact path="/register"  component={Register}/>
<Route exact path="/admin/uploadProduct" component={UploadProduct} />


</Switch>
<Footer/>
</div>
</BrowserRouter>




 
  );
}

export default App;
