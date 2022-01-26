import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Image, Nav, Row} from 'react-bootstrap';
import no_image from "../resources/img/no_image.png";

function PortfolioCRUD() {

    const [image1, setImage1] = React.useState(no_image);
    const [image2, setImage2] = React.useState(no_image);
    const [image3, setImage3] = React.useState(no_image);
    const [image4, setImage4] = React.useState(no_image);
    const [image5, setImage5] = React.useState(no_image);
    const [image6, setImage6] = React.useState(no_image);

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
                if (data[i].imageId === 1) {
                    setImage1(data[0].imageData);
                }
                //check if imageId is 2
                if (data[i].imageId === 2) {
                    setImage2(data[1].imageData);
                }
                //check if imageId is 3
                if (data[i].imageId === 3) {
                    setImage3(data[2].imageData);
                }
                //check if imageId is 4
                if (data[i].imageId === 4) {
                    setImage4(data[3].imageData);
                }
                //check if imageId is 5
                if (data[i].imageId === 5) {
                    setImage5(data[4].imageData);
                }
                //check if imageId is 6
                if (data[i].imageId === 6) {
                    setImage6(data[5].imageData);
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

export default PortfolioCRUD;