import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";


function QuoteAdmin(){

    const [quote, setQuote] = useState([]);
    const [status, setStatus] = useState(getApprovalStatus(''));
    const [quotePrice, setQuotePrice] = useState('');
    const [quoteDuration, setQuoteDuration] = useState('');
    const [quoteMaterials, setQuoteMaterials] = useState('');
    const id = window.location.pathname.split('/')[3];


    const GetQuote = () => {
        fetch('https://localhost:5001/api/quote/'.concat(id),
            {headers: { 'Content-Type' : 'application/json', 'Accept': 'application/json'}})
            .then(function(response) {
                console.log(response);
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                setQuote(data);
                componentDidMount(data);
            })
            .catch(error => console.log(error));
        console.log(quote);
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
            fetch('https://localhost:5001/api/quote/'.concat(id),
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    alert("Quote updated");
                    window.location.href = '/admin/forms';
                })
                .catch(error => console.log(error));
        }
        else {
            alert("Error with quote, please verify inputted content");
        }
        // let api = 'https://localhost:5001/api/quote/' + quote.QuoteId;
        // console.log(api);
        //
        // alert("Status Changed to: " + status);
        // //put request
        // fetch(api, {
        //     method: 'PUT',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         Price: quotePrice,
        //         Materials: quoteMaterials,
        //         ApprovalStatus: status
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //     })
        //     .catch(error => console.log(error));
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
                                <td><input name="priceBox" className={"form-control"} onChange={handlePrice}  value={quotePrice} /></td>
                                <td><input name="durationBox" className={"form-control"} onChange={handleDuration}  value={quoteDuration} /></td>
                                <td><input name="materialsBox" className={"form-control"} onChange={handleMaterials} value={quoteMaterials}/></td>
                                <td>

                                        <select name="status" value={status} className={"form-control"} onChange={handleApprovalStatus}>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved" >Approved</option>
                                        <option value="Denied">Denied</option>
                                        </select>
                                </td>
                                <td><button className={"col-md-6  fs-5 btn-primary"} type="submit" name="btnSubmit" >Submit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                    <button name="btnGoForms" className={"small btn-primary"}><a href={"/admin/forms"} className={"text-white text-decoration-none form-control-sm"}>Back</a> </button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export  default QuoteAdmin;