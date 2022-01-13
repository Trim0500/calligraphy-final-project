import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect, useState } from 'react';

export default function ContractDetails() {
    const history = useHistory();
    const data = history.location.state.data;

    const [FinalCost, setFinalCost] = useState('');
    const [DownPayment, setDownPayment] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [DueDate, setDueDate] = useState('');
    const [HasSignature, setHasSignature] = useState(false);
    const [IsFinished, setIsFinished] = useState(false);

    function componentDidMount(json) {
        window.addEventListener('load', MapData(json));
    }
    
    const MapData = (json) => {
        setFinalCost(json.FinalCost);
        setDownPayment(json.DownPayment);
        RenderFetchedDates(json);
        setHasSignature(json.HasSignature);
        setIsFinished(json.IsFinished);
    }

    const RenderFetchedDates = (json) => {
        var fetchedStartDate = json.DateCommissioned;
        var StartDate = new Date(fetchedStartDate);
        var IsoStartDate = StartDate.toISOString().substring(0, 10);
        setStartDate(IsoStartDate);

        var fetchedEndDate = json.EndDate;
        var EndDate = new Date(fetchedEndDate);
        var IsoEndDate = EndDate.toISOString().substring(0, 10);
        setDueDate(IsoEndDate);
    }

    const HandleChecked = () => {

    }

    const HandleChange = () => {

    }

    useEffect(() => {
        async function getContract() {
            let api = 'https://localhost:5001/api/contract/get/' + data.id;

            await fetch(api, {
                headers: {
                    'COntent-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                componentDidMount(json);
            })
            .catch((err) => console.log(err));
        }
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
                                    <input className="form-control" name="FinalCost" value={FinalCost} onChange={HandleChange}/>

                                    <label htmlFor="DownPayment">Down Payment</label>
                                    <input className="form-control" name="DownPayment" value={DownPayment} onChange={HandleChange}/>

                                    <label htmlFor="DateCommissioned">Date Commissioned</label>
                                    <input type="date" className="form-control" name="DateCommissioned" value={StartDate} onChange={HandleChange}/>

                                    <label htmlFor="EndDate">End Date</label>
                                    <input type="date" className="form-control" name="EndDate" value={DueDate} onChange={HandleChange}/>

                                    <label htmlFor="HasSignature">Has Signature?</label><br/>
                                    <input type="checkbox" name="HasSignature" checked={HasSignature} onChange={HandleChecked}/><br/>

                                    <label htmlFor="IsFinished">Is Finished?</label><br/>
                                    <input type="checkbox" name="IsFinished" checked={IsFinished} onChange={HandleChecked}/><br/>

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