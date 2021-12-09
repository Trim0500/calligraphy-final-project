import React, {Component} from "react";


class Form extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            comments: '',
            service: 'Calligraphy'
        }
    }


    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (event) => {
        alert(`Success! \nService Type: ${this.state.service}, \nComment: ${this.state.comments}`)
        event.preventDefault();
        console.log(this.state.service, this.state.comments);
        handleRegistration(this.state.service, this.state.comments);
    }
    

    render() { 
        const {service, comments} = this.state;
        return ( 
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h4>Choose a Service!</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                            <div>
                                <div className="form-group">
                                    <label htmlFor="service">Service Type</label>
                                    <select className="form-control" name="service" value={service} onChange={this.changeHandler}>
                                        <option value="calligraphy">Calligraphy</option>
                                        <option value="engraving">Engraving</option>
                                        <option value="event">Event</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="comments">Comments</label>
                                    <textarea className="form-control" name="comments" value={comments} onChange={this.changeHandler}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
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
const handleRegistration = (service, comment) => {
    // assign api to a value
    let api = 'https://localhost:44302/api/form';
    // create a new object
    let newServiceRequest = {
        ServiceType: service,
        Comments: comment
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


export default Form;