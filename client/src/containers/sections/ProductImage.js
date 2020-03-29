import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'


function ProductImage(props) {
   
    const [Images, setImages] = useState([])

    useEffect(()=>{
        var Url = window.location.protocol + '//' + window.location.host
        if(props.detail.images && props.detail.images.length>0){
            let images = [];
      props.detail.images && props.detail.images.map(item =>{
            
            images.push({
                original: `${Url}/${item}`,
                thumbnail: `${Url}/${item}`
            })
        })
        
        setImages(images)
    }

    }, [props.detail])
    
    return (
        <div>
            <ImageGallery  useBrowserFullscreen = {false} items ={Images} />
        </div>
    )
}

export default ProductImage
