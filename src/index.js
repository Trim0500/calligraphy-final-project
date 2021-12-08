import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/header"
import Footer from "./Components/footer"
import { Container, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Content() {
    return (
        <Container >
            <h1 id="welcome-header" style={{textAlign: 'center'}}>Welcome to Serene Flourish Calligraphy!</h1>
            <h3>This is some text</h3>
            
        </Container>
    );
}

class Page extends React.Component {
    render() {
        return (
            <Stack>
                <Header />
                <Content />
                <Footer />
            </Stack>
        );
    }
}

ReactDOM.render (
    <Page />,
    document.getElementById('root')
);
