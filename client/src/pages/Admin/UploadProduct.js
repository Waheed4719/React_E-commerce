import React,{useState} from 'react'
import Upload from './../../components/utils/FileUpload'

import { Typography, Button, Form, Input} from 'antd';
import Axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
const { Title } = Typography;
const { TextArea } = Input;




function UploadProduct (props) {
    const history = useHistory()

    const [Images, setImages] = useState([])
    const [TitleValue, setTitle] = useState('')
    const [Price, setPrice] = useState('')
    const [Description, setDescription] = useState('')
    
    const updateImages = (newImages) => {
        console.log(newImages)
        setImages(newImages)
    }
    const onTitleChange= e => {
        setTitle(e.target.value)
    }

    const onPriceChange= e => {
        setPrice(e.target.value)
    }
    const onDescriptionChange= e => {
        setDescription(e.target.value)
    }
    const onSubmit= (e) => {
        e.preventDefault()

        if (!TitleValue || !Description || !Price ||!Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            title: TitleValue,
            description: Description,
            price: Price,
            images: Images
        }
        

        Axios.post('/api/admin/products/addProduct', variables)
        .then(response => {
            console.log(Axios.defaults.headers.common['Authorization'])
            if (response.data.success) {
                alert('Product Successfully Uploaded')
                console.log(response.data)
                history.push('/store')
            } else {
                alert('Failed to upload Product')
            }
        })
        .catch(error=> {
            console.log(Axios.defaults.headers.common['Authorization'])
            console.log(error)})

    }
    if(!props.admin.isAdmin){
        return <Redirect to='/admin'   />
    }

    return (
       
            
        // </div>
        <div style={{ maxWidth: "700px", margin: "2rem auto"}}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Title level={2}> Upload Product</Title>
            </div>


            <Form onSubmit={onSubmit} style={{textAlign:'left'}}>

               
                <Upload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={Price}
                    type="number"
                />
                <br /><br />
            
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>

    )
}

const mapStateToProps = state => ({
    admin : state.admin
})
export default connect(mapStateToProps)(UploadProduct)
