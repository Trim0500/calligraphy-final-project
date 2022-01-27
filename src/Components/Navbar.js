import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import PortfolioCRUD from '../Pages/PortfolioCRUD'
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import IndexContent from './IndexContent';
import ImageUpload from "../Pages/ImageUpload";
import Form from "./FormClass";
import 'bootstrap/dist/css/bootstrap.css';
import Portfolio from "../Pages/Portfolio";
import FormOperation from "../Pages/FormOperation";
import ContractsPage from '../Pages/Contracts';
import ContractDetails from '../Pages/ContractDetails';
import EarningsPage from '../Pages/EarningsPage';
import Quote from "../Pages/Quote";
import Login from "../Pages/Login";
import ProtectRoute from "../Components/ProtectedRoute";
import About from "../Pages/About";

function Header() {

    const onLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshToken');
    };
    return (
        <Router>
            <Container>
                <Container>
                    <Switch>
                        <Route path="/" exact component={() => <IndexContent /> } />
                        <Route path="/form" exact component={() => <Form /> } />
                        <Route path="/portfolio" exact component={() => <Portfolio /> } />
                        <ProtectRoute path="/admin/dashboard/portfolio" exact component={() => <PortfolioCRUD /> } />
                        <ProtectRoute path="/admin/dashboard/portfolio/image/:id" exact component={() => <ImageUpload /> } />
                        <ProtectRoute path="/admin/dashboard/forms" exact component={() => <FormOperation /> } />
                        <ProtectRoute path="/admin/dashboard/contracts" exact component={() => <ContractsPage />} />
                        <ProtectRoute path="/admin/dashboard/contract/details" exact component={() => <ContractDetails /> } />
                        <ProtectRoute path="/admin/dashboard/quote/:id" exact component={() => <Quote /> } />
                        <Route path="/admin/login" exact component={() => <Login /> } />
                        <Route path="/about" exact component={() => <About /> } />
                        <Route path="/admin/contract/earnings" exact component={() => <EarningsPage />} />          
                    </Switch>
                </Container>
                <Navbar bg="light" expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand href="/">Serene Flourish</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Nav.Item>
                                    <Nav.Link href="/form" name="nbForm">Request a Service</Nav.Link>
                                </Nav.Item>

                                <NavDropdown title="Services" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/">Gallery</NavDropdown.Item>
                                    <NavDropdown.Item href="/">Pricing</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Item>
                                    <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link href="/about">About</Nav.Link>
                                </Nav.Item>

                            </Nav>
                            <Nav>
                                {localStorage.getItem('jwtToken') ?
                                    <NavDropdown title="Dashboard" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/admin/dashboard/portfolio">Portfolio</NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/dashboard/forms">Forms</NavDropdown.Item>
                                        <NavDropdown.Item href="/admin/dashboard/contracts">Contracts</NavDropdown.Item>
                                        <NavDropdown.Item onClick={onLogout} href="/admin/login">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <Nav.Item>
                                        <Nav.Link href="/admin/login">Login</Nav.Link>
                                    </Nav.Item>
                                }
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