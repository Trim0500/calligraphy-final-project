import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect, useState } from 'react';

export default function ContractDetails() {
    const history = useHistory();
    const data = history.location.state.data;

    const [contract, setContract] = useState([]);

    const [StartDate, setStartDate] = useState('');
    const [DueDate, setDueDate] = useState('');

    const getContract = () => {
        let api = 'https://localhost:5001/api/contract/get/' + data.id;

        fetch(api)
            .then((res) => res.json())
            .then((data) => setContract(data))
            .catch((err) => console.log(err));

        console.log(contract.DateCommissioned);

        RenderFetchedDates();
    }

    const RenderFetchedDates = () => {
        var fetchedStartDate = contract.DateCommissioned;
        console.log(fetchedStartDate);
        var StartDate = new Date(fetchedStartDate);
        console.log(StartDate);
        var IsoStartDate = StartDate.toISOString().substring(0, 10);
        console.log(IsoStartDate);
        setStartDate(IsoStartDate);

        var fetchedEndDate = contract.EndDate;
        var EndDate = new Date(fetchedEndDate);
        var IsoEndDate = EndDate.toISOString().substring(0, 10);
        setDueDate(IsoEndDate);
    }

    const HandleChecked = () => {

    }

    const HandleChange = () => {

    }

    useEffect(() => {
        getContract();
    }, [data])

    return(
        <div className="container mt-5">
            <h1>Contract Details for Contract {data.id}</h1>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="FinalCost">Final Cost</label>
                                    <input className="form-control" name="FinalCost" value={contract.FinalCost} onChange={HandleChange}/>

                                    <label htmlFor="DownPayment">Down Payment</label>
                                    <input className="form-control" name="DownPayment" value={contract.DownPayment} onChange={HandleChange}/>

                                    <label htmlFor="DateCommissioned">Date Commissioned</label>
                                    <input type="date" className="form-control" name="DateCommissioned" value={StartDate} onChange={HandleChange}/>

                                    <label htmlFor="EndDate">End Date</label>
                                    <input type="date" className="form-control" name="EndDate" value={DueDate} onChange={HandleChange}/>

                                    <label htmlFor="HasSignature">Has Signature?</label><br/>
                                    <input type="checkbox" name="HasSignature" checked={contract.HasSignature ? true : false} onChange={HandleChecked}/><br/>

                                    <label htmlFor="IsFinished">Is Finished?</label><br/>
                                    <input type="checkbox" name="IsFinished" checked={contract.IsFinished ? true : false} onChange={HandleChecked}/><br/>

                                    <button type="submit" className="btn btn-primary" name="SubmitBtn">Update Contract</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}