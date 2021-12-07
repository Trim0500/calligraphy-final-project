import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Footer(){
    return(
        <Navbar bg="light" expand="lg" fixed="bottom">
            <Container>
                <p>Serene Florish &#169; 2022</p>
            </Container>
        </Navbar>
    );
}

export default Footer