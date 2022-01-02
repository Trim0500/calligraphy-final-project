import React, { Component } from 'react';

class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foundServices: [],
            service: '',
            loadedData: false
        };
    }

    componentDidMount() {
        let api = 'https://localhost:5001/api/form/services';

        fetch(api).then((res) => res.json()).then((json) => {
            this.setState({
                foundServices: json,
                loadedData: true
            });
        })
    }

    render() {
        const {loadedData, foundServices, service} = this.state;
        const handleService = (e) => {
            this.setState({
                service: e.target.value
            });
            console.log(this.state.service);
        }
        if(!loadedData) return <div><p>Services data is not yet loaded...</p></div>;

        return (
            <select className="form-control" name="service" value={service} onChange={handleService}>
                {foundServices.map((item) =>
                    (<option value={item.TypeName} name={item.TypeName + "-select"} key={item.ServiceId}>{item.TypeName}</option>)
                )}
            </select>
        )
    }
}

export default Services;