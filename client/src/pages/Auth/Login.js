import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import {login} from '../../store/actions/authActions'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './logReg.css'
export class Login extends Component {
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


    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.auth.errors) !== JSON.stringify(prevState)){
            
            return {
                error: nextProps.auth.errors
            }
        }
    }

    

 
    inputChangeHandler(e){
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value,
            
        })
    }
    onSubmit(e){
        e.preventDefault();
        const {email,pass} = this.state
        this.props.login({email,pass},this.props.history)
    }
    
    render() {
        if(this.props.auth.isAuthenticated){
            return <Redirect to='/'   />
        }
        console.log(this.state.error)
     
        return (
            <div className=" cont "  >
                
                <div className="d-log">
                {/* <img className="react" src = {logo} alt= "React Logo"/>   */}
                    {/* <div className="buttons">


                        <button className="S-in active auth">Sign-In</button>
                    <Link to="/register"><button className="S-up auth">Sign-Up</button></Link>
                    </div> */}
               
                <h2 className="m-2 ">Sign In</h2>
                
                    <input name="email" placeholder="Email" className="form-control m-2 "   onChange={this.inputChangeHandler}/>
                   {this.state.error.email? <small style={{color: "red",marginBottom:"5px"}}>* {this.state.error.email}</small>:''}
                    <input name="pass" placeholder="Password" className="form-control m-2 " onChange={this.inputChangeHandler}/>
                    {this.state.error.pass? <small style={{color: "red",marginBottom:"5px"}}>* {this.state.error.pass}</small>:''}
                    <Link to="/register"><small style={{marginLeft: "-150px"}} onClick={this.clearState}>Don't Have an account?</small></Link>
                    <h5 className="mt-3">Or</h5>
                    <div className="icons m-3">
                    <FontAwesomeIcon icon={['fab','facebook']} size="lg" className="mx-2 icon"/>
                    <FontAwesomeIcon icon={['fab','google']} size="lg" className="mx-2 icon"/>
                    <FontAwesomeIcon icon={['fab','github']} size="lg" className="mx-2 icon"/>
                    </div>
                    
                    <button className="btn-outline" onClick={this.onSubmit} >Login</button>
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth
})
export default connect(mapStateToProps,{login})(Login)
