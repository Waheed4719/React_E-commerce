import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'
import * as Types from './store/actions/types'
import setAuthToken from './utils/setAuthToken'
import Axios from 'axios'





const token = localStorage.getItem('auth_token')
if(token){
    let decode = jwtDecode(token)
    // var user = {}
    setAuthToken(token)
    console.log(decode)
    Axios.get(`/api/auth/getCartAndHistory?id=${decode._id}`)
    .then(user => {
        
        decode.cart= user.data.cart
        decode.history = user.data.history
        store.dispatch({
            type: Types.SET_USER,
            payload: {
                user: decode
            }
        })
    })
   
    
   
}
const admintoken = localStorage.getItem('admin_token')
if(admintoken){
    let decode = jwtDecode(admintoken)
   
    setAuthToken(admintoken)
    store.dispatch({
        type: Types.SET_ADMIN,
        payload: {
            admin: decode
        }
    })
}

ReactDOM.render(
    <Provider store ={store} >
    <App/>
    </Provider>,
     document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
