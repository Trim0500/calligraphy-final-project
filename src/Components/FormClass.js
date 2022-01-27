import React from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            street: '',
            city: '',
            country: '',
            postal: '',
            foundServices: [],
            service: null,
            loadedData: false,
            startingRate: 0.0,
            comments: '',
            selectedFile: null,
            errorNullInputs: false,
            submit: false
        }
        this.fileRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetAttachments = this.resetAttachments.bind(this);
    }

    resetAttachments() {
        this.fileRef.current.value = '';
        this.setState({
            selectedFile: null
        })
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onFileChange(e) {
        this.setState({
            selectedFile: e.target.files[0]
        })
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

    handleFormSubmission() {
        let api = 'https://localhost:5001/api/form';
        let file = this.state.selectedFile;

        const dataPayload = new FormData();
        dataPayload.append("Customer.FirstName", this.state.firstName);
        dataPayload.append("Customer.LastName", this.state.lastName);
        dataPayload.append("Customer.Email", this.state.email);
        dataPayload.append("Customer.Address.Street", this.state.street);
        dataPayload.append("Customer.Address.Postal", this.state.postal);
        dataPayload.append("Customer.Address.City", this.state.city);
        dataPayload.append("Customer.Address.Country", this.state.country);
        dataPayload.append("ServiceType", this.state.service);
        dataPayload.append("StartingRate", this.state.startingRate);
        dataPayload.append("Comments", this.state.comments);
        if(file != null) {
            dataPayload.append("Attachments", file, file.name);
        }
        
        fetch(api, {
            method: 'POST',
            body: dataPayload
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    handleSubmit(event) {
        this.setState({
            errorNullInputs: false,
            submit: false
        })
        console.log("Service chosen: " + this.state.service);

        if (this.state.firstName === ''
        || this.state.lastName === ''
        || this.state.street ===''
        || this.state.postal === ''
        || this.state.city === ''
        || this.state.country === ''
        || this.state.comments === ''
        || this.state.service === '') {
            this.setState({
                errorNullInputs: true
            })
            alert(`Failed, All Info is required`);
            event.preventDefault();
        }
        else {
            this.setState({
                submit: true
            })
            this.handleFormSubmission();

            alert(`Success, service request sent!`)

            alert("Thank you for your request, an email has been sent your way!")

            event.preventDefault();
            
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                street: '',
                city: '',
                country: '',
                postal: '',
                service: '',
                startingRate: '',
                comments: '',
                selectedFile: null,
                errorNullInputs: false,
                submit: false
            })
        }
    }

    successMessage() {
        return (
            <div className="success text-center" style={{
                display: this.state.submit ? 'block' : 'none',
                backgroundColor: '#FCC981',
            }}>
                <h1>Success!</h1>
                <p>You have successfully submitted your service request!</p>
            </div>
        )
    }

    errorMessage() {
        return (
            <div className="error text-center" style={{
                display: this.state.errorNullInputs ? 'block' : 'none',
                backgroundColor: '#FCC981',
            }}>
                <h1>Error!</h1>
                <p>Please enter all fields</p>
            </div>
        )
    }

    render() {
        const {loadedData, foundServices} = this.state;
        const handleService = (e) => {
            const newVal = e.target.value;
            this.setState({
                service: e.target.value || null
            });
            handleStartingRate(newVal);
        }

        const handleStartingRate = (chosenService) => {
            foundServices.map(item => {
                if(chosenService === item.TypeName) {
                    this.setState({
                        startingRate: item.StartingRate
                    })
                }
                else if(chosenService === '') {
                    this.setState({
                        startingRate: 0.0
                    })
                }
                return this.state.startingRate;
            })
        }

        const RenderSelectTag = () => {
            if(!loadedData) {
                return(<div>Services data is not loaded yet...</div>)
            }
            else {
                return(
                    <div className="form-group">
                        <label htmlFor="service">Service Type</label>
                        <select className="form-control" name="service" value={this.state.service || ''} onChange={handleService}>
                            <option value=''>Select an option...</option>
                            {foundServices.map((item) =>
                                (<option value={item.TypeName} name={item.TypeName + "-select"} key={item.ServiceId}>{item.TypeName}</option>)
                            )}
                        </select>
                        <div name='startingRate'>Starting Rate: ${this.state.startingRate}/hr</div>
                    </div>
                )
            }
        }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <div className="messages">
                            {this.successMessage()}
                            {this.errorMessage()}
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4>Choose a Service!</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input className="form-control" name="firstName" onChange={this.handleChange} value={this.state.firstName}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input className="form-control" name="lastName" onChange={this.handleChange} value={this.state.lastName}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input className="form-control" name="email" onChange={this.handleChange} value={this.state.email}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Street">Street</label>
                                            <input className="form-control" name="street" onChange={this.handleChange} value={this.state.street} />
                                            <label htmlFor="Postal">Postal Code</label>
                                            <input className="form-control" name="postal" onChange={this.handleChange} value={this.state.postal} />
                                            <label htmlFor="City">City</label>
                                            <input className="form-control" name="city" onChange={this.handleChange} value={this.state.city} />
                                            <label htmlFor="Country">Country</label>
                                            <input className="form-control" name="country" onChange={this.handleChange} value={this.state.country} />
                                        </div>
                                        <RenderSelectTag />
                                        <div className="form-group">
                                            <label htmlFor="comments">Comments</label>
                                            <textarea className="form-control" name="comments" value={this.state.comments} onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="attachments">Attachments</label>
                                            <input type="file" className="form-control" name="attachments" ref={this.fileRef} onChange={this.onFileChange}/>
                                        </div>
                                        <button type="submit" className="btn btn-primary" name="submit-btn">Submit</button>
                                        <button type="button" className="btn btn-primary" name="reset-btn" onClick={this.resetAttachments}>Reset Attachments</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}