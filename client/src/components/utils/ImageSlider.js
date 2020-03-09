import React from 'react'
import { Carousel } from 'antd'
function ImageSlider({images}) {
   
   
    return (
        <div >
            {images? 
                <div style={{width:"200px",display:"block"}}>

   <Carousel autoplay >
              {images.map((image, index) => (
                  <div key={index}>
                      <img style={{ width: '100%', maxHeight: '150px' }}
                          src={`http://localhost:5000/${image}`} alt="productImage" />
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
