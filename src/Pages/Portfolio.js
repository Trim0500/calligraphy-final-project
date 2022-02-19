import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Image, Row} from 'react-bootstrap';
import no_image from "../resources/img/no_image.png";

export  default function Portfolio() {

    const [image1, setImage1] = React.useState(no_image);
    const [image2, setImage2] = React.useState(no_image);
    const [image3, setImage3] = React.useState(no_image);
    const [image4, setImage4] = React.useState(no_image);
    const [image5, setImage5] = React.useState(no_image);
    const [image6, setImage6] = React.useState(no_image);

    //  get the images from the server async
    const GetImages = () => {
        let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/image' : process.env.REACT_APP_BACKEND_URL + `/api/image`;
        fetch(api, {
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