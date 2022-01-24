import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';

export default function EarningsPage() {
    const history = useHistory();
    const data = history.location.state.data;

    const [TotalCharged, setTotalCharged] = useState(0);
    const [TotalContracts, setTotalContracts] = useState(0);

    const CalculateTotalCharged = () => {
        let Total = 0;
        data.forEach((item) => {
            Total += item.FinalCost;
        })

        setTotalCharged(Total);
    }

    const CalculateTotalContracts = () => {
        let Total = 0;
        data.forEach((item) => {
            Total += 1;
        })

        setTotalContracts(Total);
    }

    useEffect(() => {
        CalculateTotalCharged();
        CalculateTotalContracts();
    }, [data])

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Earnings</Card.Title>
                </Card.Header>
                <Card.Body>
                    <h1>Monthly Earnings Page</h1>
                    <br/>
                    <form>
                        <select className='form-control'>
                            <option>Janurary</option>
                            <option>Feburary</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        <input className='form-control' type="number" defaultValue="2021" max="2022" min="2010" />
                        <button className='btn btn-primary' type='submit'>Find Contracts</button>
                    </form>
                    <br/>
                    <ul className='nav nav-tabs'>
                        <li><h3>Total charged this month: ${TotalCharged}</h3></li>
                        <li><h3>Total contracts: {TotalContracts}</h3></li>
                    </ul>
                </Card.Body>
            </Card>
        </Container>
    )
}