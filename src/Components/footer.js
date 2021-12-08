import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';

function Footer(){
    return(
        <Container className="fixed-bottom">
            <Navbar bg="light" expand="lg">
                    <p>Serene Florish &#169; 2022</p>
            </Navbar>
        </Container>
    );
}

export default Footer