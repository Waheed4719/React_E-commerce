import React from 'react'
import {Icon} from 'antd'

function Home() {
    return (
        <div style={{
            minHeight: "500px",
            minWidth: "100%",
            display:'flex',
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>


            <Icon style={{color: "darkslategray",fontSize: "40px"}} type="home" theme="outlined"/>
            <h3 style={{color: "darkslategray", fontWeight:"lighter"}} >Welcome Home!</h3>
        </div>
    )
}

export default Home
