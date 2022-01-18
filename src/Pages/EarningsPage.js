import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function EarningsPage() {
    const history = useHistory();
    const data = history.location.state.data;

    console.log(data);

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Ttile>Earnings</Card.Ttile>
                </Card.Header>
                <Card.Body>
                    <h1>Monthly Earnings Page</h1>
                </Card.Body>
            </Card>
        </Container>
    )
}