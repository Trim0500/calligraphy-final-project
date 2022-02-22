import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import { NavDropdown } from 'react-bootstrap';

export default function NavbarCustom() {

    const navDropdownStyle = {
        color: 'black',
    };

    const handleLogout = () => {
        localStorage.removeItem('JwtToken');
        window.location.href = '/admin/login';
    }
    const handleClick = () => {
        if (localStorage.getItem('JwtToken')) {
            return (
                <NavDropdown style={navDropdownStyle}
                    title="Admin"
                    id="basic-nav-dropdown"
                >
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
        <div className="border-bottom border-2">
            <Nav>
                <NavLink to='/home'>
                    <span className="fw-bold pt-1 h5 text-center align-content-center">Serena's Flourish </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange"
                         className="bi bi-pen m-2" viewBox="0 0 16 16">
                        <path
                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                        />
                    </svg>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink className="fw-bold" to='/about'>
                        <span className="fw-bold">About</span>
                    </NavLink>
                    <NavLink className="fw-bold" to='/portfolio'>
                        <span className="fw-bold">Portfolio</span>
                    </NavLink>
                    <NavLink className="fw-bold" to='/form'>
                        <span className="fw-bold">Forms</span>
                    </NavLink>
                    {handleClick()}
                </NavMenu>
            </Nav>
        </div>
    );
};
