import React from 'react'
import { Container,Col } from 'react-bootstrap'
import Header from '../Header/Header'
import { NavLink } from 'react-router-dom'
import './style.css'

const Layout = (props) => {
    return (
        <>
            <Header />
            {props.sidebar ? <Container fluid>
                {/* here previously we had used Row */}
                <div style={{display:"flex"}}>
                    <Col md={2} className="sidebar">
                        <ul>
                            <li><NavLink exact to={"/"}>Home</NavLink></li>
                            <li><NavLink to={"/category"}>Category</NavLink></li>
                            <li><NavLink to={"/products"}>Products</NavLink></li>
                            <li><NavLink to={"/orders"}>Orders</NavLink></li>
                            <li><NavLink to={"/queries"}>Queries</NavLink></li>
                        </ul>
                    </Col>
                    <Col md={10} style={{ marginLeft: 'auto', paddingTop:"60px" }} >{props.children}</Col>
                </div>
            </Container>
            :
            props.children
            }
        </>
    )
}

export default Layout
