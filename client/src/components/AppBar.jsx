import React from 'react'
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";


const AppBar = (props) => {
    const currentUser = props.currentUser;
    const logout = props.logout;
    
    function RefreshToken(props2) {

        async function handleRefresh() {
            const res = await fetch("/api/login/token", {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.json();
            console.log("hello")
        };
        handleRefresh();
        

        return (
            <div className="refresh">
                <button onClick={handleRefresh}>click me</button>
            </div>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                                {/* <RefreshToken/> */}
                                <NavDropdown title="Tools" id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/create">New Item</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/inbox">Inbox</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/learn">Learn</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={RefreshToken} >Refresh</Nav.Link>
                                <Nav.Link as={Link} to={"/user/" + currentUser}>Profile</Nav.Link>
                                <Nav.Link eventKey={2} as={Link} to="/" onClick={logout}>
                                    Logout
                                </Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppBar
