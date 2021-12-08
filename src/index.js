import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/header"
import Footer from "./Components/footer"
import logo from "./resources/logo.png"
import card from "./resources/women's_day_card.png"
import gin from "./resources/gin_bottle_engraving.png"
import live from "./resources/live.png"
import { Container, Stack, Image, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Content() {
    return (
        <Container >
            <h1 id="welcome-header" style={{textAlign: 'center'}}>Welcome to Serene Flourish Calligraphy!</h1>
            <Image src={ logo } alt="Serene Flourish Logo" width="926" height="400" />
            <Container>
                <Row>
                    <Col><Image src={ card } alt="Women's Day Card" width="200" height="200" /></Col>
                    <Col><Image src={ gin } alt="Women's Day Card" width="200" height="200" /></Col>
                    <Col><Image src={ live } alt="Women's Day Card" width="200" height="250" /></Col>
                </Row>
                <Row>
                    <Col>
                        <h6 style={{textAlign: "center"}}>Calligraphy</h6>
                        <p style={{textAlign: "center"}}>From pencil to marker to paint</p>
                    </Col>
                    <Col>
                        <h6 style={{textAlign: "center"}}>Engraving</h6>
                        <p style={{textAlign: "center"}}>From bottles to laptops</p>
                    </Col>
                    <Col>
                        <h6 style={{textAlign: "center"}}>Events</h6>
                        <p style={{textAlign: "center"}}>Find out where we'll be next!</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

class Page extends React.Component {
    render() {
        return (
            <Stack>
                <Header />
                <Content />
                <Footer />
            </Stack>
        );
    }
}

ReactDOM.render (
    <Page />,
    document.getElementById('root')
);
