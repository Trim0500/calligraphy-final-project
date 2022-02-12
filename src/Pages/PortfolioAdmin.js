import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Image, Nav, Row} from 'react-bootstrap';
import no_image from "../resources/img/no_image.png";

export  default function PortfolioAdmin() {

    const [image1, setImage1] = useState(no_image);
    const [image2, setImage2] = useState(no_image);
    const [image3, setImage3] = useState(no_image);
    const [image4, setImage4] = useState(no_image);
    const [image5, setImage5] = useState(no_image);
    const [image6, setImage6] = useState(no_image);

    const GetImages = () => {
        fetch('https://localhost:5001/api/image', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 6; i++) {
                //check if imageId is 1
                if (data[i].ImageId === 1) {
                    setImage1(data[0].ImageData);
                }
                //check if imageId is 2
                if (data[i].ImageId === 2) {
                    setImage2(data[1].ImageData);
                }
                //check if imageId is 3
                if (data[i].ImageId === 3) {
                    setImage3(data[2].ImageData);
                }
                //check if imageId is 4
                if (data[i].ImageId === 4) {
                    setImage4(data[3].ImageData);
                }
                //check if imageId is 5
                if (data[i].ImageId === 5) {
                    setImage5(data[4].ImageData);
                }
                //check if imageId is 6
                if (data[i].ImageId === 6) {
                    setImage6(data[5].ImageData);
                }
            }
        })
        .catch(error => console.log(error));
    }

    //initialize the state
    React.useEffect(() => {
        GetImages();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="mx-auto col-md-10">
                    <Container >
                        <h1 id="welcome-header" style={{textAlign: 'center'}}>Welcome to the Admin Page!</h1>
                        <Container>
                            <Row>
                                <Col>
                                    <h3  style={{textAlign: "center"}}>Signature</h3>
                                    <Nav.Link href="/admin/dashboard/portfolio/image/1" name="calligraphy-img">{image1 ? <Image src={image1} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</Nav.Link>
                                    <Nav.Link href="/admin/dashboard/portfolio/image/2" name="calligraphy-img">{image2 ? <Image src={image2} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</Nav.Link>
                                </Col>
                                <Col>
                                    <h3 style={{textAlign: "center"}}>Events</h3>
                                    <Nav.Link href="/admin/dashboard/portfolio/image/3" name="event-img">{image3 ? <Image src={image3} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</Nav.Link>
                                    <Nav.Link href="/admin/dashboard/portfolio/image/4" name="event-img">{image4 ? <Image src={image4} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</Nav.Link>
                                </Col>
                                <Col style={{textAlign: "center"}}>
                                    <h3>Engraving</h3>
                                    <Nav.Link href="/admin/dashboard/portfolio/image/5" name="engraving-img">{image5 ? <Image src={image5} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</Nav.Link>
                                    <Nav.Link href="/admin/dashboard/portfolio/image/6" name="engraving-img">{image6 ? <Image src={image6} alt="Image Preview" width="100%s" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</Nav.Link>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </div>
        </div>
    );
}