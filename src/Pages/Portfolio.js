import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Image, Row} from 'react-bootstrap';
import no_image from "../resources/img/no_image.png";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'

export  default function Portfolio() {

    // this is incredibly lazy but I might change it later
    const [imageData1, setImageData1] = React.useState([]);
    const [imageData2, setImageData2] = React.useState([]);
    const [imageData3, setImageData3] = React.useState([]);
    const [imageData4, setImageData4] = React.useState([]);
    const [imageData5, setImageData5] = React.useState([]);
    const [imageData6, setImageData6] = React.useState([]);

    const containerVariants = {
        hidden: {
            opacity: 0,
            x: '-100vw'
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                delay: 0.5,
                stiffness: 50,
                mass: 0.5,
                duration: 0.5
            }
        },
        exit: {
            x: '-100vw',
            transition: {
                type: 'spring',
                stiffness: 50,
                mass: 0.5,
                duration: 0.5
            }
        }
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            x: '-100vw'
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                delay: 0.5,
                stiffness: 50,
                mass: 0.5,
                duration: 0.5
            }
        },
        exit: {
            x: '-100vw',
            transition: {
                type: 'spring',
                stiffness: 50,
                mass: 0.5,
                duration: 0.5
            }
        }
    };


    React.useEffect(() => {
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
                        setImageData1(data[0]);
                    }
                    //check if imageId is 2
                    if (data[i].ImageId === 2) {
                        setImageData2(data[1]);
                    }
                    //check if imageId is 3
                    if (data[i].ImageId === 3) {
                        setImageData3(data[2]);
                    }
                    //check if imageId is 4
                    if (data[i].ImageId === 4) {
                        setImageData4(data[3]);
                    }
                    //check if imageId is 5
                    if (data[i].ImageId === 5) {
                        setImageData5(data[4]);
                    }
                    //check if imageId is 6
                    if (data[i].ImageId === 6) {
                        setImageData6(data[5]);
                    }
                }
            })
            .catch(error => console.log(error));
    }, []);

    return (

        //seperate images by different types, signature, events and engraving
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="container-fluid">
                <Container className="mt-5">
                    <Row>
                        <Col>
                            <h1 className="text-center">Signature</h1>
                            <h3 className="text-center ">$100 - $200</h3>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={imageVariants}
                                className="image-container card m-5">
                                <Image className="card-img" src={imageData1.ImageData} fluid/>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                        {
                                            imageData1.Title === "" ? "Untitled" : imageData1.Title
                                        }
                                    </h5>
                                    <p className="card-text">
                                        {
                                            imageData1.Description === "" ? "No description" : imageData1.Description
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        </Col>
                        <Col>
                            <h1 className="text-center">Events</h1>
                            <h3 className="text-center">$100 - $200</h3>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={imageVariants}
                                className="image-container card m-5">
                                <Image className="card-img" src={
                                    imageData2 ?
                                        no_image :
                                        imageData2.ImageData
                                } fluid/>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                        {
                                            imageData2 ? "Untitled" : imageData2.Title
                                        }
                                    </h5>
                                    <p className="card-text">
                                        {
                                            imageData2 ? "No description" : imageData2.Description
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        </Col>
                        <Col>
                            <h1 className="text-center">Engravings</h1>
                            <h3 className="text-center">$100 - $200</h3>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={imageVariants}
                                className="image-container card m-5">
                                <Image className="card-img" src={
                                    imageData3 ?
                                        no_image :
                                        imageData3.ImageData

                                } fluid/>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                        {
                                            imageData3 ? "Untitled" : imageData3.Title
                                        }
                                    </h5>
                                    <p className="card-text">
                                        {
                                            imageData3 ? "No description" : imageData3.Description
                                        }
                                    </p>
                                </div>
                            </motion.div>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={imageVariants}
                                className="image-container card m-5">
                                <Image className="card-img" src={
                                    imageData4 ?
                                        no_image :
                                        imageData4.ImageData } fluid/>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                        {
                                            imageData4 ? "Untitled" : imageData4.Title
                                        }
                                    </h5>
                                    <p className="card-text">
                                        {
                                            imageData4 ? "No description" : imageData4.Description
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        </Col>
                        <Col>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={imageVariants}
                                className="image-container card m-5">
                                <Image className="card-img" src={
                                    imageData5 ?
                                        no_image :
                                        imageData5.ImageData } fluid/>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                        {
                                            imageData5 ? "Untitled" : imageData5.Title
                                        }
                                    </h5>
                                    <p className="card-text">
                                        {
                                            imageData5 ? "No description" : imageData5.Description
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        </Col>
                        <Col>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={imageVariants}
                                className="image-container card m-5">
                                <Image className="card-img" src={
                                    imageData6 ?
                                        no_image :
                                        imageData6.ImageData } fluid/>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">
                                        {
                                            imageData6 ? "Untitled" : imageData6.Title
                                        }
                                    </h5>
                                    <p className="card-text">
                                        {
                                            imageData6 ? "No description" : imageData6.Description
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
                <p className='text-center'>
                   * All prices are in Canadian Dollars.
                </p>
            </motion.div>
        </AnimatePresence>
    );
}