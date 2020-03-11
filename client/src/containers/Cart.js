import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import './static/cart.css'
import Paypal from './../components/utils/Paypal';
import { removeCartItem ,onSuccessBuy } from './../store/actions/authActions'
import {useDispatch} from 'react-redux'
import { Result, Empty, Button } from 'antd';


const Cart = props=> {
    const dispatch = useDispatch()
    const [cartContent, setCartContent] = useState([{}])
    var Url = window.location.protocol + '//' + window.location.host

    // const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(()=>{

        const cartItems = [];
        const cart = props.auth.user.cart
        console.log(props.auth.user.cart)
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



    useEffect(() => {

        if (props.auth.user.cart && props.auth.user.cart.length > 0) {
            calculateTotal(props.auth.user.cart)
        }


    }, [props.auth.user.cart])

    const calculateTotal = (cart) => {
        let total = 0;

        cart.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        });
        console.log(total)
        setTotal(total)
        setShowTotal(true)
    }

   
    const setCart = (item) => {
        setCartContent(item)
    }


    const removeFromCart = (productId) => {
        
        dispatch(removeCartItem(productId, props.history))
    
        console.log(props.auth.user.cart)
        console.log(props.auth)
        
    }


    const transactionSuccess = (data) => {
 
        let variables = {
            cartDetail: props.auth.user.cart, paymentData: data
        }
        

        Axios.post('/api/auth/successBuy', variables)
            .then(response => {
                if (response.data.success) {
                    setShowSuccess(true)
                    setShowTotal(false)

                    dispatch(onSuccessBuy({
                        cart: response.data.cart,
                        history: response.data.history,
                        cartDetail: response.data.cartDetail
                    },props.history))

                    setCartContent("")
                    
                    

                } else {
                    alert('Failed to buy it')
                }
            })
    }

    const transactionError = () => {
        console.log('Paypal error')
    }

    const transactionCanceled = () => {
        console.log('Transaction canceled')
    }

    
    var cartBlock = ''
    if(cartContent){
         cartBlock = cartContent.map((hi,index) => 
         <tr key={index}>
             {hi.images? <td style={{padding: "10px"}}><img className="cart_img" alt="product_image"  src ={`${Url}/${hi.images[0]}`} /></td>:'' }
             <td><strong>{hi.title}</strong></td><td>{hi.quantity}</td><td>{hi.price}</td><td><Button onClick={() => removeFromCart(hi._id)}>Remove</Button></td></tr>)
    }
 
    return (
        
        <div className="cart-page" >
            <h3>This is the Cart page</h3>
            {props.auth.user.cart? console.log(props.auth.user.cart): ''}
          <table >
              <tbody>
              <tr><th>Product Image</th>
                  <th>Product Name</th>
                  <th>Product Quantity</th>
                  <th>Product Price</th>
                  <th>Action</th></tr>
              {cartBlock}</tbody>
             


          </table>

                 {ShowTotal ?
                    <div style={{ marginTop: '3rem' }}>
                        <h2>Total amount: ${Total} </h2>
                    </div>
                    :
                    ShowSuccess ?
                        <Result
                            status="success"
                            title="Successfully Purchased Items"
                        /> :
                        <div style={{
                            width: '100%', display: 'flex', flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <br />
                            <Empty description={false} />
                            <p>No Items In the Cart</p>

                        </div>
                }


    {ShowTotal && 
      <Paypal 
      toPay={Total}
      onSuccess={transactionSuccess}
      transactionError={transactionError}
      transactionCanceled={transactionCanceled}
   />
      }
          
            
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
    
})

export default connect(mapStateToProps,{removeCartItem})(Cart)
