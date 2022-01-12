import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container } from "react-bootstrap";

export default function ContractsPage() {
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
                            <tr>
                                {/* Use the map function here for contracts */}
                            </tr>
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    );
}