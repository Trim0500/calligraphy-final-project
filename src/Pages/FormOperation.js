import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";
import axios from "axios";

// eslint-disable-next-line
import Interceptor from "../Components/interceptor";
import Select from 'react-select'

function FormOperation(){

    const [form, setForm] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [serviceTypeFilter, setServiceTypeFilter] = useState('All');
    const [createdDateFilter, setCreatedDateFilter] = useState('');

    const options = [
        { value: 'all', label: 'All' },
        { value: 'calligraphy', label: 'Calligraphy' },
        { value: 'engraving', label: 'Engraving' },
    ]

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

    function ServiceTypeChange(e) {
        setServiceTypeFilter(e.label);
    }
    function handleDateFilter(e) {
        setCreatedDateFilter(e.target.value);
    }

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
                    <form method="get" className={''}>
                        <div className={'d-inline-flex w-75'}>
                            <Select options={options} onChange={ServiceTypeChange} defaultValue={'All'} className={'w-25'} placeholder={'Service Type'}/>
                            <input type="date" name="DateCommissioned" className={'w-25'} value={createdDateFilter} onChange={handleDateFilter}/>
                        <label htmlFor="header-search">
                            <span className="visually-hidden">Search Specific Form</span>
                        </label>
                        <input
                            type="text"
                            id="header-search"
                            placeholder="Search Specific Form"
                            name="s"
                        />
                        <button type="submit">Search</button>
                        </div>
                    </form>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Service Type</th>
                            <th>Comments</th>
                            <th>Created Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {form.map(form => (serviceTypeFilter !== 'All' || createdDateFilter !== '' ? (form.ServiceType === serviceTypeFilter || form.CreatedDate === "2022-01-27T15:54:39.4146222" ?
                            <tr key={form.FormId}>
                                <td>{form.ServiceType}</td>
                                <td>{form.Comments}</td>
                                <td>{form.CreatedDate}</td>
                                <td><button name="btnQuote" className={"btn-primary"}><a href={"/admin/dashboard/quote/" + form.FormId } className={"text-white text-decoration-none form-control-sm"}>See Quote</a> </button></td>
                            </tr>
                         : null) :
                            <tr key={form.FormId}>
                            <td>{form.ServiceType}</td>
                            <td>{form.Comments}</td>
                            <td>{form.CreatedDate}</td>
                            <td><button name="btnQuote" className={"btn-primary"}><a href={"/admin/dashboard/quote/" + form.FormId } className={"text-white text-decoration-none form-control-sm"}>See Quote</a> </button></td>
                        </tr>))}

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

export  default FormOperation;