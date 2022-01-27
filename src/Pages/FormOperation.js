import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";
import axios from "axios";

function FormOperation(){

    const [form, setForm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const GetForms = () => {

        axios.get('https://localhost:5001/api/form?pageNumber=1&pageSize=10',{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setForm(response.data.data);
            setPageSize(response.data.TotalPages);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const nextPage = () => {
        if (currentPage >= pageSize){
            return;
        }
        setCurrentPage(currentPage + 1);
        axios.get('https://localhost:5001/api/form',{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                pageNumber: currentPage,
                pageSize: 10
            }
        })
        .then(response => {
            setForm(response.data.data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const previousPage = () => {
        if (currentPage <= 1){
            return;
        }
        setCurrentPage(currentPage - 1);

        axios.get('https://localhost:5001/api/form?pageNumber=',{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                pageNumber: currentPage - 1,
                pageSize: 10
            }
        })
            .then(response => {
                setForm(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const selectPage = (e) => {
        setCurrentPage(e.target.value);
        console.log('Bearer ' + localStorage.getItem('token'));

        axios.get('https://localhost:5001/api/form?pageNumber=',{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                pageNumber: e.target.value,
                pageSize: 10
            }
        })
            .then(response => {
                setForm(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const lastPage = () => {
        if (currentPage === pageSize){
            return;
        }
        setCurrentPage(pageSize);

        axios.get('https://localhost:5001/api/form',{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                pageNumber: pageSize,
                pageSize: 10
            }
        })
            .then(response => {
                setForm(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        GetForms();
    }, []);

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Forms</Card.Title>
                </Card.Header>
                <Card.Body>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Service Type</th>
                            <th>Comments</th>
                            <th>Created Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {form.map(form => (
                            <tr key={form.FormId}>
                                <td>{form.ServiceType}</td>
                                <td>{form.Comments}</td>
                                <td>{form.CreatedDate}</td>
                                <td><button name="btnQuote" className={"btn-primary"}><a href={"/admin/quote/" + form.FormId } className={"text-white text-decoration-none form-control-sm"}>See Quote</a> </button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={nextPage} name="btnNext">Next Page</button>
                    <select onChange={selectPage} name="pageSelector">
                        {[...Array(pageSize)].map((x, i) => (
                            <option key={i} value={i + 1} name="selectorOption">{i + 1}</option>
                        ))}
                    </select>
                    <button onClick={previousPage} name="btnPrevious">Previous Page</button>
                    <button onClick={lastPage} name="btnLast">Last Page</button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export  default FormOperation;