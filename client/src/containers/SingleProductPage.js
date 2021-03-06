import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ImageGallery from './sections/ProductImage'
import { Button } from 'antd';
import {connect, useDispatch} from 'react-redux'
import {addToCart} from './../store/actions/authActions'
import './style.css'
import { useHistory } from 'react-router-dom';

const SingleProductPage = props => {
    
    var Url = window.location.protocol + '//' + window.location.host

    const history = useHistory()
    const dispatch = useDispatch()

    const [product, setProduct] = useState({})
    const [error, setError] = useState()
    
    
    useEffect(() =>{
        const product_id = props.match.params.id
        const getProduct = () =>{
            Axios.get(`/api/products/${product_id}`)
            .then(prod => {
                setProduct(prod.data)
               
            })
            .catch(error=>{
                console.log(error)
                setError(error)
            })
        }
        getProduct()
    },[props])

 

    const add_To_Cart = id => {
        let quantity = 2
    
        dispatch(addToCart({id, quantity}, history))

    }

  
    var img = []
    if(product.images){
        img =  product.images.map((image,index) => <div key={index}><img style={{backgroundColor:"white"}}   src ={`${Url}/${image}`} alt="product not found" /></div>)
    }


    return (
        <div className="spv" style={{display: "flex",flexDirection:"row",justifyContent:"center",paddingTop:"50px"}}>
            <div style={{maxWidth:"500px",height:"auto",backgroundColor:"white",margin:"20px 20px"}}>
            {error? <p>{error}</p> : ''}
            <ImageGallery  detail = {product} />

            </div>
            <div style={{display: "flex",flexDirection:"column",marginTop:"20px", margin:"10px",textAlign:"left",fontFamily:"montserrat"}}>
            <h5>Product Name: {product.title}</h5>
             <p>Price: ${product.price}</p>
             <p>Description: {product.description}</p>

             <Button onClick={()=>add_To_Cart(product._id)} style={{width:"100%"}}  ><FontAwesomeIcon icon={['fas','shopping-cart']} size="lg" className="mx-2 "/>Add To Cart</Button>
            </div>
            
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{addToCart})(SingleProductPage)
