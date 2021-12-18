import React, {useState} from "react";


function Form(){
    const [firstName, setFirstname] = useState('');

    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');

    const[street, setStreet] = useState('');
    const[postal, setPostal] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');

    const [service, setService] = useState('');

    const [comments, setComments] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);

    const [submit, setSubmit] = useState(false);
    const [errorNullInputs, setErrorNullInputs] = useState(false);

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
        
        let newServiceRequest = {
            Customer: {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Address: {
                    Street: street,
                    Postal: postal,
                    City: city,
                    Country: country
                }
            },
            ServiceType: service,
            Comments: comments
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

    const handleEmailRequest = () => {
        let api = 'https://localhost:5001/Mailer/Send';

        let emailTo = email;
        let subject = "Request for " + service;
        let today = new Date();
        let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();
        let body = '<h1>Greetings from Serene Flourish!</h1>';
        body += '<h3>Hello ' + firstName + '!</h3>';
        body += '<p>We\'ve received your order and will contact you as soon as your package is shipped. You can find your purchase information below.</p>';
        body += '<h3>Order Summary</h3>';
        body += '<p>' + date + '</p>';
        body += '<h3>Service Title</h3>';
        body += '<p>' + service + '</p>';
        body += '<h3>Customization Comments</h3>';
        body += '<p>' + comments + '</p>';
        body += '<h3>Your Contact Information</h3>';
        body += '<p>' + firstName + ' ' + lastName + '<p>';
        body += '<p>Address: ' + street + ' ' + city + ' ' + country + ' ' + postal + '</p>';
        body += '<p>Email: ' + email + '</p>';
        body += '<h3>This is a auto-generated Quote and may be subject to change. If there are any changes we encounter, we will contact you again to receive your approval.</h3>'
        let file = selectedFile;

        var dataPayload = new FormData();
        dataPayload.append("email", emailTo);
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
        setErrorNullInputs(false);
        setSubmit(false);

        if (firstName === '' || lastName === '' || street ==='' || postal === '' || city === '' || country === ''|| comments === '' || service === '') {
            setErrorNullInputs(true);

            alert(`Failed, All Info is required`);

            event.preventDefault();

            console.log(firstName, lastName, email, street, postal, city, country ,service, comments);
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

            firstName.useState('');
            lastName.useState('');
            email.useState('');
            street.useState('');
            city.useState('');
            country.useState('');
            postal.useState('');
            service.useState('');
            comments.useState('');
            selectedFile.useState(null);
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
