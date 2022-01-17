import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";

function FormAdmin(){

    const [totalPage, setTotalPage] = useState(0);
    const [form, setForm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const GetForms = () => {
        fetch('https://localhost:5001/api/form?pageNumber=1&pageSize=10')
            .then(response => response.json())
            .then(data => {
                setForm(data.Data);
                setTotalPage(data.TotalPages);
            })
            .catch(error => console.log(error));
    };

    const nextPage = () => {
        if (currentPage >= totalPage){
            return;
        }
        setCurrentPage(currentPage + 1);
        fetch('https://localhost:5001/api/form?pageNumber=' + (currentPage + 1) + '&pageSize=10')
            .then(response => response.json())
            .then(data => {
                setForm(data.Data);
            })
            .catch(error => console.log(error));
    };

    const previousPage = () => {
        if (currentPage <= 1){
            return;
        }
        setCurrentPage(currentPage - 1);
        fetch('https://localhost:5001/api/form?pageNumber=' + (currentPage - 1) + '&pageSize=10')
            .then(response => response.json())
            .then(data => {
                setForm(data.Data);

            })
            .catch(error => console.log(error));
    };

    // select  page
    const selectPage = (e) => {
        setCurrentPage(e.target.value);
        fetch('https://localhost:5001/api/form?pageNumber=' + e.target.value + '&pageSize=10')
            .then(response => response.json())
            .then(data => {
                setForm(data.Data);
                setCurrentPage(e.target.value);
            })
            .catch(error => console.log(error));
    };

    const lastPage = () => {
        if (currentPage === totalPage){
            return;
        }
        setCurrentPage(totalPage);
        fetch('https://localhost:5001/api/form?pageNumber=' + totalPage + '&pageSize=10')
            .then(response => response.json())
            .then(data => {
                setForm(data.Data);
            })
            .catch(error => console.log(error));
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
                                <td><button name="btnQuote"><a href={"/admin/quote/" + form.FormId }>See Quote</a> </button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={nextPage} name="btnNext">Next Page</button>
                    <select onChange={selectPage} name="pageSelector">
                        {[...Array(totalPage)].map((x, i) => (
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

export  default FormAdmin;