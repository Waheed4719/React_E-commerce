import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import './Dash.css'

function Dashboard() {
    return (
        <div className="dash">
            <h1>Admin Dashboard</h1>

            <div className="rows">

                <Link to="/admin/users"><div className="card">
                    <p>Users: 5</p>
                </div></Link>

                <div className="card">
                    <p>Admin: 1</p>
                </div>

                <div className="card">
                    <p>Products: 3</p>
                </div>


            </div>
        </div>
    )
}

export default Dashboard
