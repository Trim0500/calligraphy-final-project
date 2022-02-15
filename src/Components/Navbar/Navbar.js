import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import { NavDropdown } from 'react-bootstrap';

export default function NavbarCustom() {

    const handleLogout = () => {
        localStorage.removeItem('JwtToken');
        window.location.href = '/admin/login';
    }
    const handleClick = () => {
        if (localStorage.getItem('JwtToken')) {
            return (
                <NavDropdown className="font" title="Dashboard">
                    <NavDropdown.Item href="/admin/dashboard/portfolio">Portfolio</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/dashboard/forms">Forms</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/dashboard/contracts">Contracts</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
            )
        }
        else {
            return <div></div>
        }
    }

    return (
        <>
            <Nav>
                <NavLink to='/home'>
                    <span className="fw-bold pt-1 h5 text-center align-content-center">Serena's Flourish </span>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink className="fw-bold" to='/about' activeStyle>
                        About
                    </NavLink>
                    <NavLink className="fw-bold" to='/portfolio' activeStyle>
                        Services
                    </NavLink>
                    <NavLink className="fw-bold" to='/form' activeStyle>
                        Request a service
                    </NavLink>
                    {handleClick()}
                </NavMenu>

            </Nav>
        </>
    );
};
