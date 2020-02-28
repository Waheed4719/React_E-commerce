import React from 'react'
import './static/Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {logout} from './../../store/actions/authActions'
import {connect, useDispatch} from 'react-redux'

function Navbar(props) {
const dispatch = useDispatch()
const history = useHistory()

  const  onLogout = () => {
      console.log(history)
        dispatch(logout(history))
    }
    return (
        <div className="nav">
        
                <ul>
                {
                    props.auth.isAuthenticated?<li style={{cursor:"pointer"}} onClick={onLogout}>Logout</li>:<Link to='/login'><li >Login</li></Link>
                }
                
                <Link to="/"><li >Home</li></Link>
                <Link to="/store"><li >Store</li></Link>
                <li >Documentation</li>
                <li >About</li>
               
                </ul>
           
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps,{logout})(Navbar)
