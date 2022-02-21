// make a footer

import React from "react";
import {Navbar} from "react-bootstrap";

export default function footer () {

    const footerStyle = {
        backgroundColor: "#f5f5f5",
        color: "dark",
        padding: "10px",
        bottom: "0",
        width: "100%",
        textAlign: "center",
        fontSize: "0.8em",
        fontWeight: "bold",
        fontFamily: "Arial, Helvetica, sans-serif",
        textTransform: "uppercase",
        letterSpacing: "2px",
        borderTop: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
        boxShadow: "0px 0px 5px #ccc",
        zIndex: "999",
        position: "fixed",
    };

    return(
    <div style={footerStyle}>
        Copyright © 2022 - All Rights Reserved - Serene Flourish
    </div>
    )
}