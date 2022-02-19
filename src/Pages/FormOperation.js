import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from "react-bootstrap";
import {Card} from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import  "../Components/Interceptor";

export  default function FormOperation(){

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
    const presentDate = new Date().toISOString().slice(0,10);


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
        setCurrentPage(Number(e.target.value));
    };

    const lastPage = () => {
        setCurrentPage(totalPages);
    };

    const formInfo = (form) => {

        return(
        <tr key={form.FormId}>
            <td>{form.ServiceType}</td>
            <td>{form.Comments}</td>
            <td>{form.CreatedDate}</td>
            <td><button name="btnQuote" className={"btn-primary rounded-2"}><a href={"/admin/dashboard/quote/" + form.FormId } className={"text-white text-decoration-none form-control-sm"}>See Quote</a> </button></td>
        </tr>
        )
    };

    function ServiceTypeChange(e) {
        setServiceTypeFilter(e.label);
    }
    function handleDateFilter(e) {
        setCreatedDateFilter(e.target.value);
        console.log(form.map( x => x.CreatedDate.split(",")[0].split("/")[1]));
        console.log(parseInt(createdDateFilter.split("-")[0]));
    }

    const headerStyle = {
        backgroundColor: '#f5f5f5',
        color: '#343a40',
        fontWeight: 'bold'
    };

    const bodyStyle = {
        backgroundColor: '#f5f5f5',
        color: '#343a40',
        fontWeight: 'bold'
    };

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header style={headerStyle} >
                    <h3>Forms</h3>
                </Card.Header>
                <Card.Body style={bodyStyle}>
                        <div className={'d-inline-flex w-50 m-1'}>
                            <Select options={options} name="ServiceTypeFilter" onChange={ServiceTypeChange} defaultValue={'All'} className={'w-50 m-2'} placeholder={'Service Type'}/>
                            <input type="date" name="CreatedDateFilter" max={presentDate} className={'w-50 m-2'} value={createdDateFilter} onChange={handleDateFilter}/>
                        </div>

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Service Type</th>
                            <th>Comments</th>
                            <th>Created Date</th>
                            <th>Quote</th>
                        </tr>
                        </thead>
                        <tbody>
                        {form.filter(x => createdDateFilter === '' ? x
                            : parseInt(x.CreatedDate.split(",")[0].split("/")[1]) === parseInt(createdDateFilter.split("-")[2])
                                    && (parseInt(x.CreatedDate.split(",")[0].split("/")[0])) === parseInt(createdDateFilter.split("-")[1])
                                    && (parseInt(x.CreatedDate.split(",")[0].split("/")[2])) === parseInt(createdDateFilter.split("-")[0]))
                                    .map(form => (serviceTypeFilter !== 'All')
                                ? (form.ServiceType === serviceTypeFilter
                                    ? formInfo(form)
                                    : null)
                                : formInfo(form))}
                        </tbody>
                    </table>
                    <div className={'d-flex justify-content-center'}>
                        <div className={'d-inline-flex'}>
                            <button className={'btn-primary  m-1 rounded-2'} onClick={previousPage}>Previous</button>
                            <select id="pageSelector" className={'w-50  m-1 rounded-2'} onChange={selectPage}>
                                {[...Array(totalPages)].map((x, i) =>
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                )}
                            </select>
                            <button className={'btn-primary  m-1 rounded-2'} onClick={nextPage}>Next</button>
                            <button className={'btn-primary  m-1 rounded-2'} onClick={lastPage}>Last</button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}