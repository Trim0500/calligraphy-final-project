import React from 'react';
import logo from "../resources/img/logo.png"
import card from "../resources/img/women's_day_card.png"
import gin from "../resources/img/gin_bottle_engraving.png"
import live from "../resources/img/live.png"
import { Container, Image, Row, Col, Nav } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import InputForm from './Form';
import 'bootstrap/dist/css/bootstrap.css';

function IndexContent() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="mx-auto col-md-10">
                    <Container >
                        <h1 id="welcome-header" style={{textAlign: 'center'}}>Welcome to Serene Flourish Calligraphy!</h1>
                        <Image src={ logo } alt="Serene Flourish Logo" width="926" height="400" />
                        <Router>
                        <Container>
                            <Row>
                                <Col><Nav.Link href="/form" name="calligraphy-img"><Image src={ card } alt="Women's Day Card" width="200" height="200" /></Nav.Link></Col>
                                <Col><Nav.Link href="/form" name="engraving-img"><Image src={ gin } alt="Women's Day Card" width="200" height="200" /></Nav.Link></Col>
                                <Col><Nav.Link href="/form" name="event-img"><Image src={ live } alt="Women's Day Card" width="200" height="250" /></Nav.Link></Col>
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
                        <Switch>
                            <Route path="/form" exact component={() => <InputForm /> } />
                        </Switch>
                        </Router>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default IndexContent;