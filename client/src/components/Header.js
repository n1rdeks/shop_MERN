import React from 'react';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';


const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin);

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark"
                    variant="dark"
                    expand="lg"
                    collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src="/images/mern.jpg"
                                 alt="MERN Shop"/>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/*this little hack for send to component history prop*/}
                        <Route render={({ history }) => <SearchBox history={history}/>}/>
                        <Nav className="ml-auto">
                            <LinkContainer to="/basket">
                                <Nav.Link><i
                                    className="fas fa-shopping-cart"/>&nbsp;Basket</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name}
                                             id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (<LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"/>&nbsp;Sign In</Nav.Link>
                            </LinkContainer>)}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin'
                                             id='adminMenu'>
                                    <LinkContainer to='/admin/userList'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productList'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderList'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
