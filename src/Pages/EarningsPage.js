import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { Chart } from 'react-charts'
import axios from 'axios';

export default function EarningsPage() {
    const history = useHistory();
    const data = history.location.state.data;
    const [ContractList, setContractList] = useState([]);
    const [ChartDataTotalCharged, setChartDataTotalCharged] = useState([])

    const [TotalCharged, setTotalCharged] = useState(0);
    const [TotalContracts, setTotalContracts] = useState(0);

    const [Month, setMonth] = useState(0);
    const [Year, setYear] = useState(0);

    const dataChart = React.useMemo(() => [
        {
            label: 'Total Charged Series',
            data: ChartDataTotalCharged
        }],
    [ChartDataTotalCharged])
     
    const axes = React.useMemo(() => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
    ],
    [])

    const CalculateTotalCharged = (contractList) => {
        let Total = 0;
        contractList.forEach((item) => {
            Total += item.FinalCost;
        })

        setTotalCharged(Total);
    }

    const CalculateTotalContracts = (contractList) => {
        let Total = 0;
        contractList.forEach((item) => {
            Total += 1;
        })

        setTotalContracts(Total);
    }

    const PlotContractData = (data) => {
        let tempChargedList = [];
        let indexToUpdate = 0;
        let previousDay = 0;
        let totalPerDay = 0;

        data.forEach((item, index) => {
            for(var i = 0; i <= tempChargedList.length; i++) {
                if(tempChargedList.length && tempChargedList[i] == null) {
                    index = i;
                    break;
                }
            }
            let date = new Date(item.DateCommissioned);
            let formatDate = date.getDate();

            if(formatDate === previousDay) {
                indexToUpdate = tempChargedList.findIndex((date) => {
                    return date[0] === formatDate;
                })
                if(totalPerDay === 0) {
                    totalPerDay = parseInt(tempChargedList[indexToUpdate][1]);
                }
                totalPerDay += item.FinalCost;
                tempChargedList[indexToUpdate] = [formatDate, totalPerDay];
            }
            else {
                totalPerDay = 0;
                tempChargedList[index] = [formatDate, item.FinalCost];
            }
            previousDay = formatDate;
        })

        setChartDataTotalCharged(tempChargedList);
    }

    const UpdateContractData = (data) => {
        CalculateTotalCharged(data);
        CalculateTotalContracts(data);
        PlotContractData(data);
    }

    useEffect(() => {
        CalculateTotalCharged(data);
        CalculateTotalContracts(data);
        PlotContractData(data);
    }, [data])

    const HandleSelectedMonth = (e) => {
        let MonthNum = e.target.selectedIndex + 1;

        setMonth(MonthNum);
    }

    const HandleYearChange = (e) => {
        setYear(e.target.value);
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        UpdateContractList();
    }

    const UpdateContractList = () => {
        let api = "https://localhost:5001/api/contract/get/" + Month + "/" + Year + "/true";

        axios.get(api, {
            method: 'GET',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data) => {
            setContractList(data.data);
            UpdateContractData(ContractList);
        })
        .catch((err) => console.error(err))
    }

    const RenderChart = () => {
        if (data.length || ContractList.length) {
            return(
                <>
                    <ul name="StatsList" className='nav nav-tabs' style={{display: 'flex', justifyContent: 'space-evenly' }}>
                        <li name="ChargedStat"><h3 name="ChargedHeader">Total charged this month: ${TotalCharged}</h3></li>
                        <li name="TotalStat"><h3 name="TotalHeader">Total contracts: {TotalContracts}</h3></li>
                    </ul>
                    <div name="ChartDiv" style={{margin: 'auto', width: '50%', height: '500px'}}>
                        <Chart name="Chart" data={dataChart} axes={axes} />
                    </div>
                </>
            )
        }
        else {
            return(
                <h1 style={{textAlign: "center"}}>No contracts were completed this month, search again!</h1>
            )
        }
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Earnings</Card.Title>
                </Card.Header>
                <Card.Body>
                    <h1 name="EarningsHeader">Monthly Earnings Page</h1>
                    <br/>
                    <form onSubmit={HandleSubmit}>
                        <select name="MonthSelect" className='form-control' onChange={HandleSelectedMonth}>
                            <option name="JanOption">Janurary</option>
                            <option name="FebOption">Feburary</option>
                            <option name="MarOption">March</option>
                            <option name="AprOption">April</option>
                            <option name="MayOption">May</option>
                            <option name="JunOption">June</option>
                            <option name="JulOption">July</option>
                            <option name="AugOption">August</option>
                            <option name="SepOption">September</option>
                            <option name="OctOption">October</option>
                            <option name="NovOption">November</option>
                            <option name="DecOption">December</option>
                        </select>
                        <input name="YearInput" className='form-control' type="number" defaultValue="2022" max="2022" min="2010" onChange={HandleYearChange} />
                        <button name="SubmitBtn" className='btn btn-primary' type='submit'>Find Contracts</button>
                    </form>
                    <br/>
                    <RenderChart />
                </Card.Body>
            </Card>
        </Container>
    )
}