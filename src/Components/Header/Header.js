import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { signout } from '../../actions/Auth.actions'

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout())
    }

    const loggedInLink = () => {
        return (
            <Nav>
                {/* <li className="nav-item"><NavLink className="nav-link" exact to={"/"}>Home</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to={"/category"}>Category</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to={"/products"}>Products</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to={"/orders"}>Orders</NavLink></li> */}
                <li className="nav-item">
                    <span style={{ cursor: "pointer" }} className="nav-link" onClick={logout}>Signout</span>
                </li>
            </Nav>
        )
    }

    const nonLoggedInLink = () => {
        return (
            <Nav>
                {/* <Nav.Link to='#deets'>Signin</Nav.Link> */}
                <li className="nav-item">
                    <NavLink to="/signin" style={{ cursor: "pointer" }} className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" style={{ cursor: "pointer" }} className="nav-link">Signup</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <>
            <Navbar fixed="top" bg="dark" expand="lg" variant='dark' style={{ zIndex: 1 }}>
                <Container >
                    <Link to='/' className='navbar-brand'>Admin DashBoard</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
                        </Nav>
                        {auth.authenticate ? loggedInLink() : nonLoggedInLink()}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
