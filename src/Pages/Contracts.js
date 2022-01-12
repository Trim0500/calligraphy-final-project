import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Card, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React from 'react';

export default function ContractsPage() {
    const [contracts, setContracts] = useState([])

    const history = useHistory();

    const redirect = (data) => {
        history.push("/admin/contract/details", {data: data});
    }

    useEffect(() => {
        let ignore = false;
        async function getContracts() {
            let api = 'https://localhost:5001/api/contract/get'
    
            const response = await fetch(api);
            const json = await response.json();
            if(!ignore) setContracts(json);
        }

        getContracts();
        return () => { ignore = true };
    }, [contracts]);
    
    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Contract</Card.Title>
                </Card.Header>
                <Card.Body>
                    <h1>Contracts Information Page</h1>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Final Price</th>
                                <th>Down Payment</th>
                                <th>Date Commissioned</th>
                                <th>End Date</th>
                                <th>Was Signed?</th>
                                <th>Is Finished?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contracts.map((item) => (
                                <tr key={item.ContractId}>
                                    <td>${item.FinalCost}</td>
                                    <td>${item.DownPayment}</td>
                                    <td>{item.DateCommissioned}</td>
                                    <td>{item.EndDate}</td>
                                    <td>{item.HasSignature ? "Yes" : "No"}</td>
                                    <td>{item.IsFinished ? "Yes" : "No"}</td>
                                    <td><button type='button' className='btn btn-primary' onClick={() => redirect({id: item.ContractId})}>Check Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    );
}