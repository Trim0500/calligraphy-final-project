import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/header"
import Footer from "./Components/footer"

class Page extends React.Component {
    render() {
        return (
            <div className="container">
                <Header />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render (
    <Page />,
    document.getElementById('root')
);
