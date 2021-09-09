import React from 'react'
import { Route } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {

    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.userLogin);

    const logoutHandler = () => {
        // LOGOUT IS NOT FUNCTION REFERENCE SPENT ONE HOUR ON THIS
       dispatch(logout())
    }

    return (
        <header> 

            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    
                    {/* instead of using simple link in react-router e.g Link and to  */}
                    {/* you would have to import link container and you will remove href and use the link inside */}
                    {/* put to in the link container */}

                    <LinkContainer to="/">
                    
                        <Navbar.Brand>Proshop</Navbar.Brand>

                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                    <Route render={({ history }) => <SearchBox history={history} />} />

                    <Nav className="ml-auto" style={{marginLeft: 'auto'}}>
                        
                        <LinkContainer to="/cart">

                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>
                                Cart
                            </Nav.Link>

                        </LinkContainer>
                        { 
                        userInfo 
                        ? 
                        (   <> 
                                <NavDropdown title={userInfo.name} id="username">
                                    

                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>

                                </NavDropdown>
                                
                            </>
                        ) 
                        : 
                        (<LinkContainer to='/login'>

                        <Nav.Link href="/login">
                            <i className="fas fa-user"></i>
                            Sign In
                        </Nav.Link>

                        </LinkContainer>
                        ) 
                        }
                        
                        {
                        userInfo 
                        && 
                        userInfo.isAdmin 
                        && 
                        (
                            <> 
                                <NavDropdown title='Admin' id="adminmenu">
                                    

                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            </>
                        )
                        }

                    </Nav>

                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </header>
    )

}

export default Header
