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
    const [pageSize, setPageSize] = useState(10);
    const [serviceTypeFilter, setServiceTypeFilter] = useState('All');
    const [createdDateFilter, setCreatedDateFilter] = useState('');

    const options = [
        { value: 'all', label: 'All' },
        { value: 'calligraphy', label: 'Calligraphy' },
        { value: 'engraving', label: 'Engraving' },
    ]

    const GetForms = () => {

        axios.get('https://localhost:5001/api/form?pageNumber=1&pageSize=10',{
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            setForm(response.data.Data);
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