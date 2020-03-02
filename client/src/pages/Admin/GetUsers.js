import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

function GetUsers(props) {

    const [users, setUsers] = useState([{}])

    useEffect(()=>{
     getUsers()
    }, [''])
        
    const getUsers = () => {
        Axios.get('/api/users')
        .then(users=> {
            console.log(users.data)
            setUsers(users.data)
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
        <div>
        {props.admin.isAdmin? '': <Redirect to="/admin" />}
            
            <table style={{width:"400px",margin:"auto"}}>
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
