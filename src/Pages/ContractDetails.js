import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";

export default function ContractDetails() {
    const { t } = useTranslation();
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
            alert(t("formFailEmpty"));

            event.preventDefault();
           }
        else if(StartDate < OriginalDate) {
            alert(t("contractAlertEarlyDate"));

            event.preventDefault();

            setStartDate(OriginalDate);
        }
        else if(!HasSignature && IsFinished) {
            alert(t("contractAlertNeedSignature"));

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
            
            alert(t("contractAlertSuccess"));

            event.preventDefault();
        }
    }

    useEffect(() => {
        async function getContract() {
            let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/contract/get/' + data.id : process.env.REACT_APP_BACKEND_URL + "/api/contract/get/" + data.id

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
            <h1>{t("contractDetailsHeader") + data.id}</h1>
            <div className="row">
                <div className="col-md-6 mx-auto" style={{background:'linear-gradient(135deg, rgba(255, 179, 71, 1) 39%, rgba(255, 200, 71, 1) 101%)'}}>
                    <div className="card" >
                        <div className={'card-title text-center'} style={{background:'linear-gradient(135deg, rgba(255, 179, 71, 1) 39%, rgba(255, 200, 71, 1) 101%)'}}>
                        <h1 className="">Contract Details</h1>
                        <h3 className="" >Contract #{data.id}</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={HandleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="FinalCost">{t("finalCost")}</label>
                                    <input type="number" className="form-control" name="FinalCost" value={FinalCost} onChange={HandleChange}/>

                                    <label htmlFor="DownPayment">{t("downPayment")}</label>
                                    <input type="number" className="form-control" name="DownPayment" value={DownPayment} onChange={HandleChange}/>

                                    <label htmlFor="DateCommissioned">{t("dateCommissioned")}</label>
                                    <input type="date" className="form-control" name="DateCommissioned" value={StartDate} onChange={HandleChange}/>

                                    <label htmlFor="EndDate">{t("endDate")}</label>
                                    <input type="date" className="form-control" name="EndDate" value={DueDate} onChange={HandleChange}/>

                                    <label htmlFor="HasSignature">{t("hasSignature")}</label><br/>
                                    <input type="checkbox" disabled={HasSignature} name="HasSignature" checked={HasSignature} onChange={HandleChecked}/><br/>

                                    <label htmlFor="IsFinished">{t("isFinished")}</label><br/>
                                    <input type="checkbox" disabled={IsFinished} name="IsFinished" checked={IsFinished} onChange={HandleChecked}/><br/>

                                    <button type="submit" disabled={OriginalFinished} style={{background:'linear-gradient(135deg, rgba(255, 179, 71, 1) 39%, rgba(255, 200, 71, 1) 101%)', color:'black'}} className="btn btn-primary" name="SubmitBtn">{t("update")}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}