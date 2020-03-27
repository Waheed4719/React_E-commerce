import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../store/actions/authActions'
import Axios from 'axios'
import logo from './../../logo.svg'
export class Register extends Component {


constructor(props) {
    super(props)

    this.state = {
        name: '',
        email: '',
        pass: '',
        passConfirm: '',
        userImage: '',
        user: {},
        error: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.inputChangeHandler = this.inputChangeHandler.bind(this)
    this.onFileChange = this.onFileChange.bind(this);

}
        onFileChange(e){
            this.setState({
                userImage: e.target.files[0]
            })
        }

    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState)){
            
            return {
                error: nextProps.auth.errors
            }
        }
    }

    

 
    inputChangeHandler(e){
        e.preventDefault();
        console.log(e.target.value)
        this.setState({
            [e.target.name] : e.target.value,
            
        })
    }
    onSubmit(e){
        e.preventDefault();
        console.log("hello from onSubmit")
        const {name,email,pass,passConfirm,userImage} = this.state
        if(pass!==passConfirm){
            console.log("pass don't match")
            return
        }
        let image = ''
        const formData = new FormData()
        formData.append('file', userImage)
        Axios.post("/api/auth/upload_user_image",formData,{})
        .then(json=> {
            console.log("hey")
            image = json.data.userImage
            this.props.register({name,email,pass,image},this.props.history)
        })

        
    }



    render() {
        return (
            <div>
                 <div className=" cont "  >
                <div className="d-log">
              
               
                <h2 className="m-2 ">Sign Up</h2>
                <input name="name" placeholder="Name" className="form-control m-2 " onChange={this.inputChangeHandler}/>
                
                    <input name="email" placeholder="Email" className="form-control m-2 " value={this.state.email} onChange={this.inputChangeHandler}/>
                   {this.state.error.email? <small style={{color: "red",marginBottom:"5px"}}>* {this.state.error.email}</small>:''}
                    <input name="pass" placeholder="Password" className="form-control m-2 " value={this.state.pass} onChange={this.inputChangeHandler}/>
                    {this.state.error.pass? <small style={{color: "red",marginBottom:"5px"}}>* {this.state.error.pass}</small>:''}
                    <input name="passConfirm" placeholder="Password-confirmation" className="form-control m-2 " value={this.state.passConfirm} onChange={this.inputChangeHandler}/>
                    <input type="file" className="m-3" onChange={this.onFileChange}/>
                    <button className="btn-outline" onClick={this.onSubmit} >Login</button>
                </div>
                
                
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
auth : state.auth
})

export default connect(mapStateToProps,{register})(Register)
