import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';

export default function EarningsPage() {
    const history = useHistory();
    const data = history.location.state.data;

    const [TotalProfits, setTotalProfits] = useState(0);
    const [TotalCharged, setTotalCharged] = useState(0);
    const [TotalContracts, setTotalContracts] = useState(0);

    const CalculateTotalProfits = () => {
        let Total = 0;
        data.foreach((item) => {
            console.log(item.FinalCost);
            Total += item.FinalCost;
            console.log(Total);
        })

        setTotalProfits(Total);
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Earnings</Card.Title>
                </Card.Header>
                <Card.Body>
                    <h1>Monthly Earnings Page</h1>
                    <ul className='nav nav-tabs'>
                        <li><h3>Profits this month: {TotalProfits}</h3></li>
                        <li><h3>Total charged this month: {TotalCharged}</h3></li>
                        <li><h3>Total contracts: {TotalContracts}</h3></li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}