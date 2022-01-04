import React, {useRef, useState} from "react";

function Form() {
    const [firstName, setFirstname] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const[street, setStreet] = useState('');
    const[postal, setPostal] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');

    const [service, setService] = useState('Calligraphy');

    const [comments, setComments] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);

    const [submit, setSubmit] = useState(false);
    const [errorNullInputs, setErrorNullInputs] = useState(false);

    const ref = useRef();
    const resetAttachments = () => {
        ref.current.value = "";
        setSelectedFile(null);
    }

    const handleFirstName = (e) => {
        setFirstname(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleStreet = (e) => {
        setStreet(e.target.value);
    }

    const handleCity = (e) => {
        setCity(e.target.value);
    }

    const handleCountry = (e) => {
        setCountry(e.target.value);
    }

    const handlePostal = (e) => {
        setPostal(e.target.value);
    }

    const handleService = (e) => {
        setService(e.target.value);
    }

    const handleComments = (e) => {
        setComments(e.target.value);
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleFormSubmission = () => {
        let api = 'https://localhost:5001/api/form';
        
        let file = selectedFile;

        var dataPayload = new FormData();
        dataPayload.append("Customer.FirstName", firstName);
        dataPayload.append("Customer.LastName", lastName);
        dataPayload.append("Customer.Email", email);
        dataPayload.append("Customer.Address.Street", street);
        dataPayload.append("Customer.Address.Postal", postal);
        dataPayload.append("Customer.Address.City", city);
        dataPayload.append("Customer.Address.Country", country);
        dataPayload.append("ServiceType", service);
        dataPayload.append("Comments", comments);
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

    const handleSubmit = (event) => {
        setErrorNullInputs(false);
        setSubmit(false);

        if (firstName === '' || lastName === '' || street ==='' || postal === '' || city === '' || country === ''|| comments === '' || service === '') {
            setErrorNullInputs(true);

            alert(`Failed, All Info is required`);

            event.preventDefault();
        }
        else {
            setSubmit(true);

            handleFormSubmission();

            alert(`Success, service request sent!`)

            alert("Thank you for your request, an email has been sent your way!")

            event.preventDefault();
            
            setFirstname('');
            setLastName('');
            setEmail('');
            setStreet('');
            setPostal('');
            setCity('');
            setCountry('');
            setService('Calligraphy');
            setComments('');
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
                                        <input className="form-control" name="firstName"  onChange={handleFirstName} value={firstName}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input className="form-control" name="lastName"onChange={handleLastName} value={lastName}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" name="email" onChange={handleEmail} value={email}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Street">Street</label>
                                        <input className="form-control" name="street" onChange={handleStreet} value={street} />
                                        <label htmlFor="Postal">Postal Code</label>
                                        <input className="form-control" name="postal" onChange={handlePostal} value={postal} />
                                        <label htmlFor="City">City</label>
                                        <input className="form-control" name="city" onChange={handleCity} value={city} />
                                        <label htmlFor="Country">Country</label>
                                        <input className="form-control" name="country" onChange={handleCountry} value={country} />
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
                                        <input type="file" className="form-control" name="attachments" ref={ref} onChange={onFileChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" name="submit-btn">Submit</button>
                                    <button type="button" className="btn btn-primary" name="reset-btn" onClick={resetAttachments}>Reset Attachments</button>
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
