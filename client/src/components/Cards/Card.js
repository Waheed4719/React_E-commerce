import React from 'react'
import ImageSlider from './../utils/ImageSlider'
import {Carousel,Card } from 'antd'
import {Link} from 'react-router-dom'
const { Meta } = Card

function Card({id, img,title,price}) {
    
    return (
        <div style={{margin:"20px",width:"200px" ,fontFamily:"Raleway"}}>
         
            
            <ImageSlider images={img} />

            <Link to={'/store/' + id }> <p style={{fontSize: "18px",margin:"0px", color:"darkslateblue",fontWeight:"500"}}>{title}</p></Link>
            <p style={{fontSize: "14px",color:"darkslategray",margin:"0px",fontFamily:"Montserrat"}}>{price}$ </p>

       

        </div>
 
    )
}

export default Card
