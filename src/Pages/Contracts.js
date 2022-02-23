import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Card, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React from 'react';
import axios from 'axios'
import { useTranslation } from "react-i18next";
import "./../Locales/i18n";

export default function ContractsPage() {
    const { t } = useTranslation();
    const [contracts, setContracts] = useState([])
    const history = useHistory();

    const redirect = (data) => {
        history.push("/admin/dashboard/contract/details", {data: data});
    }

    const redirectEarnings = (data) => {
        history.push("/admin/dashboard/contract/earnings", {data: data});
    }

    const RenderEarningsPage = () => {
        var date = new Date();
        var CurrentMonth = date.getMonth() + 1;

        let ContractList = [];
        let MatchIndex = 0;
        contracts.forEach((item) => {
            var ContractMonth = new Date(item.DateCommissioned).getMonth() + 1;
            if(ContractMonth === CurrentMonth && item.IsFinished) {
                ContractList[MatchIndex] = item;
                MatchIndex++;
            }
        })

        redirectEarnings(ContractList);
    }

    useEffect(() => {
        async function getContracts() {
            let api = process.env.NODE_ENV === 'development' ? 'https://localhost:5001/api/contract/get' : process.env.REACT_APP_BACKEND_URL + "/api/contract/get"

            axios.get(api, {
                method: 'GET',
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((data) => {
                setContracts(data.data)
            })
            .catch((err) => console.error(err))
        }

        getContracts();
    }, []);
    
    return (
        <Container className={'mt-5'}>
            <Card>
                <Card.Body>
                    <h1>{t("contracts")}</h1>
                    <button type='button' name='EarningsBtn' className='btn btn-primary' style={{background:'linear-gradient(135deg, rgba(255, 179, 71, 1) 39%, rgba(255, 200, 71, 1) 101%)', color:'black'}} onClick={RenderEarningsPage}>{t("monthlyEarningsBtn")}</button>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>{t("finalCost")}</th>
                                <th>{t("dateCommissioned")}</th>
                                <th>{t("isFinished")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contracts.map((item) => (
                                <tr key={item.ContractId} id={"Contract-" + item.ContractId}>
                                    <td>${item.FinalCost}</td>
                                    <td>{(new Date(item.DateCommissioned).toLocaleDateString())}</td>
                                    <td>{item.IsFinished ? "Yes" : "No"}</td>
                                    <td>
                                        <button type='button'
                                            name={item.ContractId + "DetailsBtn"}
                                            className='btn btn-primary'
                                            onClick={() => redirect({id: item.ContractId})}>
                                                {item.IsFinished ? t("details") : t("update")}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        </Container>
    );
}