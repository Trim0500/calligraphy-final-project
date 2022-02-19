import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Row} from 'react-bootstrap';
import {AnimatePresence} from 'framer-motion/dist/framer-motion'
import ImagePortfolio from "../Components/ImagePortfolio.js";


export  default function Portfolio() {

    const [imageData1, setImageData1] = useState([]);
    const [imageData2, setImageData2] = useState([]);
    const [imageData3, setImageData3] = useState([]);
    const [imageData4, setImageData4] = useState([]);
    const [imageData5, setImageData5] = useState([]);
    const [imageData6, setImageData6] = useState([]);

    useEffect(() => {
        fetch('https://localhost:5001/api/image', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length ; i++) {
                    if (data[i].ImageId === 1) {
                        setImageData1(data[i]);
                    }
                    if (data[i].ImageId === 2) {
                        setImageData2(data[i]);
                    }
                    if (data[i].ImageId === 3) {
                        setImageData3(data[i]);
                    }
                    if (data[i].ImageId === 4) {
                        setImageData4(data[i]);
                    }
                    if (data[i].ImageId === 5) {
                        setImageData5(data[i]);
                    }
                    if (data[i].ImageId === 6) {
                        setImageData6(data[i]);
                    }
                }
            })
            .catch(error => console.log(error));
    }, []);

    return (

        <AnimatePresence>
            <div
                className="container-fluid">
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <h1 className="text-center">Signature</h1>
                            <h3 className="text-center ">$100 - $200</h3>
                            <ImagePortfolio image={imageData1.ImageData} title={imageData1.Title} description={imageData1.Description}/>
                            <ImagePortfolio image={imageData2.ImageData} title={imageData2.Title} description={imageData2.Description}/>
                        </Col>
                        <Col>
                            <h1 className="text-center">Events</h1>
                            <h3 className="text-center ">$200 - $300</h3>
                            <ImagePortfolio image={imageData3.ImageData} title={imageData3.Title} description={imageData3.Description}/>
                            <ImagePortfolio image={imageData4.ImageData} title={imageData4.Title} description={imageData4.Description}/>
                        </Col>
                        <Col>
                            <h1 className="text-center">Engravings</h1>
                            <h3 className="text-center ">$300 - $400</h3>
                            <ImagePortfolio image={imageData5.ImageData} title={imageData5.Title} description={imageData5.Description}/>
                            <ImagePortfolio image={imageData6.ImageData} title={imageData6.Title} description={imageData6.Description}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AnimatePresence>
    );
}