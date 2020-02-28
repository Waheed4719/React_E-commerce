import React, { useState, useEffect } from 'react'
import './style.css'
import Card from './../components/Cards/Card.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

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
            console.log(error)
        })
    }
    
    const card = products.map((prod, index) => <Card key={index} img = {prod.images} title={prod.title} price={prod.price} />)
    return (
        <div style={{display: "flex",justifyContent:"center",}}>
        <div style={{
           
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
            maxWidth: "1200px"
          
        }}>
            <h3 style={{margin:"40px",color: "darkslateblue"}}>This is the products page</h3>
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
