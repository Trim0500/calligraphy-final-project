import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";
import axios from "axios";


export  default function Quote(){

    const [quote, setQuote] = useState([]);
    const [status, setStatus] = useState(getApprovalStatus(''));
    const [quotePrice, setQuotePrice] = useState('');
    const [quoteDuration, setQuoteDuration] = useState('');
    const [quoteMaterials, setQuoteMaterials] = useState('');
    const [quoteApproval, setQuoteApproval] = useState(0);
    const id = window.location.pathname.split('/').pop();



    const GetQuote = () => {

        axios.get('https://localhost:5001/api/quote/'.concat(id),{
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
            return "Pending";

        }
        else if (nb === 1){
            return "Approved";

        }
        else if (nb === 2){
            return "Denied";
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
            alert("Please enter a valid number");
            //event.target.value = quote.Price;

        }else {
            setQuotePrice(event.target.value);
        }
    };

    const handleDuration = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === undefined || !(re.test(event.target.value))) {
            alert("Please enter a valid number");
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
            axios.put('https://localhost:5001/api/quote/'.concat(id), data,
                {headers:
                        { 'Content-Type' : 'application/json'
                        , 'Accept': 'application/json'}})
                .then(function (response) {
                    console.log(response);
                    alert("Quote updated");
                    if(status === 'Approved') {
                        alert("A new contract has been made, check your email");
                    }
                    window.location.href = '/admin/dashboard/forms';
                })
                .catch(error => console.log(error));
        }
        else {
            alert("Error with quote, please verify inputted content");
        }
    }


    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Quote</Card.Title>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit} className={""} name={"statusForm"} >
                    <table className="table table-striped table-hover table-responsive">
                        <thead>
                        <tr>
                            <th>Estimated Price</th>
                            <th>Estimated Duration</th>
                            <th>Materials</th>
                            <th>Approval Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr key={quote["QuoteId"]}>
                                <td><input name="priceBox" disabled={quoteApproval === 1 || quoteApproval === 2} className={"form-control"} onChange={handlePrice}  value={quotePrice} /></td>
                                <td><input name="durationBox" disabled={quoteApproval === 1 || quoteApproval === 2} className={"form-control"} onChange={handleDuration}  value={quoteDuration} /></td>
                                <td><input name="materialsBox" disabled={quoteApproval === 1 || quoteApproval === 2} className={"form-control"} onChange={handleMaterials} value={quoteMaterials}/></td>
                                <td>

                                        <select name="status" value={status} disabled={quoteApproval === 1 || quoteApproval === 2} className={'form-control'} onChange={handleApprovalStatus}>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved" >Approved</option>
                                        <option value="Denied">Denied</option>
                                        </select>
                                </td>
                                <td><button className={" fs-5 btn-primary"} hidden={quoteApproval === 1 || quoteApproval === 2} type="submit" name="btnSubmit" >Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                    <button name="btnGoForms" className={"small btn-primary"}><a href={"/admin/dashboard/forms"} className={"text-white text-decoration-none form-control-sm"}>Back</a> </button>
                </Card.Body>
            </Card>
        </Container>
    );
}
