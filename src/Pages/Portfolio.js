import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Image, Nav, Row} from 'react-bootstrap';
import no_image from "../resources/img/no_image.png";

function Portfolio() {

    const [image1, setImage1] = React.useState(no_image);
    const [image2, setImage2] = React.useState(no_image);
    const [image3, setImage3] = React.useState(no_image);
    const [image4, setImage4] = React.useState(no_image);
    const [image5, setImage5] = React.useState(no_image);
    const [image6, setImage6] = React.useState(no_image);

    //initialize the state
    React.useEffect(() => {

        fetch('https://localhost:5001/api/image')
            .then(res => res.json())
            .then(data => {
                // loop through the data and set the state
                for (let i = 0; i < data.length; i++) {
                    if (i === 0) {
                        setImage1(data[i].ImageData);
                    } else if (i === 1) {
                        setImage2(data[i].ImageData);
                    } else if (i === 2) {
                        setImage3(data[i].ImageData);
                    } else if (i === 3) {
                        setImage4(data[i].ImageData);
                    } else if (i === 4) {
                        setImage5(data[i].ImageData);
                    } else if (i === 5) {
                        setImage6(data[i].ImageData);
                    }
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="mx-auto col-md-10">
                    <Container >
                        <h1 id="welcome-header" style={{textAlign: 'center'}}>Welcome to the Portfolio Page!</h1>
                        <Container>
                            <Row>
                                <Col>
                                    <h3  style={{textAlign: "center"}}>Signature</h3>
                                    <div className="mb-3">{image1 ? <Image src={image1} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</div>
                                    {image2 ? <Image src={image2} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}
                                </Col>
                                <Col>
                                    <h3 style={{textAlign: "center"}}>Events</h3>
                                    <div className="mb-3">{image3 ? <Image src={image3} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</div>
                                    {image4 ? <Image src={image4} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}
                                </Col>
                                <Col style={{textAlign: "center"}}>
                                    <h3>Engraving</h3>
                                    <div className="mb-3">{image5 ? <Image src={image5} alt="Image Preview" width="100%" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}</div>
                                    {image6 ? <Image src={image6} alt="Image Preview" width="100%s" height="100%" className="img-fluid"/> : <Image src={no_image} alt="No Image Preview" width="100%" height="100%" className="img-fluid"/>}
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;