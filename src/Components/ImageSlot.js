import React from "react";
import ImageUpload from "./ImageUpload";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Image, Nav, Row} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import card from "../resources/img/women's_day_card.png";
import gin from "../resources/img/gin_bottle_engraving.png";
import live from "../resources/img/live.png";


function ImageSlot() {

   return (
       <div className="container mt-5">
           <div className="row">
               <div className="mx-auto col-md-10">
                   <Container >
                       <h1 id="welcome-header" style={{textAlign: 'center'}}>Welcome to the Admin Page!</h1>
                       <Router>
                           <Container>
                               <Row>
                                   <Col>
                                       <h3>Calligraphy Signature</h3>
                                       <Nav.Link href="/admin/portfolio/image" name="calligraphy-img"><Image src={ card } alt="Women's Day Card" width="200" height="200" /></Nav.Link>
                                       <Nav.Link href="/admin/portfolio/image" name="calligraphy-img"><Image src={ card } alt="Women's Day Card" width="200" height="200" /></Nav.Link>
                                   </Col>
                                   <Col>
                                       <h3>Calligraphy events</h3>
                                       <Nav.Link href="/admin/portfolio/image" name="event-img"><Image src={ live } alt="Women's Day Card" width="200" height="250" /></Nav.Link>
                                       <Nav.Link href="/admin/portfolio/image" name="event-img"><Image src={ live } alt="Women's Day Card" width="200" height="250" /></Nav.Link>
                                   </Col>
                                   <Col>
                                       <h3>Calligraphy engraving</h3>
                                       <Nav.Link href="/admin/portfolio/image" name="engraving-img"><Image src={ gin } alt="Women's Day Card" width="200" height="200" /></Nav.Link>
                                       <Nav.Link href="/admin/portfolio/image" name="event-img"><Image src={ live } alt="Women's Day Card" width="200" height="250" /></Nav.Link>
                                   </Col>
                               </Row>
                           </Container>
                           <Switch>
                               <Route path="/admin/portfolio/image6" exact component={() => <ImageUpload /> } />
                           </Switch>
                       </Router>
                   </Container>
               </div>
           </div>
       </div>
   );
}

export default ImageSlot;