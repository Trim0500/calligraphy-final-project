import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Card, Container } from "react-bootstrap";

export default function ContractsPage() {
    const [contracts, setContracts] = useState([])

    const getContracts = () => {
        let api = 'https://localhost:5001/api/contract/get'

        fetch(api)
            .then((res) => res.json())
            .then((json) => {
                setContracts(json)
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getContracts();
    });
    
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    );
}