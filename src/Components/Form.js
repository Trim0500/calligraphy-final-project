import React, {useState} from "react";


function Form(){

    const [customer, setCustomer] = useState({firstName:"", lastName:"", email: "", address:{street:"", postal:"", city:"", country:""}});

    const [firstName] = useState('');
    const [lastName] = useState('');
    const [email] = useState('');

    const[street] = useState('');
    const[postal] = useState('');
    const[city] = useState('');
    const[country] = useState('');


    const [service, setService] = useState('');
    const [comments, setComments] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);

    const [submit, setSubmit] = useState(false);
    const [errorNullInputs, setErrorNullInputs] = useState(false);

    const handleService = (e) => {
        setService(e.target.value);
    }
    const handleComments = (e) => {
        setComments(e.target.value);
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    // const changeHandler = (e) => {
    //     this.setState({[e.target.name]: e.target.value})
    // }
    const handleFormSubmission = () => {
        // assign api to a value
        let api = 'https://localhost:5001/api/form';
        // create a new object
        let newServiceRequest = {
            Customer: {
                FirstName: customer.firstName,
                LastName: customer.lastName,
                Email: customer.email,
                Address: {
                    Street: customer.address.street,
                    Postal: customer.address.postal,
                    City: customer.address.city,
                    Country: customer.address.country
                }
            },
            ServiceType: service,
            Comments: comments
        }
        // fetch the api
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

    const handleEmailRequest = () => {
        let api = 'https://localhost:5001/Mailer/Send';

        let email = customer.email;
        let subject = "Request for " + service;
        let today = new Date();
        let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
        let body = '<h1>Greetings from Serene Flourish!</h1>';
        body += '<h3>Hello ' + customer.firstName + '!</h3>';
        body += '<p>We\'ve received your order and will contact you as soon as your package is shipped. You can find your purchase information below.</p>';
        body += '<h3>Order Summary</h3>';
        body += '<p>' + date + '</p>';
        body += '<h3>Service Title</h3>';
        body += '<p>' + service + '</p>';
        body += '<h3>Customization Comments</h3>';
        body += '<p>' + comments + '</p>';
        body += '<h3>Your Contact Information</h3>';
        body += '<p>' + customer.firstName + ' ' + customer.lastName + '<p>';
        body += '<p>Address: ' + customer.address.street + ' ' + customer.address.city + ' ' + customer.address.country + ' ' + customer.address.postal + '</p>';
        body += '<p>Email: ' + customer.email + '</p>';
        body += '<h3>This is a auto-generated Quote and may be subject to change. If there are any changes we encounter, we will contact you again to receive your approval.</h3>'
        let file = selectedFile;

        var dataPayload = new FormData();
        dataPayload.append("email", email);
        dataPayload.append("subject", subject);
        dataPayload.append("body", body);
        dataPayload.append("attachtments", file, file.name);
        console.log("Email: " + dataPayload.get("email"));
        console.log("Subject: " + dataPayload.get("subject"));
        console.log("Body: " + dataPayload.get("body"));
        console.log("Attachments: " + dataPayload.get("attachtments"));

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

    const handleSubmit = (event) => {
        // alert(`Success! \nService Type: ${service}, \nComment: ${comments}`)
        // event.preventDefault();
        // console.log(service, comments);

        setErrorNullInputs(false);
        setSubmit(false);

        if (comments === '' || service === '') {
            setErrorNullInputs(true);
            alert(`Failed, All Info is required`);
            event.preventDefault();
            console.log(service, comments);
        }
        else {
            setSubmit(true);
            handleFormSubmission();
            alert(`Success, service request sent!`)
            event.preventDefault();
            handleEmailRequest();
            alert("Thank you for your request, an email has been sent your way!")
            event.preventDefault();
            console.log(firstName, lastName, email, street, postal, city, country ,service, comments);
        }
    }


    const successMessage = () => {
        return (
            <div className="success text-center" style={{
                display: submit ? 'block' : 'none',
                backgroundColor: '#FCC981',
            }}>
                <h1>Success!</h1>
                <p>You have successfully submitted your service request!</p>
            </div>
        )
    }

    const errorMessage = () => {
        return (
            <div className="error text-center" style={{
                display: errorNullInputs ? 'block' : 'none',
                backgroundColor: '#FCC981',
            }}>
                <h1>Error!</h1>
                <p>Please enter all fields</p>
            </div>
        )
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="messages">
                        {successMessage()}
                        {errorMessage()}
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h4>Choose a Service!</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input className="form-control" name="firstName"  onChange={(e) => setCustomer({...customer, firstName: e.target.value})} value={customer.firstName}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input className="form-control" name="lastName"onChange={(e) => setCustomer({...customer, lastName: e.target.value})} value={customer.lastName}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" name="email" onChange={(e) => setCustomer({...customer, email: e.target.value})} value={customer.email}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Street">Street</label>
                                        <input className="form-control" name="street" onChange={(e) => setCustomer({ ...customer, address: { ...customer.address, street: e.target.value } })} value={customer.address.street} />
                                        <label htmlFor="Postal">Postal Code</label>
                                        <input className="form-control" name="postal" onChange={(e) => setCustomer({ ...customer, address: { ...customer.address, postal: e.target.value } })} value={customer.address.postal} />
                                        <label htmlFor="City">City</label>
                                        <input className="form-control" name="city" onChange={(e) => setCustomer({ ...customer, address: { ...customer.address, city: e.target.value } })} value={customer.address.city} />
                                        <label htmlFor="Country">Country</label>
                                        <input className="form-control" name="country" onChange={(e) => setCustomer({ ...customer, address: { ...customer.address, country: e.target.value } })} value={customer.address.country} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service">Service Type</label>
                                        <select className="form-control" name="service" value={service} onChange={handleService}>
                                            <option value="calligraphy" name="calligraphy-select">Calligraphy</option>
                                            <option value="engraving" name="engraving-select">Engraving</option>
                                            <option value="event" name="event-select">Event</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comments">Comments</label>
                                        <textarea className="form-control" name="comments" value={comments} onChange={handleComments}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="attachments">Attachments</label>
                                        <input type="file" className="form-control" name="attachments" onChange={onFileChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" name="submit-btn">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form;