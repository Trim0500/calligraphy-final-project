// make a footer

import React from "react";
import {Navbar} from "react-bootstrap";

export default function footer () {

    // make navbar have a background color
    const footerStyle = {
        backgroundColor: "rgba(242, 175, 109, 0.9)",
        color: "dark",
    }

    return(
        <Navbar style={footerStyle} fixed="bottom" className="justify-content-around">
            <div className="">
                &#169; 2022 Copyright : Serene Flourish
            </div>
        </Navbar>
    )
}