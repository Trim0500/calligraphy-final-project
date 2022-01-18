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

    const redirectEarnings = (data) => {
        history.push("/admin/contract/earnings", {data: data});
    }

    const RenderEarningsPage = () => {
        var date = new Date();
        var CurrentMonth = date.getMonth() + 1;

        var CurrentMonthContracts = contracts.forEach((item) => {
            var ContractMonth = new Date(item.DateCommissioned).getMonth() + 1;
            if(ContractMonth === CurrentMonth && item.IsFinished) {
                return item;
            }
        });

        redirectEarnings(CurrentMonthContracts);
    }

    useEffect(() => {
        async function getContracts() {
            let api = 'https://localhost:5001/api/contract/get'
    
            const response = await fetch(api);
            const json = await response.json();
            setContracts(json);
        }

        getContracts();
    }, []);
    
    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Contract</Card.Title>
                </Card.Header>
                <Card.Body>
                    <h1>Contracts Information Page</h1>
                    <button type='button' name='EarningsBtn' className='btn btn-primary' onClick={RenderEarningsPage}>View This Month's Earnings</button>
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
                                <tr key={item.ContractId} id={"Contract-" + item.ContractId}>
                                    <td>${item.FinalCost}</td>
                                    <td>${item.DownPayment}</td>
                                    <td>{item.DateCommissioned}</td>
                                    <td>{item.EndDate}</td>
                                    <td>{item.HasSignature ? "Yes" : "No"}</td>
                                    <td>{item.IsFinished ? "Yes" : "No"}</td>
                                    <td><button type='button' name={item.ContractId + "DetailsBtn"} className='btn btn-primary' onClick={() => redirect({id: item.ContractId})}>Check Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    );
}