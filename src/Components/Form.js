import React, {useState} from "react";


function Form(){

    const [customer, setCustomer] = useState({firstName:"", lastName:"", address:{street:"", postal:"", city:"", country:""}});

    const [firstName] = useState('');
    const [lastName] = useState('');

    const[street] = useState('');
    const[postal] = useState('');
    const[city] = useState('');
    const[country] = useState('');


    const [service, setService] = useState('');
    const [comments, setComments] = useState('');


    const [submit, setSubmit] = useState(false);
    const [errorNullInputs, setErrorNullInputs] = useState(false);

    const handleService = (e) => {
        setService(e.target.value);
    }
    const handleComments = (e) => {
        setComments(e.target.value);
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
                Email: "emailTemp@email.com",
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

    const handleSubmit = (event) => {
        // alert(`Success! \nService Type: ${service}, \nComment: ${comments}`)
        // event.preventDefault();
        // console.log(service, comments);

        setErrorNullInputs(false);
        setSubmit(false);

        if (firstName === '' || lastName === '' || street ==='' || postal === '' || city === '' || country === ''|| comments === '' || service === '') {
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
            console.log(firstName, lastName, street, postal, city, country ,service, comments);
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
                                        <input className="form-control" name="firstName"onChange={(e) => setCustomer({...customer, lastName: e.target.value})} value={customer.lastName}/>
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
