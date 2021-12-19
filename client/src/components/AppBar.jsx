import React from 'react'
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { BsHeartFill, BsFillEnvelopeFill, BsPlusCircleFill, BsPersonSquare } from "react-icons/bs";


const AppBar = (props) => {
    const currentUser = props.currentUser;
    const logout = props.logout;


    return (
        <Navbar
            collapseOnSelect expand="lg" bg="dark" variant="dark"
            className="position-fixed w-100"
            style={{
                "z-index": "5"
            }}>
            <Container>
                <Navbar.Brand as={Link} to="/">Tips</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/marketplace">Marketplace</Nav.Link>
                    </Nav>
                    {
                        (!currentUser) ?

                            <Nav>
                                <Nav.Link as={Link} to="/learn">Learn</Nav.Link>
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                                <Nav.Link as={Link} eventKey={2} to="login">
                                    Login
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <Nav.Link as={Link} to="/likes">
                                    <BsHeartFill className="fs-5" />
                                </Nav.Link>
                                <Nav.Link as={Link} to="/create">
                                    <BsPlusCircleFill className="fs-5" />
                                </Nav.Link>
                                <Nav.Link as={Link} to="/inbox">
                                    <BsFillEnvelopeFill className="fs-5" />
                                </Nav.Link>
                                <NavDropdown title={<BsPersonSquare className="fs-5"/>} >
                                    <NavDropdown.Item as={Link} to={"/user/" + currentUser}>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/" onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                {/* <Nav.Link as={Link} to={"/user/" + currentUser}>Profile</Nav.Link>
                                <Nav.Link eventKey={2} as={Link} to="/" onClick={logout}>
                                    Logout
                                </Nav.Link> */}
                                {/* <NavDropdown title="Tools" id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/create">New Item</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/learn">Learn</NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppBar
