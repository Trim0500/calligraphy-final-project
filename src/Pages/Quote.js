import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";


function QuoteAdmin(){

    const [quote, setQuote] = useState([]);
    const [status, setStatus] = useState(getApprovalStatus());
    const [quotePrice, setQuotePrice] = useState();
    const [quoteMaterials, setQuoteMaterials] = useState();
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
                // setQuotePrice(data.price);
                // setQuoteMaterials(data.materials);
                // setStatus(data.ApprovalStatus);
            })
            .catch(error => console.log(error));
        console.log(quote);
        //setInitialValues();
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

    function setInitialValues(){
        setQuotePrice(quote.Price);
        setQuoteMaterials(quote.Materials);
        setStatus(getApprovalStatus(quote.ApprovalStatus));
    }


    useEffect(() => {
        GetQuote();
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

    const handleMaterials = (event) => {
        setQuoteMaterials(event.target.value);
    };

    const handleApprovalStatus = (e) => {
        setStatus(e.target.value);
            }

    const handleSubmit = (e) => {
        e.preventDefault();
    //if price and materials are not empty
        if (quotePrice !== undefined && quoteMaterials !== undefined) {
            const data = {
                Price: quotePrice,
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
                    <form onSubmit={handleSubmit} className={"small"} name={"statusForm"} >
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Quote ID: {quote.QuoteId}</th>
                            <th>Price: {quote.Price}</th>
                            <th>Materials: {quote.Materials}</th>
                            <th>Approval Status: {getApprovalStatus(quote.ApprovalStatus)}</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr key={quote.QuoteId}>
                                <td>{quote.QuoteId}</td>
                                <td><input className={"small"} onChange={handlePrice}  value={quotePrice} /></td>
                                <td><input className={"small"} onChange={handleMaterials} value={quoteMaterials}/></td>
                                <td>

                                        <select name="status" value={status} onChange={handleApprovalStatus}>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved" >Approved</option>
                                        <option value="Denied">Denied</option>
                                        </select>
                                  <button className={""} type="submit" name="btnSubmit" >Submit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                    <button name="btnGoForms" className={"small"}><a href="/admin/forms">Go Back</a> </button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export  default QuoteAdmin;