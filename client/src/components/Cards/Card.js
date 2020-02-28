import React from 'react'
import ImageSlider from './../utils/ImageSlider'
import {Carousel } from 'antd'


function Card({img,title,price}) {
    
    return (
        <div style={{margin:"20px",width:"200px" ,fontFamily:"Raleway"}}>
         
            
            <ImageSlider images={img} />

            <p style={{fontSize: "18px",margin:"0px", color:"darkslateblue",fontWeight:"500"}}>{title}</p>
            <p style={{fontSize: "14px",color:"darkslategray",margin:"0px",fontFamily:"Montserrat"}}>{price}$ </p>

           
        </div>
 
    )
}

export default Card
