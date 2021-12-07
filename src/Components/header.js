import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'

function Header() {
    return (
        <Navbar bg="light" expand="lg" fixed="top" position="sticky">
            <Container>
                <Navbar.Brand href="/">Serene Florish</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/">About the Business</Nav.Link>
                        <Nav.Link href="/">Portfolio</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">Gallery</NavDropdown.Item>
                            <NavDropdown.Item href="/">Pricing</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/">Request a Service</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header