import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';9
import Footer from 'Components/footer.js'

class Header extends React.Component {
    render() {
        return (
            <div className="navHeader">
                <ul className="navBar">
                    <li className="navItem">
                        <a className="navLink" href="/">Home</a>
                    </li>
                    <li className="navItem">
                        <a className="navLink" href="/">About the Business</a>
                    </li>
                    <li className="navItem">
                        <a className="navLink" href="/">Portfolio</a>
                    </li>
                    <li className="navItem">
                        <a className="navLink" href="/">Services Information</a>
                    </li>
                    <li className="navItem">
                        <a className="navLink" href="/">Request a Service</a>
                    </li>
                </ul>
            </div>
        );
    }
}

class Page extends React.Component {
    render() {
        return (
            <div className="container">
                <Header />
                {/* <Content />
                <Footer /> */}
            </div>
        );
    }
}

ReactDOM.render (
    <Page />,
    <Footer/>,
    document.getElementById('root')
);
