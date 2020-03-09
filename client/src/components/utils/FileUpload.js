import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
import './carousel.css'
function FileUpload(props) {
    
    var Url =''
    if(window.location.host.includes('localhost')){
       Url = 'http://localhost:5000'
    }
    else{
       Url = 'https://powerful-garden-71525.herokuapp.com'
    }
    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/products/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.url])
                    props.refreshFunction([...Images, response.data.url])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

  

    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', flexWrap:"wrap",justifyContent: 'center' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',margin: '10px'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div className="carousel" style={{ display: 'flex', width: '350px', height: '260px', overflowX: 'scroll',margin: '10px'}}>

                {Images.map((image, index) => (
                    <div  onClick={() => onDelete(image)}>
                        
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${Url}/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
