import React from 'react';

function Header() {
    return (
        <div className="navHeader">
            <ul className="navBar">
                <li className="navItem">
                    <a className="navLink" href="/">Home</a>
                </li>
                <li className="navItem">
                    <a className="navLink" href="/">About the Business</a>
                </li>
                <li className="navItem">
                    <a className="navLink" href="/">Portfolio</a>
                </li>
                <li className="navItem">
                    <a className="navLink" href="/">Services Information</a>
                </li>
                <li className="navItem">
                    <a className="navLink" href="/">Request a Service</a>
                </li>
            </ul>
        </div>
    );
}

export default Header