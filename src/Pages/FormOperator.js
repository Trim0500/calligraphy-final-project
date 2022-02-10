import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";
import axios from "axios";

// eslint-disable-next-line
import Interceptor from "../Components/Interceptor";

export  default function FormOperator(){

    const [form, setForm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(2);
    const [totalPages, setTotalPages] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);

    useEffect(() => {

        axios.get(`https://localhost:5001/api/forms?pageNumber=${currentPage}&pageSize=${pageSize}`,{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(response => {
                const x_pagination = response.headers['x-pagination'];
                const pagination = JSON.parse(x_pagination);
                const form = response.data.map(form => {
                    form.CreatedDate = new Date(form.CreatedDate).toLocaleString();
                    return form;
                });
                setForm(form);
                setTotalPages(pagination.TotalPages);
                setHasNextPage(pagination.HasNext);
                setHasPreviousPage(pagination.HasPrevious);
                const $select = document.querySelector('#pageSelector');
                $select.value = currentPage
            })
            .catch(error => {
                console.log(error);
            });
    }, [currentPage, pageSize]);
    
    const nextPage = () => {
        if(hasNextPage === true){
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if(hasPreviousPage === true){
            setCurrentPage(currentPage - 1);
        }
    };

    const selectPage = (e) => {
        e.preventDefault();
        setCurrentPage(e.target.value);
    };

    const lastPage = () => {
        setCurrentPage(totalPages);
    };

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
                                <td><button name="btnQuote" className={"btn-primary"}><a href={"/admin/dashboard/quote/" + form.FormId } className={"text-white text-decoration-none form-control-sm"}>See Quote</a> </button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <select onChange={selectPage} id="pageSelector" name="pageSelector">
                        {[...Array(totalPages)].map((x, i) =>
                            <option key={i} value={1 + i}>{1 + i}</option>
                        )}
                    </select>
                    <button onClick={nextPage} name="btnNext">Next Page</button>
                    <button onClick={previousPage} name="btnPrevious">Previous Page</button>
                    <button onClick={lastPage} name="btnLast">Last Page</button>
                </Card.Body>
            </Card>
        </Container>
    );
}