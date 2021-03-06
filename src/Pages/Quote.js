import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";
import "../Styling/app.css";


export  default function Quote(){
    const { t } = useTranslation();

    const [quote, setQuote] = useState([]);
    const [status, setStatus] = useState(getApprovalStatus(''));
    const [quotePrice, setQuotePrice] = useState('');
    const [quoteDuration, setQuoteDuration] = useState('');
    const [quoteMaterials, setQuoteMaterials] = useState('');
    const [quoteApproval, setQuoteApproval] = useState(0);
    const id = window.location.pathname.split('/').pop();


    const GetQuote = () => {

        let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/quote/'.concat(id) : process.env.REACT_APP_BACKEND_URL + `/api/quote/`.concat(id);

        axios.get(api,{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                setQuote(response.data);
                componentDidMount(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    function getApprovalStatus(nb){
        if(nb === 0){
            return t("pendingOption");

        }
        else if (nb === 1){
            return t("approvedOption");

        }
        else if (nb === 2){
            return t("deniedOption");
        }
    }
    function componentDidMount(data) {
        window.addEventListener('load', setInitialValues(data));
    }

    function setInitialValues(data){
        setQuotePrice(data.Price);
        setQuoteDuration(data.Duration);
        setQuoteMaterials(data.Materials);
        setQuoteApproval(data.ApprovalStatus);
        setStatus(getApprovalStatus(data.ApprovalStatus));
        return data;
    }


    useEffect(() => {
        GetQuote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePrice = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === undefined || !(re.test(event.target.value))) {
            alert(t("quoteAlertNumber"));
            //event.target.value = quote.Price;

        }else {
            setQuotePrice(event.target.value);
        }
    };

    const handleDuration = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === undefined || !(re.test(event.target.value))) {
            alert(t("quoteAlertNumber"));
            //event.target.value = quote.Price;

        }else {
            setQuoteDuration(event.target.value);
        }
    };

    const handleMaterials = (event) => {
        setQuoteMaterials(event.target.value);
    };

    const handleApprovalStatus = (e) => {
        setStatus(e.target.value);
            }

    const handleSubmit = (e) => {
        e.preventDefault();
    //if price and materials are not empty
        if (quotePrice !== undefined && quoteDuration !== undefined && quoteMaterials !== undefined) {
            const data = {
                Price: quotePrice,
                Duration: quoteDuration,
                Materials: quoteMaterials,
                ApprovalStatus: status
            };
            console.log(data);
            let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/quote/' : process.env.REACT_APP_BACKEND_URL + `/api/quote/`;
            axios.put(api.concat(id), data,
                {headers:
                        { 'Content-Type' : 'application/json'
                        , 'Accept': 'application/json'}})
                .then(function (response) {
                    console.log(response);
                    alert(t("quoteAlertSuccess"));
                    if(status === 'Approved') {
                        alert(t("quoteNewContract"));
                    }
                    window.location.href = '/admin/dashboard/forms';
                })
                .catch(error => console.log(error));
        }
        else {
            alert(t("quoteAlertInvalid"));
        }
    }


    return (
        <Container className={'mt-5'}>
            <Card>
                <Card.Header className={'headerStyle'}>
                    <Card.Title className={'fs-4 '}>{t("quoteText")}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit} className={""} name={"statusForm"} >
                    <table className="table table-striped table-hover table-responsive">
                        <thead>
                        <tr>
                            <th>{t("estPrice")}</th>
                            <th>{t("estDur")}</th>
                            <th>{t("materials")}</th>
                            <th>{t("appStatus")}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr key={quote["QuoteId"]}>
                                <td><input name="priceBox" disabled={quoteApproval === 1 || quoteApproval === 2} className={"form-control"} onChange={handlePrice}  value={quotePrice} /></td>
                                <td><input name="durationBox" disabled={quoteApproval === 1 || quoteApproval === 2} className={"form-control"} onChange={handleDuration}  value={quoteDuration} /></td>
                                <td><input name="materialsBox" disabled={quoteApproval === 1 || quoteApproval === 2} className={"form-control"} onChange={handleMaterials} value={quoteMaterials}/></td>
                                <td>

                                        <select name="status" value={status} disabled={quoteApproval === 1 || quoteApproval === 2} className={'form-control'} onChange={handleApprovalStatus}>
                                        <option value="Pending">{t("pendingOption")}</option>
                                        <option value="Approved" >{t("approvedOption")}</option>
                                        <option value="Denied">{t("deniedOption")}</option>
                                        </select>
                                </td>
                                <td><button className={" fs-5 btn-primary"} hidden={quoteApproval === 1 || quoteApproval === 2} type="submit" name="btnSubmit" >{t("submitText")}</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                    <button name="btnGoForms" className={"btn-sm  btn-primary buttonStyle"} ><a href={"/admin/dashboard/forms"} className={"text-black text-decoration-none form-control-sm"}>{t("previousBtn")}</a> </button>
                </Card.Body>
            </Card>
        </Container>
    );
}
