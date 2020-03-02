import React, { useState } from 'react'
import './static/Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {logout} from './../../store/actions/authActions'
import {connect, useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Navbar(props) {
const dispatch = useDispatch()
const history = useHistory()
const [isClicked, setisClicked] = useState(false)


  const  onLogout = () => {
      console.log(history)
        dispatch(logout(history))
    }

    const hamMenu = () => {
      setisClicked(!isClicked)
      console.log(isClicked)
    }

    let drawerClasses = '';
    if(isClicked){
        drawerClasses = 'open'
        console.log(drawerClasses)
    }
    else{
        drawerClasses =''
    }
    return (
        <div className="nav">
            <div className="hamMenu" onClick={hamMenu}style={{display: "none"}}>
                <div></div>
                <div></div>
                <div></div>
                </div>
                <div>
                <ul className= {drawerClasses}>
            
            {
                props.auth.isAuthenticated?<li style={{cursor:"pointer"}} onClick={onLogout}>Logout</li>:<Link to='/login'><li >Login</li></Link>
            }
            
           
            <Link to="/"><li >Home</li></Link>
            <Link to="/store"><li >Store</li></Link>
            <li >Documentation</li>
            <li >About</li>
           
            </ul>
                </div>
              
           
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps,{logout})(Navbar)
