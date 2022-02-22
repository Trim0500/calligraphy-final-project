import React from 'react';
import logo from "../resources/img/logo.png"
import card from "../resources/img/women's_day_card.png"
import gin from "../resources/img/gin_bottle_engraving.png"
import live from "../resources/img/live.png"
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../Styling/app.css';
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="mx-auto col-md-10">
                    <Container>
                        <h1 id="welcome-header" style={{textAlign: 'center'}}>{t("welcome")}</h1>
                        <img className="mx-auto d-block" src={ logo } alt="Serene Flourish Logo" width="926" height="400" />
                            <Row>
                                <Col>
                                    <Nav.Link href="/form" name="calligraphy-img"><img  alt="preview" className="mx-auto d-block"  src={ card } width="200" height="200" /></Nav.Link>
                                    <h6 style={{textAlign: "center"}}>{t('calligraphy')}</h6>
                                    <p style={{textAlign: "center"}}>{t("calligraphyText")}</p>
                                </Col>
                                <Col>
                                    <Nav.Link href="/form" name="engraving-img"><img alt="preview" className="mx-auto d-block" src={ gin } width="200" height="200" /></Nav.Link>
                                    <h6 style={{textAlign: "center"}}>{t("engraving")}</h6>
                                    <p style={{textAlign: "center"}}>{t("engravingText")}</p>
                                </Col>
                                <Col>
                                    <Nav.Link href="/form" name="event-img"><img alt="preview" className="mx-auto d-block" src={ live }  width="200" height="200" /></Nav.Link>
                                    <h6 style={{textAlign: "center"}}>{t("events")}</h6>
                                    <p style={{textAlign: "center"}}>{t("eventsText")}</p>
                                </Col>
                            </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}
