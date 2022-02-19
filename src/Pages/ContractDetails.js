import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function ContractDetails() {
    const history = useHistory();
    const data = history.location.state.data;

    const [FinalCost, setFinalCost] = useState('');
    const [DownPayment, setDownPayment] = useState('');
    const [OriginalDate, setOriginalDate] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [DueDate, setDueDate] = useState('');
    const [HasSignature, setHasSignature] = useState(false);
    const [IsFinished, setIsFinished] = useState(false);
    const [OriginalFinished, setOriginalFinished] = useState(false);

    function componentDidMount(json) {
        window.addEventListener('load', MapData(json));
    }
    
    const MapData = (json) => {
        setFinalCost(json.FinalCost);
        setDownPayment(json.DownPayment);
        RenderFetchedDates(json);
        setHasSignature(json.HasSignature);
        setIsFinished(json.IsFinished);
        setOriginalFinished(json.IsFinished);
    }

    const RenderFetchedDates = (json) => {
        var fetchedStartDate = json.DateCommissioned;
        var StartDate = new Date(fetchedStartDate);
        var IsoStartDate = StartDate.toISOString().substring(0, 10);
        setStartDate(IsoStartDate);
        setOriginalDate(IsoStartDate);

        var fetchedEndDate = json.EndDate;
        var EndDate = new Date(fetchedEndDate);
        var IsoEndDate = EndDate.toISOString().substring(0, 10);
        setDueDate(IsoEndDate);
    }

    const HandleChecked = (e) => {
        const target = e.target;
        const value = target.checked;
        const name = target.name;

        switch(name) {
            case 'HasSignature':
                setHasSignature(value);
                break;
            case 'IsFinished':
                setIsFinished(value);
                break;
            default:
                break;
        }
    }

    const HandleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        switch(name) {
            case 'FinalCost':
                setFinalCost(value);
                break;
            case 'DownPayment':
                setDownPayment(value);
                break;
            case 'DateCommissioned':
                setStartDate(value);
                break;
            case 'EndDate':
                setDueDate(value);
                break;
            default:
                break;
        }
    }

    const HandleSubmit = (event) => {
        if(FinalCost === '' ||
           DownPayment === '' ||
           StartDate === '' ||
           DueDate === '') {
            alert(`Failed, All Info is required`);

            event.preventDefault();
           }
        else if(StartDate < OriginalDate) {
            alert(`Failed, you can't set the start date to an earlier date`);

            event.preventDefault();

            setStartDate(OriginalDate);
        }
        else if(!HasSignature && IsFinished) {
            alert(`Failed, a contract can't be finished without the signature`);

            event.preventDefault();

            setIsFinished(false);
        }
        else {
            let UpdateContractRequest = {
                ContractId: data.id,
                FinalCost: FinalCost,
                DownPayment: DownPayment,
                DateCommissioned: StartDate,
                EndDate: DueDate,
                HasSignature: HasSignature,
                IsFinished: IsFinished
            }

            let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/contract/update' : process.env.REACT_APP_BACKEND_URL + "/api/contract/update"

            axios.put(api, UpdateContractRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
            
            alert('Success! The contract has been updated!');

            event.preventDefault();
        }
    }

    useEffect(() => {
        async function getContract() {
            let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/contract/update' + data.id : process.env.REACT_APP_BACKEND_URL + "/api/contract/update" + data.id

            await axios.get(api, {
                method: 'GET',
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((data) => {
                componentDidMount(data.data)
            })
            .catch((err) => console.error(err))
        }
        getContract();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return(
        <div className="container mt-5">
            <h1>Contract Details for Contract {data.id}</h1>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={HandleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="FinalCost">Final Cost</label>
                                    <input type="number" className="form-control" name="FinalCost" value={FinalCost} onChange={HandleChange}/>

                                    <label htmlFor="DownPayment">Down Payment</label>
                                    <input type="number" className="form-control" name="DownPayment" value={DownPayment} onChange={HandleChange}/>

                                    <label htmlFor="DateCommissioned">Date Commissioned</label>
                                    <input type="date" className="form-control" name="DateCommissioned" value={StartDate} onChange={HandleChange}/>

                                    <label htmlFor="EndDate">End Date</label>
                                    <input type="date" className="form-control" name="EndDate" value={DueDate} onChange={HandleChange}/>

                                    <label htmlFor="HasSignature">Has Signature?</label><br/>
                                    <input type="checkbox" disabled={HasSignature} name="HasSignature" checked={HasSignature} onChange={HandleChecked}/><br/>

                                    <label htmlFor="IsFinished">Is Finished?</label><br/>
                                    <input type="checkbox" disabled={IsFinished} name="IsFinished" checked={IsFinished} onChange={HandleChecked}/><br/>

                                    <button type="submit" disabled={OriginalFinished} className="btn btn-primary" name="SubmitBtn">Update Contract</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}