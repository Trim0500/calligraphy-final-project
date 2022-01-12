import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useEffect, useState } from 'react';

export default function ContractDetails() {
    const history = useHistory();
    const data = history.location.state.data;

    const [contract, setContract] = useState([]);

    const getContract = () => {
        console.log(data);
        let api = 'https://localhost:5001/api/contract/get/' + data.id;

        fetch(api)
            .then((res) => res.json())
            .then((data) => setContract(data))
            .catch((err) => console.log(err));
        
            console.log(contract)
    }

    useEffect(() => {
        getContract();
    })

    return(
        <div className="container mt-5">
            <h1>You made it to contract {data.id}</h1>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}