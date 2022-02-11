import NavbarCustom from "../Components/Navbar/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "../Pages/Home";
import Form from "../Components/FormClass";
import Portfolio from "./Portfolio";
import ProtectRoute from "../Components/ProtectedRoute";
import PortfolioAdmin from "./PortfolioAdmin";
import ImageUpload from "./ImageUpload";
import FormOperation from "./FormOperator";
import ContractsPage from "./Contracts";
import ContractDetails from "./ContractDetails";
import Quote from "./Quote";
import Login from "./Login";
import About from "./About";
import EarningsPage from "./EarningsAdmin";
import React from "react";
import "../Styling/app.css";
import Footer from "../Components/Footer";


function App(){

    return (
        <body>
            <BrowserRouter>
                <NavbarCustom/>
                <Switch>
                    <Route path="/home" exact component={() => <Home /> } />
                    <Route path="/form" exact component={() => <Form /> } />
                    <Route path="/portfolio" exact component={() => <Portfolio /> } />
                    <ProtectRoute path="/admin/dashboard/portfolio" exact component={() => <PortfolioAdmin /> } />
                    <ProtectRoute path="/admin/dashboard/portfolio/image/:id" exact component={() => <ImageUpload /> } />
                    <ProtectRoute path="/admin/dashboard/forms" exact component={() => <FormOperation /> } />
                    <ProtectRoute path="/admin/dashboard/contracts" exact component={() => <ContractsPage />} />
                    <ProtectRoute path="/admin/dashboard/contract/details" exact component={() => <ContractDetails /> } />
                    <ProtectRoute path="/admin/dashboard/quote/:id" exact component={() => <Quote /> } />
                    <Route path="/admin/login" exact component={() => <Login /> } />
                    <Route path="/about" exact component={() => <About /> } />
                    <ProtectRoute path="/admin/dashboard/contract/earnings" exact component={() => <EarningsPage />} />
                </Switch>
            </BrowserRouter>
            <Footer/>
        </body>

    );
}
export default App;