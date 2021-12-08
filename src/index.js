import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/header"
import Footer from "./Components/footer"
import { Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Content() {
    return (
        <h1 style={{textAlign: 'center'}}>Welcome to Serene Flourish Calligraphy!</h1>
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
