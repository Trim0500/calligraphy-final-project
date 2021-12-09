import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import InputForm from './Form';

function Header() {
    return (
        <Router>
        <Container>
            <Navbar bg="light" expand="lg" fixed="top">
                    <Navbar.Brand href="/">Serene Florish</Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About the Business</Nav.Link>
                            <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                            <NavDropdown title="Services" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/">Gallery</NavDropdown.Item>
                                <NavDropdown.Item href="/">Pricing</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/form">Request a Service</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
            <Navbar bg="light" expand="lg" fixed="bottom" className='justify-content-center'>
                    <p>Serene Florish &#169; 2022</p>
            </Navbar>
        </Container>
        <Switch>
            <Route path="/form" exact component={() => <InputForm /> } />
        </Switch>
        </Router>
    );
}

export default Header