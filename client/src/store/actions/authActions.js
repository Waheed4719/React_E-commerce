import jwtDecode from 'jwt-decode'
import Axios from 'axios'
import * as Types from './types'
import setAuthToken from './../../utils/setAuthToken'
import { message } from 'antd'


export const login = (user,history) => dispatch => {

    Axios.post('/api/auth/login',user)
    .then(user=>{
        
        let decode = jwtDecode(user.data.token)
        decode.cart = user.data.cart
        decode.history = user.data.history
        
        localStorage.removeItem('admin_token')
       localStorage.setItem('auth_token',user.data.token)
       
        setAuthToken(user.data.token)


        dispatch({
            type: Types.SET_USER,
            payload: {
                user:decode
            }
        })
        message.success('Successfully Logged in')
        setTimeout(()=>{
            history.push('/')
        },2000)
        
    })
    .catch(error=>{
        if(error){
            
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })

}

export const register = (user, history) => dispatch => {
    Axios.post('/api/auth/register',user)
    .then(user=>{
       
       
        dispatch({
            type: Types.CREATE_USER,
            payload: {
                createdUser:user.data
            }
        })
        history.push('/')
    })
    .catch(error=>{
        if(error){
            
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        }
        
        
    })
}

export const logout = history => {
    localStorage.removeItem('auth_token')
    setAuthToken()
    message.success('Successfully Logged out')
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}

export const addToCart = (data,history) => dispatch =>{

    Axios.post('/api/auth/add_to_cart',data)
    .then(items =>{
        
        
        dispatch({
            type: Types.ADD_TO_CART, 
            payload: {
                cart_data:items.data
        }
    })
    message.success('Item added to cart')
    })
    .catch(error =>{
        console.log(error.response.data)
        dispatch({
            type: Types.ERRORS,
            payload: {
                error: error.response.data
            }
        })
    })

}



export const removeCartItem= (id, history) => dispatch => {
    
    Axios.get(`/api/auth/removeFromCart?_id=${id}`)
        .then(json => {
            
            const cart = json.data
            dispatch({
                type: Types.REMOVE_CART_ITEM_USER,
                payload: cart
            })
        });

  
}





export const  onSuccessBuy = (data, history) =>  {
    console.log(data)
    return {
        type: Types.ON_SUCCESS_BUY_USER,
        payload: {
            cart: data.cart,
            history: data.history
    
        }
        }
   
   
}