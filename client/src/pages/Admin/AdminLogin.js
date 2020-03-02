import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import {adminlogin} from './../../store/actions/adminActions'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

 
export class AdminLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             pass: '',
             user: {},
             error: {}
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    // static getDerivedStateFromProps(nextProps,prevState){
    //     if(JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState)){
            
    //         return {
    //             error: nextProps.auth.errors
    //         }
    //     }
    // }
    inputChangeHandler(e){
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();
        const {email,pass} = this.state
        this.props.adminlogin({email,pass},this.props.history)
    }
    
    render() {
        if(this.props.admin.isAdmin){
            return <Redirect to='/admin/uploadProduct'   />
        }
       
        return (
            <div className="cont">
                    <div className="d-log">
               
                <h2 className="m-2 lead" style={{fontSize: "30px",marginBottom:"30px"}}>Admin Sign In</h2>
                
                    <input name="email" placeholder="Email" className="form-control m-2 "   onChange={this.inputChangeHandler}/>
                   {this.state.error.email? <small style={{color: "red",marginBottom:"5px"}}>* {this.state.error.email}</small>:''}
                    <input name="pass" placeholder="Password" className="form-control m-2 " onChange={this.inputChangeHandler}/>
                    {this.state.error.pass? <small style={{color: "red",marginBottom:"5px"}}>* {this.state.error.pass}</small>:''}
                    <Link to="/register"><small style={{marginLeft: "-150px"}} onClick={this.clearState}>Don't Have an account?</small></Link>
                   
                    
                    <button onClick={this.onSubmit} className="btn btn-outline-danger m-3 ">Login</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
})
export default connect(mapStateToProps,{adminlogin})(AdminLogin)
