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
        
        let newServiceRequest = {
            Customer: {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Email: this.state.email,
                Address: {
                    Street: this.state.street,
                    Postal: this.state.postal,
                    City: this.state.city,
                    Country: this.state.country
                }
            },
            ServiceType: this.state.service,
            Comments: this.state.comments
        }
        
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newServiceRequest)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }

    handleEmailRequest() {
        let api = 'https://localhost:5001/Mailer/Send';

        let emailTo = this.state.email;
        let subject = "Request for " + this.state.service;
        let today = new Date();
        let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
        let body = '<h1>Greetings from Serene Flourish!</h1>';
        body += '<h3>Hello ' + this.state.firstName + '!</h3>';
        body += '<p>We\'ve received your order and will contact you as soon as your package is shipped. You can find your purchase information below.</p>';
        body += '<h3>Order Summary</h3>';
        body += '<p>' + date + '</p>';
        body += '<h3>Service Title</h3>';
        body += '<p>' + this.state.service + '</p>';
        body += '<h3>Estimated Costs';
        body += '<p>$' + this.state.startingRate + '/hr</p>';
        body += '<h3>Customization Comments</h3>';
        body += '<p>' + this.state.comments + '</p>';
        body += '<h3>Your Contact Information</h3>';
        body += '<p>' + this.state.firstName + ' ' + this.state.lastName + '<p>';
        body += '<p>Address: ' + this.state.street + ' ' + this.state.city + ' ' + this.state.country + ' ' + this.state.postal + '</p>';
        body += '<p>Email: ' + this.state.email + '</p>';
        body += '<h3>This is a auto-generated Quote and may be subject to change. If there are any changes we encounter, we will contact you again to receive your approval.</h3>'
        let file = this.state.selectedFile;

        var dataPayload = new FormData();
        dataPayload.append("email", emailTo);
        dataPayload.append("subject", subject);
        dataPayload.append("body", body);
        if(file != null) {
            dataPayload.append("attachtments", file, file.name);
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

            event.preventDefault();

            this.handleEmailRequest();

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
        const {loadedData, foundServices, service} = this.state;
        const handleService = (e) => {
            var newVal = e.target.value;
            this.setState({
                service: e.target.value || null
            });
            console.log("New value to previous value: " + newVal + " " + service);
            handleStartingRate(newVal);
        }

        const handleStartingRate = (chosenService) => {
            foundServices.map(item => {
                if(chosenService === item.TypeName) {
                    this.setState({
                        startingRate: item.StartingRate
                    })
                }
                return this.state.startingRate;
            })
        }

        if(!loadedData)
            return <div><p>Services data is not yet loaded...</p></div>;

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