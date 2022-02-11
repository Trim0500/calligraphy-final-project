import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu
} from './NavbarElements';

export default function NavbarCustom() {
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
                </NavMenu>
            </Nav>
        </>
    );
};
