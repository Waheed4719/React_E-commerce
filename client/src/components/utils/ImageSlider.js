import React from 'react'
import { Carousel } from 'antd'
function ImageSlider({images}) {
   var Url =''
 if(window.location.host.includes('localhost')){
    Url = 'http://localhost:5000'
 }
 else{
    Url = 'https://powerful-garden-71525.herokuapp.com'
 }
    return (
        <div >
            {images? 
                <div style={{width:"200px",display:"block"}}>

   <Carousel autoplay >
              {images.map((image, index) => (
                  <div key={index}>
                      <img style={{ width: '100%', maxHeight: '150px' }}
                          src={`${Url}/${image}`} alt="productImage" />
                         
                         
                  </div>
              ))}
          </Carousel>


                </div>



           : ''
        }

        </div>
    )
}

export default ImageSlider
