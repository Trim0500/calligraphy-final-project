import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/header"
import Footer from "./Components/footer"
import Container from 'react-bootstrap/Container'

class Page extends React.Component {
    render() {
        return (
            <Container className="container">
                <Header />
                <Footer />
            </Container>
        );
    }
}

ReactDOM.render (
    <Page />,
    document.getElementById('root')
);
