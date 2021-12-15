import React, {useState} from "react";


function Form(){

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
    const handleSubmission = () => {
        // assign api to a value
        let api = 'https://localhost:5001/api/form';
        // create a new object
        let newServiceRequest = {
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

        if (comments === '' | comments === '\n') {
            setErrorNullInputs(true);
            alert(`Failed, Comment is required`);
            event.preventDefault();
            console.log(service, comments);
        }
        else {
            setSubmit(true);
            handleSubmission();
            alert(`Success, service request sent!`)
            event.preventDefault();
            console.log(service, comments);
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