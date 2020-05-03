import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import './table.css'
function GetUsers(props) {

    const [users, setUsers] = useState([{}])

    useEffect(()=>{
     getUsers()
    //  getAdmins()
     getProducts()
     

    }, [])


 
        
    const getUsers = () => {
        var ad = []
        Axios.get('/api/admin/getUsers')
        .then(users=> {
            // setUsers(users.data)
            ad.push(...users.data)
            Axios.get('/api/admin/getAdmins')
            .then(admins => {
                console.log(admins.data)
                ad.push(...admins.data)
                console.log(ad)
                setUsers(ad)
            })
            .catch(error=>{
                console.log(error.response.data)
            })
        })
        .catch(error =>{
            console.log(error.response.data)
        })
    }



    const getProducts = () => {
        Axios.get('/api/admin/getProducts')
        .then(users=> {
            console.log(users.data)
            // setUsers(users.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    const data = users.map((user,index) => 


  <tr  key={index}>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.role}</td>
  </tr>
    )

    
    return (
        <div className="users">
        {props.admin.isAdmin? '': <Redirect to="/admin" />}
            
            <table style={{width:"400px",margin:"auto",display:'flex',flexDirection: 'column'}}>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            {data}
            </table>

        </div>
    )
}

const mapStateToProps = state =>({
    admin : state.admin
})

export default connect(mapStateToProps)(GetUsers)
