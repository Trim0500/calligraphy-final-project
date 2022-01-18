import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import AdminPanel from '../Pages/AdminPanel'
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import IndexContent from './IndexContent';
import ImageUpload from "../Pages/ImageUpload";
import Form from "./FormClass";
import 'bootstrap/dist/css/bootstrap.css';
import Portfolio from "../Pages/Portfolio";
import FormCrud from "../Pages/FormCRUD";
import ContractsPage from '../Pages/Contracts';
import ContractDetails from '../Pages/ContractDetails';
import EarningsPage from '../Pages/EarningsPage';
import Quote from "../Pages/Quote";

function Header() {
    return (
        // increase margin bottom for navbar
        <Router>
            <Container >
                <Container>
                    <Switch>
                        <Route path="/" exact component={() => <IndexContent /> } />
                        <Route path="/form" exact component={() => <Form /> } />
                        <Route path="/portfolio" exact component={() => <Portfolio /> } />
                        <Route path="/admin" exact component={() => <AdminPanel /> } />
                        <Route path="/admin/portfolio/image/:id" exact component={() => <ImageUpload /> } />
                        <Route path="/admin/forms" exact component={() => <FormCrud /> } />
                        <Route path="/admin/contracts" exact component={() => <ContractsPage />} />
                        <Route path="/admin/contract/details" exact component={() => <ContractDetails /> } />
                        <Route path="/admin/quote/:id" exact component={() => <Quote /> } />
                        <Route path="/admin/contract/earnings" exact component={() => <EarningsPage />} />
                    </Switch>
                </Container>
                <Navbar bg="light" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand href="/">Serene Flourish</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Item>
                                    <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link href="/form" name="nbForm">Request a Service</Nav.Link>
                                </Nav.Item>

                                <NavDropdown title="Services" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/">Gallery</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Pricing</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Item>
                                    <Nav.Link href="/about">About</Nav.Link>
                                </Nav.Item>

                            </Nav>
                            <Nav>
                                <Nav.Item>
                                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/admin">Portfolio</NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/forms">Forms</NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/contracts">Contracts</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Navbar bg="light" expand="lg" fixed="bottom" className='justify-content-center'>
                    &#169; 2022 Copyright : Serene Flourish
                </Navbar>
            </Container>
        </Router>
    );
}

export default Header