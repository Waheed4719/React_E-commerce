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



   

    const onLogout = () => {
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
        let elm = document.getElementsByTagName('ul')[0].children
        let i;
        for (i = 0; i < elm.length; i++) {
          elm[i].addEventListener('click', ()=>{
              setisClicked(!isClicked)
          })
        }
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
            <Link to='/cart'><li style={{cursor:"pointer",}}><FontAwesomeIcon icon={['fas','shopping-cart']} size="1x" /><div className="p-1 mx-1 " 
            style={{fontSize:"14px",margin:"auto", display:"inline-block",width:"25px",height:"25px", backgroundColor:"dimgray",borderRadius:"20px",color:"white",fontWeight:"bolder"}}>{props.auth.user.cart?
           Object.keys(props.auth.user.cart).length:0}</div></li></Link>

           
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
