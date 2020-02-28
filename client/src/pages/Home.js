import React from 'react'
import {Icon, Carousel} from 'antd'

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


            <Icon style={{color: "darkslategray",fontSize: "40px"}} type="home" theme="filled"/>
            <h3 style={{color: "darkslategray"}}>Welcome Home!</h3>
        </div>
    )
}

export default Home
