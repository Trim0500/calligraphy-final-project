import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Col, Container, Image, Row} from 'react-bootstrap';
import no_image from "../resources/img/no_image.png";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'

 export default function ImagePortfolio(props) {

    //check if the prop is empty

    let imageData = props.image;
    let title = props.title;
    let description = props.description;

    if (imageData === undefined) {
        imageData = no_image;
    }

    if (title === undefined) {
        title = "No Title";
    }

    if (description === undefined) {
        description = "No Description";
    }

     const textStyle = {
         color: 'black',
     };

    const imageVariants = {
        initial: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    };

    // add animation to the title
    const titleVariants = {
        initial: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    };

    // add animation to the description
    const descriptionVariants = {
        initial: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={imageVariants}
                className="image-portfolio"
            >
                <Container>
                    <Row>
                        <Col>
                            <Image src={imageData} fluid />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <motion.h1
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={titleVariants}
                                className="title-portfolio"
                                style={textStyle}
                            >
                                {title}
                            </motion.h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <motion.p
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={descriptionVariants}
                                className="description-portfolio"
                                style={textStyle}
                            >
                                {description}
                            </motion.p>
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}