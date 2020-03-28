import React, { useState, useEffect } from 'react'
import './style.css'
import {Card} from 'antd'
import ImageSlider from './../../src/components/utils/ImageSlider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { Link } from 'react-router-dom'

const { Meta } = Card
 function ProductList  () {
    const [products, setProducts] = useState([{}])
    const [error, setError] = useState('')

    useEffect(() => {
      getProducts()
    },[])

    const getProducts = () => {
        Axios.get('api/products/getProducts')
        .then(products => {
            
            setProducts(products.data)
        })
        .catch(error => {
            setError(error)
        })
    }

   
    const card = products.map((prod, index) => 
    
    
    
    
    <Card  key={index} style={{margin: "20px",display:"flex",flexDirection:"column",alignItems:"center",padding:"5px"}}
    hoverable={true}
    cover={<Link to={'/store/' + prod._id }><ImageSlider style={{width: "100%"}} images={prod.images} /></Link>}
    >
    <Meta
         title={prod.title}
         description ={`$${prod.price}`}
    /> 
    </Card>
    
    )
    return (
        <div style={{display: "flex",justifyContent:"center",fontFamily:"montserrat"}}>
        <div style={{
           
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
            maxWidth: "1200px"
          
        }}>
            <h3 style={{margin:"40px",color: "darkslateblue"}}>This is the products page</h3>
            {error?<p>{error}</p> :''}
            {products?'':
            <FontAwesomeIcon icon={['fas','box-open']} size="lg" style={{fontSize: "60px"}} className="mx-3"/>}
        <div style={{display: "flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",margin:"auto",flex: "2 1 auto"}}>
           {card}
        </div>
           
        </div>
        </div>
    )
}

export default ProductList
