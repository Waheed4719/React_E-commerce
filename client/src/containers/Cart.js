import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'


const Cart = props=> {
    
    const [cartContent, setCartContent] = useState([{}])
    
    useEffect(()=>{



        const cartItems = [];
        const cart = props.auth.user.cart
        if (props.auth.user && props.auth.user.cart) {
            if (cart.length > 0) {
                cart.forEach(item => {
                    Axios.get(`api/products/${item.id}`)
                    .then(items => {
                        let it = items.data
                        let mergedObj = {...it, ...item}
                        cartItems.push(mergedObj)
                        if(cartItems.length  === cart.length){
                            setCart(cartItems) 
                        }
                    }) 
                });   
            }
        }
    },[props.auth.user])
   
    const setCart = (item) => {
        setCartContent(item)
    }

    const transactionError = () => {
        console.log('Paypal error')
    }

    const transactionCanceled = () => {
        console.log('Transaction canceled')
    }
    
  const hello = cartContent.map((hi,index) => <div key={index}>{hi.title} - {hi.quantity} - {hi.price}</div>)
    return (
        
        <div style={{fontFamily:"Montserrat",height:"60vh"}}>
            <h3>This is the Cart page</h3>
          {hello}
            
            
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Cart)
