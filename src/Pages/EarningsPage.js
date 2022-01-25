import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container } from "react-bootstrap";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { Chart } from 'react-charts'

export default function EarningsPage() {
    const history = useHistory();
    const data = history.location.state.data;
    const [ContractList, setContractList] = useState([]);
    const [ChartDataTotalCharged, setChartDataTotalCharged] = useState([])
    /* const [ChartDataTotal, setChartDataTotal] = useState([]) */

    const [TotalCharged, setTotalCharged] = useState(0);
    const [TotalContracts, setTotalContracts] = useState(0);

    const [Month, setMonth] = useState(0);
    const [Year, setYear] = useState(0);

    const dataChart = React.useMemo(() => [
        {
            label: 'Total Charged Series',
            data: ChartDataTotalCharged
        }/* ,
        {
            label: 'Total Contracts Series',
            data: ChartDataTotal
        } */],
    [ChartDataTotalCharged])
     
    const axes = React.useMemo(() => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }/* ,
        { type: 'linear', position: 'right' } */
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
        let previousDay = 0;
        let totalPerDay = 0;

        data.forEach((item, index) => {
            let date = new Date(item.DateCommissioned);
            let formatDate = date.getDay();

            console.log("We are at index: " + index);
            console.log("The previous date found was: " + previousDay);
            console.log("Our date found at this index is: " + formatDate);

            if(formatDate === previousDay) {
                console.log("We have a match!");
                totalPerDay += item.FinalCost;
                tempChargedList[index - 1] = [formatDate, totalPerDay];
            }
            else {
                console.log("The dates were different");
                tempChargedList[index] = [formatDate, item.FinalCost];
            }
            previousDay = formatDate;
        })
        console.log(tempChargedList);

        setChartDataTotalCharged(tempChargedList);
        console.log(ChartDataTotalCharged);
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

        fetch(api, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => setContractList(data))
        .catch((err) => console.error(err));

        CalculateTotalCharged(ContractList);
        CalculateTotalContracts(ContractList);
        PlotContractData(ContractList);
    }

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Earnings</Card.Title>
                </Card.Header>
                <Card.Body>
                    <h1>Monthly Earnings Page</h1>
                    <br/>
                    <form onSubmit={HandleSubmit}>
                        <select className='form-control' onChange={HandleSelectedMonth}>
                            <option>Janurary</option>
                            <option>Feburary</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        <input className='form-control' type="number" defaultValue="2021" max="2022" min="2010" onChange={HandleYearChange} />
                        <button className='btn btn-primary' type='submit'>Find Contracts</button>
                    </form>
                    <br/>
                    <ul className='nav nav-tabs'>
                        <li><h3>Total charged this month: ${TotalCharged}</h3></li>
                        <li><h3>Total contracts: {TotalContracts}</h3></li>
                    </ul>
                    <div style={{width: '400px', height: '300px'}}>
                        <Chart data={dataChart} axes={axes} />
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}